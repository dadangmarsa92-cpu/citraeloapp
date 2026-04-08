/**
 * Profile Page — CitraElo Rafting
 * Elegant profile view + edit modal with avatar, username, password, displayName
 */
import { getCurrentUser, logoutUser } from '../firebase/auth.js';
import { db } from '../firebase/config.js';
import { doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';

// ── Session helper ──
const SESSION_KEY = 'citraelo_session';
function updateSession(patch) {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return;
  const session = JSON.parse(raw);
  Object.assign(session, patch);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// ── Toast helper ──
function showToast(message, type = 'success') {
  let toast = document.getElementById('profile-toast');
  if (toast) toast.remove();

  toast = document.createElement('div');
  toast.id = 'profile-toast';
  toast.className = 'toast';
  toast.style.cssText = `
    background: ${type === 'success' ? 'var(--primary)' : 'var(--error)'};
    color: white;
    display:flex;align-items:center;gap:0.5rem;
  `;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:1.125rem;">${type === 'success' ? 'check_circle' : 'error'}</span>
    ${message}
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ── Avatar rendering helper ──
function renderAvatar(user, size = '5rem', fontSize = '1.75rem') {
  const displayName = user?.displayName || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarUrl = user?.avatarUrl;

  if (avatarUrl) {
    return `<div style="width:${size};height:${size};border-radius:50%;overflow:hidden;box-shadow:0 8px 24px rgba(0,52,97,0.25);flex-shrink:0;">
      <img src="${avatarUrl}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;" />
    </div>`;
  }
  return `<div style="width:${size};height:${size};border-radius:50%;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);display:flex;align-items:center;justify-content:center;color:white;font-family:'Space Grotesk',sans-serif;font-size:${fontSize};font-weight:700;box-shadow:0 8px 24px rgba(0,52,97,0.25);flex-shrink:0;">
    ${initials}
  </div>`;
}

export function renderProfile(user) {
  const displayName = user?.displayName || 'User';
  const role = user?.role || 'user';
  const username = user?.username || '';
  const isAdmin = role === 'admin';

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Profile Header -->
      <section style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;padding:1.5rem 0;">
        <div id="profile-avatar-display" style="position:relative;">
          ${renderAvatar(user)}
          <div style="position:absolute;bottom:0;right:0;width:1.75rem;height:1.75rem;border-radius:50%;background:var(--secondary);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(171,54,0,0.3);border:2px solid var(--surface);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;color:white;">edit</span>
          </div>
        </div>
        <div>
          <h2 id="profile-display-name" class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">${displayName}</h2>
          <p id="profile-username-display" style="color:var(--on-surface-variant);font-size:0.875rem;font-weight:500;">@${username}</p>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <span style="background:${isAdmin ? 'var(--primary)' : 'var(--tertiary-container)'};color:white;padding:0.25rem 1rem;border-radius:var(--radius-full);font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">
            ${role === 'admin' ? 'ADMIN' : 'USER'}
          </span>
        </div>
      </section>

      <!-- Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p id="stat-kapal-hari-ini" class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);"><span class="spinner" style="width:1rem;height:1rem;border-width:2px;display:inline-block;"></span></p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Kapal Hari Ini</p>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p id="stat-tamu-hari-ini" class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--secondary);"><span class="spinner" style="width:1rem;height:1rem;border-width:2px;display:inline-block;"></span></p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Tamu Hari Ini</p>
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

        <button id="btn-edit-profile" class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;transition:background 0.2s ease;">
          <span class="material-symbols-outlined" style="color:var(--primary);">person</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Edit Profile</p>
            <p style="font-size:0.75rem;color:var(--outline);">Ubah foto, nama & password</p>
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

// ── Edit Profile Modal ──
function renderEditProfileModal(user) {
  const displayName = user?.displayName || '';
  const username = user?.username || '';
  const avatarUrl = user?.avatarUrl || '';

  return `
    <div id="edit-profile-overlay" class="modal-overlay" style="align-items:flex-end;">
      <div class="modal-content" style="max-height:92dvh;padding:0;border-radius:var(--radius-xl) var(--radius-xl) 0 0;overflow-y:auto;">
        
        <!-- Modal Handle -->
        <div style="display:flex;justify-content:center;padding:0.75rem 0 0;">
          <div style="width:2.5rem;height:0.25rem;border-radius:var(--radius-full);background:var(--outline-variant);"></div>
        </div>

        <!-- Modal Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1.5rem 1rem;">
          <button id="edit-profile-cancel" style="background:none;border:none;cursor:pointer;padding:0.5rem;margin:-0.5rem;color:var(--on-surface-variant);font-family:'Manrope',sans-serif;font-size:0.875rem;font-weight:600;">
            Batal
          </button>
          <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">Edit Profil</h3>
          <button id="edit-profile-save" style="background:none;border:none;cursor:pointer;padding:0.5rem;margin:-0.5rem;color:var(--primary);font-family:'Manrope',sans-serif;font-size:0.875rem;font-weight:700;">
            Simpan
          </button>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:var(--outline-variant);opacity:0.3;"></div>

        <!-- Avatar Section -->
        <div style="display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem 1.5rem;gap:1rem;">
          <div id="edit-avatar-preview" style="position:relative;cursor:pointer;">
            ${avatarUrl
              ? `<div style="width:6rem;height:6rem;border-radius:50%;overflow:hidden;box-shadow:0 8px 32px rgba(0,52,97,0.2);border:3px solid var(--primary-fixed-dim);">
                  <img id="avatar-preview-img" src="${avatarUrl}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;" />
                </div>`
              : `<div id="avatar-initials-circle" style="width:6rem;height:6rem;border-radius:50%;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);display:flex;align-items:center;justify-content:center;color:white;font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700;box-shadow:0 8px 32px rgba(0,52,97,0.2);border:3px solid var(--primary-fixed-dim);">
                  ${(displayName || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>`
            }
            <!-- Camera overlay -->
            <div style="position:absolute;inset:0;border-radius:50%;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;" id="avatar-hover-overlay">
              <span class="material-symbols-outlined" style="color:white;font-size:1.5rem;">photo_camera</span>
            </div>
          </div>
          <button id="btn-change-avatar" style="background:none;border:none;color:var(--primary);font-family:'Manrope',sans-serif;font-size:0.8125rem;font-weight:700;cursor:pointer;padding:0.25rem 0.75rem;border-radius:var(--radius-full);transition:background 0.2s;">
            Ubah Foto
          </button>
          <input type="file" id="avatar-file-input" accept="image/*" style="display:none;" />
        </div>

        <!-- Form Fields -->
        <div style="padding:0 1.5rem 2rem;display:flex;flex-direction:column;gap:1.25rem;">
          
          <!-- Display Name -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;margin-right:0.25rem;">badge</span>
              Nama Lengkap
            </label>
            <div style="position:relative;">
              <input 
                id="edit-display-name" 
                type="text" 
                value="${displayName}" 
                placeholder="Masukkan nama lengkap"
                class="input-field"
                style="padding-left:1rem;height:3.25rem;border-radius:var(--radius-xl);border:2px solid transparent;transition:all 0.25s ease;"
              />
              <div id="name-validation" style="font-size:0.6875rem;color:var(--error);margin-top:0.375rem;padding-left:0.25rem;opacity:0;transition:opacity 0.2s;"></div>
            </div>
          </div>

          <!-- Username -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;margin-right:0.25rem;">alternate_email</span>
              Username
            </label>
            <div style="position:relative;">
              <input 
                id="edit-username" 
                type="text" 
                value="${username}" 
                placeholder="Masukkan username"
                class="input-field"
                style="padding-left:1rem;height:3.25rem;border-radius:var(--radius-xl);border:2px solid transparent;transition:all 0.25s ease;"
              />
              <div id="username-validation" style="font-size:0.6875rem;color:var(--error);margin-top:0.375rem;padding-left:0.25rem;opacity:0;transition:opacity 0.2s;"></div>
            </div>
          </div>

          <!-- Divider with label -->
          <div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0;">
            <div style="flex:1;height:1px;background:var(--outline-variant);opacity:0.3;"></div>
            <span style="font-size:0.6875rem;font-weight:700;color:var(--outline);text-transform:uppercase;letter-spacing:0.15em;">Ubah Password</span>
            <div style="flex:1;height:1px;background:var(--outline-variant);opacity:0.3;"></div>
          </div>

          <!-- Current Password -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;margin-right:0.25rem;">lock</span>
              Password Saat Ini
            </label>
            <div style="position:relative;">
              <input 
                id="edit-current-password" 
                type="password" 
                placeholder="Masukkan password saat ini"
                class="input-field"
                style="padding-left:1rem;padding-right:3rem;height:3.25rem;border-radius:var(--radius-xl);border:2px solid transparent;transition:all 0.25s ease;"
              />
              <button id="toggle-current-pw" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0.25rem;color:var(--outline);">
                <span class="material-symbols-outlined" style="font-size:1.25rem;">visibility_off</span>
              </button>
              <div id="current-pw-validation" style="font-size:0.6875rem;color:var(--error);margin-top:0.375rem;padding-left:0.25rem;opacity:0;transition:opacity 0.2s;"></div>
            </div>
          </div>

          <!-- New Password -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;margin-right:0.25rem;">lock_reset</span>
              Password Baru
            </label>
            <div style="position:relative;">
              <input 
                id="edit-new-password" 
                type="password" 
                placeholder="Masukkan password baru"
                class="input-field"
                style="padding-left:1rem;padding-right:3rem;height:3.25rem;border-radius:var(--radius-xl);border:2px solid transparent;transition:all 0.25s ease;"
              />
              <button id="toggle-new-pw" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0.25rem;color:var(--outline);">
                <span class="material-symbols-outlined" style="font-size:1.25rem;">visibility_off</span>
              </button>
              <!-- Password strength bar -->
              <div id="pw-strength-bar" style="margin-top:0.5rem;height:0.25rem;border-radius:var(--radius-full);background:var(--surface-container-high);overflow:hidden;opacity:0;transition:opacity 0.3s;">
                <div id="pw-strength-fill" style="height:100%;width:0%;border-radius:var(--radius-full);transition:width 0.4s ease,background 0.4s ease;"></div>
              </div>
              <div id="pw-strength-text" style="font-size:0.6875rem;margin-top:0.25rem;padding-left:0.25rem;opacity:0;transition:opacity 0.2s;font-weight:600;"></div>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;margin-right:0.25rem;">check_circle</span>
              Konfirmasi Password
            </label>
            <div style="position:relative;">
              <input 
                id="edit-confirm-password" 
                type="password" 
                placeholder="Ulangi password baru"
                class="input-field"
                style="padding-left:1rem;padding-right:3rem;height:3.25rem;border-radius:var(--radius-xl);border:2px solid transparent;transition:all 0.25s ease;"
              />
              <button id="toggle-confirm-pw" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0.25rem;color:var(--outline);">
                <span class="material-symbols-outlined" style="font-size:1.25rem;">visibility_off</span>
              </button>
              <div id="confirm-pw-validation" style="font-size:0.6875rem;color:var(--error);margin-top:0.375rem;padding-left:0.25rem;opacity:0;transition:opacity 0.2s;"></div>
            </div>
          </div>

        </div>

        <!-- Save Button (Large, bottom-anchored) -->
        <div style="padding:0 1.5rem 2rem;">
          <button id="edit-profile-save-btn" style="width:100%;padding:1rem;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);color:white;border:none;border-radius:var(--radius-xl);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:all 0.25s ease;box-shadow:0 8px 24px rgba(0,52,97,0.2);letter-spacing:0.02em;">
            <span class="material-symbols-outlined" style="font-size:1.25rem;">save</span>
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  `;
}

// ── Password Strength Calculator ──
function calcPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  const levels = [
    { label: 'Sangat Lemah', color: 'var(--error)' },
    { label: 'Lemah', color: '#e65100' },
    { label: 'Cukup', color: '#f9a825' },
    { label: 'Kuat', color: '#2e7d32' },
    { label: 'Sangat Kuat', color: '#1b5e20' },
  ];
  const idx = Math.min(score, levels.length) - 1;
  return {
    score,
    label: levels[Math.max(0, idx)].label,
    color: levels[Math.max(0, idx)].color,
    pct: (score / 5) * 100,
  };
}

// ── Resize image helper (max 200x200, compressed JPEG base64) ──
function resizeImage(file, maxSize = 200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Crop to square from center
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, min, min, 0, 0, maxSize, maxSize);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Set field validation state ──
function setFieldState(inputEl, validationEl, message, isError = true) {
  if (message) {
    validationEl.textContent = message;
    validationEl.style.opacity = '1';
    validationEl.style.color = isError ? 'var(--error)' : '#2e7d32';
    inputEl.style.borderColor = isError ? 'var(--error)' : '#2e7d32';
  } else {
    validationEl.style.opacity = '0';
    inputEl.style.borderColor = 'transparent';
  }
}

// ── Toggle password visibility ──
function setupPasswordToggle(toggleId, inputId) {
  const btn = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.querySelector('.material-symbols-outlined').textContent = isPassword ? 'visibility' : 'visibility_off';
  });
}

// ── Init edit profile modal ──
function initEditProfileModal(user) {
  const overlay = document.getElementById('edit-profile-overlay');
  if (!overlay) return;

  // State for pending avatar
  let pendingAvatarBase64 = null;

  // Close handlers
  const closeModal = () => {
    const content = overlay.querySelector('.modal-content');
    if (content) {
      content.style.animation = 'slideDown 0.25s ease forwards';
    }
    overlay.style.animation = 'fadeOut 0.25s ease forwards';
    setTimeout(() => overlay.remove(), 250);
  };

  document.getElementById('edit-profile-cancel')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Avatar hover effect
  const avatarPreview = document.getElementById('edit-avatar-preview');
  const hoverOverlay = document.getElementById('avatar-hover-overlay');
  if (avatarPreview && hoverOverlay) {
    avatarPreview.addEventListener('mouseenter', () => hoverOverlay.style.opacity = '1');
    avatarPreview.addEventListener('mouseleave', () => hoverOverlay.style.opacity = '0');
    avatarPreview.addEventListener('touchstart', () => hoverOverlay.style.opacity = '1', { passive: true });
    avatarPreview.addEventListener('touchend', () => setTimeout(() => hoverOverlay.style.opacity = '0', 300), { passive: true });
  }

  // Avatar file input
  const fileInput = document.getElementById('avatar-file-input');
  const triggerFileInput = () => fileInput?.click();

  document.getElementById('btn-change-avatar')?.addEventListener('click', triggerFileInput);
  avatarPreview?.addEventListener('click', triggerFileInput);

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast('Ukuran foto maksimal 2MB', 'error');
      return;
    }

    try {
      const base64 = await resizeImage(file);
      pendingAvatarBase64 = base64;

      // Update preview
      const container = avatarPreview.firstElementChild;
      if (container) {
        container.innerHTML = `<img id="avatar-preview-img" src="${base64}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;" />`;
        container.style.overflow = 'hidden';
        // Subtle animation
        container.style.transform = 'scale(0.9)';
        container.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
        requestAnimationFrame(() => container.style.transform = 'scale(1)');
      }
    } catch {
      showToast('Gagal membaca file', 'error');
    }
  });

  // Password toggles
  setupPasswordToggle('toggle-current-pw', 'edit-current-password');
  setupPasswordToggle('toggle-new-pw', 'edit-new-password');
  setupPasswordToggle('toggle-confirm-pw', 'edit-confirm-password');

  // Password strength meter
  const newPwInput = document.getElementById('edit-new-password');
  newPwInput?.addEventListener('input', () => {
    const val = newPwInput.value;
    const strengthBar = document.getElementById('pw-strength-bar');
    const strengthFill = document.getElementById('pw-strength-fill');
    const strengthText = document.getElementById('pw-strength-text');

    if (!val) {
      strengthBar.style.opacity = '0';
      strengthText.style.opacity = '0';
      return;
    }

    const { label, color, pct } = calcPasswordStrength(val);
    strengthBar.style.opacity = '1';
    strengthFill.style.width = pct + '%';
    strengthFill.style.background = color;
    strengthText.style.opacity = '1';
    strengthText.style.color = color;
    strengthText.textContent = label;
  });

  // ── Save handler ──
  const saveHandler = async () => {
    const newDisplayName = document.getElementById('edit-display-name')?.value.trim();
    const newUsername = document.getElementById('edit-username')?.value.trim();
    const currentPw = document.getElementById('edit-current-password')?.value;
    const newPw = document.getElementById('edit-new-password')?.value;
    const confirmPw = document.getElementById('edit-confirm-password')?.value;

    let hasError = false;

    // Validate display name
    const nameValidation = document.getElementById('name-validation');
    const nameInput = document.getElementById('edit-display-name');
    if (!newDisplayName) {
      setFieldState(nameInput, nameValidation, 'Nama tidak boleh kosong');
      hasError = true;
    } else {
      setFieldState(nameInput, nameValidation, '');
    }

    // Validate username
    const usernameValidation = document.getElementById('username-validation');
    const usernameInput = document.getElementById('edit-username');
    if (!newUsername) {
      setFieldState(usernameInput, usernameValidation, 'Username tidak boleh kosong');
      hasError = true;
    } else if (/\s/.test(newUsername)) {
      setFieldState(usernameInput, usernameValidation, 'Username tidak boleh mengandung spasi');
      hasError = true;
    } else if (newUsername.length < 3) {
      setFieldState(usernameInput, usernameValidation, 'Username minimal 3 karakter');
      hasError = true;
    } else {
      setFieldState(usernameInput, usernameValidation, '');
    }

    // Validate password (only if any password field is filled)
    const wantsPasswordChange = currentPw || newPw || confirmPw;
    const currentPwValidation = document.getElementById('current-pw-validation');
    const currentPwInput = document.getElementById('edit-current-password');
    const confirmPwValidation = document.getElementById('confirm-pw-validation');
    const confirmPwInput = document.getElementById('edit-confirm-password');

    if (wantsPasswordChange) {
      if (!currentPw) {
        setFieldState(currentPwInput, currentPwValidation, 'Masukkan password saat ini');
        hasError = true;
      } else {
        // Verify current password matches session user's password
        // We need to check against Firestore
        setFieldState(currentPwInput, currentPwValidation, '');
      }

      if (!newPw) {
        const newPwValidation = document.getElementById('pw-strength-text');
        if (newPwValidation) {
          newPwValidation.textContent = 'Password baru tidak boleh kosong';
          newPwValidation.style.color = 'var(--error)';
          newPwValidation.style.opacity = '1';
        }
        document.getElementById('edit-new-password').style.borderColor = 'var(--error)';
        hasError = true;
      } else if (newPw.length < 6) {
        const newPwValidation = document.getElementById('pw-strength-text');
        if (newPwValidation) {
          newPwValidation.textContent = 'Password minimal 6 karakter';
          newPwValidation.style.color = 'var(--error)';
          newPwValidation.style.opacity = '1';
        }
        document.getElementById('edit-new-password').style.borderColor = 'var(--error)';
        hasError = true;
      }

      if (newPw && newPw !== confirmPw) {
        setFieldState(confirmPwInput, confirmPwValidation, 'Password tidak cocok');
        hasError = true;
      } else if (confirmPw) {
        setFieldState(confirmPwInput, confirmPwValidation, '');
      }
    }

    if (hasError) return;

    // Show loading state on button
    const saveBtn = document.getElementById('edit-profile-save-btn');
    const saveBtnTop = document.getElementById('edit-profile-save');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = `<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;"></div> Menyimpan...`;
    saveBtn.style.opacity = '0.7';
    saveBtn.style.pointerEvents = 'none';
    if (saveBtnTop) saveBtnTop.style.opacity = '0.5';

    try {
      // Build update object
      const updates = {};
      if (newDisplayName !== user.displayName) updates.displayName = newDisplayName;
      if (newUsername !== user.username) updates.username = newUsername;
      if (pendingAvatarBase64) updates.avatarUrl = pendingAvatarBase64;

      if (wantsPasswordChange) {
        // Verify current password from Firestore
        const { getDocs, query: firestoreQuery, where: firestoreWhere, collection } = await import('firebase/firestore');
        const snapshot = await getDocs(
          firestoreQuery(
            collection(db, 'users'),
            firestoreWhere('username', '==', user.username)
          )
        );

        if (snapshot.empty) {
          showToast('User tidak ditemukan', 'error');
          saveBtn.innerHTML = originalText;
          saveBtn.style.opacity = '1';
          saveBtn.style.pointerEvents = '';
          return;
        }

        const userData = snapshot.docs[0].data();
        if (userData.password !== currentPw) {
          setFieldState(currentPwInput, currentPwValidation, 'Password saat ini salah');
          saveBtn.innerHTML = originalText;
          saveBtn.style.opacity = '1';
          saveBtn.style.pointerEvents = '';
          if (saveBtnTop) saveBtnTop.style.opacity = '1';
          return;
        }

        updates.password = newPw;
      }

      // Only update if there are changes
      if (Object.keys(updates).length === 0) {
        showToast('Tidak ada perubahan', 'error');
        saveBtn.innerHTML = originalText;
        saveBtn.style.opacity = '1';
        saveBtn.style.pointerEvents = '';
        if (saveBtnTop) saveBtnTop.style.opacity = '1';
        return;
      }

      // Update Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, updates);

      // Update local session
      const sessionPatch = {};
      if (updates.displayName) sessionPatch.displayName = updates.displayName;
      if (updates.username) sessionPatch.username = updates.username;
      if (updates.avatarUrl) sessionPatch.avatarUrl = updates.avatarUrl;
      updateSession(sessionPatch);

      // Success!
      showToast('Profil berhasil diperbarui!');

      // Animate close + refresh page
      closeModal();
      setTimeout(() => {
        window.location.hash = '';
        requestAnimationFrame(() => {
          window.location.hash = '/profile';
        });
      }, 300);

    } catch (err) {
      console.error('Profile update error:', err);
      showToast('Gagal menyimpan profil', 'error');
      saveBtn.innerHTML = originalText;
      saveBtn.style.opacity = '1';
      saveBtn.style.pointerEvents = '';
      if (saveBtnTop) saveBtnTop.style.opacity = '1';
    }
  };

  document.getElementById('edit-profile-save')?.addEventListener('click', saveHandler);
  document.getElementById('edit-profile-save-btn')?.addEventListener('click', saveHandler);
}

