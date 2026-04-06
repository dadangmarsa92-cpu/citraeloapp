/**
 * Bottom Navigation Component with Center FAB
 * Role-aware: hides Reports, Profile, and FAB for non-admin users
 */
import { getCurrentUser } from '../firebase/auth.js';

export function renderBottomNav() {
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';

  return `
    <nav class="bottom-nav" id="bottom-nav">
      <button class="bottom-nav__item" data-route="/dashboard" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">dashboard</span>
        <span class="bottom-nav__item-label">DASHBOARD</span>
      </button>
      <button class="bottom-nav__item" data-route="/calendar" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">calendar_today</span>
        <span class="bottom-nav__item-label">CALENDAR</span>
      </button>

      ${isAdmin ? `
      <!-- Center FAB (Admin only) -->
      <button class="bottom-nav__fab" type="button" id="btn-tambah-tamu">
        <span class="material-symbols-outlined" style="font-size:2rem;font-weight:600;">add</span>
      </button>

      <button class="bottom-nav__item" data-route="/reports" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">insert_chart</span>
        <span class="bottom-nav__item-label">REPORTS</span>
      </button>
      <button class="bottom-nav__item" data-route="/profile" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">person</span>
        <span class="bottom-nav__item-label">PROFILE</span>
      </button>
      ` : `
      <!-- User: Logout button instead -->
      <button class="bottom-nav__item" id="btn-user-logout" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">logout</span>
        <span class="bottom-nav__item-label">LOGOUT</span>
      </button>
      `}
    </nav>
  `;
}

export function initBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  
  nav.addEventListener('click', (e) => {
    // Ignore FAB clicks (handled separately by admin-dashboard)
    const fab = e.target.closest('.bottom-nav__fab');
    if (fab) return;

    const btn = e.target.closest('.bottom-nav__item');
    if (!btn) return;
    
    const route = btn.dataset.route;
    if (route) {
      window.location.hash = route;
    }
  });

  // User logout button
  document.getElementById('btn-user-logout')?.addEventListener('click', () => {
    import('../firebase/auth.js').then(m => { m.logoutUser(); window.location.hash = '/login'; });
  });
}
