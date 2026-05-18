// =====================================================
// LAB.LENS — Graph Module v3
// Enhancements: crosshair, phase colours, tangent line,
// pKa callout, buffer shading, zoom, 2nd derivative,
// draw animation, dark-mode colours, distance tooltip
// =====================================================

// ── Dark-mode helpers ──────────────────────────────
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function getThemeColors() {
  const dark = isDarkMode();
  return {
    grid:   dark ? '#374151' : '#f3f4f6',
    ticks:  dark ? '#9ca3af' : '#6b7280',
    titles: dark ? '#e5e7eb' : '#374151'
  };
}

// ── Line colour / tension ──────────────────────────
function getLineColor(sim) {
  if (sim.yLabel === 'pH') return '#0ea5e9';
  if (sim.yLabel.includes('mS')) return '#10b981';
  if (sim.yLabel.includes('mV')) return '#f59e0b';
  return '#0ea5e9';
}
function getCurveTension(sim) {
  if (sim.yLabel.includes('mS')) return 0;
  if (sim.yLabel.includes('mV')) return 0.2;
  return 0.35;
}

// ── Phase colours per data point ──────────────────
function getPhaseColors(labels, sim) {
  const eq = getActiveEquivalenceVolume();
  return labels.map(v => {
    if (v < eq - 2)  return '#60a5fa';  // pre-eq: blue
    if (v <= eq + 2) return '#ef4444';  // near-eq: red
    return '#34d399';                   // post-eq: green
  });
}

// ── Float-safe interpolation ──────────────────────
function interpolateChartData(labels, data, x) {
  if (!labels || labels.length === 0) return undefined;
  if (x <= labels[0]) return data[0];
  if (x >= labels[labels.length - 1]) return data[data.length - 1];
  for (let i = 0; i < labels.length - 1; i++) {
    if (x >= labels[i] && x <= labels[i + 1]) {
      const t = (x - labels[i]) / (labels[i + 1] - labels[i]);
      return data[i] + t * (data[i + 1] - data[i]);
    }
  }
  return data[data.length - 1];
}

// ── Crosshair plugin ──────────────────────────────
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw(chart) {
    if (!chart.tooltip._active || chart.tooltip._active.length === 0) return;
    const { x, y } = chart.tooltip._active[0].element;
    const { top, bottom, left, right } = chart.scales.y;
    const ctx = chart.ctx;
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(156,163,175,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, top);  ctx.lineTo(x, bottom); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y);  ctx.stroke();
    ctx.restore();
  }
};

