// =====================================================
// LAB.LENS — Main Application Logic (Enhanced v2)
// =====================================================

const EXPERIMENTS = [
  {
    id: "exp5",
    name: "Exp 5: pH-Metric Titration",
    category: "pH-Metric",
    info: {
      aim: "To determine the dissociation constant of a weak acid (acetic acid) using a pH meter by pH-metric titration of weak acid with strong base (NaOH).",
      chemicals: "Sodium Hydroxide (NaOH, 0.1N), Acetic Acid / CH₃COOH (weak acid), HCl buffer solution (for pH meter calibration).",
      apparatus: "pH meter, glass electrode, burette (50ml), pipette, beaker (100ml).",
      procedure: [
        "Calibrate the pH meter using standard buffer solution. Wash the electrode with distilled water.",
        "Take 30 ml of weak acid (acetic acid) in a 100 ml beaker. Dip the electrode into it.",
        "Measure and record the initial pH of the solution.",
        "Add NaOH from the burette in small increments and record the pH after each addition.",
        "Continue adding NaOH well beyond the neutralization point.",
        "Plot a graph of pH vs. volume of NaOH added.",
        "Determine the equivalence point from the steepest part of the S-shaped curve.",
        "Calculate Ka using Henderson-Hasselbalch: pH = pKa + log([salt]/[acid])."
      ]
    },
    formulas: {
      title: "Henderson-Hasselbalch Equation",
      theory: "The dissociation constant ($K_a$) of a weak acid can be found using the Henderson-Hasselbalch equation. At the half-equivalence point, exactly half of the weak acid has been neutralized into its conjugate base.",
      equation: "$$ \\text{pH} = pK_a + \\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right) $$",
      derivation: [
        "At $\\frac{1}{2}$ Equivalence Volume, $[\\text{Salt}] = [\\text{Acid}]$",
        "Therefore, $\\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right) = \\log_{10}(1) = 0$",
        "This simplifies to: $$\\text{pH} = pK_a$$",
        "Finally, $K_a$ is calculated as: $$K_a = 10^{-\\text{pH}}$$ (at $\\frac{1}{2}$ eq. volume)"
      ]
    },
    images: [
      "Material/exp-5.1.jpeg",
      "Material/ex-5.2.jpeg",
      "Material/exp-5.3.jpeg",
      "Material/exp-5.4.jpeg"
    ],
    simulation: {
      acid: "Acetic Acid / CH₃COOH (30 ml, 0.1N)",
      titrant: "NaOH (0.1N) — filled in burette",
      xLabel: "Volume of NaOH Added (ml)",
      yLabel: "pH",
      maxVolume: 50,
      equivalenceVolume: 30,          // fallback only — runtime uses parabolic calc
      titrantConcentration: 0.1,      // N  — NaOH
      analyteVolume: 30,              // ml — acetic acid taken
      analyteConcentration: 0.1,      // N  — acetic acid
      data: [
        [0, 2.88], [2, 3.61], [4, 3.95], [6, 4.16], [8, 4.32],
        [10, 4.46], [12, 4.58], [14, 4.70], [15, 4.76], [16, 4.82],
        [18, 4.94], [20, 5.06], [22, 5.20], [24, 5.36], [25, 5.46],
        [26, 5.57], [27, 5.71], [28, 5.91], [28.5, 6.04], [29, 6.22],
        [29.5, 6.53], [29.8, 6.93], [30, 8.73], [30.2, 10.52], [30.5, 10.92],
        [31, 11.21], [31.5, 11.39], [32, 11.51], [33, 11.68], [34, 11.80],
        [35, 11.89], [36, 11.96], [38, 12.07], [40, 12.15], [45, 12.30], [50, 12.40]
      ]
    }
  },
  {
    id: "exp6",
    name: "Exp 6: Conductometric Titration",
    category: "Conductometric",
    info: {
      aim: "Titration of strong acid (HCl) with strong base (NaOH) using a conductivity meter to determine the equivalence point and strength of the acid.",
      chemicals: "Hydrochloric acid HCl (0.1N, 25ml in beaker), Sodium Hydroxide NaOH (0.1N, in burette).",
      apparatus: "Conductivity meter, conductivity cell (electrodes), burette (50ml), pipette, beaker (100ml), micro burette.",
      procedure: [
        "Clean all apparatus with distilled water.",
        "Fill the burette with 0.1N NaOH solution.",
        "Take 25 ml of HCl (0.1N) in a beaker.",
        "Dip the conductivity electrodes into the beaker.",
        "Record initial conductance of HCl solution.",
        "Add NaOH in increments of 1 ml and record conductance after each addition.",
        "Plot conductance vs. volume of NaOH added.",
        "Find the equivalence point at the minimum of the V-shaped curve.",
        "Calculate N₂ = N₁V₁ / V₂ to find strength of NaOH."
      ]
    },
    formulas: {
      title: "Normality and Strength Calculation",
      theory: "The unknown normality of the Acid is found using the Law of Equivalence ($N_1V_1 = N_2V_2$). Once normality is found, the strength in g/L is calculated using the Equivalent Weight.",
      equation: "$$ N_{\\text{Acid}} = \\frac{N_{\\text{Base}} \\times V_{\\text{Base}}}{V_{\\text{Acid}}} $$",
      derivation: [
        "$N_{\\text{Base}} =$ Normality of NaOH (0.1 N)",
        "$V_{\\text{Base}} =$ Equivalence volume (from the intersection of the two best-fit lines on the graph)",
        "$V_{\\text{Acid}} =$ Volume of HCl taken in beaker (25 ml)",
        "$\\text{Strength (g/L)} = N_{\\text{Acid}} \\times \\text{Equivalent Weight of HCl (36.46)}$"
      ]
    },
    images: [
      "Material/exp-6.1.jpeg",
      "Material/exp-6.2.jpeg",
      "Material/exp-6.3.jpeg",
      "Material/exp-6.4.jpeg"
    ],
    simulation: {
      acid: "HCl (25 ml, 0.1N)",
      titrant: "NaOH (0.1N) — filled in burette",
      xLabel: "Volume of NaOH Added (ml)",
      yLabel: "Conductance (mS/cm)",
      maxVolume: 50,
      equivalenceVolume: 25,          // fallback only — runtime uses min-Y calc
      titrantConcentration: 0.1,      // N  — NaOH
      analyteVolume: 25,              // ml — HCl taken
      analyteConcentration: 0.1,      // N  — HCl (to be confirmed by calculation)
      data: [
        [0, 412.0], [1, 394.5], [2, 377.2], [3, 360.1], [4, 343.2],
        [5, 326.5], [6, 310.0], [7, 293.8], [8, 277.8], [9, 262.0],
        [10, 246.5], [11, 231.2], [12, 216.1], [13, 201.3], [14, 186.7],
        [15, 172.4], [16, 158.3], [17, 144.5], [18, 130.9], [19, 117.6],
        [20, 104.5], [21, 91.7], [22, 79.2], [23, 54.8], [24, 28.4],
        [25, 5.2], [26, 26.0], [27, 46.5], [28, 66.8], [29, 86.8],
        [30, 106.5], [31, 126.0], [32, 145.3], [33, 164.3], [34, 183.0],
        [35, 201.5], [36, 219.8], [38, 255.8], [40, 291.2], [42, 326.0],
        [44, 360.2], [46, 393.8], [48, 427.0], [50, 459.5]
      ]
    }
  },
  {
    id: "exp8",
    name: "Exp 8: Potentiometric Titration",
    category: "Potentiometric",
    info: {
      aim: "Determination of the amount of ferrous ions (Fe²⁺) by titrating against standard Potassium Dichromate (K₂Cr₂O₇) solution potentiometrically.",
      chemicals: "Ferrous Ammonium Sulphate (FAS) solution, K₂Cr₂O₇ (standard, 0.1N), Dilute H₂SO₄ (2N), distilled water.",
      apparatus: "Potentiometer, platinum electrode (indicator), calomel electrode (reference), burette (50ml), beakers, standard flask (250ml), glass rod.",
      procedure: [
        "Calibrate the potentiometer as per the instrument manual.",
        "Connect calomel electrode to negative terminal and Pt electrode to positive terminal.",
        "Take 25 ml of ferrous ion solution in a 250 ml beaker. Add 40 ml of 2N H₂SO₄.",
        "Fill burette with standard K₂Cr₂O₇ solution (0.1N).",
        "Record initial potential (E) in mV.",
        "Add 0.5 ml K₂Cr₂O₇ at a time; record potential E after each addition.",
        "Near the equivalence point, add drops at a time (0.1 ml).",
        "Plot E vs. volume of K₂Cr₂O₇ added (sigmoidal curve).",
        "Also plot ΔE/ΔV vs. volume — the peak gives the equivalence point.",
        "Calculate strength of FAS using the equivalence volume."
      ]
    },
    formulas: {
      title: "Potentiometric Equivalence and Strength",
      theory: "The equivalence point corresponds to the steepest rise in potential, found at the peak of the first derivative graph ($\\Delta E / \\Delta V$). The amount of Ferrous ions is calculated using the standard normality equation.",
      equation: "$$ N_{\\text{FAS}} = \\frac{N_{\\text{K}_2\\text{Cr}_2\\text{O}_7} \\times V_{\\text{K}_2\\text{Cr}_2\\text{O}_7}}{V_{\\text{FAS}}} $$",
      derivation: [
        "$N_1 = $ Normality of $\\text{K}_2\\text{Cr}_2\\text{O}_7$ (0.1 N)",
        "$V_1 = $ Equivalence volume from the peak of the derivative graph",
        "$V_2 = $ Volume of FAS solution pipetted (25 ml)",
        "$\\text{Equivalent Weight of FAS (Mohr's Salt)} = 392.14 \\text{ g/eq}$ (since n-factor for $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+}$ is 1)",
        "$\\text{Strength (g/L)} = N_{\\text{FAS}} \\times 392.14$"
      ]
    },
    images: [
      "Material/exp-8.1.jpeg",
      "Material/exp-8.2.jpeg",
      "Material/exp-8.3.jpeg",
      "Material/exp-8.4.jpeg"
    ],
    simulation: {
      acid: "Ferrous Ammonium Sulphate / Fe²⁺ solution (25 ml) + 40 ml 2N H₂SO₄",
      titrant: "K₂Cr₂O₇ (0.1N) — filled in burette",
      xLabel: "Volume of K₂Cr₂O₇ Added (ml)",
      yLabel: "Potential E (mV)",
      maxVolume: 40,
      equivalenceVolume: 25,          // fallback only — runtime uses parabolic calc
      titrantConcentration: 0.1,      // N  — K₂Cr₂O₇
      analyteVolume: 25,              // ml — FAS solution pipetted
      analyteEW: 392.14,             // g/eq — FAS (Mohr's salt), n=1 for Fe²⁺ oxidation
      data: [
        [0, 335], [1, 337], [2, 340], [3, 343], [4, 346],
        [5, 349], [6, 353], [7, 357], [8, 361], [9, 366],
        [10, 371], [11, 376], [12, 382], [13, 389], [14, 396],
        [15, 405], [16, 415], [17, 427], [18, 441], [19, 460],
        [20, 484], [21, 516], [22, 562], [23, 630], [24, 726],
        [24.5, 790], [24.8, 852], [24.9, 906], [25.0, 980], [25.1, 1048],
        [25.2, 1092], [25.5, 1138], [26, 1168], [27, 1186], [28, 1194],
        [29, 1198], [30, 1200], [32, 1202], [35, 1203], [38, 1204], [40, 1204]
      ]
    }
  }
];

