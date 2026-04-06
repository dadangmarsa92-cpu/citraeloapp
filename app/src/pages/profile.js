/**
 * Profile Page — CitraElo Rafting
 */
import { getCurrentUser, logoutUser } from '../firebase/auth.js';

export function renderProfile(user) {
  const displayName = user?.displayName || 'User';
  const role = user?.role || 'user';
  const sector = user?.sector || 'Sector Alpha';
  const username = user?.username || '';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Profile Header -->
      <section style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;padding:1.5rem 0;">
        <div style="width:5rem;height:5rem;border-radius:50%;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);display:flex;align-items:center;justify-content:center;color:white;font-family:'Space Grotesk',sans-serif;font-size:1.75rem;font-weight:700;box-shadow:0 8px 24px rgba(0,52,97,0.25);">
          ${initials}
        </div>
        <div>
          <h2 class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">${displayName}</h2>
          <p style="color:var(--on-surface-variant);font-size:0.875rem;font-weight:500;">@${username}</p>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <span style="background:${role === 'admin' ? 'var(--primary)' : 'var(--tertiary-container)'};color:white;padding:0.25rem 1rem;border-radius:var(--radius-full);font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">
            ${role === 'admin' ? 'ADMIN' : 'USER'}
          </span>
          <span style="background:var(--surface-container-high);color:var(--on-surface-variant);padding:0.25rem 1rem;border-radius:var(--radius-full);font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">
            ${sector}
          </span>
        </div>
      </section>

      <!-- Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;">
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">24</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Trips</p>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--secondary);">4.9</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Rating</p>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--tertiary);">12</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Months</p>
        </div>
      </section>

      <!-- Menu Items -->
      <section style="display:flex;flex-direction:column;gap:0.25rem;">
        <h3 class="label-sm" style="color:var(--outline);margin-bottom:0.5rem;letter-spacing:0.2em;">SETTINGS</h3>
        
        <button id="btn-goto-settings" class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--primary-container);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:white;">settings</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;color:white;">Pengaturan Aplikasi</p>
            <p style="font-size:0.75rem;color:var(--on-primary-container);">Kelola tipe rafting & harga</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--on-primary-container);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">person</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Edit Profile</p>
            <p style="font-size:0.75rem;color:var(--outline);">Update your personal information</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">notifications</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Notifications</p>
            <p style="font-size:0.75rem;color:var(--outline);">Configure notification preferences</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">security</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Security</p>
            <p style="font-size:0.75rem;color:var(--outline);">Password and authentication</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">help</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Help & Support</p>
            <p style="font-size:0.75rem;color:var(--outline);">Get assistance and FAQs</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>
      </section>

      <!-- Logout -->
      <section style="padding:1rem 0 2rem;">
        <button id="btn-logout" style="width:100%;padding:1rem;background:var(--error-container);color:var(--on-error-container);border:none;border-radius:var(--radius-xl);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:opacity 0.2s;">
          <span class="material-symbols-outlined">logout</span>
          LOG OUT
        </button>
      </section>

      <!-- App Info -->
      <section style="text-align:center;padding-bottom:1rem;opacity:0.4;">
        <p class="label-xs">CitraElo Rafting v1.0</p>
        <p class="label-xs" style="margin-top:0.25rem;">By : Dadang M</p>
      </section>
    </div>
  `;
}

export function initProfilePage() {
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      window.location.hash = '/login';
    });
  }
  document.getElementById('btn-goto-settings')?.addEventListener('click', () => {
    window.location.hash = '/settings';
  });
}
