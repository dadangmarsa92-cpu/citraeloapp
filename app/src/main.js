/**
 * CitraElo Rafting — Main Entry Point
 */
import './styles/index.css';
import { getCurrentUser } from './firebase/auth.js';
import { renderTopBar } from './components/top-bar.js';
import { renderBottomNav, initBottomNav } from './components/bottom-nav.js';
import { renderLogin, initLoginPage } from './pages/login.js';
import { renderUserDashboard, initUserDashboard } from './pages/user-dashboard.js';
import { renderAdminDashboard, initAdminDashboard } from './pages/admin-dashboard.js';
import { renderCalendar, initCalendar } from './pages/calendar.js';
import { renderReports } from './pages/reports.js';
import { renderProfile, initProfilePage } from './pages/profile.js';
import { renderSettings, initSettings } from './pages/settings.js';

// ── State ──
let currentRoute = null;

// ── Navigate ──
function navigate(path) {
  window.location.hash = path;
}

// ── Render App ──
function renderApp() {
  const hash = window.location.hash.slice(1) || '';
  const user = getCurrentUser();
  const app = document.getElementById('app');

  // Auth guard
  if (!user && hash !== '/login') {
    navigate('/login');
    return;
  }

  // Redirect logged-in users away from login
  if (user && (hash === '/login' || hash === '' || hash === '/')) {
    navigate('/dashboard');
    return;
  }

  // LOGIN PAGE — full screen, no nav
  if (hash === '/login') {
    app.innerHTML = renderLogin();
    setTimeout(() => initLoginPage(), 50);
    currentRoute = '/login';
    return;
  }

  // APP PAGES — with top bar and bottom nav
  // Only rebuild shell if coming from login
  if (currentRoute === '/login' || !document.getElementById('page-content')) {
    app.innerHTML = `
      ${renderTopBar(user)}
      <div id="page-content" style="transition:opacity 0.25s ease,transform 0.25s ease;"></div>
      ${renderBottomNav()}
    `;
    initBottomNav();
  }

  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  // Animate out
  pageContent.style.opacity = '0';
  pageContent.style.transform = 'translateY(8px)';

  setTimeout(() => {
    // Render page content
    let content = '';
    let afterRender = null;

    // Role-based route guard: users can only access dashboard & calendar
    const isAdmin = user?.role === 'admin';
    if (!isAdmin && !['/dashboard', '/calendar'].includes(hash)) {
      navigate('/dashboard');
      return;
    }

    switch (hash) {
      case '/dashboard':
        content = isAdmin
          ? renderAdminDashboard(user)
          : renderUserDashboard(user);
        afterRender = isAdmin
          ? () => initAdminDashboard()
          : () => initUserDashboard();
        break;
      case '/calendar':
        content = renderCalendar(user);
        afterRender = () => initCalendar();
        break;
      case '/reports':
        content = renderReports(user);
        break;
      case '/profile':
        content = renderProfile(user);
        afterRender = () => initProfilePage();
        break;
      case '/settings':
        content = renderSettings(user);
        afterRender = () => initSettings();
        break;
      default:
        navigate('/dashboard');
        return;
    }

    pageContent.innerHTML = content;

    // Animate in
    requestAnimationFrame(() => {
      pageContent.style.opacity = '1';
      pageContent.style.transform = 'translateY(0)';
    });

    // Update active nav
    document.querySelectorAll('.bottom-nav__item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === hash);
    });

    // Post-render hooks
    if (afterRender) afterRender();

    currentRoute = hash;
  }, currentRoute === '/login' ? 0 : 100);
}

// ── Initialize ──
function init() {
  window.addEventListener('hashchange', renderApp);
  
  // Default route
  if (!window.location.hash) {
    const user = getCurrentUser();
    window.location.hash = user ? '/dashboard' : '/login';
  }
  
  renderApp();
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export navigate for global use
window.citraNavigate = navigate;