// =====================================================
// STATE
// =====================================================
let activeExperiment = null;
let obsRows = [];
let totalVolume = 0;
let chartInstance = null;
let miniChartInstance = null;
let derivChartInstance = null;
let sd2ChartInstance = null;
let showingDerivative = false;
let showingSD2 = false;

// =====================================================
// MEMORY MANAGEMENT
// =====================================================
function destroyAllCharts() {
  if (chartInstance)    { chartInstance.destroy();    chartInstance    = null; }
  if (miniChartInstance){ miniChartInstance.destroy(); miniChartInstance = null; }
  if (derivChartInstance){ derivChartInstance.destroy(); derivChartInstance = null; }
  if (sd2ChartInstance) { sd2ChartInstance.destroy();  sd2ChartInstance  = null; }
}

// =====================================================
// SHARED: PARABOLIC PEAK VOLUME  (high-precision inflection)
// =====================================================
/**
 * Given sorted [{vol, value}] rows, finds the volume of the
 * steepest absolute slope using parabolic (Lagrange) refinement
 * around the peak — shared by getActiveEquivalenceVolume and
 * renderDerivativeGraph so both use identical precision.
 */
function parabolicPeakVolume(sortedRows) {
  if (sortedRows.length < 2) return sortedRows[0]?.vol ?? 0;
  const mids = [], derivs = [];
  let peakIdx = 0, maxD = -Infinity;
  for (let i = 1; i < sortedRows.length; i++) {
    const dV = sortedRows[i].vol - sortedRows[i - 1].vol;
    if (dV <= 0) continue;
    const d = Math.abs((sortedRows[i].value - sortedRows[i - 1].value) / dV);
    const midV = (sortedRows[i].vol + sortedRows[i - 1].vol) / 2;
    mids.push(midV); derivs.push(d);
    if (d > maxD) { maxD = d; peakIdx = mids.length - 1; }
  }
  if (mids.length === 0) return sortedRows[sortedRows.length - 1].vol;
  // Parabolic refinement using 3 surrounding points
  if (peakIdx > 0 && peakIdx < mids.length - 1) {
    const x0 = mids[peakIdx - 1], y0 = derivs[peakIdx - 1];
    const x1 = mids[peakIdx],     y1 = derivs[peakIdx];
    const x2 = mids[peakIdx + 1], y2 = derivs[peakIdx + 1];
    const num = x0*x0*(y1-y2) + x1*x1*(y2-y0) + x2*x2*(y0-y1);
    const den =    x0*(y1-y2) +    x1*(y2-y0) +    x2*(y0-y1);
    if (Math.abs(den) > 1e-9)
      return Math.round(num / (2 * den) * 100) / 100;
  }
  return Math.round(mids[peakIdx] * 100) / 100;
}