export function initProfilePage() {
  // Logout
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      window.location.hash = '/login';
    });
  }

  // Go to settings
  document.getElementById('btn-goto-settings')?.addEventListener('click', () => {
    window.location.hash = '/settings';
  });

  // Edit Profile button
  document.getElementById('btn-edit-profile')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;

    // Inject modal
    const modalHTML = renderEditProfileModal(user);
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Init modal interactions
    setTimeout(() => initEditProfileModal(user), 50);
  });

  // Fetch today's guest count from Firestore
  loadTodayStats();
}

async function loadTodayStats() {
  const tamuEl = document.getElementById('stat-tamu-hari-ini');
  const kapalEl = document.getElementById('stat-kapal-hari-ini');
  if (!tamuEl && !kapalEl) return;

  try {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const q = query(collection(db, 'bookings'), where('tanggal', '==', dateStr));
    const snapshot = await getDocs(q);

    let totalBoats = 0;
    snapshot.docs.forEach(d => {
      const data = d.data();
      totalBoats += data.jumlahPerahu || 0;
    });
    const totalGuests = snapshot.size;

    // Animate numbers in
    const animateValue = (el, value) => {
      if (!el) return;
      el.textContent = value;
      el.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.transform = 'scale(1.15)';
      setTimeout(() => el.style.transform = 'scale(1)', 300);
    };

    animateValue(tamuEl, totalGuests);
    animateValue(kapalEl, totalBoats);
  } catch (err) {
    console.error('Failed to load today stats:', err);
    if (tamuEl) tamuEl.textContent = '0';
    if (kapalEl) kapalEl.textContent = '0';
  }
}
