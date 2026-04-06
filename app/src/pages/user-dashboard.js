/**
 * User Dashboard Page — CitraElo Rafting (Read-only view)
 */
import { db } from '../firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

export function renderUserDashboard(user) {
  const displayName = user?.displayName || 'User';
  const now = new Date();
  const todayStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;">
      <!-- Greeting -->
      <section>
        <p style="font-size:0.8125rem;color:var(--outline);font-weight:500;">Selamat datang,</p>
        <h2 class="font-headline" style="font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-0.03em;margin-top:0.125rem;">${displayName}</h2>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--outline);background:var(--surface-container-low);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">calendar_today</span> ${todayStr}
          </span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:white;background:var(--tertiary-container);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">badge</span> USER
          </span>
        </div>
      </section>

      <!-- Today Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_sunny</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP PAGI</span>
          <div class="metric-value" style="font-size:2rem;color:var(--primary);" id="user-stat-pagi">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_twilight</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP SIANG</span>
          <div class="metric-value" style="font-size:2rem;color:var(--secondary);" id="user-stat-siang">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card card--primary" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">kayaking</span></div>
          <span class="label-xs" style="opacity:0.8;font-size:8px;">TOTAL KAPAL</span>
          <div class="metric-value" style="font-size:2rem;" id="user-stat-total">—</div>
          <span style="font-size:0.625rem;opacity:0.7;font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;background:var(--tertiary-container);">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">group</span></div>
          <span class="label-xs" style="color:var(--on-tertiary-container);font-size:8px;">TOTAL PEMESAN</span>
          <div class="metric-value" style="font-size:2rem;color:var(--on-tertiary-container);" id="user-stat-orders">—</div>
          <span style="font-size:0.625rem;color:var(--on-tertiary-container);font-weight:700;">PESANAN</span>
        </div>
      </section>

      <!-- Info -->
      <section style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.5rem;text-align:center;">
        <span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline);opacity:0.3;display:block;margin-bottom:0.5rem;">info</span>
        <p style="color:var(--outline);font-size:0.8125rem;">Anda login sebagai <strong>User</strong>.<br>Untuk menambah pesanan, silakan hubungi Admin.</p>
      </section>
    </div>
  `;
}

export function initUserDashboard() {
  async function loadStats() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const snap = await getDocs(collection(db, 'bookings'));
      let pagi = 0, siang = 0, orders = 0;
      snap.docs.forEach(d => {
        const data = d.data();
        if (data.tanggal === today) {
          orders++;
          const boats = data.jumlahPerahu || 0;
          if (data.sesiTrip === 'Siang') siang += boats;
          else pagi += boats;
        }
      });
      const p = document.getElementById('user-stat-pagi');
      const s = document.getElementById('user-stat-siang');
      const t = document.getElementById('user-stat-total');
      const o = document.getElementById('user-stat-orders');
      if (p) p.textContent = pagi;
      if (s) s.textContent = siang;
      if (t) t.textContent = pagi + siang;
      if (o) o.textContent = orders;
    } catch (e) { console.error(e); }
  }
  loadStats();
}