// =====================================================
// DYNAMIC EQUIVALENCE POINT  (single source of truth)
// =====================================================
/**
 * Returns the computed equivalence volume from actual data.
 * - Simulation mode : computes from full sim.data (self-validates)
 * - Custom mode     : computes from user's obsRows
 * Both modes use parabolicPeakVolume for pH/mV, min-Y for conductance.
 * Falls back to sim.equivalenceVolume only if data is insufficient.
 */
function getActiveEquivalenceVolume() {
  if (!activeExperiment) return 0;
  const sim = activeExperiment.simulation;

  // Choose dataset: custom rows if available, else full sim.data as rows
  let rows;
  if (isCustomMode && obsRows.length >= 2) {
    rows = obsRows.map(r => ({ vol: r.vol, value: r.value }));
  } else if (!isCustomMode && obsRows.length >= 2) {
    // Simulation mode with recorded obs: use those
    rows = obsRows.map(r => ({ vol: r.vol, value: r.value }));
  } else if (sim.data && sim.data.length >= 2) {
    // Nothing recorded yet — derive from full sim.data
    rows = sim.data.map(([vol, value]) => ({ vol, value }));
  } else {
    return sim.equivalenceVolume; // last resort fallback
  }

  const sorted = rows.slice().sort((a, b) => a.vol - b.vol);

  if (sim.yLabel.includes('mS')) {
    // Conductance V-shape: intersection of best-fit lines
    const minRow = sorted.reduce((best, r) => r.value < best.value ? r : best);
    if (sorted.length < 4) return minRow.vol;

    // Split at minimum Y to form two line segments
    const pre = sorted.filter(r => r.vol <= minRow.vol);
    const post = sorted.filter(r => r.vol >= minRow.vol);

    if (pre.length < 2 || post.length < 2) return minRow.vol;

    function linReg(pts) {
      const n = pts.length;
      const mx = pts.reduce((sum, p) => sum + p.vol, 0) / n;
      const my = pts.reduce((sum, p) => sum + p.value, 0) / n;
      let num = 0, den = 0;
      for (let i = 0; i < n; i++) {
        num += (pts[i].vol - mx) * (pts[i].value - my);
        den += Math.pow(pts[i].vol - mx, 2);
      }
      const slope = den !== 0 ? num / den : 0;
      return { slope, intercept: my - slope * mx };
    }

    const reg1 = linReg(pre);
    const reg2 = linReg(post);

    if (Math.abs(reg1.slope - reg2.slope) > 1e-6) {
      const intersectX = (reg2.intercept - reg1.intercept) / (reg1.slope - reg2.slope);
      // Ensure the intersection is within bounds
      if (intersectX >= sorted[0].vol && intersectX <= sorted[sorted.length - 1].vol) {
        return Math.round(intersectX * 100) / 100;
      }
    }
    return minRow.vol;
  }

  // pH / mV sigmoidal: max |ΔY/ΔV| with parabolic refinement
  return parabolicPeakVolume(sorted);
}

/**
 * Returns the computed equivalence Y value (pH, mS/cm, mV) matching the equivalence volume.
 * For conductometric titrations, evaluates the exact Y value on the intersecting linear regression line.
 */
function getActiveEquivalenceValue() {
  const eqVol = getActiveEquivalenceVolume();
  if (!activeExperiment) return null;
  const sim = activeExperiment.simulation;

  let rows;
  if (isCustomMode && obsRows.length >= 2) {
    rows = obsRows.map(r => ({ vol: r.vol, value: r.value }));
  } else if (!isCustomMode && obsRows.length >= 2) {
    rows = obsRows.map(r => ({ vol: r.vol, value: r.value }));
  } else if (sim.data && sim.data.length >= 2) {
    rows = sim.data.map(([vol, value]) => ({ vol, value }));
  } else {
    return null;
  }

  const sorted = rows.slice().sort((a, b) => a.vol - b.vol);

  if (sim.yLabel.includes('mS')) {
    const minRow = sorted.reduce((best, r) => r.value < best.value ? r : best);
    const pre = sorted.filter(r => r.vol <= minRow.vol);
    if (pre.length < 2) return minRow.value;
    const n = pre.length;
    const mx = pre.reduce((sum, p) => sum + p.vol, 0) / n;
    const my = pre.reduce((sum, p) => sum + p.value, 0) / n;
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) {
      num += (pre[i].vol - mx) * (pre[i].value - my);
      den += Math.pow(pre[i].vol - mx, 2);
    }
    const slope = den !== 0 ? num / den : 0;
    const intercept = my - slope * mx;
    return slope * eqVol + intercept;
  } else {
    if (eqVol <= sorted[0].vol) return sorted[0].value;
    if (eqVol >= sorted[sorted.length - 1].vol) return sorted[sorted.length - 1].value;
    for (let i = 0; i < sorted.length - 1; i++) {
      if (eqVol >= sorted[i].vol && eqVol <= sorted[i + 1].vol) {
        const t = (eqVol - sorted[i].vol) / (sorted[i + 1].vol - sorted[i].vol);
        return sorted[i].value + t * (sorted[i + 1].value - sorted[i].value);
      }
    }
    return sorted[sorted.length - 1].value;
  }
}