// ── Equivalence line plugin (late-binding) ────────
function makeEquivalencePlugin(sim, expId) {
  return {
    id: 'equivalenceLine',
    afterDraw(chart) {
      const eq     = getActiveEquivalenceVolume();
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const labels = chart.data.labels;
      if (!labels || labels.length === 0) return;
      if (eq < labels[0] || eq > labels[labels.length - 1]) return;

      const xPx = xScale.getPixelForValue(eq);
      const ctx  = chart.ctx;

      // Vertical dashed line
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(xPx, yScale.top); ctx.lineTo(xPx, yScale.bottom); ctx.stroke();
      ctx.restore();

      // Label above
      ctx.save();
      ctx.fillStyle = '#ef4444'; ctx.font = '600 11px Inter, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Eq. Pt (' + eq + ' ml)', xPx, yScale.top - 6);
      ctx.restore();

      const eqValue = typeof getActiveEquivalenceValue === 'function' 
        ? getActiveEquivalenceValue() 
        : interpolateChartData(labels, chart.data.datasets[0].data, eq);
      if (eqValue !== undefined) {
        const yPx = yScale.getPixelForValue(eqValue);

        // Glowing dot
        ctx.save();
        ctx.shadowColor = '#ef444480'; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(xPx, yPx, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; ctx.fill();
        ctx.shadowBlur = 0; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();

        // Tangent line at equivalence (Exp 5 & 8)
        if (!sim.yLabel.includes('mS')) {
          const span = (labels[labels.length - 1] - labels[0]) * 0.12;
          const tY0 = interpolateChartData(labels, chart.data.datasets[0].data, eq - span);
          const tY1 = interpolateChartData(labels, chart.data.datasets[0].data, eq + span);
          if (tY0 !== undefined && tY1 !== undefined) {
            ctx.save();
            ctx.strokeStyle = '#f97316'; ctx.lineWidth = 1.8; ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(xScale.getPixelForValue(eq - span), yScale.getPixelForValue(tY0));
            ctx.lineTo(xScale.getPixelForValue(eq + span), yScale.getPixelForValue(tY1));
            ctx.stroke();
            ctx.restore();
          }
        }

        // Callout box
        const boxW = 170, boxH = 42;
        let boxX = xPx + 10;
        if (boxX + boxW > chart.chartArea.right) boxX = xPx - boxW - 10;
        const boxY = Math.max(yScale.top + 5, yPx - 50);
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.96)'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(0,0,0,0.12)'; ctx.shadowBlur = 6;
        roundRect(ctx, boxX, boxY, boxW, boxH, 6); ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ef4444'; ctx.font = '600 10px Inter, sans-serif'; ctx.textAlign = 'left';
        ctx.fillText('Equivalence Point', boxX + 8, boxY + 14);
        ctx.fillStyle = '#374151'; ctx.font = '500 10px Inter, sans-serif';
        const yUnit = sim.yLabel.includes('mS') ? ' mS/cm' : sim.yLabel.includes('mV') ? ' mV' : '';
        ctx.fillText('Vol: ' + eq + ' ml   ' + sim.yLabel.split(' ')[0] + ': ' + (Math.round(eqValue * 100) / 100) + yUnit, boxX + 8, boxY + 30);
        ctx.restore();
      }

      // Exp5: half-equivalence, buffer shading, pKa callout
      if (expId === 'exp5') {
        const heq   = Math.round(eq / 2 * 100) / 100;
        const heqPH = isCustomMode
          ? (typeof interpolateFromRows === 'function' ? interpolateFromRows(heq) : null)
          : (sim.halfEquivalencepH || 4.76);
        const heqPx = xScale.getPixelForValue(heq);

        // Buffer region shading (pKa ± ~20% of eq vol)
        const bufBand = eq * 0.2;
        const bxStart = xScale.getPixelForValue(Math.max(labels[0], heq - bufBand));
        const bxEnd   = xScale.getPixelForValue(Math.min(labels[labels.length - 1], heq + bufBand));
        ctx.save();
        ctx.fillStyle = 'rgba(139,92,246,0.07)';
        ctx.fillRect(bxStart, yScale.top, bxEnd - bxStart, yScale.bottom - yScale.top);
        ctx.restore();

        // ½-Eq vertical line
        ctx.save();
        ctx.setLineDash([4, 4]); ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(heqPx, yScale.top); ctx.lineTo(heqPx, yScale.bottom); ctx.stroke();
        ctx.restore();

        // pKa callout inside chart
        const heqYVal = interpolateChartData(labels, chart.data.datasets[0].data, heq);
        if (heqYVal !== undefined && heqPH !== null) {
          const heqYPx = yScale.getPixelForValue(heqYVal);
          const pkW = 152, pkH = 38;
          let pkX = heqPx + 8;
          if (pkX + pkW > chart.chartArea.right) pkX = heqPx - pkW - 8;
          const pkY = Math.max(yScale.top + 5, heqYPx - 45);
          ctx.save();
          ctx.fillStyle = 'rgba(237,233,254,0.96)'; ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 1.2;
          ctx.shadowColor = 'rgba(139,92,246,0.2)'; ctx.shadowBlur = 6;
          roundRect(ctx, pkX, pkY, pkW, pkH, 6); ctx.fill(); ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#6d28d9'; ctx.font = '600 10px Inter, sans-serif'; ctx.textAlign = 'left';
          ctx.fillText('½-Equivalence Point', pkX + 8, pkY + 14);
          ctx.fillStyle = '#374151'; ctx.font = '500 10px Inter, sans-serif';
          ctx.fillText('pH = pKa = ' + (typeof heqPH === 'number' ? heqPH.toFixed(2) : heqPH), pkX + 8, pkY + 29);
          ctx.restore();
        }
      }
    }
  };
}

