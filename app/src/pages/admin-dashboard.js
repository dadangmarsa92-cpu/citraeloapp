/**
 * Admin Dashboard Page — CitraElo Rafting
 */
import { db } from '../firebase/config.js';
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy } from 'firebase/firestore';
import { loadRaftingTypes, loadTambahanTypes } from './settings.js';

export function renderAdminDashboard(user) {
  const displayName = user?.displayName || 'Admin';
  const now = new Date();
  const todayStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const today = now.toISOString().split('T')[0];
  const d7 = new Date(now); d7.setDate(d7.getDate() - 6);
  const fromDefault = d7.toISOString().split('T')[0];

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
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--secondary);background:var(--surface-container-low);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">timer</span> <span id="session-timer">00:00:00</span>
          </span>
        </div>
      </section>

      <!-- Today Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_sunny</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP PAGI</span>
          <div class="metric-value" style="font-size:2rem;color:var(--primary);" id="stat-pagi">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_twilight</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP SIANG</span>
          <div class="metric-value" style="font-size:2rem;color:var(--secondary);" id="stat-siang">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card card--primary" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">kayaking</span></div>
          <span class="label-xs" style="opacity:0.8;font-size:8px;">TOTAL KAPAL</span>
          <div class="metric-value" style="font-size:2rem;" id="stat-total">—</div>
          <span style="font-size:0.625rem;opacity:0.7;font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;background:var(--tertiary-container);">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">group</span></div>
          <span class="label-xs" style="color:var(--on-tertiary-container);font-size:8px;">TOTAL PEMESAN</span>
          <div class="metric-value" style="font-size:2rem;color:var(--on-tertiary-container);" id="stat-orders">—</div>
          <span style="font-size:0.625rem;color:var(--on-tertiary-container);font-weight:700;">PESANAN</span>
        </div>
      </section>

      <!-- Chart Section -->
      <section>
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.75rem;">Statistik Pesanan</h3>
        <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap;">
          <div style="flex:1;min-width:110px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">DARI</label>
            <input type="date" id="chart-from" class="input-field" value="${fromDefault}" style="padding-left:0.75rem;height:2.25rem;font-size:0.75rem;">
          </div>
          <div style="flex:1;min-width:110px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">SAMPAI</label>
            <input type="date" id="chart-to" class="input-field" value="${today}" style="padding-left:0.75rem;height:2.25rem;font-size:0.75rem;">
          </div>
          <div style="display:flex;align-items:flex-end;">
            <button id="btn-chart-filter" style="height:2.25rem;padding:0 1rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;display:flex;align-items:center;gap:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;">filter_alt</span> Filter
            </button>
          </div>
        </div>
        <div style="display:flex;gap:1rem;margin-bottom:0.5rem;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--primary);"></span> Pesanan</span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--secondary);"></span> Kapal</span>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1rem;min-height:220px;">
          <canvas id="chart-orders" style="width:100%;height:200px;"></canvas>
        </div>
      </section>
    </div>
  `;
}

/**
 * Modal HTML — injected into document.body to avoid transform stacking context issues
 */
function getModalHTML() {
  return `
    <div class="modal-overlay" id="modal-booking" style="display:none;">
      <div class="modal-content" id="modal-booking-content">
        <div id="booking-form-view">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <div>
              <h2 class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">Tambah Tamu</h2>
              <p style="font-size:0.75rem;color:var(--outline);margin-top:0.25rem;">Isi data pesanan pelanggan</p>
            </div>
            <button id="btn-modal-close" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="form-booking" style="display:flex;flex-direction:column;gap:1.25rem;">
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">ID PESANAN</label>
              <input type="text" id="field-id-pesanan" class="input-field" readonly style="background:var(--surface-container-low);color:var(--outline);font-weight:700;letter-spacing:0.05em;">
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">NAMA PEMESAN <span style="color:var(--error);">*</span></label>
              <input type="text" id="field-nama" class="input-field" placeholder="Masukkan nama pemesan" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">NO. TELP PEMESAN <span style="color:var(--error);">*</span></label>
              <input type="tel" id="field-telp" class="input-field" placeholder="08xxxxxxxxxx" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TANGGAL PEMESANAN <span style="color:var(--error);">*</span></label>
              <input type="date" id="field-tanggal" class="input-field" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">RAFTING TYPE <span style="color:var(--error);">*</span></label>
              <select id="field-rafting-type" class="input-field" required style="padding-left:1rem;appearance:auto;cursor:pointer;">
                <option value="">-- Pilih Tipe Rafting --</option>
              </select>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">JUMLAH PERAHU <span style="color:var(--error);">*</span></label>
              <input type="number" id="field-jumlah-perahu" class="input-field" placeholder="0" min="1" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">SESI TRIP <span style="color:var(--error);">*</span></label>
              <div class="role-toggle" style="margin-top:0.25rem;">
                <button type="button" class="role-toggle__btn active" data-sesi="Pagi" id="sesi-pagi">
                  <span class="material-symbols-outlined" style="font-size:1rem;">wb_sunny</span> Pagi
                </button>
                <button type="button" class="role-toggle__btn" data-sesi="Siang" id="sesi-siang">
                  <span class="material-symbols-outlined" style="font-size:1rem;">wb_twilight</span> Siang
                </button>
              </div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">HARGA PER KAPAL (Rp)</label>
              <input type="number" id="field-harga" class="input-field" placeholder="Otomatis dari tipe" min="0" readonly style="background:var(--surface-container-low);color:var(--outline);font-weight:700;">
            </div>
            <!-- Tambahan Section -->
            <div>
              <button type="button" id="btn-tambahan" style="display:flex;align-items:center;gap:0.5rem;padding:0.625rem 1rem;background:var(--tertiary-container);color:var(--on-tertiary);border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.8125rem;">
                <span class="material-symbols-outlined" style="font-size:1rem;">add_circle</span> Tambahan
              </button>
              <div id="tambahan-container" style="display:none;margin-top:0.75rem;display:flex;flex-direction:column;gap:0.75rem;">
              </div>
              <div id="tambahan-total-row" style="display:none;margin-top:0.5rem;background:var(--tertiary-fixed);border-radius:var(--radius-xl);padding:0.625rem 1rem;display:flex;justify-content:space-between;align-items:center;">
                <span class="label-xs" style="color:var(--tertiary);">TOTAL TAMBAHAN</span>
                <span id="field-tambahan-total" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;color:var(--tertiary);">Rp 0</span>
              </div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TOTAL PESANAN</label>
              <div id="field-total" style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.875rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:var(--primary);">Rp 0</div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">DP (Rp) <span style="color:var(--error);">*</span></label>
              <input type="number" id="field-dp" class="input-field" placeholder="0" min="0" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">KURANG BAYAR</label>
              <div id="field-kurang-bayar" style="background:var(--error-container);border-radius:var(--radius-xl);padding:0.875rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:var(--on-error-container);">Rp 0</div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">METODE BAYAR <span style="color:var(--error);">*</span></label>
              <div class="role-toggle" style="margin-top:0.25rem;">
                <button type="button" class="role-toggle__btn active" data-metode="Cash" id="metode-cash">
                  <span class="material-symbols-outlined" style="font-size:1rem;">payments</span> Cash
                </button>
                <button type="button" class="role-toggle__btn" data-metode="Transfer" id="metode-transfer">
                  <span class="material-symbols-outlined" style="font-size:1rem;">account_balance</span> Transfer
                </button>
              </div>
            </div>
            <div style="display:flex;gap:0.75rem;padding-top:0.5rem;">
              <button type="button" id="btn-batal" style="flex:1;padding:0.875rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.875rem;">Batal</button>
              <button type="submit" id="btn-simpan" class="btn btn--gradient" style="flex:2;height:auto;padding:0.875rem;font-size:0.875rem;">
                <span class="material-symbols-outlined" style="font-size:1.125rem;">save</span> Simpan Pesanan
              </button>
            </div>
          </form>
        </div>
        <div id="booking-receipt-view" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="material-symbols-outlined" style="color:#16a34a;font-size:1.75rem;">check_circle</span>
              <h2 class="font-headline" style="font-size:1.25rem;font-weight:700;color:#16a34a;">Pesanan Tersimpan!</h2>
            </div>
            <button id="btn-receipt-close" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="receipt-content" style="background:white;border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);padding:1.5rem;">
            <div style="text-align:center;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px dashed var(--outline-variant);">
              <h3 class="font-headline" style="font-size:1.25rem;font-weight:800;color:var(--primary);letter-spacing:-0.02em;">CITRAELO RAFTING</h3>
              <p style="font-size:0.7rem;color:var(--outline);margin-top:0.25rem;">Struk Pemesanan</p>
              <p style="font-size:0.7rem;color:var(--outline);" id="receipt-date"></p>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;font-size:0.8125rem;">
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">ID Pesanan</span><span style="font-weight:700;" id="receipt-id"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Nama</span><span style="font-weight:700;" id="receipt-nama"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">No. Telp</span><span style="font-weight:700;" id="receipt-telp"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Tanggal</span><span style="font-weight:700;" id="receipt-tanggal"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Jumlah Perahu</span><span style="font-weight:700;" id="receipt-perahu"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Sesi Trip</span><span style="font-weight:700;" id="receipt-sesi"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Harga/Kapal</span><span style="font-weight:700;" id="receipt-harga"></span></div>
              <div id="receipt-tambahan-section"></div>
              <div style="border-top:1px dashed var(--outline-variant);padding-top:0.75rem;margin-top:0.25rem;">
                <div style="display:flex;justify-content:space-between;"><span style="font-weight:700;">Total</span><span style="font-weight:800;color:var(--primary);font-size:1rem;" id="receipt-total"></span></div>
              </div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">DP</span><span style="font-weight:700;color:#16a34a;" id="receipt-dp"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Kurang Bayar</span><span style="font-weight:800;color:var(--error);" id="receipt-kurang"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Metode Bayar</span><span style="font-weight:700;" id="receipt-metode"></span></div>
            </div>
            <div style="text-align:center;margin-top:1.25rem;padding-top:1rem;border-top:1px dashed var(--outline-variant);">
              <p style="font-size:0.7rem;color:var(--outline);">Terima kasih telah memilih CitraElo Rafting!</p>
              <p style="font-size:0.65rem;color:var(--outline);margin-top:0.25rem;">— Safe Rivers, Great Adventures —</p>
            </div>
          </div>
          <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
            <button type="button" id="btn-cetak" class="btn btn--gradient" style="flex:2;height:auto;padding:0.875rem;font-size:0.875rem;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">print</span> Cetak Struk
            </button>
            <button type="button" id="btn-tutup" style="flex:1;padding:0.875rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.875rem;">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize Admin Dashboard event handlers
 */
