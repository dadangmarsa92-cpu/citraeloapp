/**
 * Calendar & Guests Page — CitraElo Rafting
 */

export function renderCalendar(user) {
  const days = generateCalendarDays(2024, 7); // August 2024 (0-indexed: 7)
  const eventDays = [1, 3, 5, 7, 10, 13, 16, 19];

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2.5rem;">
      
      <!-- Header -->
      <section style="display:flex;flex-direction:column;gap:1.5rem;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;">
          <div>
            <span class="label-sm" style="color:var(--secondary);letter-spacing:0.05em;">DAFTAR TAMU BERDASARKAN TANGGAL</span>
            <h1 class="font-headline" style="font-size:2.25rem;font-weight:700;color:var(--primary);letter-spacing:-0.03em;margin-top:0.25rem;" id="calendar-title">AUGUST 2024</h1>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button style="width:3rem;height:3rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-prev">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button style="width:3rem;height:3rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-next">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-xl);padding:1.5rem;box-shadow:var(--shadow-card);">
          <!-- Day Headers -->
          <div class="calendar-grid" style="margin-bottom:1rem;">
            ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `
              <div style="text-align:center;font-size:0.75rem;font-weight:700;color:var(--outline);padding:0.5rem 0;text-transform:uppercase;letter-spacing:0.1em;">${d}</div>
            `).join('')}
          </div>
          <!-- Date Grid -->
          <div class="calendar-grid" id="calendar-days">
            ${days.map(day => {
              if (!day) return '<div class="calendar-day calendar-day--inactive"></div>';
              const isActive = day === 6;
              const hasEvent = eventDays.includes(day);
              return `
                <div class="calendar-day ${isActive ? 'calendar-day--active' : ''} ${hasEvent && !isActive ? 'calendar-day--has-event' : ''}" 
                     data-day="${day}">
                  ${day}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Guests & Reservations -->
      <section style="display:flex;flex-direction:column;gap:1.5rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <h2 class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">Detail Tamu</h2>
          <span style="background:rgba(0,75,135,0.1);color:var(--primary-container);padding:0.25rem 0.75rem;border-radius:var(--radius-full);font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">Tuesday, Aug 6</span>
        </div>

        <!-- Expedition Card 1 -->
        <div class="card" style="padding:1.5rem;border-left:4px solid var(--secondary);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;">
            <div>
              <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;">GORGE CANYON RUN</h3>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem;">
                <span class="material-symbols-outlined filled" style="font-size:0.875rem;color:var(--secondary);">stars</span>
                <span class="label-xs" style="color:var(--secondary);">Class IV-V Rapids</span>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="font-headline" style="font-size:1.5rem;font-weight:900;color:var(--primary);">09:00</span>
              <p class="label-xs" style="color:var(--outline);">Departure</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem 0;border-top:1px solid rgba(194,198,209,0.2);border-bottom:1px solid rgba(194,198,209,0.2);margin-bottom:1rem;">
            <div style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-dim);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--primary);font-size:0.75rem;">SM</div>
            <div>
              <p class="label-xs" style="color:var(--outline);">Lead Guide</p>
              <p style="font-weight:700;">Sarah "Riptide" Miller</p>
            </div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <p class="label-xs" style="color:var(--outline);">Manifest (8/8 Full)</p>
              <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">groups</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              <span style="background:var(--surface-container-lowest);padding:0.25rem 0.75rem;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid rgba(194,198,209,0.1);">John Doe</span>
              <span style="background:var(--surface-container-lowest);padding:0.25rem 0.75rem;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid rgba(194,198,209,0.1);">Elena R.</span>
              <span style="background:var(--surface-container-lowest);padding:0.25rem 0.75rem;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid rgba(194,198,209,0.1);">Marcus V.</span>
              <div style="width:1.5rem;height:1.5rem;border-radius:var(--radius-md);background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">+5</div>
            </div>
          </div>
        </div>

        <!-- Expedition Card 2 -->
        <div class="card" style="padding:1.5rem;border-left:4px solid var(--primary);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;">
            <div>
              <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;">Misty Valley Float</h3>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem;">
                <span class="material-symbols-outlined filled" style="font-size:0.875rem;color:var(--primary);">waves</span>
                <span class="label-xs" style="color:var(--primary);">Class II Scenic</span>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="font-headline" style="font-size:1.5rem;font-weight:900;color:var(--primary);">13:30</span>
              <p class="label-xs" style="color:var(--outline);">Departure</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem 0;border-top:1px solid rgba(194,198,209,0.2);border-bottom:1px solid rgba(194,198,209,0.2);margin-bottom:1rem;">
            <div style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-dim);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--primary);font-size:0.75rem;">AC</div>
            <div>
              <p class="label-xs" style="color:var(--outline);">Lead Guide</p>
              <p style="font-weight:700;">Alex Chen</p>
            </div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <p class="label-xs" style="color:var(--outline);">Manifest (4/12 Open)</p>
              <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">groups</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              <span style="background:var(--surface-container-lowest);padding:0.25rem 0.75rem;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid rgba(194,198,209,0.1);">The Thompson Family (4)</span>
              <span style="background:var(--surface-container-lowest);padding:0.25rem 0.75rem;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid rgba(194,198,209,0.1);">Bill & Jen (2)</span>
              <div style="width:1.5rem;height:1.5rem;border-radius:var(--radius-md);background:var(--surface-container-highest);color:var(--outline);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">+2</div>
            </div>
          </div>
        </div>

        <!-- New Reservation Card -->
        <div style="border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;" id="new-reservation-card">
          <div style="width:3rem;height:3rem;border-radius:50%;background:var(--surface-container-low);display:flex;align-items:center;justify-content:center;color:var(--primary);margin-bottom:1rem;">
            <span class="material-symbols-outlined" style="font-size:1.5rem;">add</span>
          </div>
          <h3 class="font-headline" style="font-weight:700;">New Reservation</h3>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">August 6 Availability: High</p>
        </div>
      </section>

      <!-- Safety Overview -->
      <section style="padding-bottom:1rem;">
        <div style="background:var(--primary-container);color:white;padding:2rem;border-radius:var(--radius-xl);position:relative;overflow:hidden;">
          <div style="position:relative;z-index:1;">
            <span class="label-xs" style="opacity:0.8;display:block;margin-bottom:0.5rem;letter-spacing:0.2em;">Safety Overview</span>
            <h2 class="font-headline" style="font-size:1.75rem;font-weight:700;line-height:1.2;max-width:300px;">River conditions are optimal for Class V today.</h2>
            <p style="margin-top:1rem;font-size:0.875rem;opacity:0.9;max-width:360px;">Water flow is holding steady at 12,000 CFS. All guides ensure high-velocity gear is checked before 09:00 launches.</p>
          </div>
          <div style="position:absolute;right:-10%;top:-20%;opacity:0.1;pointer-events:none;">
            <span class="material-symbols-outlined filled" style="font-size:12rem;">waves</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(null); // inactive days
  }
  
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
}
