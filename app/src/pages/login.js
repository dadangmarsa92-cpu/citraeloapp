/**
 * Login Page — CitraElo Rafting
 */
import { loginUser, seedUsers } from '../firebase/auth.js';
import { seedDemoData } from '../firebase/firestore.js';

export function renderLogin() {
  return `
    <div class="page page--login" style="min-height:100dvh;position:relative;display:flex;align-items:center;justify-content:center;padding:1.5rem;overflow:hidden;">
      <!-- Background Image -->
      <div style="position:absolute;inset:0;z-index:0;">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcT6rDNPQoFrkM-NoOWlFTdZReGFfOqiTLY-ACh7JX4U4aKGK9uvuv2NRPcFJyCkWZ5HvUdKR-7EhdfEqG0LZtvnDiCYEVWdFJ8BQymeetGebC_7UOegoHRMaF2vk8NPvDc2nrI1lrLCijshQYKUj6Ks8WVacjU0iJRNCg2Bs09lzFENOXtkxC-EfV3yawBvTupXM0KvvZ6aWLOd-qBLLWtiUOdKKqlqcWJCn4gVPbfd9prVosX3sWEZnTDEvSIj9BSKE5M20NL7E" 
             alt="whitewater rapids" 
             style="width:100%;height:100%;object-fit:cover;transform:scale(1.05);">
        <div style="position:absolute;inset:0;background:rgba(0,52,97,0.4);backdrop-filter:blur(2px);"></div>
      </div>

      <!-- Login Card -->
      <main style="position:relative;z-index:10;width:100%;max-width:440px;background:rgba(255,255,255,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:1.5rem;padding:2rem;overflow:hidden;">
        
        <!-- Header -->
        <div style="margin-bottom:2.5rem;">
          <h2 class="font-headline" style="font-size:1.875rem;font-weight:700;letter-spacing:-0.02em;color:var(--on-surface);margin-bottom:0.5rem;">Login ke CitraElo</h2>
          <p style="color:var(--on-surface-variant);font-weight:500;">Pilih pengguna untuk melanjutkan</p>
        </div>

        <!-- Login Form -->
        <form id="login-form" style="display:flex;flex-direction:column;gap:2rem;">
          
          <!-- Role Toggle -->
          <div class="role-toggle">
            <button type="button" class="role-toggle__btn active" data-role="user" id="role-user">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">person</span>
              USER
            </button>
            <button type="button" class="role-toggle__btn" data-role="admin" id="role-admin">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">admin_panel_settings</span>
              ADMIN
            </button>
          </div>

          <!-- Fields -->
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            <!-- Username -->
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.5rem;margin-left:1rem;">USERNAME</label>
              <div style="position:relative;">
                <span class="material-symbols-outlined" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:var(--outline);">alternate_email</span>
                <input type="text" id="login-username" class="input-field" placeholder="Masukkan username" autocomplete="username" required>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.5rem;margin-left:1rem;">PASSWORD</label>
              <div style="position:relative;">
                <span class="material-symbols-outlined" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:var(--outline);">lock</span>
                <input type="password" id="login-password" class="input-field" placeholder="••••••••" autocomplete="current-password" style="padding-right:3rem;" required>
                <button type="button" id="toggle-password" style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--outline);">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div id="login-error" style="display:none;padding:0.75rem 1rem;background:var(--error-container);color:var(--on-error-container);border-radius:var(--radius-md);font-size:0.875rem;font-weight:600;text-align:center;"></div>

          <!-- Submit -->
          <div style="padding-top:0.5rem;">
            <button type="submit" id="login-btn" class="btn btn--gradient" style="width:100%;height:3.5rem;text-transform:uppercase;font-size:1.125rem;letter-spacing:0.02em;">
              LOG IN
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div style="margin-top:4rem;display:flex;align-items:center;justify-content:space-between;opacity:0.5;">
          <span class="label-xs">By : Dadang M&nbsp; v 1.0</span>
          <div style="display:flex;gap:1rem;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">shield</span>
            <span class="material-symbols-outlined" style="font-size:1.125rem;">public</span>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function initLoginPage() {
  let selectedRole = 'user';

  // Role toggle
  const roleUser = document.getElementById('role-user');
  const roleAdmin = document.getElementById('role-admin');

  if (roleUser && roleAdmin) {
    roleUser.addEventListener('click', () => {
      selectedRole = 'user';
      roleUser.classList.add('active');
      roleAdmin.classList.remove('active');
    });

    roleAdmin.addEventListener('click', () => {
      selectedRole = 'admin';
      roleAdmin.classList.add('active');
      roleUser.classList.remove('active');
    });
  }

  // Toggle password visibility
  const togglePw = document.getElementById('toggle-password');
  const pwInput = document.getElementById('login-password');
  if (togglePw && pwInput) {
    togglePw.addEventListener('click', () => {
      const isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      togglePw.querySelector('.material-symbols-outlined').textContent = isPassword ? 'visibility_off' : 'visibility';
    });
  }

  // Form submit
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const loginBtn = document.getElementById('login-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;

      if (!username || !password) {
        showError('Masukkan username dan password');
        return;
      }

      // Show loading
      loginBtn.innerHTML = '<div class="spinner" style="width:1.5rem;height:1.5rem;border-width:2px;"></div>';
      loginBtn.disabled = true;
      hideError();

      try {
        await loginUser(username, password, selectedRole);
        window.location.hash = '/dashboard';
      } catch (error) {
        showError(error.message || 'Login gagal. Periksa username dan password.');
        loginBtn.innerHTML = 'LOG IN';
        loginBtn.disabled = false;
      }
    });
  }

  function showError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }

  function hideError() {
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }


}
