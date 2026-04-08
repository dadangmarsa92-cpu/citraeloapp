import { db } from '../firebase/config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export function renderTopBar(user) {
  const avatarUrl = user?.avatarUrl || '';
  const initials = (user?.displayName || 'U').charAt(0).toUpperCase();

  return `
    <header class="top-bar" id="top-bar">
      <div class="top-bar__brand">
        <span class="material-symbols-outlined top-bar__brand-icon">waves</span>
        <h1 class="top-bar__brand-name">CitraElo Rafting</h1>
      </div>
      <div class="top-bar__actions" style="position:relative;">
        <!-- BELL BTN -->
        <button class="material-symbols-outlined" style="background:none;border:none;cursor:pointer;color:var(--primary);font-size:1.5rem;position:relative;" id="btn-notifications">
          notifications
          <span id="notif-badge" style="display:none;position:absolute;top:-2px;right:-2px;background:var(--error);color:white;font-size:0.6rem;font-weight:bold;padding:0.125rem 0.25rem;border-radius:10px;font-family:sans-serif;line-height:1;">0</span>
        </button>

        <!-- NOTIFICATION DROPDOWN -->
        <div id="notif-dropdown" style="display:none;position:absolute;top:120%;right:3rem;width:320px;background:white;border-radius:var(--radius-xl);box-shadow:0 10px 40px rgba(0,25,50,0.15);border:1px solid var(--outline-variant);z-index:9999;flex-direction:column;overflow:hidden;transform-origin:top right;animation:scaleIn 0.2s ease;">
          <div style="background:linear-gradient(135deg,var(--primary) 0%,#00569f 100%);padding:1.25rem 1rem;color:white;display:flex;justify-content:space-between;align-items:center;">
             <div>
               <div style="font-weight:800;font-size:1rem;letter-spacing:0.02em;">Tagihan Aktif</div>
               <div style="font-size:0.65rem;opacity:0.8;margin-top:0.125rem;">H-7 Trip Belum Lunas</div>
             </div>
             <span class="material-symbols-outlined" style="font-size:1.5rem;opacity:0.8;">notifications_active</span>
          </div>
          <div id="notif-list" style="max-height:350px;overflow-y:auto;background:var(--surface-container-high);display:flex;flex-direction:column;gap:1px;">
             <div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;background:white;">Memuat data...</div>
          </div>
          <div style="padding:0.75rem;text-align:center;background:var(--surface-container-lowest);font-size:0.75rem;color:var(--primary);font-weight:700;cursor:pointer;border-top:1px solid var(--outline-variant);transition:opacity 0.2s;" onclick="localStorage.setItem('rep_focus_piutang', 'true'); window.citraNavigate('/reports')" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1">
             Lihat Selengkapnya di Laporan &rarr;
          </div>
        </div>

        <div class="top-bar__avatar" onclick="window.citraNavigate('/profile')" style="cursor:pointer">
          ${avatarUrl 
            ? `<img src="${avatarUrl}" alt="Profile">` 
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--primary-container);color:white;font-weight:700;font-family:'Space Grotesk',sans-serif;">${initials}</div>`
          }
        </div>
      </div>
    </header>
  `;
}

export function initTopBar() {
  const btn = document.getElementById('btn-notifications');
  const dropdown = document.getElementById('notif-dropdown');
  const badge = document.getElementById('notif-badge');
  const list = document.getElementById('notif-list');

  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  async function fetchNotifications() {
    try {
      const today = new Date();
      const end = new Date();
      end.setDate(today.getDate() + 7);
      
      const todayStr = today.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];

      const q = query(
        collection(db, 'bookings'),
        where('tanggal', '>=', todayStr),
        where('tanggal', '<=', endStr)
      );

      const snap = await getDocs(q);
      const bookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Filter unpaid
      const unpaid = bookings.filter(b => b.kurangBayar > 0);
      unpaid.sort((a, b) => a.tanggal.localeCompare(b.tanggal));

      if (unpaid.length === 0) {
        badge.style.display = 'none';
        list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;background:white;">Tidak ada tagihan tertunda untuk 7 hari kedepan.</div>';
        return;
      }

      badge.textContent = unpaid.length;
      badge.style.display = 'block';

      function formatRp(num) {
        return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
      }

      let html = '';
      unpaid.forEach(b => {
        const lbrDate = new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        html += `
          <div style="padding:1rem;background:white;display:flex;gap:0.75rem;align-items:flex-start;border-left:3px solid var(--error);cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='var(--surface-container-low)'" onmouseout="this.style.background='white'" onclick="window.citraNavigate('/dashboard')">
            <div style="width:2rem;height:2rem;border-radius:50%;background:var(--error-container);color:var(--error);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">account_balance_wallet</span>
            </div>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.125rem;">
                <span style="font-size:0.65rem;color:var(--outline);font-weight:700;padding:2px 6px;background:var(--surface-container-high);border-radius:4px;">${lbrDate} - Sesi ${b.sesiTrip}</span>
              </div>
              <div style="font-weight:800;color:var(--on-surface);font-size:0.875rem;line-height:1.2;margin-top:0.25rem;">${b.nama}</div>
              <div style="font-size:0.75rem;color:var(--error);font-weight:700;margin-top:0.375rem;display:flex;align-items:center;gap:0.25rem;">
                Piutang: ${formatRp(b.kurangBayar)}
              </div>
            </div>
          </div>
        `;
      });

      list.innerHTML = html;

    } catch (e) {
      console.error("Error fetching notifications/trips:", e);
      list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--error);font-size:0.8125rem;background:white;">Gagal memuat notifikasi.</div>';
    }
  }

  fetchNotifications();
}
