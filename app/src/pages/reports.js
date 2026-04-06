/**
 * Reports Page — CitraElo Rafting
 */
import { db } from '../firebase/config.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export function renderReports(user) {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayStr = now.toISOString().split('T')[0];
  const firstDayStr = firstDay.toISOString().split('T')[0];

  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Header & Filter -->
      <section style="display:flex;flex-direction:column;gap:1.5rem;">
        <div>
          <h2 class="font-headline" style="font-size:2rem;font-weight:800;letter-spacing:-0.02em;color:var(--primary);">Laporan Pemasukan</h2>
          <p style="color:var(--on-surface-variant);font-weight:500;margin-top:0.25rem;">Statistik finansial dan daftar pemesanan.</p>
        </div>
        
        <div style="background:var(--surface-container-low);padding:1rem;border-radius:var(--radius-xl);display:flex;gap:0.75rem;align-items:flex-end;flex-wrap:wrap;">
          <div style="flex:1;min-width:130px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">DARI TANGGAL</label>
            <input type="date" id="rep-from" class="input-field" value="${firstDayStr}" style="padding-left:0.75rem;height:2.5rem;font-size:0.875rem;background:white;">
          </div>
          <div style="flex:1;min-width:130px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">SAMPAI TANGGAL</label>
            <input type="date" id="rep-to" class="input-field" value="${todayStr}" style="padding-left:0.75rem;height:2.5rem;font-size:0.875rem;background:white;">
          </div>
          <button id="btn-rep-filter" style="height:2.5rem;padding:0 1.5rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-lg);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.875rem;display:flex;align-items:center;gap:0.5rem;box-shadow:0 4px 12px rgba(0,52,97,0.2);">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">search</span> Tampilkan
          </button>
        </div>
      </section>

      <!-- KPI Cards -->
      <section style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:1rem;">
        <div class="card card--primary" style="padding:1.25rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.5rem;top:-0.5rem;opacity:0.1;"><span class="material-symbols-outlined" style="font-size:5rem;">account_balance_wallet</span></div>
          <p class="label-xs" style="opacity:0.8;margin-bottom:0.25rem;">TOTAL TRANSAKSI</p>
          <h3 class="font-headline" id="rep-total-transaksi" style="font-size:1.75rem;font-weight:800;">Rp 0</h3>
        </div>
        <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.5rem;top:-0.5rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:5rem;">payments</span></div>
          <p class="label-xs" style="color:var(--outline);margin-bottom:0.25rem;">DANA MASUK (DP + LUNAS)</p>
          <h3 class="font-headline" id="rep-total-masuk" style="font-size:1.75rem;font-weight:800;color:#16a34a;">Rp 0</h3>
        </div>
        <div class="card" style="padding:1.25rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;background:var(--error-container);">
          <div style="position:absolute;right:-0.5rem;top:-0.5rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:5rem;">money_off</span></div>
          <p class="label-xs" style="color:var(--error);margin-bottom:0.25rem;">SISA PIUTANG</p>
          <h3 class="font-headline" id="rep-total-piutang" style="font-size:1.75rem;font-weight:800;color:var(--on-error-container);">Rp 0</h3>
        </div>
      </section>

      <!-- Chart Section -->
      <section class="card" style="padding:1.5rem;">
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);margin-bottom:1rem;">Grafik Pemasukan Harian</h3>
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-lg);padding:1rem;height:250px;">
          <canvas id="rep-chart" style="width:100%;height:100%;"></canvas>
        </div>
      </section>

      <!-- Data Table -->
      <section class="card" style="padding:1.5rem;overflow-x:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:1rem;">
          <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">Rincian Transaksi</h3>
          <div style="display:flex;gap:0.5rem;">
            <button id="btn-export-csv" style="padding:0.625rem 1rem;background:var(--surface-container-high);color:var(--primary);border:1px solid var(--outline-variant);border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;display:flex;align-items:center;gap:0.375rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">table_view</span> Ekspor Excel
            </button>
            <button id="btn-export-pdf" style="padding:0.625rem 1rem;background:var(--surface-container-high);color:var(--primary);border:1px solid var(--outline-variant);border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;display:flex;align-items:center;gap:0.375rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">picture_as_pdf</span> Ekspor PDF
            </button>
          </div>
        </div>
        
        <table style="width:100%;border-collapse:collapse;font-size:0.8125rem;text-align:left;white-space:nowrap;">
          <thead>
            <tr style="border-bottom:2px solid var(--outline-variant);color:var(--outline);">
              <th style="padding:0.75rem 0.5rem;">TANGGAL</th>
              <th style="padding:0.75rem 0.5rem;">ID PESANAN</th>
              <th style="padding:0.75rem 0.5rem;">NAMA TAMU</th>
              <th style="padding:0.75rem 0.5rem;">PAKET</th>
              <th style="padding:0.75rem 0.5rem;text-align:right;">TOTAL</th>
              <th style="padding:0.75rem 0.5rem;text-align:right;">DIBAYAR</th>
              <th style="padding:0.75rem 0.5rem;text-align:right;">PIUTANG</th>
            </tr>
          </thead>
          <tbody id="rep-tbody">
            <tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--outline);">Silakan filter tanggal untuk menampilkan data.</td></tr>
          </tbody>
        </table>
      </section>

    </div>
  `;
}

export function initReports() {
  const btnFilter = document.getElementById('btn-rep-filter');
  const btnCsv = document.getElementById('btn-export-csv');
  const btnPdf = document.getElementById('btn-export-pdf');
  const dateFrom = document.getElementById('rep-from');
  const dateTo = document.getElementById('rep-to');
  
  let currentData = [];

  function formatRp(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  }

  async function loadReport() {
    const fromVal = dateFrom.value;
    const toVal = dateTo.value;
    if (!fromVal || !toVal) return;

    btnFilter.innerHTML = '<div class="spinner" style="width:1rem;height:1rem;border-width:2px;"></div>';
    
    try {
      // Because firestore string comparisons work lexicographically for "YYYY-MM-DD"
      // We can use where("tanggal", ">=", from) and where("tanggal", "<=", to)
      const q = query(
        collection(db, 'bookings'),
        where('tanggal', '>=', fromVal),
        where('tanggal', '<=', toVal)
      );
      
      const snap = await getDocs(q);
      const bookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Sort ascending by date
      bookings.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
      currentData = bookings;

      // 1. Calculate KPI
      let totalTransaksi = 0;
      let totalDanaMasuk = 0;
      let totalPiutang = 0;
      
      const dailyMap = {};

      bookings.forEach(b => {
        const val = Number(b.totalPesanan) || 0;
        const paid = Number(b.dp) || 0;
        const piutang = Number(b.kurangBayar) || 0;
        
        totalTransaksi += val;
        totalDanaMasuk += paid;
        totalPiutang += piutang;

        const dt = b.tanggal;
        if (!dailyMap[dt]) dailyMap[dt] = 0;
        dailyMap[dt] += val; // Chart shows total transaction value formulated by day
      });

      document.getElementById('rep-total-transaksi').textContent = formatRp(totalTransaksi);
      document.getElementById('rep-total-masuk').textContent = formatRp(totalDanaMasuk);
      document.getElementById('rep-total-piutang').textContent = formatRp(totalPiutang);

      // 2. Render Table
      const tbody = document.getElementById('rep-tbody');
      if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--outline);">Tidak ada data pada periode tersebut.</td></tr>';
      } else {
        let html = '';
        bookings.forEach(b => {
          const lbrDate = new Date(b.tanggal).toLocaleDateString('id-ID');
          const isLunas = b.kurangBayar <= 0;
          html += \`
            <tr style="border-bottom:1px solid var(--surface-container-high);">
              <td style="padding:0.75rem 0.5rem;color:var(--on-surface-variant);">\${lbrDate}</td>
              <td style="padding:0.75rem 0.5rem;font-weight:700;">\${b.idPesanan}</td>
              <td style="padding:0.75rem 0.5rem;">\${b.nama}</td>
              <td style="padding:0.75rem 0.5rem;">\${b.raftingType}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;font-weight:700;color:var(--primary);">\${formatRp(b.totalPesanan)}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;color:#16a34a;">\${formatRp(b.dp)}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;color:\${isLunas ? 'var(--outline)' : 'var(--error)'};font-weight:\${isLunas ? 'normal' : '700'};\${isLunas ? 'opacity:0.3' : ''}">\${isLunas ? 'LUNAS' : formatRp(b.kurangBayar)}</td>
            </tr>
          \`;
        });
        tbody.innerHTML = html;
      }

      // 3. Draw Chart
      drawChart(dailyMap, fromVal, toVal);

    } catch (e) {
      console.error(e);
      alert('Gagal memuat laporan: ' + e.message);
    }

    btnFilter.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.125rem;">search</span> Tampilkan';
  }

  function drawChart(dailyMap, fromStr, toStr) {
    const canvas = document.getElementById('rep-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    // Set actual size in memory (scaled to account for extra pixel density).
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    // Normalize coordinate system to use css pixels.
    ctx.scale(dpr, dpr);
    
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    // Build complete date array from From to To
    const keys = [];
    let start = new Date(fromStr);
    const end = new Date(toStr);
    while (start <= end) {
      keys.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }

    if (keys.length === 0) return;

    let maxVal = Math.max(1, ...keys.map(k => dailyMap[k] || 0));
    // Add 20% headroom
    maxVal = maxVal * 1.2;

    const barW = Math.min(30, (W - 50) / keys.length * 0.8);
    const gap = (W - 50) / keys.length;
    const chartH = H - 40;

    // Grid properties
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    ctx.fillStyle = '#666';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';

    // Plot horizontal grid lines
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = 20 + (chartH / gridLines) * i;
        const val = maxVal - (maxVal / gridLines) * i;
        ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W, y); ctx.stroke();
        // Format to 'k' (ribuan) or 'jt' (jutaan)
        let label = '';
        if (val >= 1000000) label = (val/1000000).toFixed(1) + 'Jt';
        else if (val >= 1000) label = (val/1000).toFixed(0) + 'k';
        else label = val.toFixed(0);
        
        ctx.fillText(label, 35, y + 4);
    }

    // Plot bars
    ctx.textAlign = 'center';
    keys.forEach((key, i) => {
      const val = dailyMap[key] || 0;
      const x = 40 + i * gap + (gap - barW) / 2;
      const hScale = (val / maxVal) * chartH;
      
      // Bar
      ctx.fillStyle = '#003461'; // primary
      ctx.beginPath();
      const r = Math.min(4, barW/2);
      ctx.roundRect(x, 20 + chartH - hScale, barW, hScale, [r, r, 0, 0]);
      ctx.fill();

      // Date Label (Show every Nth depending on density)
      const labelSkip = Math.ceil(keys.length / 15);
      if (i % labelSkip === 0) {
        ctx.fillStyle = '#666';
        const label = key.slice(8); // DD
        ctx.fillText(label, x + barW/2, H - 5);
      }
    });
  }

  // Exports
  btnCsv?.addEventListener('click', () => {
    if (!currentData || currentData.length === 0) {
      alert('Tidak ada data untuk diekspor!'); return;
    }
    
    // Build CSV Content
    const headers = ['Tanggal', 'ID Pesanan', 'Nama Tamu', 'No Telp', 'Sesi', 'Paket', 'Jml Kapal', 'Harga/Kpl', 'Total Transaksi', 'Dibayar', 'Kurang Bayar', 'Metode Bayar'];
    const rows = currentData.map(b => [
      b.tanggal, 
      b.idPesanan, 
      \`"\${b.nama}"\`,
      \`"'\${b.telp}"\`, // force string for phone
      b.sesiTrip,
      b.raftingType,
      b.jumlahPerahu,
      b.hargaPerKapal,
      b.totalPesanan,
      b.dp,
      b.kurangBayar,
      b.metodeBayar
    ]);

    let csvContent = headers.join(',') + '\\n';
    rows.forEach(r => { csvContent += r.join(',') + '\\n' });

    // Download Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', \`Laporan_Pendapatan_\${dateFrom.value}_sampai_\${dateTo.value}.csv\`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  btnPdf?.addEventListener('click', () => {
    if (!currentData || currentData.length === 0) {
      alert('Tidak ada data untuk diekspor!'); return;
    }

    const printWindow = window.open('', '_blank');
    let html = \`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Pendapatan - CitraElo</title>
        <style>
          body { font-family: 'Helvetica', Arial, sans-serif; color: #333; padding: 20px; font-size: 12px; }
          h2 { margin-bottom: 5px; color: #003461; }
          p { margin-top: 0; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f7f9; color: #003461; }
          .right { text-align: right; }
          .summary { display: flex; gap: 20px; margin-bottom: 20px; }
          .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; flex: 1; }
          .card-value { font-size: 18px; font-weight: bold; margin-top: 5px; }
        </style>
      </head>
      <body>
        <h2>CITRAELO RAFTING - Laporan Pendapatan</h2>
        <p>Periode: \${new Date(dateFrom.value).toLocaleDateString('id-ID')} s/d \${new Date(dateTo.value).toLocaleDateString('id-ID')}</p>
        
        <div class="summary">
          <div class="card">
            <div>TOTAL TRANSAKSI</div>
            <div class="card-value">\${document.getElementById('rep-total-transaksi').textContent}</div>
          </div>
          <div class="card">
            <div>DANA MASUK (DP+LUNAS)</div>
            <div class="card-value" style="color:green;">\${document.getElementById('rep-total-masuk').textContent}</div>
          </div>
          <div class="card">
            <div>SISA PIUTANG</div>
            <div class="card-value" style="color:red;">\${document.getElementById('rep-total-piutang').textContent}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>ID Pesanan</th>
              <th>Nama</th>
              <th>Paket</th>
              <th class="right">Jml Kapal</th>
              <th class="right">Total</th>
              <th class="right">Dibayar</th>
              <th class="right">Piutang</th>
            </tr>
          </thead>
          <tbody>
    \`;

    currentData.forEach(b => {
      html += \`
        <tr>
          <td>\${new Date(b.tanggal).toLocaleDateString('id-ID')}</td>
          <td>\${b.idPesanan}</td>
          <td>\${b.nama}</td>
          <td>\${b.raftingType}</td>
          <td class="right">\${b.jumlahPerahu}</td>
          <td class="right">\${formatRp(b.totalPesanan)}</td>
          <td class="right">\${formatRp(b.dp)}</td>
          <td class="right">\${formatRp(b.kurangBayar)}</td>
        </tr>
      \`;
    });

    html += \`
          </tbody>
        </table>
        <div style="margin-top:30px; text-align:right; font-size:10px; color:#999;">
          Di-generate pada: \${new Date().toLocaleString('id-ID')}
        </div>
        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
      </html>
    \`;

    printWindow.document.write(html);
    printWindow.document.close();
  });

  // Attach and init
  btnFilter?.addEventListener('click', loadReport);

  // Resize canvas handler
  window.addEventListener('resize', () => {
    if (window.location.hash !== '#/reports') return;
    const fromVal = dateFrom.value;
    const toVal = dateTo.value;
    if (currentData.length > 0) {
      // Build daily map again for redraw since we don't save map state
      const map = {};
      currentData.forEach(b => {
        const val = Number(b.totalPesanan) || 0;
        const dt = b.tanggal;
        if (!map[dt]) map[dt] = 0;
        map[dt] += val;
      });
      drawChart(map, fromVal, toVal);
    }
  });

  // Init load
  loadReport();
}