// =====================================================
// FLOAT-SAFE INTERPOLATION FROM obsRows
// =====================================================
/**
 * Linearly interpolates a Y value at target volume x
 * from the current obsRows array (avoids indexOf float failures).
 */
function interpolateFromRows(x) {
  if (obsRows.length === 0) return null;
  const sorted = [...obsRows].sort((a, b) => a.vol - b.vol);
  if (x <= sorted[0].vol) return sorted[0].value;
  if (x >= sorted[sorted.length - 1].vol) return sorted[sorted.length - 1].value;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (x >= sorted[i].vol && x <= sorted[i + 1].vol) {
      const t = (x - sorted[i].vol) / (sorted[i + 1].vol - sorted[i].vol);
      return sorted[i].value + t * (sorted[i + 1].value - sorted[i].value);
    }
  }
  return sorted[sorted.length - 1].value;
}

// Lightbox state
let lightboxImages = [];
let lightboxIndex = 0;

// =====================================================
// INIT
// =====================================================
window.onload = () => {
  renderSidebar(EXPERIMENTS);
  document.getElementById('search').addEventListener('input', onSearch);
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
};

// =====================================================
// SIDEBAR + MOBILE
// =====================================================
function renderSidebar(data) {
  const list = document.getElementById('exp-list');
  list.innerHTML = '';
  data.forEach(exp => {
    const btn = document.createElement('button');
    btn.className = 'exp-btn';
    btn.id = 'sidebar-' + exp.id;
    btn.textContent = exp.name;
    btn.onclick = () => { loadExperiment(exp); closeSidebarMobile(); };
    list.appendChild(btn);
  });
}

function onSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  const filtered = EXPERIMENTS.filter(ex =>
    ex.name.toLowerCase().includes(q) || ex.category.toLowerCase().includes(q)
  );
  renderSidebar(filtered);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('visible');
}

function closeSidebarMobile() {
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('visible');
  }
}

// =====================================================
// LIGHTBOX
// =====================================================
function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  lb.classList.add('active');
  updateLightboxImage();
  document.addEventListener('keydown', lightboxKeyHandler);
}

function updateLightboxImage() {
  document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex];
  document.getElementById('lightbox-counter').textContent =
    (lightboxIndex + 1) + ' / ' + lightboxImages.length;
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.removeEventListener('keydown', lightboxKeyHandler);
}

function lightboxKeyHandler(e) {
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'Escape') closeLightbox();
}

// =====================================================
// LOAD EXPERIMENT
// =====================================================
function loadExperiment(exp) {
  activeExperiment = exp;
  obsRows = [];
  totalVolume = 0;
  showingDerivative = false;
  showingSD2 = false;

  document.querySelectorAll('.exp-btn').forEach(b => b.classList.remove('active'));
  const sideBtn = document.getElementById('sidebar-' + exp.id);
  if (sideBtn) sideBtn.classList.add('active');

  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('exp-panel').style.display = 'flex';

  document.getElementById('exp-name').textContent = exp.name;
  document.getElementById('exp-category-badge').textContent = exp.category;

  // Info tab
  document.getElementById('info-aim').textContent = exp.info.aim;
  document.getElementById('info-chemicals').textContent = exp.info.chemicals;
  document.getElementById('info-apparatus').textContent = exp.info.apparatus;
  const procList = document.getElementById('info-procedure');
  procList.innerHTML = '';
  exp.info.procedure.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    procList.appendChild(li);
  });

  // Material images with lightbox
  const imgContainer = document.getElementById('material-images');
  imgContainer.innerHTML = '';
  const imgSrcs = exp.images;
  imgSrcs.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Reference material ' + (i + 1);
    img.title = 'Click to view larger';
    img.onclick = () => openLightbox(imgSrcs, i);
    imgContainer.appendChild(img);
  });

  // Formulas tab
  const f = exp.formulas;
  const formulasContent = document.getElementById('formulas-content');
  if (f && formulasContent) {
    formulasContent.innerHTML = `
      <div class="formula-visualization-card">
        <div class="formula-vis-header">
          <div class="formula-vis-icon">✨</div>
          <h3>${f.title}</h3>
        </div>
        <p class="formula-vis-theory">${f.theory}</p>
        
        <div class="formula-vis-equation-box">
          <div class="formula-vis-glow"></div>
          <div class="formula-vis-eq">${f.equation}</div>
        </div>

        <div class="formula-vis-steps-container">
          <h4 class="formula-vis-steps-title">Step-by-Step Logic Flow</h4>
          <div class="formula-vis-timeline">
            ${f.derivation.map((step, i) => `
              <div class="formula-vis-step" style="animation-delay: ${i * 0.15}s">
                <div class="step-number">${i + 1}</div>
                <div class="step-content">${step}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Re-render MathJax
    if (window.MathJax) {
      // Delay slightly to ensure DOM is updated
      setTimeout(() => {
        window.MathJax.typesetPromise([formulasContent]).catch((err) => console.log(err.message));
      }, 50);
    }
  }

  // Perform tab
  document.getElementById('perform-acid').textContent = exp.simulation.acid;
  document.getElementById('perform-titrant').textContent = exp.simulation.titrant;
  document.getElementById('obs-col-x').textContent = exp.simulation.xLabel;
  document.getElementById('obs-col-y').textContent = exp.simulation.yLabel;
  document.getElementById('status-y-label').textContent = exp.simulation.yLabel + ':';

  // Show/hide derivative & sd2 buttons for Exp 8
  const derivBtn = document.getElementById('btn-derivative');
  const sd2Btn   = document.getElementById('btn-sd2');
  const isExp8   = exp.id === 'exp8';
  derivBtn.style.display = isExp8 ? 'inline-flex' : 'none';
  derivBtn.textContent   = '📊 Show ΔE/ΔV Curve';
  sd2Btn.style.display   = isExp8 ? 'inline-flex' : 'none';
  sd2Btn.textContent     = '📉 Show d²E/dV²';

  // Mini graph label
  document.getElementById('mini-graph-label').textContent =
    exp.simulation.yLabel + ' vs ' + exp.simulation.xLabel;

  resetSimulationUI();
  updateBeakerVisual(0, null);

  destroyAllCharts();

  document.getElementById('graph-title-text').textContent =
    exp.simulation.yLabel + ' vs ' + exp.simulation.xLabel;
  document.getElementById('graph-no-data').style.display = 'block';
  document.getElementById('main-chart-container').style.display = 'none';
  document.getElementById('deriv-chart-container').style.display = 'none';
  document.getElementById('sd2-chart-container').style.display = 'none';
  document.getElementById('calc-panel').style.display = 'none';
  document.getElementById('custom-mode-banner').style.display = 'none';

  // Show mode selection modal for custom or default visualization
  showModeSelectionModal();
  switchTab('info');
}

