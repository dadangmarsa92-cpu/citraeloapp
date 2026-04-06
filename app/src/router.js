/**
 * CitraElo SPA Router
 * Hash-based routing with page transitions
 */
import { getCurrentUser, isAdmin } from './firebase/auth.js';

const routes = {};
let currentPage = null;

/**
 * Register a route
 */
export function registerRoute(path, handler) {
  routes[path] = handler;
}

/**
 * Navigate to a route
 */
export function navigate(path) {
  window.location.hash = path;
}

/**
 * Get current route
 */
export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/login';
}

/**
 * Initialize router
 */
export function initRouter() {
  async function handleRoute() {
    const path = getCurrentRoute();
    const user = getCurrentUser();
    const app = document.getElementById('app');

    // Auth guard
    if (path !== '/login' && !user) {
      navigate('/login');
      return;
    }

    // If logged in and trying to access login, redirect to dashboard
    if (path === '/login' && user) {
      navigate('/dashboard');
      return;
    }

    // Find matching route handler
    const handler = routes[path];
    if (!handler) {
      navigate(user ? '/dashboard' : '/login');
      return;
    }

    // Render page
    try {
      const content = await handler(user);
      
      // Update page content with animation
      const pageContainer = document.getElementById('page-content');
      if (pageContainer) {
        pageContainer.style.opacity = '0';
        pageContainer.style.transform = 'translateY(8px)';
        
        setTimeout(() => {
          pageContainer.innerHTML = content;
          pageContainer.style.transition = 'all 0.3s ease';
          pageContainer.style.opacity = '1';
          pageContainer.style.transform = 'translateY(0)';
          
          // Post-render hook
          if (handler.afterRender) {
            handler.afterRender(user);
          }
        }, 50);
      }

      // Update navigation
      updateNavigation(path, user);
      currentPage = path;
    } catch (error) {
      console.error('Route error:', error);
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/**
 * Update bottom navigation active state
 */
function updateNavigation(path, user) {
  const navItems = document.querySelectorAll('.bottom-nav__item');
  navItems.forEach(item => {
    const route = item.dataset.route;
    item.classList.toggle('active', route === path);
  });

  // Show/hide nav based on page
  const nav = document.querySelector('.bottom-nav');
  const topBar = document.querySelector('.top-bar');
  
  if (path === '/login') {
    if (nav) nav.style.display = 'none';
    if (topBar) topBar.style.display = 'none';
  } else {
    if (nav) nav.style.display = 'flex';
    if (topBar) topBar.style.display = 'flex';
  }
}
