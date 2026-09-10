// ===== MAIN PORTAL ENGINE: CATALOG, FLOWCHART, CHARTS & QUIZ =====

// Safe HTML escape helper
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// -------------------------------------------------------------
// 1. DRUG DIRECTORY & SEARCH LOGIC
// -------------------------------------------------------------
const drugGrid = document.getElementById("drugGrid");
const noResults = document.getElementById("noResults");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");

let activeFilter = "ALL";

function renderDrugs(list) {
  if (!drugGrid) return;
  drugGrid.innerHTML = "";

  if (resultCount) {
    resultCount.textContent = `(${list.length})`;
  }

  if (list.length === 0) {
    if (noResults) {
      noResults.innerHTML = `😕 No antibiotics matched your search criteria.<br><br><a href="classes.html" class="btn-primary">Browse All 21 Antibiotic Classes</a>`;
      noResults.hidden = false;
    }
    return;
  }
  if (noResults) noResults.hidden = true;

  list.forEach(drug => {
    const card = document.createElement("a");
    card.className = "drug-card";
    card.href = `drug.html?drug=${drug.id}`;

    // Dual-mode rendering: Public vs Academic
    card.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <h3>${escapeHtml(drug.name)} →</h3>
          ${drug.schedule === "Schedule H1" ? `<span class="schedule-h1-tag">Sched H1</span>` : ""}
        </div>
        <p class="brand-names">Brands: ${escapeHtml(drug.brands.join(", "))}</p>
        
        <div style="margin: 8px 0;">
          <span class="badge" style="background:${drug.color}">${escapeHtml(drug.drugClass)}</span>
          <span class="badge aware-${drug.aware.toLowerCase()}">WHO ${drug.aware}</span>
        </div>

        <!-- PUBLIC VIEW: Simple everyday ailments -->
        <div class="public-view">
          <ul class="treats-list">
            ${drug.treats.slice(0, 3).map(t => `<li>${escapeHtml(t)}</li>`).join("")}
            ${drug.treats.length > 3 ? `<li>+${drug.treats.length - 3} more…</li>` : ""}
          </ul>
        </div>

        <!-- ACADEMIC VIEW: Microbiological spectrum highlights -->
        <div class="academic-view">
          <div style="font-size:0.82rem; color:var(--text-muted); margin: 6px 0;">
            <span><strong>MRSA:</strong> ${drug.spectrum && drug.spectrum.mrsa === "Yes" ? "✅" : "❌"}</span> | 
            <span><strong>Pseudo:</strong> ${drug.spectrum && drug.spectrum.pseudomonas === "Yes" ? "✅" : "❌"}</span>
          </div>
          <p style="font-size:0.84rem; color:var(--text); line-height:1.4;">
            ${escapeHtml(drug.shortDesc)}
          </p>
        </div>
      </div>
      <p class="read-more">View full clinical monograph →</p>
    `;
    drugGrid.appendChild(card);
  });
}

function applyFilters() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const list = typeof getAllDrugs === "function" ? getAllDrugs() : (typeof antibiotics !== "undefined" ? antibiotics : []);

  const filtered = list.filter(drug => {
    const matchesSearch =
      drug.name.toLowerCase().includes(query) ||
      drug.drugClass.toLowerCase().includes(query) ||
      drug.brands.some(b => b.toLowerCase().includes(query)) ||
      drug.treats.some(t => t.toLowerCase().includes(query));

    const matchesCategory = activeFilter === "ALL" || drug.aware.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  renderDrugs(filtered);
}

function renderDrugsFromCurrentState() {
  applyFilters();
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

document.querySelectorAll(".filter-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// -------------------------------------------------------------
// 2. INTERACTIVE SYMPTOM DECISION FLOWCHART
// -------------------------------------------------------------
const flowchartData = {
  start: {
    question: "What is your primary symptom?",
    options: [
      { text: "🤧 Runny nose, sneezing, mild cough (Cold/Flu)", next: "cold_flu" },
      { text: "🔥 Severe sore throat with high fever & white patches", next: "strep" },
      { text: "🚽 Painful burning during urination & frequent urge", next: "uti" },
      { text: "🤢 Loose watery motions / diarrhea (< 48 hrs)", next: "diarrhea" }
    ]
  },
  cold_flu: {
    outcome: "🛑 VIRAL INFECTION: Antibiotics Will NOT Work",
    type: "viral",
    explanation: "Over 90% of common colds, acute coughs, and throat tickles are caused by viruses (Rhinovirus, Influenza). Antibiotics kill bacteria, not viruses. Taking an antibiotic here only destroys healthy gut bacteria and causes resistance.",
    action: "Rest, hydrate, take warm saline gargles or paracetamol under guidance.",
    showReset: true
  },
  strep: {
    outcome: "⚠️ POSSIBLE BACTERIAL PHARYNGITIS: Consult a Doctor",
    type: "eval",
    explanation: "Severe sore throat accompanied by fever > 101°F, swollen tonsils with exudates, and absence of cough may indicate Streptococcus pyogenes (Strep throat). A clinical throat swab / Centor score evaluation is required.",
    action: "Consult a physician. Do not start leftover antibiotics on your own.",
    showReset: true
  },
  uti: {
    outcome: "⚠️ SUSPECTED URINARY TRACT INFECTION: Urine Test Needed",
    type: "eval",
    explanation: "Dysuria (burning urination) is frequently bacterial (E. coli). However, resistance rates to common antibiotics like ciprofloxacin exceed 70% in India. A urine routine and culture test should guide targeted therapy (e.g. Nitrofurantoin).",
    action: "Drink water and consult a doctor immediately for a lab urine culture test.",
    showReset: true
  },
  diarrhea: {
    outcome: "🛑 MOSTLY SELF-LIMITING: Focus on Rehydration (ORS)",
    type: "viral",
    explanation: "Acute watery diarrhea is usually viral (Rotavirus, Norovirus) or toxin-mediated. Taking antibiotics without bloody stool or severe fever is unnecessary and disrupts gut flora.",
    action: "Start Oral Rehydration Salts (ORS) immediately. Seek medical help if high fever or blood in stools appears.",
    showReset: true
  }
};

function renderFlowchartStep(stepKey) {
  const container = document.getElementById("flowchartContainer");
  if (!container) return;

  const step = flowchartData[stepKey];
  if (!step) return;

  if (step.question) {
    container.innerHTML = `
      <div class="flow-card">
        <h3>${step.question}</h3>
        <div class="flow-buttons">
          ${step.options.map((opt, i) => `
            <button class="flow-btn" onclick="renderFlowchartStep('${opt.next}')">
              ${opt.text}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  } else if (step.outcome) {
    const isViral = step.type === "viral";
    container.innerHTML = `
      <div class="flow-outcome ${isViral ? 'flow-viral' : 'flow-eval'}">
        <h3>${step.outcome}</h3>
        <p style="margin: 12px 0; font-size: 0.98rem; line-height: 1.6;">${step.explanation}</p>
        <div class="flow-action">
          <strong>Recommended Next Step:</strong> ${step.action}
        </div>
        <button class="btn-primary" onclick="renderFlowchartStep('start')" style="margin-top:18px;">
          🔄 Start Decision Flowchart Again
        </button>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// 3. CHART.JS RESISTANCE REALITY VISUALIZATION
// -------------------------------------------------------------
let amrChartInstance = null;

const amrDatasets = {
  ecoli: {
    label: "E. coli Susceptibility in India (ICMR)",
    years: ["2017", "2019", "2021", "2023"],
    meropenem: [73.2, 70.1, 68.4, 66.0],
    imipenem: [81.4, 75.2, 69.8, 62.7],
    ciprofloxacin: [24.1, 21.0, 19.3, 17.2]
  }
};

function initAMRChart() {
  const canvas = document.getElementById("amrChartCanvas");
  if (!canvas || typeof Chart === "undefined") return;

  const ctx = canvas.getContext("2d");
  if (amrChartInstance) {
    amrChartInstance.destroy();
  }

  amrChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: amrDatasets.ecoli.years,
      datasets: [
        {
          label: "E. coli vs. Meropenem (% Susceptible)",
          data: amrDatasets.ecoli.meropenem,
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.15)",
          tension: 0.3,
          fill: true,
          pointRadius: 6
        },
        {
          label: "E. coli vs. Imipenem (% Susceptible)",
          data: amrDatasets.ecoli.imipenem,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
          fill: true,
          pointRadius: 6
        },
        {
          label: "E. coli vs. Ciprofloxacin (% Susceptible)",
          data: amrDatasets.ecoli.ciprofloxacin,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.3,
          fill: true,
          pointRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#cbd5e1", font: { size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${context.raw}% still effective`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: "#94a3b8",
            callback: value => `${value}%`
          },
          grid: { color: "rgba(255, 255, 255, 0.08)" }
        },
        x: {
          ticks: { color: "#94a3b8" },
          grid: { color: "rgba(255, 255, 255, 0.08)" }
        }
      }
    }
  });
}

