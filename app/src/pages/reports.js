/**
 * Reports Page — CitraElo Rafting
 */

export function renderReports(user) {
  const barData = [
    { month: 'Mar', height: 40 },
    { month: 'Apr', height: 55 },
    { month: 'May', height: 45 },
    { month: 'Jun', height: 70 },
    { month: 'Jul', height: 85 },
    { month: 'Aug', height: 95 },
    { month: 'Sep', height: 60 }
  ];

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Header -->
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <div>
          <h2 class="font-headline" style="font-size:2rem;font-weight:800;letter-spacing:-0.02em;color:var(--primary);">Expedition Intelligence</h2>
          <p style="color:var(--on-surface-variant);font-weight:500;margin-top:0.25rem;">Performance analytics and operational insights for the current season.</p>
        </div>
        <div class="period-filter">
          <button class="period-filter__btn">WEEKLY</button>
          <button class="period-filter__btn active">MONTHLY</button>
          <button class="period-filter__btn">YEARLY</button>
        </div>
      </section>

      <!-- Revenue by Month -->
      <section class="card" style="padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem;">
          <div>
            <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Financial Velocity</p>
            <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">REVENUE BY MONTH</h3>
          </div>
          <div style="text-align:right;">
            <span style="font-size:1.5rem;font-weight:900;color:var(--primary);">$412.5k</span>
            <p style="font-size:0.75rem;color:#16a34a;font-weight:700;display:flex;align-items:center;justify-content:flex-end;gap:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;">trending_up</span>
              +12.4%
            </p>
          </div>
        </div>
        <!-- Bar Chart -->
        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:0.5rem;height:180px;margin-bottom:1rem;">
          ${barData.map((d, i) => `
            <div style="flex:1;height:${d.height}%;background:${i === 5 ? 'var(--primary-container)' : 'rgba(0,52,97,0.1)'};border-radius:0.5rem 0.5rem 0 0;transition:all 0.5s ease;"></div>
          `).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;">
          ${barData.map(d => `<span class="label-xs" style="color:var(--outline);flex:1;text-align:center;">${d.month}</span>`).join('')}
        </div>
      </section>

      <!-- Trip Type Popularity -->
      <section class="card" style="padding:1.5rem;">
        <div style="margin-bottom:1.5rem;">
          <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Market Segment</p>
          <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">TRIP TYPE POPULARITY</h3>
        </div>
        <!-- Donut Chart (CSS) -->
        <div style="display:flex;justify-content:center;padding:1.5rem 0;">
          <div style="width:10rem;height:10rem;border-radius:50%;border:1rem solid var(--primary-container);display:flex;align-items:center;justify-content:center;position:relative;background:conic-gradient(var(--primary-container) 0deg 187deg, var(--secondary) 187deg 288deg, var(--tertiary) 288deg 360deg);">
            <div style="width:7rem;height:7rem;border-radius:50%;background:var(--surface-container-low);display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <span style="font-size:1.25rem;font-weight:900;color:var(--primary);">842</span>
              <p class="label-xs" style="color:var(--outline);">TOTAL TRIPS</p>
            </div>
          </div>
        </div>
        <!-- Legend -->
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--primary-container);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Whitewater Pro</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">52%</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--secondary);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Family Float</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">28%</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--tertiary);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Private Charter</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">20%</span>
          </div>
        </div>
      </section>

      <!-- Monthly Bookings -->
      <section class="card" style="padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;">
          <div>
            <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Flow Rate</p>
            <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">MONTHLY BOOKINGS</h3>
          </div>
          <div style="display:flex;gap:2rem;">
            <div>
              <p class="label-xs" style="color:var(--outline);margin-bottom:0.25rem;">This Season</p>
              <span style="font-size:1.125rem;font-weight:900;color:var(--primary);">2,481</span>
            </div>
            <div>
              <p class="label-xs" style="color:var(--outline);margin-bottom:0.25rem;">Last Season</p>
              <span style="font-size:1.125rem;font-weight:900;color:var(--outline);">1,924</span>
            </div>
          </div>
        </div>
        <!-- Line Chart SVG -->
        <div style="position:relative;height:160px;">
          <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none" style="overflow:visible;">
            <path d="M0,160 L100,150 L200,170 L300,140 L400,155 L500,120 L600,130 L700,90 L800,100 L900,110 L1000,80" 
                  fill="none" stroke="#727781" stroke-width="2" stroke-dasharray="8 4" stroke-opacity="0.4"/>
            <path d="M0,180 L100,140 L200,150 L300,110 L400,130 L500,70 L600,90 L700,40 L800,50 L900,30 L1000,10" 
                  fill="none" stroke="#ab3600" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M0,180 L100,140 L200,150 L300,110 L400,130 L500,70 L600,90 L700,40 L800,50 L900,30 L1000,10 L1000,200 L0,200 Z" 
                  fill="url(#reportGrad)" opacity="0.1"/>
            <defs>
              <linearGradient id="reportGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ab3600;stop-opacity:1"/>
                <stop offset="100%" style="stop-color:#ab3600;stop-opacity:0"/>
              </linearGradient>
            </defs>
            <circle cx="700" cy="40" r="6" fill="#ab3600"/>
          </svg>
          <div style="position:absolute;left:70%;top:10px;transform:translateX(-50%);background:var(--primary);color:white;padding:0.375rem 0.75rem;border-radius:var(--radius-lg);font-size:0.75rem;font-weight:700;box-shadow:0 4px 12px rgba(0,52,97,0.2);">
            JULY: 482
            <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%) rotate(45deg);width:0.5rem;height:0.5rem;background:var(--primary);"></div>
          </div>
        </div>
      </section>

      <!-- Quick Stats Row -->
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <!-- Crew Capacity -->
        <div style="background:var(--primary);color:white;border-radius:var(--radius-xl);padding:1.5rem;position:relative;overflow:hidden;">
          <span class="material-symbols-outlined" style="position:absolute;right:-1rem;bottom:-1rem;font-size:6rem;opacity:0.1;transform:rotate(12deg);">kayaking</span>
          <div>
            <h4 class="label-xs" style="opacity:0.6;margin-bottom:1rem;letter-spacing:0.2em;">Crew Capacity</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;">94%</span>
          </div>
          <div style="margin-top:1.5rem;">
            <div style="width:100%;background:rgba(255,255,255,0.2);height:0.375rem;border-radius:var(--radius-full);overflow:hidden;margin-bottom:0.5rem;">
              <div style="width:94%;height:100%;background:var(--secondary);border-radius:var(--radius-full);"></div>
            </div>
            <p style="font-size:0.75rem;font-weight:500;opacity:0.8;">All Alpha sector guides currently active</p>
          </div>
        </div>

        <!-- Safety Rating -->
        <div style="background:var(--surface-container-high);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
          <div>
            <h4 class="label-xs" style="color:var(--outline);margin-bottom:1rem;letter-spacing:0.2em;">Safety Rating</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;color:var(--primary);">4.98</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.25rem;color:var(--secondary);margin-top:1rem;">
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
          </div>
        </div>

        <!-- River Status -->
        <div style="background:var(--secondary-container);color:var(--on-secondary-container);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
          <div>
            <h4 class="label-xs" style="opacity:0.8;margin-bottom:1rem;letter-spacing:0.2em;">River Status</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;">CLASS IV</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-top:1rem;">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">warning</span>
            <p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">HIGH FLOW ADVISORY</p>
          </div>
        </div>
      </section>
    </div>
  `;
}
