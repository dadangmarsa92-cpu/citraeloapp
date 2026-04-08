/**
 * Admin Dashboard Page — CitraElo Rafting
 */
import { db } from '../firebase/config.js';
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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
            <span class="material-symbols-outlined" style="font-size:0.875rem;">schedule</span> <span id="current-clock">00:00:00</span>
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


      <!-- Data Tamu Section -->
      <section style="margin-top:0.5rem;padding-bottom:2rem;">
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.75rem;">Data Tamu</h3>
        <div style="margin-bottom:1rem;">
          <div style="flex:1;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">TANGGAL KUNJUNGAN</label>
            <input type="date" id="tamu-date" class="input-field" value="${today}" style="padding-left:0.75rem;height:2.25rem;font-size:0.75rem;">
          </div>
        </div>
        <!-- TABS & PRINT BUTTON -->
        <!-- TABS & PRINT BUTTON -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.75rem;">
          <div class="role-toggle" style="margin-bottom:0; flex:1; display:flex;">
            <button type="button" class="role-toggle__btn active" id="tab-pagi" style="cursor:pointer; flex:1; justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">wb_sunny</span> Pagi
            </button>
            <button type="button" class="role-toggle__btn" id="tab-siang" style="cursor:pointer; flex:1; justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">wb_twilight</span> Siang
            </button>
          </div>
          
          <button id="btn-cetak-manifest-bt" style="height:2.5rem;padding:0 1.25rem;background:var(--tertiary-container);color:var(--on-tertiary-container);border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.8125rem;display:flex;align-items:center;gap:0.5rem;box-shadow:0 4px 12px rgba(0,0,0,0.05);transition:background 0.2s;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">bluetooth</span> Cetak Daftar Tamu
          </button>
        </div>

        <div id="tamu-list-pagi-container" style="display:block;">
           <div id="tamu-list-pagi" style="display:flex;flex-direction:column;gap:0.75rem;">
             <div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Memuat data...</div>
           </div>
        </div>
        <div id="tamu-list-siang-container" style="display:none;">
           <div id="tamu-list-siang" style="display:flex;flex-direction:column;gap:0.75rem;">
             <div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Memuat data...</div>
           </div>
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
              <h2 id="modal-booking-title" class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">Tambah Tamu</h2>
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
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TIPE PEMBAYARAN <span style="color:var(--error);">*</span></label>
              <div class="role-toggle" style="margin-top:0.25rem;margin-bottom:0.75rem;">
                <button type="button" class="role-toggle__btn active" data-tipe="DP" id="tipe-dp">
                  <span class="material-symbols-outlined" style="font-size:1rem;">payments</span> DP
                </button>
                <button type="button" class="role-toggle__btn" data-tipe="Lunas" id="tipe-lunas">
                  <span class="material-symbols-outlined" style="font-size:1rem;">check_circle</span> Bayar Penuh
                </button>
              </div>
            </div>
            <div id="container-dp">
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">DP (Rp) <span style="color:var(--error);">*</span></label>
              <input type="text" id="field-dp" class="input-field" placeholder="0" required>
            </div>
            <div id="container-kurang-bayar">
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
          <div style="display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap;">
            <button type="button" id="btn-cetak-bt" style="flex:1;min-width:140px;height:auto;padding:0.875rem;font-size:0.875rem;background:var(--tertiary-container);color:var(--on-tertiary-container);border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;display:flex;align-items:center;justify-content:center;gap:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">bluetooth</span> Bluetooth Thermal
            </button>
            <button type="button" id="btn-cetak" class="btn btn--gradient" style="flex:1;min-width:140px;height:auto;padding:0.875rem;font-size:0.875rem;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">print</span> Cetak Struk (PDF)
            </button>
            <button type="button" id="btn-tutup" style="flex:1;min-width:100px;padding:0.875rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.875rem;">Tutup</button>
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

  // ── CURRENT CLOCK ──
  const clockEl = document.getElementById('current-clock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s}`;
    };
    updateClock(); // set immediately
    setInterval(updateClock, 1000);
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


  // State
  let selectedSesi = 'Pagi';
  let selectedMetode = 'Cash';
  let selectedTipeBayar = 'DP';
  let savedBooking = null;
  let currentEditId = null;
  let currentDailyBookings = [];

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

  // Open modal for new booking
  document.getElementById('btn-tambah-tamu')?.addEventListener('click', () => {
    currentEditId = null;
    document.getElementById('modal-booking-title').textContent = 'Tambah Tamu';
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
    selectedTipeBayar = 'DP';
    document.getElementById('sesi-pagi')?.classList.add('active');
    document.getElementById('sesi-siang')?.classList.remove('active');
    document.getElementById('metode-cash')?.classList.add('active');
    document.getElementById('metode-transfer')?.classList.remove('active');
    document.getElementById('tipe-dp')?.classList.add('active');
    document.getElementById('tipe-lunas')?.classList.remove('active');
    if(document.getElementById('container-dp')) document.getElementById('container-dp').style.display = 'block';
    if(document.getElementById('container-kurang-bayar')) document.getElementById('container-kurang-bayar').style.display = 'block';
    if(document.getElementById('field-dp')) {
      document.getElementById('field-dp').required = true;
      document.getElementById('field-dp').value = '';
    }
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

  // Tipe Bayar toggle
  document.getElementById('tipe-dp')?.addEventListener('click', () => {
    selectedTipeBayar = 'DP';
    document.getElementById('tipe-dp').classList.add('active');
    document.getElementById('tipe-lunas').classList.remove('active');
    document.getElementById('container-dp').style.display = 'block';
    document.getElementById('container-kurang-bayar').style.display = 'block';
    document.getElementById('field-dp').required = true;
    recalculate();
  });
  document.getElementById('tipe-lunas')?.addEventListener('click', () => {
    selectedTipeBayar = 'Lunas';
    document.getElementById('tipe-lunas').classList.add('active');
    document.getElementById('tipe-dp').classList.remove('active');
    document.getElementById('container-dp').style.display = 'none';
    document.getElementById('container-kurang-bayar').style.display = 'none';
    document.getElementById('field-dp').required = false;
    document.getElementById('field-dp').value = '';
    recalculate();
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
    const tambahanTotal = getTambahanTotal();
    const total = (jumlah * harga) + tambahanTotal;
    let dp = parseInt((dpEl?.value || '0').replace(/\./g, '')) || 0;
    let kurang = 0;
    
    if (selectedTipeBayar === 'Lunas') {
      dp = total;
      kurang = 0;
    } else {
      kurang = Math.max(0, total - dp);
    }
    
    if (totalEl) totalEl.textContent = formatRp(total);
    if (kurangEl) kurangEl.textContent = formatRp(kurang);
  }

  jumlahEl?.addEventListener('input', recalculate);
  hargaEl?.addEventListener('input', recalculate);

  // Field validations & formatting
  const namaEl = document.getElementById('field-nama');
  const telpEl = document.getElementById('field-telp');

  namaEl?.addEventListener('input', (e) => {
    e.target.value = e.target.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  });

  telpEl?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });

  dpEl?.addEventListener('input', (e) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw) {
      e.target.value = parseInt(raw, 10).toLocaleString('id-ID');
    } else {
      e.target.value = '';
    }
    recalculate();
  });

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
    const tambahanTotal = getTambahanTotal();
    const total = (jumlah * harga) + tambahanTotal;
    let dp = parseInt(dpEl.value.replace(/\./g, '')) || 0;
    let kurang = 0;
    
    if (selectedTipeBayar === 'Lunas') {
      dp = total;
      kurang = 0;
    } else {
      kurang = Math.max(0, total - dp);
    }

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
      tipePembayaran: selectedTipeBayar,
      dp: dp,
      kurangBayar: kurang,
      metodeBayar: selectedMetode,
    };

    try {
      if (currentEditId) {
        // Update to Firestore
        await updateDoc(doc(db, 'bookings', currentEditId), {
          ...savedBooking,
          updatedAt: serverTimestamp(),
          status: dp >= total ? 'paid' : 'pending'
        });
      } else {
        // Save new to Firestore
        await addDoc(collection(db, 'bookings'), {
          ...savedBooking,
          createdAt: serverTimestamp(),
          status: dp >= total ? 'paid' : 'pending'
        });
      }

      // Refresh list
      loadTamuList();
      loadTodayStats();

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

    if (data.tipePembayaran === 'Lunas') {
      document.getElementById('receipt-dp').parentNode.style.display = 'none';
      document.getElementById('receipt-kurang').parentNode.style.display = 'none';
      let lunasRow = document.getElementById('receipt-lunas-row');
      if (!lunasRow) {
        lunasRow = document.createElement('div');
        lunasRow.id = 'receipt-lunas-row';
        lunasRow.style.display = 'flex';
        lunasRow.style.justifyContent = 'space-between';
        lunasRow.innerHTML = `<span style="color:var(--outline);">Status</span><span style="font-weight:700;color:#16a34a;">LUNAS</span>`;
        document.getElementById('receipt-dp').parentNode.parentNode.insertBefore(lunasRow, document.getElementById('receipt-dp').parentNode);
      }
      lunasRow.style.display = 'flex';
    } else {
      document.getElementById('receipt-dp').parentNode.style.display = 'flex';
      document.getElementById('receipt-kurang').parentNode.style.display = 'flex';
      let lunasRow = document.getElementById('receipt-lunas-row');
      if (lunasRow) lunasRow.style.display = 'none';
    }

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
        ${savedBooking?.tipePembayaran === 'Lunas' ? 
        `<div class="row"><span>Status</span><span class="bold" style="color:green;">LUNAS</span></div>` : 
        `<div class="row"><span>DP</span><span class="bold" style="color:green;">${formatRp(savedBooking?.dp)}</span></div>
        <div class="row"><span>Kurang Bayar</span><span class="bold" style="color:red;">${formatRp(savedBooking?.kurangBayar)}</span></div>`
        }
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

  // ── CUSTOM DELETE CONFIRMATION ──
  function showDashboardDeleteConfirm(booking) {
    if (document.getElementById('delete-confirm-overlay')) return;

    const html = `
      <div id="delete-confirm-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1.5rem;animation:fadeIn 0.2s ease;">
        <div style="background:white;border-radius:var(--radius-xl);width:100%;max-width:320px;padding:1.5rem;box-shadow:0 10px 25px -5px rgba(0,0,0,0.2);transform-origin:center;animation:scaleIn 0.2s ease;">
          <div style="width:3rem;height:3rem;border-radius:50%;background:var(--error-container);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
            <span class="material-symbols-outlined" style="color:var(--error);font-size:1.5rem;">warning</span>
          </div>
          <h3 class="font-headline" style="text-align:center;font-size:1.25rem;font-weight:700;color:var(--on-surface);margin-bottom:0.5rem;">Hapus Pesanan?</h3>
          <p style="text-align:center;font-size:0.8125rem;color:var(--outline);line-height:1.5;margin-bottom:1.5rem;">
            Pesanan atas nama <strong style="color:var(--on-surface);">${booking.nama || '-'}</strong> akan dihapus secara permanen.
          </p>
          <div style="display:flex;gap:0.75rem;">
            <button id="db-delete-cancel" style="flex:1;padding:0.75rem;border:1.5px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--on-surface-variant);cursor:pointer;font-size:0.875rem;transition:all 0.2s;">Batal</button>
            <button id="db-delete-yes" style="flex:1;padding:0.75rem;background:var(--error);color:white;border:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;cursor:pointer;font-size:0.875rem;display:flex;align-items:center;justify-content:center;gap:0.375rem;transition:all 0.2s;">
              <span class="material-symbols-outlined" style="font-size:1rem;">delete</span> Hapus
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    const overlay = document.getElementById('delete-confirm-overlay');

    const closeOverlay = () => {
      overlay.style.animation = 'fadeOut 0.2s ease forwards';
      setTimeout(() => overlay.remove(), 200);
    };

    document.getElementById('db-delete-cancel')?.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });

    document.getElementById('db-delete-yes')?.addEventListener('click', async () => {
      const btn = document.getElementById('db-delete-yes');
      btn.innerHTML = '<div class="spinner" style="width:1.125rem;height:1.125rem;border-width:2px;border-top-color:white;border-color:rgba(255,255,255,0.3);border-top-color:white;"></div>';
      btn.style.pointerEvents = 'none';
      try {
        await deleteDoc(doc(db, 'bookings', booking.id));
        closeOverlay();
        if (typeof loadTamuList === 'function') loadTamuList();
        if (typeof loadTodayStats === 'function') loadTodayStats();
      } catch (err) {
        alert('Gagal menghapus: ' + err.message);
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:1rem;">delete</span> Hapus';
        btn.style.pointerEvents = 'auto';
      }
    });
  }

  // ── DATA TAMU LIST ──
  // Function to attach edit, delete, and print events to dynamically created cards
  function attachTamuEvents() {
    document.querySelectorAll('.btn-tamu-hapus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const payloadStr = e.currentTarget.dataset.payload;
        let booking = { id };
        if (payloadStr) {
          try { booking = JSON.parse(decodeURIComponent(payloadStr)); } catch(err){}
        }
        showDashboardDeleteConfirm(booking);
      });
    });

    document.querySelectorAll('.btn-tamu-cetak').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const payload = e.currentTarget.dataset.payload;
        if (payload) {
          const data = JSON.parse(decodeURIComponent(payload));
          savedBooking = data;
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          showReceipt(data);
        }
      });
    });

    document.querySelectorAll('.btn-tamu-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const payload = e.currentTarget.dataset.payload;
        if (payload) {
          const data = JSON.parse(decodeURIComponent(payload));
          // Populate the modal
          currentEditId = id;
          document.getElementById('modal-booking-title').textContent = 'Edit Tamu';
          formView.style.display = 'block';
          receiptView.style.display = 'none';

          document.getElementById('field-id-pesanan').value = data.idPesanan || '';
          document.getElementById('field-nama').value = data.nama || '';
          document.getElementById('field-telp').value = data.telp || '';
          document.getElementById('field-tanggal').value = data.tanggal || '';
          
          // Select rafting type by text (since save only keeps the text we might need to find option)
          const typeOpts = typeSelect.options;
          for (let i = 0; i < typeOpts.length; i++) {
            if (typeOpts[i].text === data.raftingType) {
              typeSelect.selectedIndex = i;
              break;
            }
          }
          
          document.getElementById('field-jumlah-perahu').value = data.jumlahPerahu || 0;
          document.getElementById('field-harga').value = data.hargaPerKapal || 0;
          document.getElementById('field-dp').value = data.dp || 0;

          // Sesi
          selectedSesi = data.sesiTrip || 'Pagi';
          if (selectedSesi === 'Siang') {
            document.getElementById('sesi-siang').classList.add('active');
            document.getElementById('sesi-pagi').classList.remove('active');
          } else {
            document.getElementById('sesi-pagi').classList.add('active');
            document.getElementById('sesi-siang').classList.remove('active');
          }

          // Metode
          selectedMetode = data.metodeBayar || 'Cash';
          if (selectedMetode === 'Transfer') {
            document.getElementById('metode-transfer').classList.add('active');
            document.getElementById('metode-cash').classList.remove('active');
          } else {
            document.getElementById('metode-cash').classList.add('active');
            document.getElementById('metode-transfer').classList.remove('active');
          }

          // Tambahan
          const tc = document.getElementById('tambahan-container');
          tc.innerHTML = '';
          tambahanCount = 0;
          if (data.tambahan && data.tambahan.length > 0) {
            tc.style.display = 'flex';
            document.getElementById('tambahan-total-row').style.display = 'flex';
            data.tambahan.forEach(t => {
              const btnAddObj = document.getElementById('btn-tambahan');
              // We simulate the click to generate the row, then populate it
              btnAddObj.click();
              const rows = document.querySelectorAll('.tambahan-row');
              const lastRow = rows[rows.length - 1];
              if (lastRow) {
                const jSelect = lastRow.querySelector('.tambahan-jenis');
                if (jSelect) jSelect.value = t.jenis;
                const jQty = lastRow.querySelector('.tambahan-qty');
                if (jQty) jQty.value = t.qty;
                const jPrice = lastRow.querySelector('.tambahan-price');
                if (jPrice) jPrice.value = t.harga;
              }
            });
          } else {
            tc.style.display = 'none';
            document.getElementById('tambahan-total-row').style.display = 'none';
          }

          recalculate();
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  async function loadTamuList() {
    const listPagi = document.getElementById('tamu-list-pagi');
    const listSiang = document.getElementById('tamu-list-siang');
    const dateInput = document.getElementById('tamu-date');
    if (!listPagi || !listSiang || !dateInput) return;

    listPagi.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Memuat data...</div>';
    listSiang.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Memuat data...</div>';

    try {
      const q = query(collection(db, 'bookings'), where('tanggal', '==', dateInput.value));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        listPagi.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Belum ada tamu di sesi ini.</div>';
        listSiang.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Belum ada tamu di sesi ini.</div>';
        return;
      }

      // Sort in memory by createdAt descending
      const bookings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      bookings.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      currentDailyBookings = bookings;

      const pagiBookings = bookings.filter(b => b.sesiTrip === 'Pagi');
      const siangBookings = bookings.filter(b => b.sesiTrip === 'Siang');

      function generateHtml(arr) {
        if (arr.length === 0) return '<div style="padding:2rem;text-align:center;color:var(--outline);font-size:0.8125rem;">Belum ada tamu di sesi ini.</div>';
        
        let html = '';
        arr.forEach(b => {
          const dpStatusColor = b.kurangBayar > 0 ? 'var(--error)' : '#16a34a';
          const dpStatusText = b.kurangBayar > 0 ? formatRp(b.dp) + ' (Hutang)' : 'LUNAS';
          const safePayload = encodeURIComponent(JSON.stringify(b));

          html += `
            <div style="background:white;border:1px solid var(--outline-variant);border-radius:var(--radius-xl);padding:1rem;display:flex;flex-direction:column;gap:0.75rem;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="font-size:0.65rem;color:var(--outline);font-weight:700;letter-spacing:0.05em;margin-bottom:0.125rem;">${b.idPesanan}</div>
                  <div style="font-weight:800;color:var(--on-surface);font-size:1rem;">${b.nama}</div>
                  <div style="font-size:0.75rem;color:var(--outline);margin-top:0.125rem;"><span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:middle;">call</span> ${b.telp}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.75rem;color:var(--on-surface-variant);font-weight:700;margin-top:0.25rem;">${b.jumlahPerahu} Kapal</div>
                </div>
              </div>
              
              <div style="background:var(--surface-container-low);border-radius:var(--radius-md);padding:0.625rem;display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.75rem;">
                <div>
                  <div style="color:var(--outline);font-size:0.65rem;">PAKET</div>
                  <div style="font-weight:700;">${b.raftingType}</div>
                </div>
                <div>
                  <div style="color:var(--outline);font-size:0.65rem;">BIAYA</div>
                  <div style="font-weight:800;color:var(--primary);">${formatRp(b.totalPesanan)}</div>
                </div>
                <div style="grid-column: span 2;">
                  <div style="color:var(--outline);font-size:0.65rem;">PEMBAYARAN</div>
                  <div style="font-weight:700;color:${dpStatusColor};">${dpStatusText}</div>
                </div>
              </div>
              
              <div style="display:flex;gap:0.5rem;margin-top:0.25rem;align-items:center;">
                <button class="btn-tamu-edit" data-id="${b.id}" data-payload="${safePayload}" style="flex:1;padding:0.5rem;background:white;border:1px solid var(--outline);color:var(--outline);border-radius:var(--radius-full);font-size:0.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:0.25rem;cursor:pointer;">
                  <span class="material-symbols-outlined" style="font-size:1rem;">edit</span> Edit
                </button>
                <button class="btn-tamu-cetak" data-payload="${safePayload}" style="flex:1;padding:0.5rem;background:var(--primary);border:none;color:white;border-radius:var(--radius-full);font-size:0.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:0.25rem;cursor:pointer;">
                  <span class="material-symbols-outlined" style="font-size:1rem;">print</span> Cetak
                </button>
                <button class="btn-tamu-hapus" data-id="${b.id}" data-payload="${safePayload}" style="width:2.25rem;height:2.25rem;padding:0;background:var(--error-container);border:none;color:var(--error);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">
                  <span class="material-symbols-outlined" style="font-size:1.125rem;">delete</span>
                </button>
              </div>
            </div>
          `;
        });
        return html;
      }

      listPagi.innerHTML = generateHtml(pagiBookings);
      listSiang.innerHTML = generateHtml(siangBookings);

      attachTamuEvents();

    } catch (err) {
      console.error('Error loadTamuList:', err);
      listPagi.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--error);font-size:0.8125rem;">Gagal memuat data.</div>';
      listSiang.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--error);font-size:0.8125rem;">Gagal memuat data.</div>';
    }
  }

  // Bind filter to date change
  document.getElementById('tamu-date')?.addEventListener('change', loadTamuList);
  
  // Tab handling
  const tabPagiBtn = document.getElementById('tab-pagi');
  const tabSiangBtn = document.getElementById('tab-siang');
  const containerPagi = document.getElementById('tamu-list-pagi-container');
  const containerSiang = document.getElementById('tamu-list-siang-container');

  if (tabPagiBtn) {
    tabPagiBtn.addEventListener('click', () => {
      tabPagiBtn.classList.add('active');
      tabSiangBtn.classList.remove('active');
      containerPagi.style.display = 'block';
      containerSiang.style.display = 'none';
      
      // Animate entry
      containerPagi.style.animation = 'scaleIn 0.25s ease forwards';
    });
  }

  if (tabSiangBtn) {
    tabSiangBtn.addEventListener('click', () => {
      tabSiangBtn.classList.add('active');
      tabPagiBtn.classList.remove('active');
      containerSiang.style.display = 'block';
      containerPagi.style.display = 'none';
      
      // Animate entry
      containerSiang.style.animation = 'scaleIn 0.25s ease forwards';
    });
  }

  // Initial load
  loadTamuList();

  // Direct Bluetooth Thermal Print (Web Bluetooth API)
  document.getElementById('btn-cetak-bt')?.addEventListener('click', async () => {
    if (!navigator.bluetooth) {
      alert('Browser ini tidak mendukung Web Bluetooth. Gunakan Chrome di Android/PC.');
      return;
    }

    try {
      const btnBt = document.getElementById('btn-cetak-bt');
      const originalText = btnBt.innerHTML;
      btnBt.innerHTML = '<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;border-color:var(--on-tertiary-container);border-bottom-color:transparent;"></div> Menghubungkan...';
      btnBt.disabled = true;

      // Request BT device
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2']
      }).catch(err => {
        // Fallback filter if the specific receipt printer service doesn't match
        return navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2']
        });
      });

      const server = await device.gatt.connect();
      
      // Get primary service (common for thermal printers)
      const serviceUUIDs = ['000018f0-0000-1000-8000-00805f9b34fb', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2'];
      let service = null;
      for (const uuid of serviceUUIDs) {
        try {
          service = await server.getPrimaryService(uuid);
          if (service) break;
        } catch (e) { /* ignore and try next */ }
      }
      
      if (!service) {
        throw new Error("Layanan printer tidak ditemukan.");
      }

      // Get characteristic for writing
      const characteristics = await service.getCharacteristics();
      const writeChar = characteristics.find(c => c.properties.write || c.properties.writeWithoutResponse);

      if (!writeChar) {
        throw new Error("Karakteristik penulisan data tidak ditemukan.");
      }

      // Build ESC/POS payload
      const encoder = new TextEncoder();
      let payload = new Uint8Array();

      function append(bytes) {
        const temp = new Uint8Array(payload.length + bytes.length);
        temp.set(payload);
        temp.set(bytes, payload.length);
        payload = temp;
      }
      
      function addText(text) { append(encoder.encode(text)); }

      const ESC = 0x1B;
      const GS = 0x1D;

      // INIT
      append([ESC, 0x40]); 
      
      // HEADER
      append([ESC, 0x61, 0x01]); // Align Center
      append([ESC, 0x21, 0x08]); // Bold
      addText("CITRAELO RAFTING\n");
      append([ESC, 0x21, 0x00]); // Normal
      addText("Struk Pemesanan\n");
      addText(`${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}\n`);
      addText("--------------------------------\n"); // 32 chars width (58mm)
      
      // BODY
      append([ESC, 0x61, 0x00]); // Align Left

      // Helper for key-value layout
      function addKv(k, v) {
        const width = 32;
        let strK = (k || "").substring(0, 15);
        let strV = (v || "").toString().substring(0, 16);
        let spaces = width - strK.length - strV.length;
        if (spaces < 1) spaces = 1;
        addText(strK + " ".repeat(spaces) + strV + "\n");
      }

      addKv("ID Pesanan", savedBooking?.idPesanan);
      addKv("Nama", savedBooking?.nama);
      addKv("No.Telp", savedBooking?.telp);
      const bookingDate = savedBooking?.tanggal ? new Date(savedBooking.tanggal).toLocaleDateString('id-ID') : '';
      addKv("Tanggal", bookingDate);
      addKv("Jml Perahu", `${savedBooking?.jumlahPerahu} kapal`);
      addKv("Sesi", savedBooking?.sesiTrip);
      addKv("Harga/Kpl", formatRp(savedBooking?.hargaPerKapal));
      
      if (savedBooking?.tambahan && savedBooking.tambahan.length > 0) {
        addText("--------------------------------\n");
        append([ESC, 0x21, 0x08]); // Bold
        addText("TAMBAHAN\n");
        append([ESC, 0x21, 0x00]); // Normal
        savedBooking.tambahan.forEach(t => {
          addKv(`${t.jenis} (${t.qty}x)`, formatRp(t.subtotal));
        });
      }

      // FOOTER
      addText("--------------------------------\n");
      append([ESC, 0x21, 0x08]); // Bold
      addKv("TOTAL", formatRp(savedBooking?.totalPesanan));
      append([ESC, 0x21, 0x00]); // Normal
      
      addKv("DP", formatRp(savedBooking?.dp));
      addKv("Kurang", formatRp(savedBooking?.kurangBayar));
      addKv("Metode", savedBooking?.metodeBayar);

      addText("\n");
      append([ESC, 0x61, 0x01]); // Align Center
      addText("Terima kasih telah memilih\nCitraElo Rafting!\n");
      addText("- Safe Rivers, Great Adventures -\n");
      addText("\n\n\n\n"); // Feed paper

      // Send in chunks (max 512 bytes per write usually requested for BT GATT)
      const chunkSize = 256;
      for (let i = 0; i < payload.length; i += chunkSize) {
        const chunk = payload.slice(i, i + chunkSize);
        await writeChar.writeValue(chunk);
      }

      btnBt.innerHTML = originalText;
      btnBt.disabled = false;
      alert("Cetak berhasil!");

    } catch (e) {
      console.error(e);
      document.getElementById('btn-cetak-bt').innerHTML = '<span class="material-symbols-outlined" style="font-size:1.125rem;">bluetooth</span> Bluetooth Thermal';
      document.getElementById('btn-cetak-bt').disabled = false;
      if (e.name !== 'NotFoundError') {
        alert("Gagal mencetak: " + e.message);
      }
    }
  });

  // Direct Bluetooth Thermal Print for DAFTAR TAMU (MANIFEST)
  document.getElementById('btn-cetak-manifest-bt')?.addEventListener('click', async () => {
    if (!navigator.bluetooth) {
      alert('Browser ini tidak mendukung Web Bluetooth. Gunakan Chrome di Android/PC.');
      return;
    }
    if (!currentDailyBookings || currentDailyBookings.length === 0) {
      alert('Tidak ada data tamu di tanggal ini untuk dicetak.');
      return;
    }

    try {
      const btnBt = document.getElementById('btn-cetak-manifest-bt');
      const originalText = btnBt.innerHTML;
      btnBt.innerHTML = '<div class="spinner" style="width:1.125rem;height:1.125rem;border-width:2px;border-color:var(--on-tertiary-container);border-bottom-color:transparent;"></div> Memproses...';
      btnBt.disabled = true;

      // Request BT device
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2']
      }).catch(err => {
        return navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2']
        });
      });

      const server = await device.gatt.connect();
      
      const serviceUUIDs = ['000018f0-0000-1000-8000-00805f9b34fb', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2'];
      let service = null;
      for (const uuid of serviceUUIDs) {
        try { service = await server.getPrimaryService(uuid); if (service) break; } catch (e) { }
      }
      if (!service) throw new Error("Layanan printer tidak ditemukan.");

      const characteristics = await service.getCharacteristics();
      const writeChar = characteristics.find(c => c.properties.write || c.properties.writeWithoutResponse);
      if (!writeChar) throw new Error("Karakteristik penulisan data tidak ditemukan.");

      const encoder = new TextEncoder();
      let payload = new Uint8Array();
      function append(bytes) { const t = new Uint8Array(payload.length + bytes.length); t.set(payload); t.set(bytes, payload.length); payload = t; }
      function addText(text) { append(encoder.encode(text)); }

      const ESC = 0x1B;
      
      // INIT
      append([ESC, 0x40]); 

      const pagi = currentDailyBookings.filter(b => b.sesiTrip === 'Pagi');
      const siang = currentDailyBookings.filter(b => b.sesiTrip === 'Siang');
      const targetDate = document.getElementById('tamu-date').value;
      const dateStr = new Date(targetDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      // HEADER
      append([ESC, 0x61, 0x01]); // Align Center
      append([ESC, 0x21, 0x08]); // Bold
      addText("CITRAELO RAFTING\n");
      append([ESC, 0x21, 0x00]); // Normal
      addText("Daftar Tamu Harian\n");
      addText(`${dateStr}\n`);
      addText("--------------------------------\n"); // 32 chars length
      
      append([ESC, 0x61, 0x00]); // Align Left

      function formatRow(nama, qty) {
        // total 32 chars width
        const suffix = `${qty} Kapal`;
        const availSpace = 32 - suffix.length - 1; 
        const n = (nama || "").substring(0, availSpace).padEnd(availSpace, ' ');
        return n + " " + suffix + "\n";
      }

      let totalBoatsDaily = 0;
      let totalOrdersDaily = 0;

      function renderSesi(title, arr) {
        if (arr.length === 0) return;
        append([ESC, 0x21, 0x08]); // Bold
        addText(`SESI ${title.toUpperCase()}\n`);
        append([ESC, 0x21, 0x00]); // Normal
        addText("--------------------------------\n");
        
        let sumBoats = 0;
        let ordersSesi = 0;
        arr.forEach(b => {
          addText(formatRow(b.nama, b.jumlahPerahu));
          sumBoats += Number(b.jumlahPerahu);
          ordersSesi++;
          totalOrdersDaily++;
        });
        totalBoatsDaily += sumBoats;
        
        addText("--------------------------------\n");
        addText(`Total Tamu/Grup : ${ordersSesi}\n`);
        addText(`Total Kapal     : ${sumBoats}\n\n`);
      }

      renderSesi('Pagi', pagi);
      renderSesi('Siang', siang);

      // SUMMARY
      append([ESC, 0x21, 0x08]); // Bold
      addText("REKAP KESELURUHAN HARI INI\n");
      append([ESC, 0x21, 0x00]); // Normal
      addText(`TOTAL TAMU/GRUP : ${totalOrdersDaily}\n`);
      addText(`TOTAL KAPAL     : ${totalBoatsDaily}\n`);
      append([ESC, 0x21, 0x00]); // Normal

      addText("\n");
      append([ESC, 0x61, 0x01]); // Align Center
      addText("--- End of Report ---\n");
      addText("\n\n\n\n"); // Feed

      const chunkSize = 256;
      for (let i = 0; i < payload.length; i += chunkSize) {
        await writeChar.writeValue(payload.slice(i, i + chunkSize));
      }

      btnBt.innerHTML = originalText;
      btnBt.disabled = false;
      alert("Cetak Daftar Tamu berhasil!");

    } catch (e) {
      console.error(e);
      document.getElementById('btn-cetak-manifest-bt').innerHTML = '<span class="material-symbols-outlined" style="font-size:1.125rem;">bluetooth</span> Cetak Daftar Tamu';
      document.getElementById('btn-cetak-manifest-bt').disabled = false;
      if (e.name !== 'NotFoundError') alert("Gagal mencetak: " + e.message);
    }
  });

}
