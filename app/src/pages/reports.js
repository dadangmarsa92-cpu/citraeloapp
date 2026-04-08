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
        
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:-0.5rem;padding:0 0.5rem;">
          <input type="checkbox" id="rep-filter-piutang" style="width:1.25rem;height:1.25rem;accent-color:var(--error);cursor:pointer;">
          <label for="rep-filter-piutang" style="font-size:0.8125rem;font-weight:700;color:var(--on-surface-variant);cursor:pointer;">Hanya Tampilkan Transaksi Piutang (Belum Lunas)</label>
        </div>
        
        <!-- TABS -->
        <div class="role-toggle" style="margin-top:-0.25rem; flex:1; display:flex;">
          <button type="button" class="role-toggle__btn active" id="tab-rep-keuangan" style="cursor:pointer; flex:1; justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">account_balance_wallet</span> Detail Keuangan
          </button>
          <button type="button" class="role-toggle__btn" id="tab-rep-grafik" style="cursor:pointer; flex:1; justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">bar_chart</span> Grafik Analitik
          </button>
          <button type="button" class="role-toggle__btn" id="tab-rep-tamu" style="cursor:pointer; flex:1; justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">group</span> Data Tamu
          </button>
        </div>
      </section>

      <!-- TAB KEUANGAN -->
      <div id="rep-sec-keuangan" style="display:block;">


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
      </div>

      <!-- TAB GRAFIK -->
      <div id="rep-sec-grafik" style="display:none;">

      <!-- Chart Pesanan & Kapal -->
      <section class="card" style="padding:1.5rem;margin-bottom:1rem;">
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);margin-bottom:0.75rem;">Statistik Pesanan & Kapal</h3>
        <div style="display:flex;gap:1rem;margin-bottom:1rem;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--primary);"></span> Pesanan</span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--secondary);"></span> Kapal</span>
        </div>
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-lg);padding:1rem;height:220px;">
          <canvas id="rep-chart-pesanan" style="width:100%;height:100%;"></canvas>
        </div>
      </section>

      <!-- Chart Pemasukan -->
      <section class="card" style="padding:1.5rem;">
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);margin-bottom:1rem;">Grafik Pemasukan Harian</h3>
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-lg);padding:1rem;height:250px;">
          <canvas id="rep-chart" style="width:100%;height:100%;"></canvas>
        </div>
      </section>
      </div>

      <!-- TAB TAMU -->
      <div id="rep-sec-tamu" style="display:none;">

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

    </div>
  `;
}

export function initReports() {
  const btnFilter = document.getElementById('btn-rep-filter');
  const btnCsv = document.getElementById('btn-export-csv');
  const btnPdf = document.getElementById('btn-export-pdf');
  const dateFrom = document.getElementById('rep-from');
  const dateTo = document.getElementById('rep-to');
  const chkPiutang = document.getElementById('rep-filter-piutang');
  
  // Tab Elements
  const tabKeu = document.getElementById('tab-rep-keuangan');
  const tabGrafik = document.getElementById('tab-rep-grafik');
  const tabTamu = document.getElementById('tab-rep-tamu');
  const secKeu = document.getElementById('rep-sec-keuangan');
  const secGrafik = document.getElementById('rep-sec-grafik');
  const secTamu = document.getElementById('rep-sec-tamu');

  function switchRepTab(activeId) {
    if(!tabKeu) return;
    [tabKeu, tabGrafik, tabTamu].forEach(t => t.classList.remove('active'));
    [secKeu, secGrafik, secTamu].forEach(s => { s.style.display = 'none'; s.style.animation = ''; });
    
    if (activeId === 'keuangan') {
      tabKeu.classList.add('active');
      secKeu.style.display = 'block';
      secKeu.style.animation = 'scaleIn 0.25s ease forwards';
    } else if (activeId === 'grafik') {
      tabGrafik.classList.add('active');
      secGrafik.style.display = 'block';
      secGrafik.style.animation = 'scaleIn 0.25s ease forwards';
    } else if (activeId === 'tamu') {
      tabTamu.classList.add('active');
      secTamu.style.display = 'block';
      secTamu.style.animation = 'scaleIn 0.25s ease forwards';
    }
  }

  tabKeu?.addEventListener('click', () => switchRepTab('keuangan'));
  tabGrafik?.addEventListener('click', () => switchRepTab('grafik'));
  tabTamu?.addEventListener('click', () => switchRepTab('tamu'));

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
      const q = query(
        collection(db, 'bookings'),
        where('tanggal', '>=', fromVal),
        where('tanggal', '<=', toVal)
      );
      
      const snap = await getDocs(q);
      let bookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Filter if piutang is checked
      if (chkPiutang && chkPiutang.checked) {
        bookings = bookings.filter(b => b.kurangBayar > 0);
      }
      
      bookings.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
      currentData = bookings;

      // 1. Calculate KPI
      let totalTransaksi = 0;
      let totalDanaMasuk = 0;
      let totalPiutang = 0;
      
      const dailyMap = {};
      const pesananMap = {};

      const start = new Date(fromVal);
      const end = new Date(toVal);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        pesananMap[key] = { orders: 0, boats: 0 };
      }

      bookings.forEach(b => {
        const val = Number(b.totalPesanan) || 0;
        const paid = Number(b.dp) || 0;
        const piutang = Number(b.kurangBayar) || 0;
        
        totalTransaksi += val;
        totalDanaMasuk += paid;
        totalPiutang += piutang;

        const dt = b.tanggal;
        if (!dailyMap[dt]) dailyMap[dt] = 0;
        dailyMap[dt] += val;

        if (pesananMap[dt] !== undefined) {
          pesananMap[dt].orders++;
          pesananMap[dt].boats += (Number(b.jumlahPerahu) || 0);
        }
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
          html += `
            <tr style="border-bottom:1px solid var(--surface-container-high);">
              <td style="padding:0.75rem 0.5rem;color:var(--on-surface-variant);">${lbrDate}</td>
              <td style="padding:0.75rem 0.5rem;font-weight:700;">${b.idPesanan}</td>
              <td style="padding:0.75rem 0.5rem;">${b.nama}</td>
              <td style="padding:0.75rem 0.5rem;">${b.raftingType}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;font-weight:700;color:var(--primary);">${formatRp(b.totalPesanan)}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;color:#16a34a;">${formatRp(b.dp)}</td>
              <td style="padding:0.75rem 0.5rem;text-align:right;color:${isLunas ? 'var(--outline)' : 'var(--error)'};font-weight:${isLunas ? 'normal' : '700'};${isLunas ? 'opacity:0.3' : ''}">${isLunas ? 'LUNAS' : formatRp(b.kurangBayar)}</td>
            </tr>
          `;
        });
        tbody.innerHTML = html;
      }

      // 3. Draw Chart
      drawChart(dailyMap, fromVal, toVal);
      drawChartPesanan(pesananMap);

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
    // Set actual size in memory
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

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
        let label = '';
        if (val >= 1000000) label = (val/1000000).toFixed(1) + 'Jt';
        else if (val >= 1000) label = (val/1000).toFixed(0) + 'k';
        else label = val.toFixed(0);
        
        ctx.fillText(label, 35, y + 4);
    }

    ctx.textAlign = 'center';
    keys.forEach((key, i) => {
      const val = dailyMap[key] || 0;
      const x = 40 + i * gap + (gap - barW) / 2;
      const hScale = (val / maxVal) * chartH;
      
      ctx.fillStyle = '#003461'; // primary
      ctx.beginPath();
      const r = Math.min(4, barW/2);
      ctx.roundRect(x, 20 + chartH - hScale, barW, hScale, [r, r, 0, 0]);
      ctx.fill();

      // Date Label
      const labelSkip = Math.ceil(keys.length / 15);
      if (i % labelSkip === 0) {
        ctx.fillStyle = '#666';
        const label = key.slice(8); // DD
        ctx.fillText(label, x + barW/2, H - 5);
      }
    });
  }

  function drawChartPesanan(dateMap) {
    const canvas = document.getElementById('rep-chart-pesanan');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    // Set actual size in memory
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
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
      `"${b.nama}"`,
      `"'${b.telp}"`, 
      b.sesiTrip,
      b.raftingType,
      b.jumlahPerahu,
      b.hargaPerKapal,
      b.totalPesanan,
      b.dp,
      b.kurangBayar,
      b.metodeBayar
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(r => { csvContent += r.join(',') + '\n' });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Pendapatan_${dateFrom.value}_sampai_${dateTo.value}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  btnPdf?.addEventListener('click', () => {
    if (!currentData || currentData.length === 0) {
      alert('Tidak ada data untuk diekspor!'); return;
    }

    const printWindow = window.open('', '_blank');
    let html = `
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
        <p>Periode: ${new Date(dateFrom.value).toLocaleDateString('id-ID')} s/d ${new Date(dateTo.value).toLocaleDateString('id-ID')}</p>
        
        <div class="summary">
          <div class="card">
            <div>TOTAL TRANSAKSI</div>
            <div class="card-value">${document.getElementById('rep-total-transaksi').textContent}</div>
          </div>
          <div class="card">
            <div>DANA MASUK (DP+LUNAS)</div>
            <div class="card-value" style="color:green;">${document.getElementById('rep-total-masuk').textContent}</div>
          </div>
          <div class="card">
            <div>SISA PIUTANG</div>
            <div class="card-value" style="color:red;">${document.getElementById('rep-total-piutang').textContent}</div>
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
    `;

    currentData.forEach(b => {
      html += `
        <tr>
          <td>${new Date(b.tanggal).toLocaleDateString('id-ID')}</td>
          <td>${b.idPesanan}</td>
          <td>${b.nama}</td>
          <td>${b.raftingType}</td>
          <td class="right">${b.jumlahPerahu}</td>
          <td class="right">${formatRp(b.totalPesanan)}</td>
          <td class="right">${formatRp(b.dp)}</td>
          <td class="right">${formatRp(b.kurangBayar)}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
        <div style="margin-top:30px; text-align:right; font-size:10px; color:#999;">
          Di-generate pada: ${new Date().toLocaleString('id-ID')}
        </div>
        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
      </html>
    `;

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
      const map = {};
      const pesananMap = {};

      const start = new Date(fromVal);
      const end = new Date(toVal);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        pesananMap[key] = { orders: 0, boats: 0 };
      }

      currentData.forEach(b => {
        const val = Number(b.totalPesanan) || 0;
        const dt = b.tanggal;
        if (!map[dt]) map[dt] = 0;
        map[dt] += val;

        if (pesananMap[dt] !== undefined) {
          pesananMap[dt].orders++;
          pesananMap[dt].boats += (Number(b.jumlahPerahu) || 0);
        }
      });
      drawChart(map, fromVal, toVal);
      drawChartPesanan(pesananMap);
    }
  });

  // Init state from notification redirect
  if (localStorage.getItem('rep_focus_piutang') === 'true') {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 30);
    dateFrom.value = today.toISOString().split('T')[0];
    dateTo.value = future.toISOString().split('T')[0];
    
    if (chkPiutang) chkPiutang.checked = true;
    localStorage.removeItem('rep_focus_piutang');

    // Auto switch to Tamu Tab when redirected from bell
    tabTamu.click();
  }

  // Init load
  loadReport();
}