// =====================================================
// SIMULATION
// =====================================================
function resetSimulationUI() {
  document.getElementById('status-volume').textContent = '0 ml';
  document.getElementById('status-value').textContent = '—';
  document.getElementById('status-endpoint').style.display = 'none';
  document.getElementById('btn-add').disabled = false;
  const tbody = document.getElementById('obs-body');
  tbody.innerHTML = '<tr id="obs-empty-row"><td colspan="3" class="empty-row">No readings yet. Add titrant to start.</td></tr>';
  document.getElementById('btn-plot').style.display = 'none';
  document.getElementById('mini-graph-panel').style.display = 'none';
}

function resetSimulation() {
  obsRows = [];
  totalVolume = 0;
  isCustomMode = false;
  customObsData = [];
  resetSimulationUI();
  destroyAllCharts();
  document.getElementById('graph-no-data').style.display = 'block';
  document.getElementById('main-chart-container').style.display = 'none';
  document.getElementById('deriv-chart-container').style.display = 'none';
  document.getElementById('calc-panel').style.display = 'none';
  document.getElementById('custom-mode-banner').style.display = 'none';
  updateBeakerVisual(0, null);
}

function addTitrant() {
  if (!activeExperiment) return;

  const amount = parseFloat(document.getElementById('vol-select').value);
  totalVolume = Math.round((totalVolume + amount) * 100) / 100;
  const sim = activeExperiment.simulation;

  if (totalVolume > sim.maxVolume) {
    totalVolume = Math.round((totalVolume - amount) * 100) / 100;
    document.getElementById('btn-add').disabled = true;
    return;
  }

  const value   = interpolate(sim.data, totalVolume);
  const rounded = Math.round(value * 100) / 100;
  obsRows.push({ vol: totalVolume, value: rounded });

  // Live rate badge
  const rateRow = document.getElementById('status-rate-row');
  const rateEl  = document.getElementById('status-rate');
  if (obsRows.length >= 2) {
    const prev = obsRows[obsRows.length - 2];
    const dV   = totalVolume - prev.vol;
    const dY   = rounded - prev.value;
    const rate = dV > 0 ? Math.round((dY / dV) * 100) / 100 : 0;
    const absRate = Math.abs(rate);
    rateEl.textContent = rate + ' ' + unitFor(sim.yLabel) + '/ml';
    rateEl.style.color = absRate < 1 ? '#10b981' : absRate < 5 ? '#f59e0b' : '#ef4444';
    rateRow.style.display = 'flex';
  }

  // Update status
  document.getElementById('status-volume').textContent = totalVolume + ' ml';
  document.getElementById('status-value').textContent = rounded + unitFor(sim.yLabel);

  // Update beaker visual
  updateBeakerVisual(totalVolume / sim.maxVolume, rounded);

  // Animate drop
  animateDrop();

  // Equivalence badge — uses dynamic equivalence point
  const eq = getActiveEquivalenceVolume();
  const diff = Math.abs(totalVolume - eq);
  const endBadge = document.getElementById('status-endpoint');
  const previousVol = obsRows.length >= 2 ? obsRows[obsRows.length - 2].vol : 0;
  const hasReachedOrPassed = totalVolume >= eq && previousVol < eq;

  if (totalVolume >= eq) {
    endBadge.textContent = '✅ At or Past Equivalence Point!';
    endBadge.style.background = '#d1fae5';
    endBadge.style.color = '#065f46';
    endBadge.style.display = 'block';
    showCalcPanel();
  } else if (diff <= 2) {
    endBadge.textContent = '⚠️ Near Equivalence Point!';
    endBadge.style.background = '#fef3c7';
    endBadge.style.color = '#92400e';
    endBadge.style.display = 'block';
  } else {
    endBadge.style.display = 'none';
  }

  // Update observation table
  const tbody = document.getElementById('obs-body');
  const emptyRow = document.getElementById('obs-empty-row');
  if (emptyRow) emptyRow.remove();
  const tr = document.createElement('tr');
  tr.className = 'new-row';
  tr.innerHTML = `<td>${obsRows.length}</td><td>${totalVolume}</td><td>${rounded}</td>`;
  tbody.appendChild(tr);
  // Auto-scroll table to bottom
  const tableWrap = document.querySelector('.table-wrap');
  if (tableWrap) tableWrap.scrollTop = tableWrap.scrollHeight;

  if (obsRows.length >= 2) {
    document.getElementById('btn-plot').style.display = 'block';
    document.getElementById('mini-graph-panel').style.display = 'block';
    renderMiniGraph();
  }

  // Live-update main graph if on graph tab
  if (document.getElementById('tab-content-graph').classList.contains('active')) {
    renderGraph();
  }

  if (totalVolume >= sim.maxVolume) {
    document.getElementById('btn-add').disabled = true;
  }
}

// =====================================================
// BEAKER VISUAL
// =====================================================
function getBeakerColor(expId, value, totalVol) {
  const eq = getActiveEquivalenceVolume();
  if (expId === 'exp5') {
    if (value === null || totalVol === 0) return '#dbeafe';
    if (totalVol < eq - 2) return '#dbeafe';
    if (totalVol < eq) return '#fce7f3';
    if (totalVol < eq + 3) return '#f9a8d4';
    return '#ec4899';
  }
  if (expId === 'exp6') {
    return '#bfdbfe';
  }
  if (expId === 'exp8') {
    if (totalVol < eq - 3) return '#86efac';
    if (totalVol < eq) return '#fde68a';
    return '#f97316';
  }
  return '#bfdbfe';
}

