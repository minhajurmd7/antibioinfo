// ===== CORE APPLICATION ENGINE FOR INDEX.HTML (AB|INFO) =====

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  initDrugCatalog();
  initSymptomFlowchart();
  initResistanceSurveillance();
  initFlipCards();
  initSafetyQuiz();
  initContactForms();
});

// ===================================================
// 1. SMART MULTI-DIMENSIONAL SEARCH & DRUG CATALOG
// ===================================================
let activeFilter = "ALL";
let searchQuery = "";

// Medical Synonym, Acronym & Clinical Mapping Dictionary
const medicalSynonyms = {
  "uti": ["uti", "urinary", "cystitis", "pyelonephritis", "bladder"],
  "urine": ["uti", "urinary", "cystitis", "pyelonephritis", "bladder"],
  "cell wall": ["cell wall", "peptidoglycan", "pbp", "beta-lactam", "penicillin", "cephalosporin", "carbapenem", "glycopeptide"],
  "protein synthesis": ["protein synthesis", "ribosome", "30s", "50s", "ribosomal"],
  "dna": ["dna gyrase", "topoisomerase", "dna replication"],
  "folic acid": ["folate", "folic acid", "dihydropteroate", "dihydrofolate"],
  "cold": ["common cold"],
  "flu": ["influenza"],
  "fever": ["typhoid", "enteric", "febrile", "scrub typhus"],
  "staph": ["staph", "staphylococcus", "mssa", "mrsa"],
  "strep": ["strep", "streptococcus", "pharyngitis", "sore throat"],
  "loose motion": ["diarrhea", "gastroenteritis", "amebiasis", "shigella"],
  "dental": ["dental", "tooth", "teeth", "mouth", "abscess"],
  "skin": ["cellulitis", "boil", "furuncle", "carbuncle", "impetigo", "wound", "skin"],
  "pneumonia": ["pneumonia", "chest", "bronchitis", "respiratory"],
  "ear": ["ear", "otitis media", "otitis"]
};

// Check if a drug is active against specific superbugs
function matchesSpectrum(drug, term) {
  if (!drug.spectrum) return false;
  const s = drug.spectrum;
  const t = term.toLowerCase();

  if (t === "mrsa") {
    const val = String(s.mrsa || "").toLowerCase();
    return val.includes("yes") || val.includes("synergy");
  }

  if (t === "pseudomonas") {
    const val = String(s.pseudomonas || "").toLowerCase();
    return val.includes("yes") || val.includes("synergy");
  }

  const gramPos = String(s.gramPos || "").toLowerCase();
  const gramNeg = String(s.gramNeg || "").toLowerCase();
  const anaerobes = String(s.anaerobes || "").toLowerCase();

  return gramPos.includes(t) || gramNeg.includes(t) || anaerobes.includes(t);
}

// Find why a drug matched for visual badge feedback
function getMatchHighlight(drug, queryTerms) {
  for (const term of queryTerms) {
    const t = term.toLowerCase();

    // 1. Matched Brand Name
    const matchedBrand = drug.brands && drug.brands.find(b => b.toLowerCase().includes(t));
    if (matchedBrand) {
      return `<span class="match-badge brand">🏷️ Brand: <strong>${escapeHtml(matchedBrand)}</strong></span>`;
    }

    // 2. Matched Condition / Disease
    const matchedTreat = drug.treats && drug.treats.find(tr => tr.toLowerCase().includes(t));
    if (matchedTreat) {
      return `<span class="match-badge condition">🎯 Treats: <strong>${escapeHtml(matchedTreat)}</strong></span>`;
    }

    // 3. Matched Bug / Organism
    if (t === "mrsa" && matchesSpectrum(drug, "mrsa")) {
      return `<span class="match-badge organism">🦠 Bug: <strong>MRSA Active</strong></span>`;
    }
    if (t === "pseudomonas" && matchesSpectrum(drug, "pseudomonas")) {
      return `<span class="match-badge organism">🦠 Bug: <strong>Pseudomonas Active</strong></span>`;
    }

    // 4. Matched Mechanism
    if (drug.works.toLowerCase().includes(t) || t === "cell wall" || t === "protein synthesis") {
      return `<span class="match-badge mechanism">🧬 Mechanism: <strong>${escapeHtml(t)}</strong></span>`;
    }

    // 5. Matched Class
    if (drug.drugClass.toLowerCase().includes(t)) {
      return `<span class="match-badge class-tag">💊 Class: <strong>${escapeHtml(drug.drugClass)}</strong></span>`;
    }
  }
  return "";
}