// ── Best-fit lines plugin (Exp 6) ─────────────────
function makeBestFitPlugin(sim) {
  return {
    id: 'bestFitLines',
    afterDraw(chart) {
      if (!sim.yLabel.includes('mS')) return;
      const labels = chart.data.labels;
      const data   = chart.data.datasets[0].data;
      if (!labels || labels.length < 4) return;
      const xScale = chart.scales.x, yScale = chart.scales.y;
      const eq     = getActiveEquivalenceVolume();
      const ctx    = chart.ctx;
      const preX = [], preY = [], postX = [], postY = [];
      
      // Find the index of the minimum Y value
      let minIdx = 0;
      for (let i = 1; i < data.length; i++) {
        if (data[i] < data[minIdx]) minIdx = i;
      }
      
      labels.forEach((v, i) => {
        if (i <= minIdx) { preX.push(v); preY.push(data[i]); }
        if (i >= minIdx) { postX.push(v); postY.push(data[i]); }
      });
      function linReg(xs, ys) {
        const n = xs.length; if (n < 2) return null;
        const mx = xs.reduce((a,b)=>a+b,0)/n, my = ys.reduce((a,b)=>a+b,0)/n;
        let num = 0, den = 0;
        for (let i=0;i<n;i++){num+=(xs[i]-mx)*(ys[i]-my);den+=(xs[i]-mx)**2;}
        const slope = den ? num/den : 0;
        return { slope, intercept: my - slope*mx };
      }
      function drawFit(reg, x0, x1) {
        if (!reg) return;
        ctx.save(); ctx.strokeStyle = '#059669'; ctx.lineWidth = 1.8; ctx.setLineDash([8,4]);
        ctx.beginPath();
        ctx.moveTo(xScale.getPixelForValue(x0), yScale.getPixelForValue(reg.slope*x0+reg.intercept));
        ctx.lineTo(xScale.getPixelForValue(x1), yScale.getPixelForValue(reg.slope*x1+reg.intercept));
        ctx.stroke(); ctx.restore();
      }
      const xMin = labels[0], xMax = labels[labels.length-1];
      drawFit(linReg(preX, preY), xMin, eq);
      drawFit(linReg(postX, postY), eq, xMax);
      ctx.save(); ctx.fillStyle='#059669'; ctx.font='500 9px Inter,sans-serif'; ctx.textAlign='left';
      ctx.fillText('— Best-fit lines', xScale.getPixelForValue(xMin)+4, yScale.top+12); ctx.restore();
    }
  };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

// ── Main Graph ────────────────────────────────────
function renderGraph() {
  if (!activeExperiment || obsRows.length === 0) {
    document.getElementById('graph-no-data').style.display = 'block';
    document.getElementById('main-chart-container').style.display = 'none';
    return;
  }
  document.getElementById('graph-no-data').style.display = 'none';
  document.getElementById('main-chart-container').style.display = 'block';

  const sim    = activeExperiment.simulation;
  const expId  = activeExperiment.id;
  const labels = obsRows.map(r => r.vol);
  const values = obsRows.map(r => r.value);
  const lc     = getLineColor(sim);
  const theme  = getThemeColors();
  const eq     = getActiveEquivalenceVolume();

  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  chartInstance = new Chart(document.getElementById('mainChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: sim.yLabel, data: values,
        borderColor: lc, backgroundColor: lc + '18', borderWidth: 2.5,
        pointBackgroundColor: getPhaseColors(labels, sim),
        pointBorderColor: '#fff', pointBorderWidth: 1.5,
        pointRadius: 5, pointHoverRadius: 8,
        fill: true, tension: getCurveTension(sim)
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: items => sim.xLabel + ': ' + items[0].label + ' ml',
            label: item  => [
              sim.yLabel + ': ' + item.raw,
              'Dist. to Eq.Pt: ' + Math.abs(item.label - eq).toFixed(2) + ' ml'
            ]
          }
        },
        zoom: {
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' },
          pan:  { enabled: true, mode: 'xy' }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: sim.xLabel, font: { size:12, weight:'600' }, color: theme.titles },
          grid: { color: theme.grid }, ticks: { font: { size:11 }, color: theme.ticks }
        },
        y: {
          title: { display: true, text: sim.yLabel, font: { size:12, weight:'600' }, color: theme.titles },
          grid: { color: theme.grid }, ticks: { font: { size:11 }, color: theme.ticks }
        }
      }
    },
    plugins: [ makeEquivalencePlugin(sim, expId), makeBestFitPlugin(sim), crosshairPlugin ]
  });
}