function updateBeakerVisual(fraction, value) {
  if (!activeExperiment) return;
  const sim = activeExperiment.simulation;
  const expId = activeExperiment.id;

  const color = getBeakerColor(expId, value, totalVolume);

  // SVG beaker liquid
  const liquidRect = document.getElementById('beaker-liquid-rect');
  if (liquidRect) {
    // beaker is 120 wide, liquid from y=10 to y=120 (110px total height)
    // fraction = how full from top
    const maxH = 100;
    const h = Math.min(maxH, Math.max(4, fraction * maxH));
    const y = 120 - h;
    liquidRect.setAttribute('y', y);
    liquidRect.setAttribute('height', h);
    liquidRect.setAttribute('fill', color);
  }

  // Burette fill (depletes as we add)
  const buretteFill = document.getElementById('burette-fill');
  if (buretteFill) {
    const buretteFraction = Math.max(0, 1 - fraction);
    buretteFill.style.height = (buretteFraction * 100) + '%';
    buretteFill.style.background = expId === 'exp5' ? '#93c5fd' :
      expId === 'exp6' ? '#6ee7b7' : '#fcd34d';
  }

  // Update reading badge
  const reading = document.getElementById('beaker-reading');
  if (reading) {
    reading.textContent = value !== null ? (value + unitFor(sim.yLabel)) : '—';
    reading.style.color = color === '#ec4899' || color === '#f97316' ? '#fff' : '#374151';
  }
}

function animateDrop() {
  const dropZone = document.getElementById('drop-zone');
  if (!dropZone) return;
  const drop = document.createElement('div');
  drop.className = 'titrant-drop';
  const expId = activeExperiment ? activeExperiment.id : '';
  drop.style.background = expId === 'exp5' ? '#93c5fd' :
    expId === 'exp6' ? '#6ee7b7' : '#fcd34d';
  dropZone.appendChild(drop);
  setTimeout(() => drop.remove(), 600);
}

// =====================================================
// CALCULATION PANEL
// =====================================================
function showCalcPanel() {
  if (!activeExperiment) return;
  const exp = activeExperiment;
  const sim = exp.simulation;
  const panel = document.getElementById('calc-panel');

  // ── Single source of truth: computed from graph data ──
  const eqVol = getActiveEquivalenceVolume();
  let html = '';

  if (exp.id === 'exp5') {
    // Helper: interpolate from active data (obsRows first, sim.data fallback)
    const activeInterp = (x) => {
      const fromRows = interpolateFromRows(x);
      if (fromRows !== null && !isNaN(fromRows)) return fromRows;
      return interpolate(sim.data, x);
    };

    // pH at equivalence — from the actual graph data
    const eqPH = activeInterp(eqVol);

    // Half-equivalence volume = eqVol / 2
    // Rationale: exactly half the titrant needed to reach eq. point has been added,
    // so [acid] = [salt], giving pH = pKa by Henderson-Hasselbalch.
    // This is DERIVED from the graph eqVol, not the theoretical config formula.
    const halfVol = Math.round(eqVol / 2 * 100) / 100;

    // pH at half-equivalence = pKa — from the actual graph data
    const halfPH_raw = activeInterp(halfVol);
    const halfPH = halfPH_raw !== null && !isNaN(halfPH_raw) ? halfPH_raw : null;
    const pKa   = halfPH;
    const Ka    = pKa !== null ? Math.pow(10, -pKa) : null;

    html = `
      <div class="formula-visualization-card" style="margin-bottom: 24px;">
        <div class="formula-vis-header">
          <div class="formula-vis-icon">🧮</div>
          <h3>Calculations (Henderson-Hasselbalch)</h3>
        </div>
        <p class="formula-vis-theory">Live calculated results based on your titration graph.</p>
        <div class="calc-grid">
          <div class="calc-item"><span>Equivalence Point (graph)</span><strong>${eqVol} ml</strong></div>
          <div class="calc-item"><span>pH at equivalence</span><strong>${eqPH.toFixed(2)}</strong></div>
          <div class="calc-item"><span>Half-equiv. Vol = Eq÷2</span><strong>${halfVol} ml</strong></div>
          <div class="calc-item"><span>pH = pKa at ½-eq (graph)</span><strong>${halfPH !== null ? halfPH.toFixed(2) : 'N/A'}</strong></div>
          <div class="calc-item"><span>pKa (from graph)</span><strong>${pKa !== null ? pKa.toFixed(2) : 'N/A'}</strong></div>
          <div class="calc-item"><span>Ka = $10^{-\\text{pKa}}$</span><strong>${Ka !== null ? Ka.toExponential(2) : 'N/A'}</strong></div>
        </div>
      </div>`;

  } else if (exp.id === 'exp6') {
    // Helper: interpolate conductance from active data
    const activeInterp6 = (x) => {
      const fromRows = interpolateFromRows(x);
      if (fromRows !== null && !isNaN(fromRows)) return fromRows;
      return interpolate(sim.data, x);
    };
    const N1 = sim.titrantConcentration;   // N — NaOH
    const V1 = eqVol;                      // ml — from graph
    const V2 = sim.analyteVolume;          // ml — HCl taken
    const N2 = (N1 * V1) / V2;            // N₂ by N₁V₁ = N₂V₂
    const EW_HCl = 36.46;
    const strength_gL = N2 * EW_HCl;
    const condAtEq = getActiveEquivalenceValue();

    html = `
      <div class="formula-visualization-card" style="margin-bottom: 24px;">
        <div class="formula-vis-header">
          <div class="formula-vis-icon">🧮</div>
          <h3>Calculations ($N_1V_1 = N_2V_2$)</h3>
        </div>
        <p class="formula-vis-theory">Live calculated results based on your titration graph.</p>
        <div class="calc-grid">
          <div class="calc-item"><span>Equivalence Point (graph)</span><strong>${eqVol} ml</strong></div>
          <div class="calc-item"><span>Conductance at eq. pt.</span><strong>${condAtEq !== null ? condAtEq.toFixed(2) + ' mS/cm' : 'N/A'}</strong></div>
          <div class="calc-item"><span>N(NaOH) = $N_1$</span><strong>${N1.toFixed(2)} N</strong></div>
          <div class="calc-item"><span>V(NaOH) = $V_1$</span><strong>${V1} ml</strong></div>
          <div class="calc-item"><span>V(HCl) = $V_2$</span><strong>${V2} ml</strong></div>
          <div class="calc-item"><span>N(HCl) = $\\frac{N_1V_1}{V_2}$</span><strong>${N2.toFixed(4)} N</strong></div>
          <div class="calc-item"><span>Strength of HCl</span><strong>${strength_gL.toFixed(4)} g/L</strong></div>
        </div>
      </div>`;

  } else if (exp.id === 'exp8') {
    // Helper: interpolate E (mV) from active data
    const activeInterp8 = (x) => {
      const fromRows = interpolateFromRows(x);
      if (fromRows !== null && !isNaN(fromRows)) return fromRows;
      return interpolate(sim.data, x);
    };
    const A      = sim.titrantConcentration;  // N — K₂Cr₂O₇
    const B      = eqVol;                     // ml — from graph
    const V_FAS  = sim.analyteVolume;         // ml — FAS pipetted
    const EW_FAS = sim.analyteEW;             // g/eq
    const C_FAS  = (A * B) / V_FAS;          // N — strength of FAS
    const W_FAS  = C_FAS * EW_FAS;           // g/dm³
    const eAtEq  = activeInterp8(eqVol);     // E in mV at eq. point from graph

    html = `
      <div class="formula-visualization-card" style="margin-bottom: 24px;">
        <div class="formula-vis-header">
          <div class="formula-vis-icon">🧮</div>
          <h3>Calculations (Potentiometric)</h3>
        </div>
        <p class="formula-vis-theory">Live calculated results based on your titration graph.</p>
        <div class="calc-grid">
          <div class="calc-item"><span>Equivalence Point (graph)</span><strong>${eqVol} ml</strong></div>
          <div class="calc-item"><span>E at equiv. pt. (graph)</span><strong>${eAtEq !== null ? Math.round(eAtEq) + ' mV' : 'N/A'}</strong></div>
          <div class="calc-item"><span>Strength K₂Cr₂O₇ (A)</span><strong>${A.toFixed(2)} N</strong></div>
          <div class="calc-item"><span>Vol K₂Cr₂O₇ (B)</span><strong>${B} ml</strong></div>
          <div class="calc-item"><span>Vol FAS pipetted</span><strong>${V_FAS} ml</strong></div>
          <div class="calc-item"><span>Strength FAS = $\\frac{A \\times B}{V}$</span><strong>${C_FAS.toFixed(4)} N</strong></div>
          <div class="calc-item"><span>Weight FAS per dm³</span><strong>${W_FAS.toFixed(2)} g/dm³</strong></div>
        </div>
      </div>`;
  }

  if (html) {
    panel.innerHTML = html;
    panel.style.display = 'block';
    
    // Re-render MathJax
    if (window.MathJax) {
      setTimeout(() => {
        window.MathJax.typesetPromise([panel]).catch((err) => console.log(err.message));
      }, 50);
    }
  }
}