// Core Smart Search Filter (Drug + Brand + Disease + Organism + Mechanism + Class)
function matchDrug(drug, rawQuery) {
  if (!rawQuery) return true;
  const q = rawQuery.toLowerCase().trim();

  // Expand query with medical synonyms
  const queryTerms = [q];
  for (const [key, synList] of Object.entries(medicalSynonyms)) {
    if (q.includes(key) || key.includes(q)) {
      queryTerms.push(...synList);
    }
  }

  // If the user explicitly searches for cold or flu, don't match warning text in descriptions
  const isViralQuery = q === "cold" || q === "flu" || q === "viral cold";

  return queryTerms.some(term => {
    // 1. Generic Drug Name (e.g. Amoxicillin, Ciprofloxacin)
    if (drug.name.toLowerCase().includes(term)) return true;

    // 2. Indian Pharmacy Brands (e.g. Ciplox, Novamox, Augmentin, Taxim-O)
    if (drug.brands && drug.brands.some(b => b.toLowerCase().includes(term))) return true;

    // 3. Drug Class (e.g. Carbapenems, Macrolides, Fluoroquinolones)
    if (drug.drugClass.toLowerCase().includes(term)) return true;

    // 4. Disease / Approved Clinical Uses (e.g. UTI, Typhoid, Dental abscess)
    if (drug.treats && drug.treats.some(t => t.toLowerCase().includes(term))) return true;

    // Skip generic text descriptions for viral searches so disclaimers don't trigger false matches
    if (!isViralQuery) {
      // 5. Mechanism of Action (e.g. cell wall synthesis, DNA gyrase, 30S ribosome)
      if (drug.works && drug.works.toLowerCase().includes(term)) return true;

      // 6. Bug Spectrum (e.g. MRSA, Pseudomonas, Strep, E. coli, Klebsiella)
      if (matchesSpectrum(drug, term)) return true;

      // 7. Short Summary Description
      if (drug.shortDesc && drug.shortDesc.toLowerCase().includes(term)) return true;
    }

    return false;
  });
}

function initDrugCatalog() {
  const drugGrid = document.getElementById("drugGrid");
  const searchInput = document.getElementById("searchInput");
  const filterPills = document.querySelectorAll(".filter-pill");

  if (!drugGrid) return;

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeFilter = pill.getAttribute("data-filter") || "ALL";
      renderDrugList();
    });
  });

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderDrugList();
      }, 150);
    });
  }

  window.addEventListener("abinfo:pathChanged", () => {
    renderDrugList();
  });

  renderDrugList();
}