export function initAdminDashboard() {
  // Remove old modal if exists
  document.getElementById('modal-booking')?.remove();

  // Inject modal into body (not page-content) to avoid transform breaking position:fixed
  document.body.insertAdjacentHTML('beforeend', getModalHTML());

  const modal = document.getElementById('modal-booking');
  const formView = document.getElementById('booking-form-view');
  const receiptView = document.getElementById('booking-receipt-view');
  if (!modal) return;

  // ── SESSION TIMER ──
  const sessionStart = Date.now();
  const timerEl = document.getElementById('session-timer');
  if (timerEl) {
    setInterval(() => {
      const diff = Math.floor((Date.now() - sessionStart) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      timerEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  // ── TODAY'S STATS ──
  async function loadTodayStats() {
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
      const pagiEl = document.getElementById('stat-pagi');
      const siangEl = document.getElementById('stat-siang');
      const totalEl = document.getElementById('stat-total');
      const ordersEl = document.getElementById('stat-orders');
      if (pagiEl) pagiEl.textContent = pagi;
      if (siangEl) siangEl.textContent = siang;
      if (totalEl) totalEl.textContent = pagi + siang;
      if (ordersEl) ordersEl.textContent = orders;
    } catch (e) { console.error('Stats error:', e); }
  }
  loadTodayStats();

  // ── CHART ──
  async function loadChart(from, to) {
    try {
      const snap = await getDocs(collection(db, 'bookings'));
      const dateMap = {};
      // Init date range
      const start = new Date(from);
      const end = new Date(to);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        dateMap[key] = { orders: 0, boats: 0 };
      }
      snap.docs.forEach(d => {
        const data = d.data();
        const dt = data.tanggal;
        if (dt && dateMap[dt] !== undefined) {
          dateMap[dt].orders++;
          dateMap[dt].boats += (data.jumlahPerahu || 0);
        }
      });
      drawChart(dateMap);
    } catch (e) { console.error('Chart error:', e); }
  }

  function drawChart(dateMap) {
    const canvas = document.getElementById('chart-orders');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth;
    const H = 200;
    ctx.clearRect(0, 0, W, H);

    const keys = Object.keys(dateMap).sort();
    if (keys.length === 0) return;
    const maxVal = Math.max(1, ...keys.map(k => Math.max(dateMap[k].orders, dateMap[k].boats)));
    const barW = Math.min(20, (W - 40) / keys.length / 2.5);
    const gap = (W - 40) / keys.length;
    const chartH = H - 40;

    // Grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = 10 + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(W, y); ctx.stroke();
    }

    keys.forEach((key, i) => {
      const x = 35 + i * gap;
      const ordersH = (dateMap[key].orders / maxVal) * chartH;
      const boatsH = (dateMap[key].boats / maxVal) * chartH;

      // Orders bar
      ctx.fillStyle = '#003461';
      ctx.beginPath();
      const r = Math.min(3, barW / 2);
      const ox = x; const oy = 10 + chartH - ordersH;
      ctx.moveTo(ox, oy + r); ctx.arcTo(ox, oy, ox + barW, oy, r); ctx.arcTo(ox + barW, oy, ox + barW, oy + ordersH, r);
      ctx.lineTo(ox + barW, 10 + chartH); ctx.lineTo(ox, 10 + chartH); ctx.closePath(); ctx.fill();

      // Boats bar
      ctx.fillStyle = '#ab3600';
      const bx = x + barW + 2; const by = 10 + chartH - boatsH;
      ctx.beginPath();
      ctx.moveTo(bx, by + r); ctx.arcTo(bx, by, bx + barW, by, r); ctx.arcTo(bx + barW, by, bx + barW, by + boatsH, r);
      ctx.lineTo(bx + barW, 10 + chartH); ctx.lineTo(bx, 10 + chartH); ctx.closePath(); ctx.fill();

      // Date label
      ctx.fillStyle = '#666';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      const label = key.slice(5); // MM-DD
      ctx.fillText(label, x + barW, H - 5);

      // Value labels
      ctx.fillStyle = '#003461';
      ctx.font = 'bold 8px sans-serif';
      if (dateMap[key].orders > 0) ctx.fillText(dateMap[key].orders, ox + barW / 2, oy - 3);
      ctx.fillStyle = '#ab3600';
      if (dateMap[key].boats > 0) ctx.fillText(dateMap[key].boats, bx + barW / 2, by - 3);
    });
  }

  // Initial chart load
  const fromEl = document.getElementById('chart-from');
  const toEl = document.getElementById('chart-to');
  if (fromEl && toEl) {
    loadChart(fromEl.value, toEl.value);
    document.getElementById('btn-chart-filter')?.addEventListener('click', () => {
      loadChart(fromEl.value, toEl.value);
    });
  }

  // State
  let selectedSesi = 'Pagi';
  let selectedMetode = 'Cash';
  let savedBooking = null;

  // Generate ID
  function generateOrderId() {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 9000) + 1000);
    return `CE-${y}${m}${d}-${rand}`;
  }

  // Format Rupiah
  function formatRp(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  }

  // Load rafting types into combobox
  let raftingTypes = [];
  const typeSelect = document.getElementById('field-rafting-type');
  async function populateRaftingTypes() {
    raftingTypes = await loadRaftingTypes();
    if (typeSelect) {
      typeSelect.innerHTML = '<option value="">-- Pilih Tipe Rafting --</option>' +
        raftingTypes.map(t => `<option value="${t.id}" data-price="${t.price}">${t.name} — ${formatRp(t.price)}</option>`).join('');
    }
  }
  populateRaftingTypes();

  // Auto-fill price on type change
  typeSelect?.addEventListener('change', () => {
    const selected = typeSelect.options[typeSelect.selectedIndex];
    const price = selected?.dataset?.price || 0;
    const hargaEl = document.getElementById('field-harga');
    if (hargaEl) {
      hargaEl.value = price;
      // Trigger recalculate
      hargaEl.dispatchEvent(new Event('input'));
    }
  });

  // Open modal
  document.getElementById('btn-tambah-tamu')?.addEventListener('click', () => {
    formView.style.display = 'block';
    receiptView.style.display = 'none';
    document.getElementById('form-booking').reset();
    document.getElementById('field-id-pesanan').value = generateOrderId();
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('field-tanggal').value = today;
    document.getElementById('field-total').textContent = 'Rp 0';
    document.getElementById('field-kurang-bayar').textContent = 'Rp 0';
    selectedSesi = 'Pagi';
    selectedMetode = 'Cash';
    document.getElementById('sesi-pagi')?.classList.add('active');
    document.getElementById('sesi-siang')?.classList.remove('active');
    document.getElementById('metode-cash')?.classList.add('active');
    document.getElementById('metode-transfer')?.classList.remove('active');
    // Reset tambahan
    const tc = document.getElementById('tambahan-container');
    tc.innerHTML = '';
    tc.style.display = 'none';
    document.getElementById('tambahan-total-row').style.display = 'none';
    document.getElementById('field-tambahan-total').textContent = 'Rp 0';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('btn-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-batal')?.addEventListener('click', closeModal);
  document.getElementById('btn-receipt-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-tutup')?.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Sesi toggle
  document.getElementById('sesi-pagi')?.addEventListener('click', () => {
    selectedSesi = 'Pagi';
    document.getElementById('sesi-pagi').classList.add('active');
    document.getElementById('sesi-siang').classList.remove('active');
  });
  document.getElementById('sesi-siang')?.addEventListener('click', () => {
    selectedSesi = 'Siang';
    document.getElementById('sesi-siang').classList.add('active');
    document.getElementById('sesi-pagi').classList.remove('active');
  });

  // Metode toggle
  document.getElementById('metode-cash')?.addEventListener('click', () => {
    selectedMetode = 'Cash';
    document.getElementById('metode-cash').classList.add('active');
    document.getElementById('metode-transfer').classList.remove('active');
  });
  document.getElementById('metode-transfer')?.addEventListener('click', () => {
    selectedMetode = 'Transfer';
    document.getElementById('metode-transfer').classList.add('active');
    document.getElementById('metode-cash').classList.remove('active');
  });

  // Auto-calculate total & kurang bayar
  const jumlahEl = document.getElementById('field-jumlah-perahu');
  const hargaEl = document.getElementById('field-harga');
  const dpEl = document.getElementById('field-dp');
  const totalEl = document.getElementById('field-total');
  const kurangEl = document.getElementById('field-kurang-bayar');

  function getTambahanTotal() {
    let sum = 0;
    document.querySelectorAll('.tambahan-row').forEach(row => {
      const qty = parseInt(row.querySelector('.tambahan-qty')?.value) || 0;
      const price = parseInt(row.querySelector('.tambahan-price')?.value) || 0;
      sum += qty * price;
    });
    const ttEl = document.getElementById('field-tambahan-total');
    if (ttEl) ttEl.textContent = formatRp(sum);
    return sum;
  }

  function recalculate() {
    const jumlah = parseInt(jumlahEl?.value) || 0;
    const harga = parseInt(hargaEl?.value) || 0;
    const dp = parseInt(dpEl?.value) || 0;
    const tambahanTotal = getTambahanTotal();
    const total = (jumlah * harga) + tambahanTotal;
    const kurang = Math.max(0, total - dp);
    if (totalEl) totalEl.textContent = formatRp(total);
    if (kurangEl) kurangEl.textContent = formatRp(kurang);
  }

  jumlahEl?.addEventListener('input', recalculate);
  hargaEl?.addEventListener('input', recalculate);
  dpEl?.addEventListener('input', recalculate);

  // Tambahan button — load extras types and use combobox
  let tambahanCount = 0;
  let extraTypes = [];
  loadTambahanTypes().then(types => { extraTypes = types; });

  document.getElementById('btn-tambahan')?.addEventListener('click', () => {
    const container = document.getElementById('tambahan-container');
    container.style.display = 'flex';
    document.getElementById('tambahan-total-row').style.display = 'flex';
    tambahanCount++;
    const row = document.createElement('div');
    row.className = 'tambahan-row';
    row.style.cssText = 'display:flex;gap:0.5rem;align-items:flex-end;';

    const options = extraTypes.map(t => `<option value="${t.name}" data-price="${t.price}">${t.name} — ${formatRp(t.price)}</option>`).join('');

    row.innerHTML = `
      <div style="flex:3;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">JENIS</label>
        <select class="input-field tambahan-jenis" style="padding-left:0.5rem;height:2.5rem;font-size:0.75rem;appearance:auto;cursor:pointer;">
          <option value="">-- Pilih --</option>
          ${options}
        </select>
      </div>
      <div style="flex:1;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">JML</label>
        <input type="number" class="input-field tambahan-qty" placeholder="0" min="1" value="1" style="padding-left:0.5rem;height:2.5rem;font-size:0.8125rem;">
      </div>
      <div style="flex:1.5;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">HARGA</label>
        <input type="number" class="input-field tambahan-price" placeholder="0" min="0" readonly style="padding-left:0.5rem;height:2.5rem;font-size:0.8125rem;background:var(--surface-container-low);color:var(--outline);font-weight:700;">
      </div>
      <button type="button" class="tambahan-remove" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--error-container);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--error);flex-shrink:0;">
        <span class="material-symbols-outlined" style="font-size:1.125rem;">close</span>
      </button>
    `;
    container.appendChild(row);

    // Auto-fill price on jenis change
    const jenisSelect = row.querySelector('.tambahan-jenis');
    const priceInput = row.querySelector('.tambahan-price');
    jenisSelect.addEventListener('change', () => {
      const opt = jenisSelect.options[jenisSelect.selectedIndex];
      priceInput.value = opt?.dataset?.price || 0;
      recalculate();
    });

    row.querySelector('.tambahan-qty').addEventListener('input', recalculate);
    row.querySelector('.tambahan-remove').addEventListener('click', () => {
      row.remove();
      recalculate();
      if (!document.querySelectorAll('.tambahan-row').length) {
        container.style.display = 'none';
        document.getElementById('tambahan-total-row').style.display = 'none';
      }
    });
    recalculate();
  });

  // Form submit
  document.getElementById('form-booking')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-simpan');
    btn.innerHTML = '<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;"></div> Menyimpan...';
    btn.disabled = true;

    const jumlah = parseInt(jumlahEl.value) || 0;
    const harga = parseInt(hargaEl.value) || 0;
    const dp = parseInt(dpEl.value) || 0;
    const tambahanTotal = getTambahanTotal();
    const total = (jumlah * harga) + tambahanTotal;
    const kurang = Math.max(0, total - dp);

    // Collect tambahan items
    const tambahanItems = [];
    document.querySelectorAll('.tambahan-row').forEach(row => {
      const jenis = row.querySelector('.tambahan-jenis')?.value || '';
      const qty = parseInt(row.querySelector('.tambahan-qty')?.value) || 0;
      const price = parseInt(row.querySelector('.tambahan-price')?.value) || 0;
      if (jenis && qty && price) tambahanItems.push({ jenis, qty, harga: price, subtotal: qty * price });
    });

    savedBooking = {
      idPesanan: document.getElementById('field-id-pesanan').value,
      nama: document.getElementById('field-nama').value,
      telp: document.getElementById('field-telp').value,
      tanggal: document.getElementById('field-tanggal').value,
      raftingType: typeSelect?.options[typeSelect.selectedIndex]?.text || '',
      jumlahPerahu: jumlah,
      sesiTrip: selectedSesi,
      hargaPerKapal: harga,
      tambahan: tambahanItems,
      tambahanTotal: tambahanTotal,
      totalPesanan: total,
      dp: dp,
      kurangBayar: kurang,
      metodeBayar: selectedMetode,
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...savedBooking,
        createdAt: serverTimestamp(),
        status: dp >= total ? 'paid' : 'pending'
      });

      // Show receipt
      showReceipt(savedBooking);
    } catch (error) {
      console.error('Save error:', error);
      alert('Gagal menyimpan: ' + error.message);
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.125rem;">save</span> Simpan Pesanan';
      btn.disabled = false;
    }
  });

  // Show receipt view
  function showReceipt(data) {
    formView.style.display = 'none';
    receiptView.style.display = 'block';

    const now = new Date();
    document.getElementById('receipt-date').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('receipt-id').textContent = data.idPesanan;
    document.getElementById('receipt-nama').textContent = data.nama;
    document.getElementById('receipt-telp').textContent = data.telp;
    document.getElementById('receipt-tanggal').textContent = new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('receipt-perahu').textContent = data.jumlahPerahu + ' kapal';
    document.getElementById('receipt-sesi').textContent = data.sesiTrip;
    document.getElementById('receipt-harga').textContent = formatRp(data.hargaPerKapal);
    document.getElementById('receipt-total').textContent = formatRp(data.totalPesanan);
    document.getElementById('receipt-dp').textContent = formatRp(data.dp);
    document.getElementById('receipt-kurang').textContent = formatRp(data.kurangBayar);
    document.getElementById('receipt-metode').textContent = data.metodeBayar;

    // Render tambahan in receipt
    const tSec = document.getElementById('receipt-tambahan-section');
    if (data.tambahan && data.tambahan.length > 0) {
      let html = '<div style="border-top:1px dashed var(--outline-variant);padding-top:0.5rem;margin-top:0.25rem;">';
      html += '<div style="font-weight:700;font-size:0.75rem;color:var(--tertiary);margin-bottom:0.375rem;">TAMBAHAN</div>';
      data.tambahan.forEach(t => {
        html += `<div style="display:flex;justify-content:space-between;padding:2px 0;"><span style="color:var(--outline);">${t.jenis} (${t.qty}x)</span><span style="font-weight:700;">${formatRp(t.subtotal)}</span></div>`;
      });
      html += '</div>';
      tSec.innerHTML = html;
    } else {
      tSec.innerHTML = '';
    }
  }

  // Print receipt (Bluetooth / browser print)
  document.getElementById('btn-cetak')?.addEventListener('click', () => {
    const receiptEl = document.getElementById('receipt-content');
    if (!receiptEl) return;

    // Create print window
    const printWindow = window.open('', '_blank', 'width=380,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Struk - ${savedBooking?.idPesanan || ''}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body {
            font-family: 'Courier New', monospace;
            padding: 12px;
            max-width: 380px;
            margin: 0 auto;
            font-size: 13px;
            color: #1a1a1a;
          }
          .center { text-align:center; }
          .bold { font-weight:bold; }
          .divider { border-top:1px dashed #999; margin:10px 0; }
          .row { display:flex; justify-content:space-between; padding:3px 0; }
          .title { font-size:18px; font-weight:900; letter-spacing:1px; }
          .total-row { font-size:15px; font-weight:900; }
          .footer { font-size:10px; color:#666; margin-top:12px; }
          @media print {
            body { padding: 0; }
            .no-print { display:none; }
          }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="title">CITRAELO RAFTING</div>
          <div style="font-size:11px;color:#666;margin-top:4px;">Struk Pemesanan</div>
          <div style="font-size:11px;color:#666;">${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div class="divider"></div>
        <div class="row"><span>ID Pesanan</span><span class="bold">${savedBooking?.idPesanan || ''}</span></div>
        <div class="row"><span>Nama</span><span class="bold">${savedBooking?.nama || ''}</span></div>
        <div class="row"><span>No. Telp</span><span class="bold">${savedBooking?.telp || ''}</span></div>
        <div class="row"><span>Tanggal</span><span class="bold">${savedBooking?.tanggal ? new Date(savedBooking.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span></div>
        <div class="row"><span>Jml Perahu</span><span class="bold">${savedBooking?.jumlahPerahu || 0} kapal</span></div>
        <div class="row"><span>Sesi Trip</span><span class="bold">${savedBooking?.sesiTrip || ''}</span></div>
        <div class="row"><span>Harga/Kapal</span><span class="bold">${formatRp(savedBooking?.hargaPerKapal)}</span></div>
        ${(savedBooking?.tambahan && savedBooking.tambahan.length > 0) ? `
        <div class="divider"></div>
        <div style="font-weight:bold;font-size:12px;">TAMBAHAN</div>
        ${savedBooking.tambahan.map(t => `<div class="row"><span>${t.jenis} (${t.qty}x)</span><span class="bold">${formatRp(t.subtotal)}</span></div>`).join('')}
        ` : ''}
        <div class="divider"></div>
        <div class="row total-row"><span>TOTAL</span><span>${formatRp(savedBooking?.totalPesanan)}</span></div>
        <div class="row"><span>DP</span><span class="bold" style="color:green;">${formatRp(savedBooking?.dp)}</span></div>
        <div class="row"><span>Kurang Bayar</span><span class="bold" style="color:red;">${formatRp(savedBooking?.kurangBayar)}</span></div>
        <div class="row"><span>Metode</span><span class="bold">${savedBooking?.metodeBayar || ''}</span></div>
        <div class="divider"></div>
        <div class="center footer">
          <div>Terima kasih telah memilih CitraElo Rafting!</div>
          <div>— Safe Rivers, Great Adventures —</div>
        </div>
        <div class="center no-print" style="margin-top:20px;">
          <button onclick="window.print()" style="padding:10px 32px;font-size:14px;font-weight:bold;background:#003461;color:white;border:none;border-radius:999px;cursor:pointer;">
            🖨️ Print
          </button>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();

    // Auto-trigger print after load
    printWindow.onload = () => {
      setTimeout(() => printWindow.print(), 300);
    };
  });
}
