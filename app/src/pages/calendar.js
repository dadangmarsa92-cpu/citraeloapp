/**
 * Jadwal (Calendar) Page — CitraElo Rafting
 * Functional calendar with booking data from Firestore
 */
import { db } from '../firebase/config.js';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { loadRaftingTypes, loadTambahanTypes } from './settings.js';

const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DAYS_ID = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

let currentYear, currentMonth, allBookings = [];
let cachedRaftingTypes = [], cachedTambahanTypes = [];

// ── Format Rupiah ──
function formatRp(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

export function renderCalendar(user) {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;">
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;">
          <div>
            <span class="label-sm" style="color:var(--secondary);letter-spacing:0.05em;">JADWAL PESANAN</span>
            <h1 class="font-headline" style="font-size:1.75rem;font-weight:700;color:var(--primary);letter-spacing:-0.03em;margin-top:0.25rem;" id="cal-title"></h1>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-prev">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-next">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-xl);padding:1rem;box-shadow:var(--shadow-card);">
          <div class="calendar-grid" style="margin-bottom:0.5rem;">
            ${DAYS_ID.map(d => `<div style="text-align:center;font-size:0.6875rem;font-weight:700;color:var(--outline);padding:0.375rem 0;text-transform:uppercase;letter-spacing:0.1em;">${d}</div>`).join('')}
          </div>
          <div class="calendar-grid" id="cal-days"></div>
        </div>
      </section>
      <!-- Booking popup (hidden) -->
      <div id="cal-popup" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;padding:1.5rem;">
        <div style="width:100%;max-width:420px;max-height:80vh;overflow-y:auto;background:var(--surface);border-radius:var(--radius-xl);padding:1.5rem;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 class="font-headline" style="font-size:1.25rem;font-weight:700;color:var(--primary);" id="popup-title"></h3>
            <button id="popup-close" style="width:2rem;height:2rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">close</span>
            </button>
          </div>
          <div id="popup-stats" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem;"></div>
          <div id="popup-content"></div>
        </div>
      </div>
    </div>
  `;
}

function buildCalendar() {
  const container = document.getElementById('cal-days');
  const titleEl = document.getElementById('cal-title');
  if (!container || !titleEl) return;

  titleEl.textContent = `${MONTHS_ID[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Count bookings per day
  const dayCounts = {};
  allBookings.forEach(b => {
    if (!b.tanggal) return;
    const d = new Date(b.tanggal);
    if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
      const day = d.getDate();
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  });

  let html = '';
  // Padding
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day calendar-day--inactive"></div>';
  }
  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === todayDate && currentMonth === todayMonth && currentYear === todayYear;
    const count = dayCounts[d] || 0;
    const hasBooking = count > 0;
    html += `<div class="calendar-day ${isToday ? 'calendar-day--active' : ''} ${hasBooking && !isToday ? 'calendar-day--has-event' : ''}" data-day="${d}" style="cursor:pointer;position:relative;">
      ${d}
      ${hasBooking ? `<span style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:${isToday ? 'white' : 'var(--secondary)'};"></span>` : ''}
    </div>`;
  }
  container.innerHTML = html;

  // Click on days
  container.querySelectorAll('.calendar-day[data-day]').forEach(el => {
    el.addEventListener('click', () => {
      const day = parseInt(el.dataset.day);
      showPopup(day);
    });
  });
}

function showPopup(day) {
  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const bookings = allBookings.filter(b => b.tanggal === dateStr);
  const popup = document.getElementById('cal-popup');
  const titleEl = document.getElementById('popup-title');
  const statsEl = document.getElementById('popup-stats');
  const contentEl = document.getElementById('popup-content');

  titleEl.textContent = `${day} ${MONTHS_ID[currentMonth]} ${currentYear}`;

  // Group by sesi
  const pagi = bookings.filter(b => b.sesiTrip !== 'Siang');
  const siang = bookings.filter(b => b.sesiTrip === 'Siang');
  const totalBoats = bookings.reduce((s, b) => s + (b.jumlahPerahu || 0), 0);

  // Stats
  statsEl.innerHTML = `
    <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.75rem;text-align:center;">
      <div style="font-size:1.5rem;font-weight:800;color:var(--primary);font-family:'Space Grotesk',sans-serif;">${bookings.length}</div>
      <div class="label-xs" style="color:var(--outline);">PEMESAN</div>
    </div>
    <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.75rem;text-align:center;">
      <div style="font-size:1.5rem;font-weight:800;color:var(--secondary);font-family:'Space Grotesk',sans-serif;">${totalBoats}</div>
      <div class="label-xs" style="color:var(--outline);">TOTAL KAPAL</div>
    </div>
  `;

  // Content
  if (bookings.length === 0) {
    contentEl.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--outline);">
      <span class="material-symbols-outlined" style="font-size:2.5rem;opacity:0.3;display:block;margin-bottom:0.5rem;">event_busy</span>
      Tidak ada pesanan pada tanggal ini.
    </div>`;
  } else {
    let html = '';
    if (pagi.length > 0) {
      html += renderSesiGroup('Pagi', pagi);
    }
    if (siang.length > 0) {
      html += renderSesiGroup('Siang', siang);
    }
    contentEl.innerHTML = html;

    // Attach click handlers to each booking row
    contentEl.querySelectorAll('[data-booking-id]').forEach(row => {
      row.addEventListener('click', () => {
        const bookingId = row.dataset.bookingId;
        const booking = allBookings.find(b => b.id === bookingId);
        if (booking) {
          openEditBookingModal(booking);
        }
      });
    });
  }

  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function renderSesiGroup(sesi, bookings) {
  const icon = sesi === 'Pagi' ? 'wb_sunny' : 'wb_twilight';
  const color = sesi === 'Pagi' ? 'var(--primary)' : 'var(--secondary)';
  const totalBoats = bookings.reduce((s, b) => s + (b.jumlahPerahu || 0), 0);

  let html = `
    <div style="margin-bottom:1rem;">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;padding:0.5rem 0.75rem;background:${sesi === 'Pagi' ? 'var(--primary-fixed)' : 'var(--secondary-fixed)'};border-radius:var(--radius-full);">
        <span class="material-symbols-outlined" style="font-size:1rem;color:${color};">${icon}</span>
        <span style="font-weight:700;font-size:0.8125rem;color:${color};">Trip ${sesi}</span>
        <span style="margin-left:auto;font-size:0.75rem;font-weight:700;color:${color};">${totalBoats} kapal</span>
      </div>`;

  bookings.forEach(b => {
    html += `
      <div data-booking-id="${b.id}" style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0.75rem;background:var(--surface-container-low);border-radius:var(--radius-xl);margin-bottom:0.375rem;cursor:pointer;transition:all 0.15s ease;-webkit-tap-highlight-color:transparent;" onmouseenter="this.style.background='var(--surface-container-high)';this.style.transform='scale(1.01)'" onmouseleave="this.style.background='var(--surface-container-low)';this.style.transform='scale(1)'">
        <div style="width:2rem;height:2rem;border-radius:50%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;font-weight:700;flex-shrink:0;">
          ${(b.nama || '?').charAt(0).toUpperCase()}
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-weight:700;font-size:0.8125rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.nama || '-'}</p>
          <p style="font-size:0.6875rem;color:var(--outline);">${b.raftingType || ''}</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.375rem;">
          <div style="text-align:right;flex-shrink:0;">
            <p style="font-weight:800;font-size:0.875rem;color:${color};font-family:'Space Grotesk',sans-serif;">${b.jumlahPerahu || 0}</p>
            <p style="font-size:0.5625rem;color:var(--outline);font-weight:700;">KAPAL</p>
          </div>
          <span class="material-symbols-outlined" style="font-size:1rem;color:var(--outline);opacity:0.5;">chevron_right</span>
        </div>
      </div>`;
  });

  html += '</div>';
  return html;
}

// ══════════════════════════════════════
// Edit Booking Modal
// ══════════════════════════════════════

function getEditModalHTML(booking) {
  const sesiPagi = (booking.sesiTrip || 'Pagi') !== 'Siang';

  return `
    <div id="edit-booking-overlay" class="modal-overlay" style="align-items:flex-end;">
      <div class="modal-content" style="max-height:92dvh;padding:0;border-radius:var(--radius-xl) var(--radius-xl) 0 0;overflow-y:auto;">
        
        <!-- Handle -->
        <div style="display:flex;justify-content:center;padding:0.75rem 0 0;">
          <div style="width:2.5rem;height:0.25rem;border-radius:var(--radius-full);background:var(--outline-variant);"></div>
        </div>

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1.5rem 1rem;">
          <div style="display:flex;align-items:center;gap:0.625rem;">
            <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-container));color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;">
              ${(booking.nama || '?').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);line-height:1.2;">Edit Pesanan</h3>
              <p style="font-size:0.6875rem;color:var(--outline);">Ubah data tamu</p>
            </div>
          </div>
          <button id="edit-booking-close" style="width:2.25rem;height:2.25rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">close</span>
          </button>
        </div>

        <div style="height:1px;background:var(--outline-variant);opacity:0.3;"></div>

        <!-- Form -->
        <form id="edit-booking-form" style="padding:1.25rem 1.5rem 0;display:flex;flex-direction:column;gap:1.125rem;">
          <input type="hidden" id="edit-booking-id" value="${booking.id}">

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">person</span> NAMA PEMESAN <span style="color:var(--error);">*</span>
            </label>
            <input type="text" id="edit-field-nama" class="input-field" value="${booking.nama || ''}" placeholder="Masukkan nama" required style="padding-left:1rem;height:3rem;">
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">call</span> NO. TELP
            </label>
            <input type="tel" id="edit-field-telp" class="input-field" value="${booking.telp || booking.noTelp || ''}" placeholder="08xxxxxxxxxx" style="padding-left:1rem;height:3rem;">
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">calendar_today</span> TANGGAL <span style="color:var(--error);">*</span>
            </label>
            <input type="date" id="edit-field-tanggal" class="input-field" value="${booking.tanggal || ''}" required style="padding-left:1rem;height:3rem;">
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">kayaking</span> TIPE RAFTING <span style="color:var(--error);">*</span>
            </label>
            <select id="edit-field-rafting-type" class="input-field" required style="padding-left:1rem;height:3rem;appearance:auto;cursor:pointer;">
              <option value="">-- Pilih Tipe Rafting --</option>
            </select>
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">directions_boat</span> JUMLAH PERAHU <span style="color:var(--error);">*</span>
            </label>
            <input type="number" id="edit-field-jumlah-perahu" class="input-field" value="${booking.jumlahPerahu || ''}" placeholder="0" min="1" required style="padding-left:1rem;height:3rem;">
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">schedule</span> SESI TRIP <span style="color:var(--error);">*</span>
            </label>
            <div class="role-toggle" style="margin-top:0.25rem;">
              <button type="button" class="role-toggle__btn ${sesiPagi ? 'active' : ''}" data-sesi="Pagi" id="edit-sesi-pagi">
                <span class="material-symbols-outlined" style="font-size:1rem;">wb_sunny</span> Pagi
              </button>
              <button type="button" class="role-toggle__btn ${!sesiPagi ? 'active' : ''}" data-sesi="Siang" id="edit-sesi-siang">
                <span class="material-symbols-outlined" style="font-size:1rem;">wb_twilight</span> Siang
              </button>
            </div>
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.75rem;vertical-align:middle;margin-right:0.125rem;">payments</span> HARGA PER KAPAL (Rp)
            </label>
            <input type="number" id="edit-field-harga" class="input-field" value="${booking.hargaPerKapal || ''}" min="0" readonly style="padding-left:1rem;height:3rem;background:var(--surface-container-low);color:var(--outline);font-weight:700;">
          </div>

          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TOTAL PESANAN</label>
            <div id="edit-field-total" style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.875rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:var(--primary);">Rp 0</div>
          </div>
        </form>

        <!-- Action Buttons -->
        <div style="padding:1.25rem 1.5rem 2rem;display:flex;flex-direction:column;gap:0.625rem;">
          <button id="edit-booking-save" style="width:100%;padding:0.875rem;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);color:white;border:none;border-radius:var(--radius-xl);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.9375rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;box-shadow:0 8px 24px rgba(0,52,97,0.2);transition:all 0.2s;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">save</span> Simpan Perubahan
          </button>
          <button id="edit-booking-delete" style="width:100%;padding:0.875rem;background:var(--error-container);color:var(--on-error-container);border:none;border-radius:var(--radius-xl);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.9375rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:all 0.2s;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">delete</span> Hapus Pesanan
          </button>
        </div>

      </div>
    </div>
  `;
}

function openEditBookingModal(booking) {
  // Remove existing modal if any
  document.getElementById('edit-booking-overlay')?.remove();

  // Inject modal
  document.body.insertAdjacentHTML('beforeend', getEditModalHTML(booking));

  const overlay = document.getElementById('edit-booking-overlay');
  if (!overlay) return;

  let selectedSesi = booking.sesiTrip || 'Pagi';

  // ── Close modal ──
  const closeModal = () => {
    const content = overlay.querySelector('.modal-content');
    if (content) content.style.animation = 'slideDown 0.25s ease forwards';
    overlay.style.animation = 'fadeOut 0.25s ease forwards';
    setTimeout(() => overlay.remove(), 250);
  };

  document.getElementById('edit-booking-close')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // ── Populate rafting type dropdown ──
  const typeSelect = document.getElementById('edit-field-rafting-type');
  if (typeSelect && cachedRaftingTypes.length > 0) {
    typeSelect.innerHTML = '<option value="">-- Pilih Tipe Rafting --</option>' +
      cachedRaftingTypes.map(t =>
        `<option value="${t.name}" data-price="${t.price}" ${(booking.raftingType || '').includes(t.name) ? 'selected' : ''}>${t.name} — ${formatRp(t.price)}</option>`
      ).join('');

    // If no match found, try to match by checking if existing type is in the option text
    if (typeSelect.selectedIndex <= 0 && booking.raftingType) {
      for (let i = 1; i < typeSelect.options.length; i++) {
        if (typeSelect.options[i].text.includes(booking.raftingType)) {
          typeSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // ── Auto-fill price on type change ──
  typeSelect?.addEventListener('change', () => {
    const selected = typeSelect.options[typeSelect.selectedIndex];
    const price = selected?.dataset?.price || 0;
    const hargaEl = document.getElementById('edit-field-harga');
    if (hargaEl) {
      hargaEl.value = price;
      recalculate();
    }
  });

  // ── Sesi toggle ──
  document.getElementById('edit-sesi-pagi')?.addEventListener('click', () => {
    selectedSesi = 'Pagi';
    document.getElementById('edit-sesi-pagi').classList.add('active');
    document.getElementById('edit-sesi-siang').classList.remove('active');
  });
  document.getElementById('edit-sesi-siang')?.addEventListener('click', () => {
    selectedSesi = 'Siang';
    document.getElementById('edit-sesi-siang').classList.add('active');
    document.getElementById('edit-sesi-pagi').classList.remove('active');
  });

  // ── Auto-calculate total ──
  const jumlahEl = document.getElementById('edit-field-jumlah-perahu');
  const hargaEl = document.getElementById('edit-field-harga');
  const totalEl = document.getElementById('edit-field-total');

  function recalculate() {
    const jumlah = parseInt(jumlahEl?.value) || 0;
    const harga = parseInt(hargaEl?.value) || 0;
    const total = jumlah * harga;
    if (totalEl) totalEl.textContent = formatRp(total);
  }

  jumlahEl?.addEventListener('input', recalculate);
  hargaEl?.addEventListener('input', recalculate);
  recalculate();

  // ── Save handler ──
  document.getElementById('edit-booking-save')?.addEventListener('click', async () => {
    const nama = document.getElementById('edit-field-nama')?.value.trim();
    const telp = document.getElementById('edit-field-telp')?.value.trim();
    const tanggal = document.getElementById('edit-field-tanggal')?.value;
    const jumlahPerahu = parseInt(jumlahEl?.value) || 0;
    const hargaPerKapal = parseInt(hargaEl?.value) || 0;
    const raftingType = typeSelect?.options[typeSelect.selectedIndex]?.value || '';
    const totalHarga = jumlahPerahu * hargaPerKapal;

    if (!nama) { alert('Nama pemesan wajib diisi.'); return; }
    if (!tanggal) { alert('Tanggal wajib diisi.'); return; }
    if (!jumlahPerahu) { alert('Jumlah perahu wajib diisi.'); return; }

    const saveBtn = document.getElementById('edit-booking-save');
    const originalHTML = saveBtn.innerHTML;
    saveBtn.innerHTML = '<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;"></div> Menyimpan...';
    saveBtn.style.opacity = '0.7';
    saveBtn.style.pointerEvents = 'none';

    try {
      const bookingRef = doc(db, 'bookings', booking.id);
      const updates = {
        nama,
        noTelp: telp,
        telp,
        tanggal,
        raftingType: raftingType || booking.raftingType,
        jumlahPerahu,
        hargaPerKapal,
        sesiTrip: selectedSesi,
        totalHarga,
      };

      await updateDoc(bookingRef, updates);

      // Update local cache
      const idx = allBookings.findIndex(b => b.id === booking.id);
      if (idx !== -1) {
        Object.assign(allBookings[idx], updates);
      }

      // Show toast
      showCalendarToast('Pesanan berhasil diperbarui!');

      closeModal();

      // Refresh the day popup
      setTimeout(() => {
        const day = new Date(tanggal).getDate();
        buildCalendar();
        showPopup(day);
      }, 300);

    } catch (err) {
      console.error('Update booking error:', err);
      alert('Gagal menyimpan: ' + err.message);
      saveBtn.innerHTML = originalHTML;
      saveBtn.style.opacity = '1';
      saveBtn.style.pointerEvents = '';
    }
  });

  // ── Delete handler ──
  document.getElementById('edit-booking-delete')?.addEventListener('click', async () => {
    if (!confirm(`Hapus pesanan "${booking.nama}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    const deleteBtn = document.getElementById('edit-booking-delete');
    deleteBtn.innerHTML = '<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;"></div> Menghapus...';
    deleteBtn.style.opacity = '0.7';
    deleteBtn.style.pointerEvents = 'none';

    try {
      await deleteDoc(doc(db, 'bookings', booking.id));

      // Remove from local cache
      allBookings = allBookings.filter(b => b.id !== booking.id);

      showCalendarToast('Pesanan berhasil dihapus!');
      closeModal();

      // Refresh calendar
      setTimeout(() => {
        buildCalendar();
        // Re-show popup for this date
        const day = new Date(booking.tanggal).getDate();
        showPopup(day);
      }, 300);

    } catch (err) {
      console.error('Delete booking error:', err);
      alert('Gagal menghapus: ' + err.message);
      deleteBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.125rem;">delete</span> Hapus Pesanan';
      deleteBtn.style.opacity = '1';
      deleteBtn.style.pointerEvents = '';
    }
  });
}

// ── Toast helper ──
function showCalendarToast(message) {
  let toast = document.getElementById('cal-toast');
  if (toast) toast.remove();

  toast = document.createElement('div');
  toast.id = 'cal-toast';
  toast.className = 'toast';
  toast.style.cssText = 'background:var(--primary);color:white;display:flex;align-items:center;gap:0.5rem;';
  toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.125rem;">check_circle</span> ${message}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

export function initCalendar() {
  // Load bookings WITH id
  getDocs(collection(db, 'bookings')).then(snap => {
    allBookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    buildCalendar();
  }).catch(e => { console.error(e); buildCalendar(); });

  // Pre-load rafting types & tambahan types for edit modal
  loadRaftingTypes().then(types => { cachedRaftingTypes = types; });
  loadTambahanTypes().then(types => { cachedTambahanTypes = types; });

  // Nav buttons
  document.getElementById('cal-prev')?.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    buildCalendar();
  });
  document.getElementById('cal-next')?.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    buildCalendar();
  });

  // Close popup
  document.getElementById('cal-popup')?.addEventListener('click', (e) => {
    if (e.target.id === 'cal-popup' || e.target.closest('#popup-close')) {
      document.getElementById('cal-popup').style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}