function renderDrugList() {
  const drugGrid = document.getElementById("drugGrid");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");

  if (!drugGrid || typeof getAllDrugs !== "function") return;

  const allDrugs = getAllDrugs();
  
  // Multi-dimensional filtering + WHO AWaRe filtering
  const filtered = allDrugs.filter(d => {
    const matchesFilter = activeFilter === "ALL" || d.aware.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = matchDrug(d, searchQuery);
    return matchesFilter && matchesSearch;
  });

  if (resultCount) {
    resultCount.textContent = `(${filtered.length} of ${allDrugs.length})`;
    resultCount.setAttribute("aria-live", "polite");
  }

  if (filtered.length === 0) {
    drugGrid.innerHTML = "";
    if (noResults) {
      noResults.hidden = false;
      const isViralSearch = searchQuery === "cold" || searchQuery === "flu" || searchQuery === "cough";

      if (isViralSearch) {
        noResults.innerHTML = `
          <div style="text-align:center; padding:30px 20px; background:#eff6ff; border:2px solid #3b82f6; border-radius:10px; max-width:650px; margin:20px auto;">
            <span style="font-size:2.2rem; display:block; margin-bottom:8px;">🛑</span>
            <h3 style="color:#1e40af; margin-bottom:8px;">Antibiotics Do Not Treat Colds or Flu</h3>
            <p style="font-size:0.95rem; color:#1e3a8a; line-height:1.6; margin-bottom:12px;">
              Common colds, viral sore throats, runny noses, and flu are caused by <strong>viruses</strong>. Antibiotics only kill bacteria and have zero effect on viral illnesses.
            </p>
            <a href="#flowchart" class="btn-primary" style="margin-right:8px; border:none; cursor:pointer;">Check Symptom Flowchart →</a>
            <button class="btn-outline" onclick="resetHomepageSearch()" style="cursor:pointer;">Clear Search</button>
          </div>
        `;
      } else {
        noResults.innerHTML = `
          <div style="text-align:center; padding:30px 20px;">
            <p style="font-size:1.15rem; color:var(--text-muted);">😕 No antibiotics matched your search for "<strong>${escapeHtml(searchQuery)}</strong>".</p>
            <p style="font-size:0.9rem; color:var(--text-muted); margin-top:6px;">Try searching by brand (e.g. <em>Ciplox, Novamox</em>), disease (e.g. <em>UTI, Typhoid</em>), bug (e.g. <em>MRSA</em>), or mechanism (e.g. <em>cell wall</em>).</p>
            <button class="btn-primary" onclick="resetHomepageSearch()" style="margin-top:14px; border:none; cursor:pointer;">Reset Search</button>
          </div>
        `;
      }
    }
    return;
  }

  if (noResults) noResults.hidden = true;
  drugGrid.innerHTML = "";

  const isAcademic = document.body.classList.contains("path-academic") || document.body.classList.contains("mode-academic");

  // Query terms for smart match badges
  const queryTerms = searchQuery ? [searchQuery.toLowerCase().trim()] : [];
  if (searchQuery) {
    for (const [key, synList] of Object.entries(medicalSynonyms)) {
      if (searchQuery.toLowerCase().includes(key)) {
        queryTerms.push(...synList);
      }
    }
  }

  filtered.forEach(drug => {
    const card = document.createElement("article");
    card.className = "drug-card";
    card.style.borderTop = `4px solid ${drug.color || "var(--primary)"}`;

    const brandList = drug.brands.map(b => escapeHtml(b)).join(", ");
    const treatsList = drug.treats.slice(0, 3).map(t => `<li>${escapeHtml(t)}</li>`).join("");
    const matchBadgeHtml = searchQuery ? getMatchHighlight(drug, queryTerms) : "";

    const detailSection = isAcademic ? `
      <div class="card-academic-meta" style="margin-top:10px; font-size:0.86rem; color:var(--text-muted); background:rgba(0,0,0,0.03); padding:10px; border-radius:6px;">
        <p><strong>🧬 Mechanism:</strong> ${escapeHtml(drug.works.substring(0, 110))}...</p>
        <p style="margin-top:4px;"><strong>⚠️ Key Warning:</strong> ${escapeHtml(drug.warnings[0] || "Prescription only.")}</p>
      </div>
    ` : `
      <div class="card-public-meta" style="margin-top:10px; font-size:0.88rem;">
        <p style="color:var(--text-muted);">${escapeHtml(drug.shortDesc)}</p>
      </div>
    `;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
        <span class="badge" style="background:${drug.color}">${escapeHtml(drug.drugClass)}</span>
        <span class="badge aware-${drug.aware.toLowerCase()}">WHO ${escapeHtml(drug.aware)}</span>
      </div>

      <h3 style="margin:10px 0 4px; font-size:1.25rem;">
        <a href="drug.html?drug=${encodeURIComponent(drug.id)}" style="color:var(--text); text-decoration:none;">
          ${escapeHtml(drug.name)} ↗
        </a>
      </h3>

      <p class="brand-names" style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
        Common Brands: <strong style="color:var(--text);">${brandList}</strong>
      </p>

      ${matchBadgeHtml ? `<div style="margin-bottom:8px;">${matchBadgeHtml}</div>` : ""}

      ${detailSection}

      <div style="margin:12px 0;">
        <strong style="font-size:0.84rem; color:var(--primary-dark);">🎯 Common Indications:</strong>
        <ul class="chip-list" style="margin-top:4px;">
          ${treatsList}
        </ul>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:12px; border-top:1px solid var(--border, #e2e8f0);">
        <span class="schedule-tag" style="font-size:0.75rem; font-weight:700; color:${drug.schedule === "Schedule H1" ? "#b91c1c" : "#2563eb"};">
          ${drug.schedule === "Schedule H1" ? "🔴 Sched H1" : "🔵 Sched H"}
        </span>
        <a href="drug.html?drug=${encodeURIComponent(drug.id)}" class="btn-outline" style="padding:6px 14px; font-size:0.82rem; text-decoration:none;">
          View Monograph →
        </a>
      </div>
    `;

    drugGrid.appendChild(card);
  });
}

function resetHomepageSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  searchQuery = "";
  activeFilter = "ALL";
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("active", p.getAttribute("data-filter") === "ALL"));
  renderDrugList();
}

// ===================================================
// 2. CLINICAL SYMPTOM DECISION FLOWCHART
// ===================================================
function initSymptomFlowchart() {
  const container = document.getElementById("flowchartContainer");
  if (!container) return;

  const flowData = {
    start: {
      question: "What is your main symptom or health concern?",
      options: [
        { text: "🤧 Common Cold, Runny Nose, Sneezing", next: "cold" },
        { text: "🗣️ Sore Throat or Cough", next: "throat" },
        { text: "🚽 Painful or Burning Urination", next: "uti" },
        { text: "🩹 Skin Boil, Red Swelling, or Pus", next: "skin" },
        { text: "🌡️ High Fever (> 3 days) with Body Ache", next: "fever" }
      ]
    },
    cold: {
      result: true,
      badge: "VIRAL INFECTION (No Antibiotic Needed)",
      badgeClass: "flow-viral",
      title: "❌ Antibiotics Will NOT Help Cold or Flu",
      desc: "Common colds, runny noses, and influenza are caused by <strong>viruses</strong>, not bacteria. Antibiotics kill only bacteria and will not relieve symptoms, shorten the illness, or protect others. Misusing antibiotics exposes you to diarrhea and accelerates superbug resistance.",
      recs: [
        "Drink plenty of warm water, soups, and fluids.",
        "Take Paracetamol or Ibuprofen under doctor guidance for fever/ache.",
        "Steam inhalation and saline nasal drops for congestion.",
        "Seek medical care if breathing becomes difficult or symptoms worsen after 7 days."
      ]
    },
    throat: {
      question: "Do you have a severe sore throat WITH white spots on tonsils, swollen neck glands, and NO cough?",
      options: [
        { text: "No, I also have cough, runny nose, or hoarseness", next: "throat_viral" },
        { text: "Yes, sudden severe sore throat, fever, swollen glands, NO cough", next: "throat_strep" }
      ]
    },
    throat_viral: {
      result: true,
      badge: "VIRAL PHARYNGITIS",
      badgeClass: "flow-viral",
      title: "❌ Antibiotics Not Indicated",
      desc: "More than 85% of sore throats with cough, sneezing, or hoarseness are viral. Antibiotics do not speed up healing.",
      recs: [
        "Warm salt-water gargles 3–4 times daily.",
        "Throat lozenges and hydration.",
        "Paracetamol for throat discomfort."
      ]
    },
    throat_strep: {
      result: true,
      badge: "POSSIBLE STREPTOCOCCAL PHARYNGITIS",
      badgeClass: "flow-bacterial",
      title: "⚠️ Medical Swab & Prescription Needed",
      desc: "Sudden fever, tonsillar exudate, and tender cervical nodes without a cough meet Centor Criteria for Group A Strep. An Access antibiotic like Amoxicillin or Penicillin may be indicated to prevent rheumatic fever, but only upon a physician prescription.",
      recs: [
        "Visit a doctor for throat examination / swab.",
        "Never purchase over-the-counter antibiotics.",
        "If prescribed an antibiotic, complete the full course strictly."
      ]
    },
    uti: {
      result: true,
      badge: "PROBABLE URINARY TRACT INFECTION (Bacterial)",
      badgeClass: "flow-bacterial",
      title: "⚠️ Consult a Doctor for Urine Routine / Culture",
      desc: "Burning upon urination (dysuria), increased frequency, and lower pelvic ache strongly indicate a bacterial bladder infection (cystitis). Targeted Access antibiotics such as Nitrofurantoin or Cotrimoxazole are standard in India.",
      recs: [
        "Consult a physician or primary health center.",
        "Drink plenty of water to flush the urinary tract.",
        "Avoid self-purchasing fluoroquinolones (Norfloxacin/Ciprofloxacin) without culture due to >80% resistance."
      ]
    },
    skin: {
      result: true,
      badge: "BACTERIAL SKIN INFECTION",
      badgeClass: "flow-bacterial",
      title: "⚠️ Requires Clinical Evaluation",
      desc: "Boils, abscesses, or spreading warm cellulitis are usually caused by Staphylococcus aureus or Streptococcus. Small boils may only require warm compresses or incision, while spreading cellulitis requires oral Cloxacillin, Cephalexin, or CA-MRSA coverage.",
      recs: [
        "Never squeeze or puncture a boil at home.",
        "Keep the area clean and covered.",
        "Consult a clinic for proper dressing and prescription."
      ]
    },
    fever: {
      result: true,
      badge: "UNEXPLAINED FEVER (Multiple Causes)",
      badgeClass: "flow-warning",
      title: "⚠️ Diagnostic Blood Test Required",
      desc: "In India and Karnataka, fevers persisting beyond 3 days can stem from Dengue (viral), Malaria (parasitic), Scrub Typhus (bacterial), or Typhoid (Salmonella). Taking blind antibiotics hides symptoms, can induce antibiotic resistance, and fails to treat viral dengue or malaria.",
      recs: [
        "Get a Complete Blood Count (CBC), Dengue NS1, and Widal/blood culture as advised by a doctor.",
        "Maintain oral rehydration.",
        "Seek immediate emergency care if danger signs appear (drowsiness, bleeding spots, vomiting)."
      ]
    }
  };

  function renderStep(nodeKey) {
    const node = flowData[nodeKey];
    if (!node) return;

    if (node.result) {
      container.innerHTML = `
        <div class="flow-card ${node.badgeClass}">
          <span class="flow-badge">${node.badge}</span>
          <h3 style="margin:12px 0 8px; color:var(--text);">${node.title}</h3>
          <p style="font-size:0.95rem; line-height:1.6; color:var(--text);">${node.desc}</p>
          <div style="margin-top:14px; background:rgba(255,255,255,0.7); padding:12px; border-radius:6px;">
            <strong style="font-size:0.88rem; color:var(--primary-dark);">📋 What You Should Do:</strong>
            <ul style="padding-left:18px; margin-top:6px; font-size:0.9rem; line-height:1.6;">
              ${node.recs.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
            </ul>
          </div>
          <button class="btn-primary" id="flowRestartBtn" style="margin-top:18px; border:none; cursor:pointer;">
            🔄 Start Over
          </button>
        </div>
      `;
      document.getElementById("flowRestartBtn").addEventListener("click", () => renderStep("start"));
    } else {
      container.innerHTML = `
        <div class="flow-card">
          <h3 style="margin-bottom:16px; font-size:1.15rem; color:var(--primary-dark);">
            ${escapeHtml(node.question)}
          </h3>
          <div class="flow-options">
            ${node.options.map(opt => `
              <button class="flow-opt-btn" data-next="${escapeHtml(opt.next)}">
                 ${escapeHtml(opt.text)}
              </button>
            `).join("")}
          </div>
        </div>
      `;
      container.querySelectorAll(".flow-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const next = btn.getAttribute("data-next");
          renderStep(next);
        });
      });
    }
  }

  renderStep("start");
}

// ===================================================
// 3. RESISTANCE SURVEILLANCE & CHART.JS
// ===================================================
function initResistanceSurveillance() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = current;
            }
          }, 25);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  }

  const barFills = document.querySelectorAll(".bar-fill");
  if (barFills.length > 0 && "IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const w = bar.getAttribute("data-width");
          if (w) bar.style.width = `${w}%`;
          obs.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    barFills.forEach(b => barObserver.observe(b));
  }

  const canvas = document.getElementById("amrChartCanvas");
  if (canvas && typeof Chart !== "undefined") {
    new Chart(canvas, {
      type: "line",
      data: {
        labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [
          {
            label: "E. coli vs Imipenem",
            data: [81.4, 78.5, 75.2, 70.1, 68.3, 64.9, 62.7],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.3,
            fill: true
          },
          {
            label: "E. coli vs Meropenem",
            data: [73.2, 72.0, 70.5, 68.0, 67.2, 66.5, 66.0],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: true
          },
          {
            label: "Klebsiella vs Meropenem",
            data: [48.0, 45.2, 43.1, 41.0, 39.8, 38.5, 37.6],
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            tension: 0.3,
            fill: true
          },
          {
            label: "Klebsiella vs Pip-Tazo",
            data: [42.6, 39.4, 35.8, 32.2, 30.1, 28.0, 26.5],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#e2e8f0", font: { size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}% susceptible`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(255, 255, 255, 0.08)" }
          },
          y: {
            min: 20,
            max: 90,
            ticks: {
              color: "#94a3b8",
              callback: (v) => `${v}%`
            },
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            title: {
              display: true,
              text: "% Isolates Susceptible (Treatable)",
              color: "#cbd5e1"
            }
          }
        }
      }
    });
  }
}