// ── Mini Live Graph ───────────────────────────────
function renderMiniGraph() {
  if (!activeExperiment || obsRows.length < 2) return;
  const sim    = activeExperiment.simulation;
  const labels = obsRows.map(r => r.vol);
  const values = obsRows.map(r => r.value);
  const lc     = getLineColor(sim);

  if (miniChartInstance) {
    miniChartInstance.data.labels = labels;
    miniChartInstance.data.datasets[0].data = values;
    miniChartInstance.data.datasets[0].pointBackgroundColor = getPhaseColors(labels, sim);
    miniChartInstance.update('active');
    return;
  }
  miniChartInstance = new Chart(document.getElementById('miniChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: values, borderColor: lc, backgroundColor: lc + '22', borderWidth: 2,
        pointRadius: 2.5, pointBackgroundColor: getPhaseColors(labels, sim),
        fill: true, tension: getCurveTension(sim)
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 200 },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { type:'linear', grid:{ display:false }, ticks:{ font:{size:9}, color:'#9ca3af', maxTicksLimit:6 } },
        y: { grid:{ color:'#f9fafb' }, ticks:{ font:{size:9}, color:'#9ca3af', maxTicksLimit:5 } }
      }
    }
  });
}

// ── 1st Derivative Graph (Exp 8) ΔE/ΔV ──────────
function renderDerivativeGraph() {
  if (!activeExperiment || activeExperiment.id !== 'exp8' || obsRows.length < 3) return;
  const derivLabels = [], derivValues = [];
  for (let i = 1; i < obsRows.length; i++) {
    const dV = obsRows[i].vol - obsRows[i-1].vol;
    const dE = obsRows[i].value - obsRows[i-1].value;
    if (dV > 0) {
      derivLabels.push(Math.round((obsRows[i].vol + obsRows[i-1].vol) / 2 * 10) / 10);
      derivValues.push(Math.round((dE / dV) * 10) / 10);
    }
  }
  const midRows    = derivLabels.map((v,i) => ({ vol:v, value:derivValues[i] }));
  const displayPeak = parabolicPeakVolume(midRows);

  if (derivChartInstance) { derivChartInstance.destroy(); derivChartInstance = null; }

  const peakPlugin = {
    id: 'derivPeak',
    afterDraw(chart) {
      const xPx  = chart.scales.x.getPixelForValue(displayPeak);
      const yVal = interpolateChartData(chart.data.labels, chart.data.datasets[0].data, displayPeak);
      const yPx  = yVal !== undefined ? chart.scales.y.getPixelForValue(yVal) : chart.scales.y.top;
      const ctx  = chart.ctx;
      ctx.save();
      ctx.setLineDash([5,4]); ctx.strokeStyle='#ef4444'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(xPx, chart.scales.y.top); ctx.lineTo(xPx, chart.scales.y.bottom); ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowColor='#ef444460'; ctx.shadowBlur=8;
      ctx.beginPath(); ctx.arc(xPx, yPx, 7, 0, Math.PI*2);
      ctx.fillStyle='#ef4444'; ctx.fill();
      ctx.shadowBlur=0; ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle='#ef4444'; ctx.font='600 11px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText('Eq. Pt ≈ ' + displayPeak + ' ml', xPx, chart.scales.y.top - 6);
      ctx.restore();
    }
  };
  const theme = getThemeColors();
  derivChartInstance = new Chart(document.getElementById('derivChart'), {
    type: 'line',
    data: {
      labels: derivLabels,
      datasets: [{
        label: 'ΔE/ΔV (mV/ml)', data: derivValues,
        borderColor: '#ef4444', backgroundColor: '#fca5a520',
        borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#ef4444',
        fill: true, tension: 0.3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: items => 'Volume: ' + items[0].label + ' ml',
            label: item  => 'ΔE/ΔV: ' + item.raw + ' mV/ml'
          }
        }
      },
      scales: {
        x: { type:'linear', title:{ display:true, text:'Volume of K₂Cr₂O₇ Added (ml)', font:{size:12,weight:'600'}, color:theme.titles }, grid:{color:theme.grid}, ticks:{font:{size:11},color:theme.ticks} },
        y: { title:{ display:true, text:'ΔE/ΔV (mV/ml)', font:{size:12,weight:'600'}, color:theme.titles }, grid:{color:theme.grid}, ticks:{font:{size:11},color:theme.ticks} }
      }
    },
    plugins: [peakPlugin, crosshairPlugin]
  });
}

