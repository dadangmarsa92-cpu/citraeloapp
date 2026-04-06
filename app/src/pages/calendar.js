/**
 * Jadwal (Calendar) Page — CitraElo Rafting
 * Functional calendar with booking data from Firestore
 */
import { db } from '../firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DAYS_ID = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

let currentYear, currentMonth, allBookings = [];

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
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0.75rem;background:var(--surface-container-low);border-radius:var(--radius-xl);margin-bottom:0.375rem;">
        <div style="width:2rem;height:2rem;border-radius:50%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;font-weight:700;flex-shrink:0;">
          ${(b.nama || '?').charAt(0).toUpperCase()}
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-weight:700;font-size:0.8125rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.nama || '-'}</p>
          <p style="font-size:0.6875rem;color:var(--outline);">${b.raftingType || ''}</p>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <p style="font-weight:800;font-size:0.875rem;color:${color};font-family:'Space Grotesk',sans-serif;">${b.jumlahPerahu || 0}</p>
          <p style="font-size:0.5625rem;color:var(--outline);font-weight:700;">KAPAL</p>
        </div>
      </div>`;
  });

  html += '</div>';
  return html;
}

export function initCalendar() {
  // Load bookings
  getDocs(collection(db, 'bookings')).then(snap => {
    allBookings = snap.docs.map(d => d.data());
    buildCalendar();
  }).catch(e => { console.error(e); buildCalendar(); });

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