// ===================================================
// 4. 3D MYTH-BUSTING FLIP CARDS
// ===================================================
function initFlipCards() {
  const cards = document.querySelectorAll(".flip-card");
  cards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Myth vs Fact Card. Tap or press enter to flip.");

    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });
}

// ===================================================
// 5. 10-MCQ ANTIBIOTIC SAFETY QUIZ
// ===================================================
function initSafetyQuiz() {
  const container = document.getElementById("quizContainer");
  const submitBtn = document.getElementById("quizSubmitBtn");
  const resultBox = document.getElementById("quizResultBox");

  if (!container || !submitBtn) return;

  const questions = [
    {
      q: "1. Which of the following conditions can antibiotics cure?",
      options: [
        "Common cold & runny nose",
        "Influenza (Flu)",
        "Bacterial strep throat & bacterial UTIs",
        "Viral gastroenteritis (stomach flu)"
      ],
      correct: 2,
      exp: "Antibiotics kill bacteria only. Colds and flu are viral and do not respond to antibiotics."
    },
    {
      q: "2. Why must patients finish their prescribed antibiotic course even after feeling better?",
      options: [
        "To help pharmacies sell more medicine",
        "To ensure all multiplying bacteria are eradicated and prevent resistant mutants from surviving",
        "Because antibiotics become stronger when taken continuously",
        "There is no medical need; stopping early is always recommended"
      ],
      correct: 1,
      exp: "Stopping prematurely leaves partially resistant bacteria alive, selecting for resistant strains."
    },
    {
      q: "3. What does the prominent vertical RED LINE on medicine strips mean in India?",
      options: [
        "The medicine is manufactured in Karnataka",
        "It is a Schedule H/H1 medicine and must NEVER be dispensed without a valid doctor prescription",
        "The medicine is free of side effects",
        "It is an expired medicine batch"
      ],
      correct: 1,
      exp: "The MoHFW Red Line Campaign reminds consumers and chemists that the drug requires a prescription."
    },
    {
      q: "4. What is the WHO AWaRe classification purpose?",
      options: [
        "Pricing antibiotic tablets",
        "Dividing antibiotics into Access, Watch, and Reserve to promote stewardship and prevent resistance",
        "Ranking antibiotics by physical tablet size",
        "Determining expiration dates"
      ],
      correct: 1,
      exp: "WHO AWaRe categorizes molecules into Access (first-line), Watch (high resistance risk), and Reserve (last-resort)."
    },
    {
      q: "5. Why should you NEVER consume leftover antibiotics from a previous illness?",
      options: [
        "Leftover pills always turn poisonous within 24 hours",
        "Different infections require different specific antibiotics, dosages, and durations; wrong use breeds resistance",
        "Leftovers belong to the pharmacy by law",
        "All antibiotics lose 100% of their potency once the blister is cut"
      ],
      correct: 1,
      exp: "Self-medicating with leftover partial courses delays diagnosis and breeds drug-resistant superbugs."
    },
    {
      q: "6. What does MRSA stand for in clinical medicine?",
      options: [
        "Major Respiratory Sinus Allergy",
        "Methicillin-Resistant Staphylococcus aureus",
        "Microscopic Resistance System Analysis",
        "Multi-Rapid Sulfa Agent"
      ],
      correct: 1,
      exp: "MRSA is a resistant staphylococcal superbug resistant to standard penicillins, requiring drugs like vancomycin or linezolid."
    },
    {
      q: "7. Why must patients strictly avoid ALL ALCOHOL while taking Metronidazole (Metrogyl)?",
      options: [
        "Alcohol makes the tablet taste sweet",
        "It triggers a severe Disulfiram-like reaction (violent vomiting, pounding headache, rapid heartbeat, collapse)",
        "Alcohol permanently changes urine color to green",
        "Metronidazole stops alcohol from absorbing"
      ],
      correct: 1,
      exp: "Metronidazole blocks acetaldehyde dehydrogenase, causing toxic acetaldehyde buildup if alcohol is consumed."
    },
    {
      q: "8. Why must Doxycycline capsules be taken with a full glass of water while sitting or standing upright?",
      options: [
        "To prevent severe pill-induced esophageal ulceration from a lodged capsule",
        "Because water activates the antibiotic molecule",
        "To prevent immediate drowsiness",
        "Doxycycline cannot dissolve in saliva"
      ],
      correct: 0,
      exp: "Doxycycline is highly caustic to the esophagus; lying down immediately after swallowing risks painful ulcers."
    },
    {
      q: "9. How long must community pharmacies in India preserve their Schedule H1 sales register?",
      options: [
        "30 days",
        "1 year",
        "3 years",
        "10 years"
      ],
      correct: 2,
      exp: "Under Schedule H1 of the Drugs and Cosmetics Rules, pharmacies must retain registers for at least 3 years."
    },
    {
      q: "10. Why is it dangerous to share an antibiotic with a family member with similar symptoms?",
      options: [
        "Dosage depends on age, weight, kidney/liver function, pregnancy, and drug allergies",
        "Family members always have natural immunity to the same bug",
        "It is prohibited by copyright law",
        "Antibiotics only work on the person who purchased them"
      ],
      correct: 0,
      exp: "Prescription drugs require personalized clinical dosage calculation; sharing can cause fatal toxicity or anaphylaxis."
    }
  ];

  container.innerHTML = questions.map((item, qIdx) => `
    <div class="quiz-card" id="quizCard_${qIdx}" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:18px; margin-bottom:18px;">
      <h3 style="font-size:1.05rem; margin-bottom:12px; color:var(--text);">${escapeHtml(item.q)}</h3>
      <div class="quiz-options">
        ${item.options.map((opt, oIdx) => `
          <label style="display:flex; align-items:center; gap:8px; margin-bottom:8px; cursor:pointer; font-size:0.92rem;">
            <input type="radio" name="quiz_q_${qIdx}" value="${oIdx}" />
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join("")}
      </div>
      <div class="quiz-feedback" id="quizFeedback_${qIdx}" style="display:none; margin-top:10px; padding:10px; border-radius:6px; font-size:0.88rem;"></div>
    </div>
  `).join("");

  submitBtn.addEventListener("click", () => {
    let score = 0;
    let answered = 0;

    questions.forEach((item, qIdx) => {
      const selected = document.querySelector(`input[name="quiz_q_${qIdx}"]:checked`);
      const feedback = document.getElementById(`quizFeedback_${qIdx}`);
      const card = document.getElementById(`quizCard_${qIdx}`);

      if (selected) {
        answered++;
        const val = parseInt(selected.value, 10);
        feedback.style.display = "block";

        if (val === item.correct) {
          score++;
          card.style.borderColor = "#10b981";
          feedback.style.background = "#ecfdf5";
          feedback.style.color = "#065f46";
          feedback.innerHTML = `<strong>✅ Correct!</strong> ${escapeHtml(item.exp)}`;
        } else {
          card.style.borderColor = "#ef4444";
          feedback.style.background = "#fef2f2";
          feedback.style.color = "#991b1b";
          feedback.innerHTML = `<strong>❌ Incorrect.</strong> Correct answer: <em>${escapeHtml(item.options[item.correct])}</em>. ${escapeHtml(item.exp)}`;
        }
      }
    });

    if (answered < questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting (answered: ${answered}/${questions.length}).`);
      return;
    }

    resultBox.style.display = "block";
    const pct = Math.round((score / questions.length) * 100);
    const pass = pct >= 80;

    resultBox.innerHTML = `
      <div style="background:${pass ? "#ecfdf5" : "#fffbeb"}; border:2px solid ${pass ? "#10b981" : "#f59e0b"}; border-radius:10px; padding:24px; text-align:center;">
        <h3 style="color:${pass ? "#065f46" : "#92400e"}; font-size:1.6rem; margin-bottom:8px;">
          ${pass ? "🎉 Outstanding! Antibiotic Stewardship Champion" : "⚠️ Review Recommended: Safe Antibiotic Practice"}
        </h3>
        <p style="font-size:1.15rem; color:var(--text); margin-bottom:12px;">
          You scored <strong>${score} out of ${questions.length} (${pct}%)</strong>
        </p>
        <p style="font-size:0.95rem; color:var(--text-muted); max-width:600px; margin:0 auto;">
          ${pass ? "You demonstrate an exceptional grasp of clinical antibiotic safety, the WHO AWaRe classification, and Indian Schedule H1 stewardship mandates." : "Understanding antibiotic safety protects your family and community from drug-resistant superbugs. Review the explanations above."}
        </p>
      </div>
    `;

    resultBox.scrollIntoView({ behavior: "smooth" });
  });
}

// ===================================================
// 6. NETLIFY AJAX FORM SUBMISSION
// ===================================================
function initContactForms() {
  const forms = document.querySelectorAll("form[data-netlify=\"true\"]");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type=\"submit\"]");
      const originalText = submitBtn ? submitBtn.innerText : "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending Message...";
      }

      const formData = new FormData(form);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        form.innerHTML = `
          <div style="text-align:center; padding:30px 10px; color:#15803d;">
            <span style="font-size:2.5rem; display:block; margin-bottom:10px;">✅</span>
            <h3 style="margin-bottom:8px;">Thank You for Your Feedback!</h3>
            <p style="font-size:0.95rem; color:var(--text);">Your message has been received by the AB|Info research team. We appreciate your contribution to antibiotic stewardship.</p>
          </div>
        `;
      })
      .catch(() => {
        alert("Failed to send message via Netlify. Please try again later.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      });
    });
  });
}