// Counter and Bar-fill Observer
function initResistanceAnimations() {
  const animatables = document.querySelectorAll(".counter, .bar-fill");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);

      if (el.classList.contains("counter")) {
        const target = parseFloat(el.dataset.target);
        const duration = 1600;
        const start = performance.now();
        (function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        })(performance.now());
      }

      if (el.classList.contains("bar-fill")) {
        requestAnimationFrame(() => {
          el.style.width = el.dataset.width + "%";
        });
      }
    });
  }, { threshold: 0.3 });

  animatables.forEach(el => observer.observe(el));
}

// -------------------------------------------------------------
// 4. 10-MCQ ANTIBIOTIC SAFETY QUIZ ENGINE
// -------------------------------------------------------------
const quizQuestions = [
  {
    q: "1. What types of germs do antibiotics kill?",
    options: ["Bacteria only", "Viruses only (like Cold and Flu)", "Both bacteria and viruses", "Parasites only"],
    correct: 0,
    rationale: "Antibiotics target bacterial cellular structures (like cell walls or 70S ribosomes) and have zero effect against viruses."
  },
  {
    q: "2. If your fever drops on day 3 of a 5-day antibiotic course, what should you do?",
    options: ["Stop taking it to save pills for later", "Reduce the dose to half", "Complete the full prescribed 5-day course", "Share the rest with family"],
    correct: 2,
    rationale: "Stopping early kills only weak bacteria, allowing partially resistant mutant bacteria to survive, multiply, and cause a relapse."
  },
  {
    q: "3. What does a vertical RED LINE on an Indian medicine strip signify?",
    options: ["It is an expired medicine", "It requires a doctor's prescription (Schedule H/H1) and cannot be sold OTC", "It is an ayurvedic herbal formula", "It is safe for children without advice"],
    correct: 1,
    rationale: "Under India's 'Medicines with a Red Line' campaign, the stripe identifies Schedule H and H1 medicines that must strictly be sold on prescription only."
  },
  {
    q: "4. Why is drinking alcohol strictly forbidden while taking Metronidazole?",
    options: ["Alcohol neutralizes the drug completely", "It triggers a severe disulfiram reaction with vomiting, flushing, and rapid heartbeat", "It causes permanent kidney failure within minutes", "It simply makes the pill taste bitter"],
    correct: 1,
    rationale: "Metronidazole inhibits aldehyde dehydrogenase, causing toxic acetaldehyde accumulation when mixed with alcohol."
  },
  {
    q: "5. In the WHO AWaRe classification, which category contains 'last-resort' antibiotics?",
    options: ["Access category", "Watch category", "Reserve category", "OTC category"],
    correct: 2,
    rationale: "WHO Reserve antibiotics (e.g. Colistin, Ceftaroline) are reserved strictly for confirmed multi-drug resistant superbugs."
  },
  {
    q: "6. Why should Doxycycline capsules never be taken right before lying down in bed?",
    options: ["It causes nightmares", "It can stick to the esophagus and cause severe pill-induced esophageal ulceration", "It causes sudden low blood pressure", "It prevents sleep"],
    correct: 1,
    rationale: "Doxycycline is caustic to esophageal mucosa. Taking it with a full glass of water while sitting upright prevents pill-induced esophagitis."
  },
  {
    q: "7. Why shouldn't Ciprofloxacin be taken together with milk or calcium supplements?",
    options: ["Calcium breaks down the drug in the blood", "Calcium binds (chelates) ciprofloxacin, preventing its absorption in the gut", "It causes instant kidney stones", "It causes extreme drowsiness"],
    correct: 1,
    rationale: "Multivalent cations like calcium and iron chelate fluoroquinolones into insoluble complexes that pass unabsorbed."
  },
  {
    q: "8. What is the primary cause of antibiotic resistance in Indian cities like Bengaluru?",
    options: ["Drinking too much boiled water", "Overuse, self-medication, and over-the-counter buying without prescription", "Excessive hand washing", "Cold weather during monsoons"],
    correct: 1,
    rationale: "Empiric misuse and dispensing without clinical indication select for multi-drug resistant bacterial strains."
  },
  {
    q: "9. Nitrofurantoin is an effective first-line antibiotic for lower UTIs, but why can't it treat kidney infections?",
    options: ["It is destroyed in the stomach", "It concentrates in bladder urine with minimal tissue penetration into the kidneys", "It turns urine harmlessly brown", "It only kills viruses"],
    correct: 1,
    rationale: "Nitrofurantoin reaches high therapeutic levels in bladder urine, but tissue levels in renal parenchyma and blood are inadequate for pyelonephritis."
  },
  {
    q: "10. What is a key public health role of an electronic Patient Information Leaflet (e-PIL)?",
    options: ["To replace doctors entirely", "To provide verified, multilingual dosage and safety guidance via QR codes at pharmacies", "To advertise luxury drug brands", "To diagnose cancer at home"],
    correct: 1,
    rationale: "e-PILs bridge patient communication gaps by offering verified digital advice in local languages right at the pharmacy dispensing counter."
  }
];