// ── 2nd Derivative Graph (Exp 8) d²E/dV² ─────────
function renderSecondDerivativeGraph() {
  if (!activeExperiment || activeExperiment.id !== 'exp8' || obsRows.length < 4) return;

  // Step 1: first derivative midpoints
  const firstDeriv = [];
  for (let i = 1; i < obsRows.length; i++) {
    const dV = obsRows[i].vol - obsRows[i-1].vol;
    if (dV <= 0) continue;
    firstDeriv.push({
      vol: (obsRows[i].vol + obsRows[i-1].vol) / 2,
      value: (obsRows[i].value - obsRows[i-1].value) / dV
    });
  }

  // Step 2: second derivative midpoints
  const sd2Labels = [], sd2Values = [];
  for (let i = 1; i < firstDeriv.length; i++) {
    const dV = firstDeriv[i].vol - firstDeriv[i-1].vol;
    if (dV <= 0) continue;
    sd2Labels.push(Math.round((firstDeriv[i].vol + firstDeriv[i-1].vol) / 2 * 10) / 10);
    sd2Values.push(Math.round((firstDeriv[i].value - firstDeriv[i-1].value) / dV * 10) / 10);
  }

  // Zero-crossing = equivalence point (sign change)
  let zeroCrossX = null;
  for (let i = 0; i < sd2Values.length - 1; i++) {
    if (sd2Values[i] * sd2Values[i+1] <= 0) {
      const t = sd2Values[i] / (sd2Values[i] - sd2Values[i+1]);
      zeroCrossX = Math.round((sd2Labels[i] + t * (sd2Labels[i+1] - sd2Labels[i])) * 100) / 100;
      break;
    }
  }

  if (sd2ChartInstance) { sd2ChartInstance.destroy(); sd2ChartInstance = null; }

  const zeroCrossPlugin = {
    id: 'zeroCross',
    afterDraw(chart) {
      if (zeroCrossX === null) return;
      const xPx = chart.scales.x.getPixelForValue(zeroCrossX);
      const ctx  = chart.ctx;
      ctx.save();
      ctx.setLineDash([5,4]); ctx.strokeStyle='#ef4444'; ctx.lineWidth=1.8;
      ctx.beginPath(); ctx.moveTo(xPx, chart.scales.y.top); ctx.lineTo(xPx, chart.scales.y.bottom); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#ef4444'; ctx.font='600 11px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText('Eq. Pt (zero-cross) ≈ ' + zeroCrossX + ' ml', xPx, chart.scales.y.top - 6);
      ctx.restore();
    }
  };

  // Zero line
  const zeroLinePlugin = {
    id: 'zeroLine',
    afterDraw(chart) {
      const yZero = chart.scales.y.getPixelForValue(0);
      const ctx   = chart.ctx;
      ctx.save();
      ctx.strokeStyle = 'rgba(100,100,100,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(chart.chartArea.left, yZero); ctx.lineTo(chart.chartArea.right, yZero); ctx.stroke();
      ctx.restore();
    }
  };

  const theme = getThemeColors();
  sd2ChartInstance = new Chart(document.getElementById('sd2Chart'), {
    type: 'line',
    data: {
      labels: sd2Labels,
      datasets: [{
        label: 'd²E/dV² (mV/ml²)', data: sd2Values,
        borderColor: '#a855f7', backgroundColor: '#a855f720',
        borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#a855f7',
        fill: true, tension: 0.3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: items => 'Volume: ' + items[0].label + ' ml',
            label: item  => 'd²E/dV²: ' + item.raw + ' mV/ml²'
          }
        }
      },
      scales: {
        x: { type:'linear', title:{ display:true, text:'Volume of K₂Cr₂O₇ Added (ml)', font:{size:12,weight:'600'}, color:theme.titles }, grid:{color:theme.grid}, ticks:{font:{size:11},color:theme.ticks} },
        y: { title:{ display:true, text:'d²E/dV² (mV/ml²)', font:{size:12,weight:'600'}, color:theme.titles }, grid:{color:theme.grid}, ticks:{font:{size:11},color:theme.ticks} }
      }
    },
    plugins: [zeroCrossPlugin, zeroLinePlugin, crosshairPlugin]
  });
}