// =====================================================
// EXPORT
// =====================================================
function exportCSV() {
  if (!activeExperiment || obsRows.length === 0) {
    alert('No data to export yet. Add some titrant first.');
    return;
  }
  const sim = activeExperiment.simulation;
  let csv = `Sr.,${sim.xLabel},${sim.yLabel}\n`;
  obsRows.forEach((row, i) => {
    csv += `${i + 1},${row.vol},${row.value}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = activeExperiment.id + '_observations.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function exportGraphPNG() {
  if (!chartInstance) {
    alert('No graph to export yet. Go to the Graph tab first.');
    return;
  }
  const canvas = document.getElementById('mainChart');
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = activeExperiment.id + '_graph.png';
  a.click();
}

// =====================================================
// INTERPOLATION & HELPERS
// =====================================================
function interpolate(data, x) {
  if (x <= data[0][0]) return data[0][1];
  if (x >= data[data.length - 1][0]) return data[data.length - 1][1];
  for (let i = 0; i < data.length - 1; i++) {
    if (x >= data[i][0] && x <= data[i + 1][0]) {
      const t = (x - data[i][0]) / (data[i + 1][0] - data[i][0]);
      return data[i][1] + t * (data[i + 1][1] - data[i][1]);
    }
  }
  return data[data.length - 1][1];
}

function unitFor(yLabel) {
  if (yLabel === 'pH') return '';
  if (yLabel.includes('mS')) return ' mS/cm';
  if (yLabel.includes('mV')) return ' mV';
  return '';
}

// =====================================================
// TAB SWITCHING
// =====================================================
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-tab="' + name + '"]').classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-content-' + name).classList.add('active');
  const rzBtn = document.getElementById('btn-reset-zoom');
  if (rzBtn) rzBtn.style.display = name === 'graph' ? 'inline-flex' : 'none';
  if (name === 'graph') {
    renderGraph();
  }
  if (name === 'graph' || name === 'formulas') {
    if (isCustomMode || document.getElementById('calc-panel').style.display !== 'none' || totalVolume >= getActiveEquivalenceVolume()) {
      showCalcPanel();
    }
  }
}

function switchToGraph() { switchTab('graph'); }
function switchToPerform() { switchTab('perform'); }

function toggleDerivativeGraph() {
  if (!activeExperiment || activeExperiment.id !== 'exp8') return;
  showingDerivative = !showingDerivative;
  const btn = document.getElementById('btn-derivative');
  btn.textContent = showingDerivative ? '📉 Hide ΔE/ΔV Curve' : '📊 Show ΔE/ΔV Curve';
  const dc = document.getElementById('deriv-chart-container');
  dc.style.display = showingDerivative ? 'block' : 'none';
  if (showingDerivative) renderDerivativeGraph();
}

function toggleSD2Graph() {
  if (!activeExperiment || activeExperiment.id !== 'exp8') return;
  showingSD2 = !showingSD2;
  const btn = document.getElementById('btn-sd2');
  btn.textContent = showingSD2 ? '📉 Hide d²E/dV²' : '📉 Show d²E/dV²';
  const dc = document.getElementById('sd2-chart-container');
  dc.style.display = showingSD2 ? 'block' : 'none';
  if (showingSD2) renderSecondDerivativeGraph();
}

function resetZoom() {
  if (chartInstance && chartInstance.resetZoom) chartInstance.resetZoom();
  if (derivChartInstance && derivChartInstance.resetZoom) derivChartInstance.resetZoom();
  if (sd2ChartInstance  && sd2ChartInstance.resetZoom)  sd2ChartInstance.resetZoom();
}

function printReport() {
  if (!activeExperiment) return;
  window.print();
}

// =====================================================
// CUSTOM OBSERVATIONS MODE
// =====================================================
let customObsData = [];
let isCustomMode = false;

function showModeSelectionModal() {
  const modal = document.getElementById('mode-modal');
  modal.style.display = 'flex';
  modal.classList.add('active');
}

function selectDefaultMode() {
  isCustomMode = false;
  document.getElementById('mode-modal').classList.remove('active');
  document.getElementById('mode-modal').style.display = 'none';
  switchTab('perform');
}

function openCustomObsForm() {
  // Close mode-modal if open
  const modeModal = document.getElementById('mode-modal');
  if (modeModal) { modeModal.classList.remove('active'); modeModal.style.display = 'none'; }

  if (!activeExperiment) return;

  const customModal = document.getElementById('custom-obs-modal');
  customModal.classList.add('active');
  customModal.style.display = 'flex';

  // Update labels in the form
  const sim = activeExperiment.simulation;
  document.getElementById('data-x-label').textContent = sim.xLabel;
  document.getElementById('data-y-label').textContent = sim.yLabel;

  // Reset form to step 1
  document.getElementById('step-count').style.display = 'block';
  document.getElementById('step-data').style.display = 'none';
  document.getElementById('step-confirm').style.display = 'none';

  document.getElementById('obs-count-input').value = '5';
  setTimeout(() => document.getElementById('obs-count-input').focus(), 100);
}

function closeCustomObsForm() {
  document.getElementById('custom-obs-modal').classList.remove('active');
  document.getElementById('custom-obs-modal').style.display = 'none';
  // Don't reopen mode modal — user may have opened form from Perform/Graph tab
}

function proceedToDataEntry() {
  const count = parseInt(document.getElementById('obs-count-input').value);

  if (isNaN(count) || count < 2 || count > 50) {
    alert('Please enter a number between 2 and 50');
    return;
  }

  customObsData = Array(count).fill(null).map(() => ({ x: '', y: '' }));

  // Generate input fields
  const inputsContainer = document.getElementById('data-inputs');
  inputsContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const row = document.createElement('div');
    row.className = 'data-input-row';
    row.innerHTML = `
      <div class="serial">${i + 1}</div>
      <input type="number" step="0.01" placeholder="X value" class="data-input-x" data-index="${i}" onchange="updateCustomData(${i}, 'x', this.value)">
      <input type="number" step="0.01" placeholder="Y value" class="data-input-y" data-index="${i}" onchange="updateCustomData(${i}, 'y', this.value)">
    `;
    inputsContainer.appendChild(row);
  }

  document.getElementById('step-count').style.display = 'none';
  document.getElementById('step-data').style.display = 'block';
  document.getElementById('step-confirm').style.display = 'none';
}

function updateCustomData(index, field, value) {
  if (customObsData[index]) {
    customObsData[index][field] = parseFloat(value) || '';
  }
}

function backToCountStep() {
  document.getElementById('step-count').style.display = 'block';
  document.getElementById('step-data').style.display = 'none';
  document.getElementById('step-confirm').style.display = 'none';
}

function submitCustomData() {
  const sim = activeExperiment.simulation;

  // 1. Filter complete rows
  const validData = customObsData.filter(d => d.x !== '' && d.y !== '');
  if (validData.length < 2) {
    alert('Please enter at least 2 complete data points (both X and Y values)');
    return;
  }

  // 2. Reject negative volumes
  if (validData.some(d => d.x < 0)) {
    alert('Volume (X) values cannot be negative.');
    return;
  }

  // 3. Reject duplicate volumes
  const vols = validData.map(d => d.x);
  const dupVol = vols.find((v, i) => vols.indexOf(v) !== i);
  if (dupVol !== undefined) {
    alert(`Duplicate volume detected: ${dupVol} ml. Each volume must be unique.`);
    return;
  }

  // 4. pH range check
  if (sim.yLabel === 'pH') {
    const badPH = validData.find(d => d.y < 0 || d.y > 14);
    if (badPH) {
      alert(`pH value ${badPH.y} is outside the valid range 0–14.`);
      return;
    }
  }

  // 5. Sort ascending by volume
  validData.sort((a, b) => a.x - b.x);

  // 6. Show summary
  const summaryContainer = document.getElementById('data-summary');
  summaryContainer.innerHTML = '';
  validData.forEach((d, i) => {
    const item = document.createElement('div');
    item.className = 'data-summary-item';
    item.innerHTML = `
      <div class="serial">${i + 1}</div>
      <div class="values">
        <div class="value x-val"><strong>${d.x}</strong> ${sim.xLabel}</div>
        <div class="value y-val"><strong>${d.y}</strong> ${sim.yLabel}</div>
      </div>
    `;
    summaryContainer.appendChild(item);
  });

  customObsData = validData;

  document.getElementById('step-count').style.display = 'none';
  document.getElementById('step-data').style.display = 'none';
  document.getElementById('step-confirm').style.display = 'block';
}

function backToDataStep() {
  document.getElementById('step-count').style.display = 'none';
  document.getElementById('step-data').style.display = 'block';
  document.getElementById('step-confirm').style.display = 'none';
}

function switchToDefaultMode() {
  isCustomMode = false;
  customObsData = [];
  obsRows = [];
  totalVolume = 0;
  document.getElementById('custom-mode-banner').style.display = 'none';
  destroyAllCharts();
  resetSimulationUI();
  updateBeakerVisual(0, null);
  document.getElementById('graph-no-data').style.display = 'block';
  document.getElementById('main-chart-container').style.display = 'none';
  document.getElementById('calc-panel').style.display = 'none';
  switchTab('perform');
}

function confirmCustomData() {
  isCustomMode = true;

  // Convert custom data to obsRows format
  obsRows = customObsData.map(d => ({
    vol: d.x,
    value: d.y
  }));

  // Close modal
  document.getElementById('custom-obs-modal').classList.remove('active');
  document.getElementById('custom-obs-modal').style.display = 'none';

  // Show custom mode banner
  document.getElementById('custom-mode-banner').style.display = 'flex';

  // Populate observation table
  const tbody = document.getElementById('obs-body');
  tbody.innerHTML = '';

  obsRows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.className = 'new-row';
    tr.innerHTML = `<td>${i + 1}</td><td>${row.vol}</td><td>${row.value}</td>`;
    tbody.appendChild(tr);
  });

  // Show plot button and mini graph
  if (obsRows.length >= 2) {
    document.getElementById('btn-plot').style.display = 'block';
    document.getElementById('mini-graph-panel').style.display = 'block';
    renderMiniGraph();
  }

  // Go to graph tab and render
  switchTab('graph');
  showCalcPanel();
}