let userAnswers = {};
let quizSubmitted = false;

function renderQuiz() {
  const quizContainer = document.getElementById("quizContainer");
  if (!quizContainer) return;

  quizContainer.innerHTML = quizQuestions.map((q, idx) => `
    <article class="quiz-card" id="qcard-${idx}">
      <h3 style="font-size:1.05rem; margin-bottom:12px; color:var(--primary-dark);">${q.q}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, optIdx) => `
          <label class="quiz-option-label" id="qlabel-${idx}-${optIdx}">
            <input type="radio" name="question-${idx}" value="${optIdx}" onchange="selectQuizOption(${idx}, ${optIdx})" ${userAnswers[idx] === optIdx ? "checked" : ""}>
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join("")}
      </div>
      <div class="quiz-rationale" id="qrat-${idx}" style="display:none; margin-top:12px; font-size:0.9rem; padding:10px 14px; border-radius:8px;"></div>
    </article>
  `).join("");

  const submitBtn = document.getElementById("quizSubmitBtn");
  if (submitBtn) {
    submitBtn.style.display = "inline-block";
  }
}

function selectQuizOption(qIdx, optIdx) {
  userAnswers[qIdx] = optIdx;
}

function submitQuiz() {
  quizSubmitted = true;
  let score = 0;

  quizQuestions.forEach((q, idx) => {
    const selected = userAnswers[idx];
    const ratBox = document.getElementById(`qrat-${idx}`);

    q.options.forEach((_, optIdx) => {
      const label = document.getElementById(`qlabel-${idx}-${optIdx}`);
      if (!label) return;

      label.classList.remove("correct-opt", "incorrect-opt");
      if (optIdx === q.correct) {
        label.classList.add("correct-opt");
      } else if (selected === optIdx) {
        label.classList.add("incorrect-opt");
      }
    });

    if (ratBox) {
      ratBox.style.display = "block";
      if (selected === q.correct) {
        score++;
        ratBox.style.background = "#f0fdf4";
        ratBox.style.borderLeft = "4px solid #16a34a";
        ratBox.style.color = "#15803d";
        ratBox.innerHTML = `<strong>✅ Correct!</strong> ${q.rationale}`;
      } else {
        ratBox.style.background = "#fef2f2";
        ratBox.style.borderLeft = "4px solid #ef4444";
        ratBox.style.color = "#991b1b";
        ratBox.innerHTML = `<strong>❌ Incorrect.</strong> ${q.rationale}`;
      }
    }
  });

  const resultBox = document.getElementById("quizResultBox");
  if (resultBox) {
    resultBox.style.display = "block";
    let message = "Outstanding! You possess excellent antibiotic stewardship awareness.";
    if (score < 6) {
      message = "Good attempt! Review the rationales above to strengthen your antibiotic safety knowledge.";
    } else if (score < 9) {
      message = "Well done! You have a solid grasp of antibiotic pharmacology and safety.";
    }

    resultBox.innerHTML = `
      <div style="background:#ffffff; border:2px solid var(--primary); border-radius:var(--radius); padding:24px; text-align:center;">
        <h2 style="margin:0 0 8px; color:var(--primary-dark);">Your Score: ${score} / 10</h2>
        <p style="font-size:1.05rem; color:var(--text); margin-bottom:16px;">${message}</p>
        <button class="btn-share" onclick="shareQuizScore(${score})" style="background:#25D366; color:#fff; border:none; padding:10px 20px; border-radius:50px; font-weight:700; cursor:pointer;">
          📲 Share My Score on WhatsApp
        </button>
        <button class="btn-primary" onclick="resetQuiz()" style="margin-left:10px;">
          🔄 Retake Quiz
        </button>
      </div>
    `;
    resultBox.scrollIntoView({ behavior: "smooth" });
  }
}

function shareQuizScore(score) {
  const shareText = `🧠 I just scored ${score}/10 on the Antibiotic Safety IQ Quiz on AB|Info! Test your knowledge on antibiotic safety and AMR: ${window.location.origin + window.location.pathname}#quiz`;
  if (typeof shareOnWhatsApp === "function") {
    shareOnWhatsApp(shareText);
  } else {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  }
}

function resetQuiz() {
  userAnswers = {};
  quizSubmitted = false;
  const resultBox = document.getElementById("quizResultBox");
  if (resultBox) resultBox.style.display = "none";
  renderQuiz();
}

// -------------------------------------------------------------
// 5. INITIALIZATION ON DOM READY
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  applyFilters();
  renderFlowchartStep("start");
  renderQuiz();

  const quizSubmitBtn = document.getElementById("quizSubmitBtn");
  if (quizSubmitBtn) {
    quizSubmitBtn.addEventListener("click", submitQuiz);
  }

  if (document.getElementById("resistance")) {
    initResistanceAnimations();
    initAMRChart();
  }
});