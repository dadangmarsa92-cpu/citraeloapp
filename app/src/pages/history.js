/**
 * History (Activity Log) Page
 */
import { db } from '../firebase/config.js';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export function renderHistory(user) {
  return `
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;padding-bottom:5rem;">
      <section>
        <h2 class="font-headline" style="font-size:2rem;font-weight:800;letter-spacing:-0.02em;color:var(--primary);">History</h2>
        <p style="color:var(--on-surface-variant);font-weight:500;margin-top:0.25rem;">Riwayat aktivitas penambahan dan perubahan data pesanan.</p>
      </section>

      <section>
        <div id="history-loading" style="display:flex;flex-direction:column;align-items:center;padding:3rem 0;color:var(--outline);">
          <div class="spinner" style="width:2rem;height:2rem;border-width:3px;margin-bottom:1rem;"></div>
          <p style="font-weight:700;font-size:0.875rem;">Memuat riwayat...</p>
        </div>
        
        <div id="history-empty" style="display:none;text-align:center;padding:4rem 1rem;background:var(--surface-container-low);border-radius:var(--radius-xl);">
          <span class="material-symbols-outlined" style="font-size:4rem;color:var(--outline);opacity:0.3;margin-bottom:1rem;display:block;">history_toggle_off</span>
          <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--on-surface-variant);margin-bottom:0.5rem;">Belum ada riwayat aktivitas</h3>
          <p style="color:var(--outline);font-size:0.875rem;">Aktivitas baru akan muncul di sini setelah ada pesanan yang ditambahkan atau diubah.</p>
        </div>

        <div id="history-timeline" style="display:none;flex-direction:column;gap:1rem;">
          <!-- Timeline items will be injected here -->
        </div>
      </section>
    </div>
  `;
}

export function initHistory() {
  const loadingEl = document.getElementById('history-loading');
  const emptyEl = document.getElementById('history-empty');
  const timelineEl = document.getElementById('history-timeline');

  async function loadHistory() {
    try {
      // Get latest 100 logs
      const q = query(
        collection(db, 'activity_logs'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      
      const snap = await getDocs(q);
      
      loadingEl.style.display = 'none';

      if (snap.empty) {
        emptyEl.style.display = 'block';
        return;
      }

      timelineEl.style.display = 'flex';
      let html = '';

      snap.docs.forEach(docSnap => {
        const data = docSnap.data();
        const action = data.action || 'UNKNOWN';
        const title = data.title || 'Aktivitas';
        const desc = data.description || '';
        const user = data.user || {};
        const timestamp = data.timestamp?.toDate() || new Date();
        
        const dateStr = timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const timeStr = timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        let icon = 'info';
        let color = 'var(--outline)';
        let bgColor = 'var(--surface-container-high)';

        if (action === 'ADD') {
          icon = 'add_circle';
          color = '#16a34a';
          bgColor = '#dcfce7';
        } else if (action === 'EDIT') {
          icon = 'edit';
          color = 'var(--primary)';
          bgColor = 'var(--primary-container)';
        } else if (action === 'DELETE') {
          icon = 'delete';
          color = 'var(--error)';
          bgColor = 'var(--error-container)';
        }

        html += `
          <div style="display:flex;gap:1rem;background:white;padding:1.25rem;border-radius:var(--radius-xl);box-shadow:0 2px 8px rgba(0,0,0,0.04);border:1px solid var(--surface-container-low);">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:${bgColor};color:${color};display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:1.5rem;">${icon}</span>
            </div>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">
                <h4 style="font-weight:700;font-size:1rem;color:var(--on-surface);margin:0;">${title}</h4>
                <span style="font-size:0.75rem;color:var(--outline);font-weight:500;white-space:nowrap;">${dateStr} • ${timeStr}</span>
              </div>
              <p style="font-size:0.875rem;color:var(--on-surface-variant);margin:0 0 0.5rem 0;line-height:1.4;">${desc}</p>
              
              <div style="display:inline-flex;align-items:center;gap:0.375rem;background:var(--surface-container-lowest);padding:0.25rem 0.625rem;border-radius:var(--radius-full);border:1px solid var(--surface-container-high);">
                <span class="material-symbols-outlined" style="font-size:0.875rem;color:var(--outline);">person</span>
                <span style="font-size:0.75rem;font-weight:700;color:var(--on-surface-variant);">${user.displayName || user.email || 'Sistem'}</span>
                <span style="font-size:0.6875rem;color:var(--outline);background:var(--surface-container-high);padding:0.125rem 0.375rem;border-radius:4px;margin-left:0.25rem;">${(user.role || 'user').toUpperCase()}</span>
              </div>
            </div>
          </div>
        `;
      });

      timelineEl.innerHTML = html;

    } catch (e) {
      console.error('Error loading history:', e);
      loadingEl.style.display = 'none';
      emptyEl.style.display = 'block';
      emptyEl.innerHTML = `
        <span class="material-symbols-outlined" style="font-size:4rem;color:var(--error);opacity:0.5;margin-bottom:1rem;display:block;">error</span>
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--error);margin-bottom:0.5rem;">Gagal Memuat Riwayat</h3>
        <p style="color:var(--outline);font-size:0.875rem;">${e.message}</p>
      `;
    }
  }

  loadHistory();
}
