/**
 * Super User Dashboard (User Management)
 */
import { db } from '../firebase/config.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export function renderSuperuserDashboard(user) {
  const displayName = user?.displayName || 'Super User';

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;padding-bottom:5rem;">
      <section>
        <p style="font-size:0.8125rem;color:var(--outline);font-weight:500;">Manajemen Akun,</p>
        <h2 class="font-headline" style="font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-0.03em;margin-top:0.125rem;">${displayName}</h2>
      </section>

      <section>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="font-size:1.125rem;font-weight:700;color:var(--on-surface);">Daftar Pengguna</h3>
          <button id="su-btn-tambah" style="display:flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.8125rem;cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">person_add</span> Tambah
          </button>
        </div>

        <div id="su-loading" style="text-align:center;padding:2rem 0;color:var(--outline);">
          <div class="spinner" style="width:2rem;height:2rem;border-width:3px;margin-bottom:1rem;"></div>
          <p style="font-weight:700;font-size:0.875rem;">Memuat daftar akun...</p>
        </div>

        <div id="su-users-container" style="display:none;flex-direction:column;gap:0.75rem;">
          <!-- Users List -->
        </div>
      </section>

      <!-- Modal Tambah/Edit -->
      <div id="su-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:fadeIn 0.2s ease;">
        <div style="position:absolute;bottom:0;left:0;right:0;background:var(--surface-container-lowest);border-radius:1.5rem 1.5rem 0 0;padding:2rem 1.5rem;animation:slideUp 0.3s cubic-bezier(0.2,1,0.3,1);max-height:90vh;overflow-y:auto;">
          
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
            <h2 id="su-modal-title" class="font-headline" style="font-size:1.25rem;font-weight:700;color:var(--on-surface);">Tambah Akun</h2>
            <button id="su-modal-close" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="su-form" style="display:flex;flex-direction:column;gap:1.25rem;">
            <input type="hidden" id="su-field-id">
            
            <div id="su-role-section">
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">HAK AKSES</label>
              <div class="role-toggle">
                <button type="button" class="role-toggle__btn active" data-role="user" id="su-role-user">
                  <span class="material-symbols-outlined" style="font-size:1.125rem;">person</span> USER
                </button>
                <button type="button" class="role-toggle__btn" data-role="admin" id="su-role-admin">
                  <span class="material-symbols-outlined" style="font-size:1.125rem;">admin_panel_settings</span> ADMIN
                </button>
              </div>
            </div>

            <div id="su-username-section">
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">USERNAME</label>
              <input type="text" id="su-field-username" class="input-field" placeholder="Gunakan huruf kecil tanpa spasi" required>
            </div>

            <div id="su-name-section">
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">NAMA LENGKAP</label>
              <input type="text" id="su-field-name" class="input-field" placeholder="Contoh: Budi Santoso" required>
            </div>

            <div>
              <label class="label-xs" id="su-label-password" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">PASSWORD</label>
              <input type="text" id="su-field-password" class="input-field" placeholder="Minimal 6 karakter" required>
            </div>

            <button type="submit" id="su-btn-simpan" class="btn btn--gradient" style="margin-top:1rem;height:3.5rem;">
              Simpan
            </button>
          </form>

        </div>
      </div>
    </div>
  `;
}

export function initSuperuserDashboard() {
  const container = document.getElementById('su-users-container');
  const loading = document.getElementById('su-loading');
  const modal = document.getElementById('su-modal');
  const form = document.getElementById('su-form');
  let selectedRole = 'user';
  let isEditing = false;

  async function loadUsers() {
    loading.style.display = 'block';
    container.style.display = 'none';

    try {
      const q = query(collection(db, 'users'), orderBy('role'));
      const snap = await getDocs(q);
      
      let html = '';
      snap.docs.forEach(docSnap => {
        const data = docSnap.data();
        const id = docSnap.id;
        
        let icon = 'person';
        let badgeColor = 'var(--surface-container-high)';
        let textColor = 'var(--outline)';
        
        if (data.role === 'superuser') {
          icon = 'manage_accounts';
          badgeColor = '#dcfce7';
          textColor = '#16a34a';
        } else if (data.role === 'admin') {
          icon = 'admin_panel_settings';
          badgeColor = 'var(--primary-container)';
          textColor = 'var(--primary)';
        }

        // Hide delete for superusers to prevent accidental lockouts
        const actionHtml = data.role === 'superuser' 
          ? `<button class="su-btn-edit-pw" data-id="${id}" data-user="${data.username}" style="padding:0.375rem 0.75rem;background:var(--surface-container-high);border:none;border-radius:1rem;font-size:0.75rem;font-weight:700;color:var(--on-surface);cursor:pointer;">Reset PW</button>`
          : `<button class="su-btn-edit-pw" data-id="${id}" data-user="${data.username}" style="padding:0.375rem 0.75rem;background:var(--surface-container-high);border:none;border-radius:1rem;font-size:0.75rem;font-weight:700;color:var(--on-surface);cursor:pointer;">Reset PW</button>
             <button class="su-btn-delete" data-id="${id}" data-user="${data.username}" style="padding:0.375rem;background:var(--error-container);border:none;border-radius:1rem;color:var(--error);cursor:pointer;display:flex;"><span class="material-symbols-outlined" style="font-size:1.125rem;">delete</span></button>`;

        html += `
          <div style="background:white;padding:1rem;border-radius:var(--radius-xl);box-shadow:0 2px 4px rgba(0,0,0,0.02);border:1px solid var(--surface-container-low);display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;gap:1rem;align-items:center;">
              <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:${badgeColor};color:${textColor};display:flex;align-items:center;justify-content:center;">
                <span class="material-symbols-outlined">${icon}</span>
              </div>
              <div>
                <h4 style="font-weight:700;font-size:0.9375rem;margin:0;color:var(--on-surface);">${data.displayName || data.username}</h4>
                <div style="font-size:0.75rem;color:var(--outline);font-weight:500;">@${data.username} &bull; <span style="text-transform:uppercase;">${data.role}</span></div>
              </div>
            </div>
            <div style="display:flex;gap:0.375rem;">
              ${actionHtml}
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
      loading.style.display = 'none';
      container.style.display = 'flex';

      // Attach events
      document.querySelectorAll('.su-btn-edit-pw').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          const uname = e.currentTarget.dataset.user;
          openModalForReset(id, uname);
        });
      });

      document.querySelectorAll('.su-btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.dataset.id;
          const uname = e.currentTarget.dataset.user;
          if (confirm(`Yakin ingin menghapus akun @${uname}?`)) {
            try {
              await deleteDoc(doc(db, 'users', id));
              loadUsers();
            } catch (err) {
              alert('Gagal menghapus: ' + err.message);
            }
          }
        });
      });

    } catch (e) {
      console.error(e);
      loading.innerHTML = '<p style="color:var(--error);">Gagal memuat pengguna</p>';
    }
  }

  // Modals
  document.getElementById('su-btn-tambah').addEventListener('click', () => {
    isEditing = false;
    form.reset();
    document.getElementById('su-field-id').value = '';
    document.getElementById('su-modal-title').textContent = 'Tambah Akun Baru';
    document.getElementById('su-role-section').style.display = 'block';
    document.getElementById('su-username-section').style.display = 'block';
    document.getElementById('su-name-section').style.display = 'block';
    document.getElementById('su-label-password').textContent = 'PASSWORD';
    
    // reset role toggles
    selectedRole = 'user';
    document.getElementById('su-role-user').classList.add('active');
    document.getElementById('su-role-admin').classList.remove('active');

    modal.style.display = 'flex';
  });

  function openModalForReset(id, username) {
    isEditing = true;
    form.reset();
    document.getElementById('su-field-id').value = id;
    document.getElementById('su-modal-title').textContent = `Reset Password @${username}`;
    
    // Hide non-password fields
    document.getElementById('su-role-section').style.display = 'none';
    document.getElementById('su-username-section').style.display = 'none';
    document.getElementById('su-name-section').style.display = 'none';
    document.getElementById('su-label-password').textContent = 'PASSWORD BARU';
    
    // Remove required from hidden fields
    document.getElementById('su-field-username').required = false;
    document.getElementById('su-field-name').required = false;

    modal.style.display = 'flex';
  }

  document.getElementById('su-modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
    // restore required
    document.getElementById('su-field-username').required = true;
    document.getElementById('su-field-name').required = true;
  });

  // Role Toggle UI
  const roleUser = document.getElementById('su-role-user');
  const roleAdmin = document.getElementById('su-role-admin');
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

  // Form Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('su-btn-simpan');
    btn.disabled = true;
    btn.innerHTML = 'Menyimpan...';

    const id = document.getElementById('su-field-id').value;
    const pwd = document.getElementById('su-field-password').value;

    try {
      if (isEditing) {
        // Reset Password
        await updateDoc(doc(db, 'users', id), {
          password: pwd,
          updatedAt: serverTimestamp()
        });
        alert('Password berhasil direset!');
      } else {
        // Tambah Akun
        const uname = document.getElementById('su-field-username').value.trim().toLowerCase();
        const nama = document.getElementById('su-field-name').value.trim();
        
        // Cek username duplikat
        const q = query(collection(db, 'users'));
        const snap = await getDocs(q);
        const exists = snap.docs.some(d => d.data().username === uname);
        
        if (exists) {
          throw new Error('Username sudah digunakan');
        }

        await addDoc(collection(db, 'users'), {
          username: uname,
          password: pwd,
          displayName: nama,
          role: selectedRole,
          createdAt: serverTimestamp()
        });
        alert('Akun berhasil dibuat!');
      }
      
      modal.style.display = 'none';
      loadUsers();
    } catch (err) {
      alert(err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Simpan';
    }
  });

  loadUsers();
}
