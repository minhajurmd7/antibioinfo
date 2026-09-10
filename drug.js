// ===== DYNAMIC MONOGRAPH RENDERER (DUAL LEARNING PATH) =====

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

// Read ?drug=<id> from URL
const params = new URLSearchParams(window.location.search);
const drugId = params.get("drug");
const drug = typeof getDrugById === "function" ? getDrugById(drugId) : null;
const detailRoot = document.getElementById("drugDetail");

// WhatsApp drug share helper
function shareCurrentDrug(drugName, brandNames) {
  const currentUrl = window.location.href;
  const shareText = `💊 Check out clinical guidance for ${drugName} (${brandNames}) on AB|Info: ${currentUrl}`;
  if (typeof shareOnWhatsApp === "function") {
    shareOnWhatsApp(shareText);
  } else {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  }
}

if (!drug) {
  document.title = "Drug Not Found | AB|Info";
  if (detailRoot) {
    detailRoot.innerHTML = `
      <div class="detail-notfound">
        <h1>😕 Antibiotic Not Found</h1>
        <p>We couldn't find "${drugId ? escapeHtml(drugId) : ""}" in our database.</p>
        <a class="btn-primary" href="index.html#drugs" style="margin-top:16px;">← Browse All 33+ Antibiotics</a>
      </div>
    `;
  }
} else {
  document.title = `${drug.name} (${drug.brands[0]}) | AB|Info Monograph`;

  // Spectrum Grid for Academic View
  const spectrumHtml = drug.spectrum ? `
    <article class="detail-card academic-view">
      <h2>🧬 Antibacterial Spectrum of Activity</h2>
      <div class="spectrum-grid">
        <div class="spectrum-item">
          <strong>Gram-Positive Coverage:</strong>
          <span>${escapeHtml(drug.spectrum.gramPos || "N/A")}</span>
        </div>
        <div class="spectrum-item">
          <strong>Gram-Negative Coverage:</strong>
          <span>${escapeHtml(drug.spectrum.gramNeg || "N/A")}</span>
        </div>
        <div class="spectrum-item">
          <strong>Anaerobic Activity:</strong>
          <span>${escapeHtml(drug.spectrum.anaerobes || "N/A")}</span>
        </div>
        <div class="spectrum-item">
          <strong>MRSA Active:</strong>
          <span>${drug.spectrum.mrsa === "Yes" ? "✅ Yes" : "❌ No"}</span>
        </div>
        <div class="spectrum-item">
          <strong>Pseudomonas Active:</strong>
          <span>${drug.spectrum.pseudomonas === "Yes" ? "✅ Yes" : "❌ No"}</span>
        </div>
      </div>
    </article>
  ` : "";

  // Schedule H vs H1 Notice Box
  const scheduleNotice = drug.schedule === "Schedule H1" ? `
    <div class="red-line-box">
      <h3>🔴 Indian Schedule H1 Prescription Medicine</h3>
      <p>This antibiotic has a <strong>prominent vertical red line</strong> on its packaging. Under Indian drug regulations (Drugs &amp; Cosmetics Rules), it requires a registered medical practitioner's written prescription and CANNOT be dispensed over-the-counter.</p>
    </div>
  ` : `
    <div class="red-line-box" style="border-left-color: #2563eb; border-color: #bfdbfe; background: #eff6ff;">
      <h3 style="color: #1e40af;">🔵 Indian Schedule H Prescription Medicine</h3>
      <p style="color: #1e3a8a;">This medicine falls under Schedule H regulations in India. It is sold strictly upon the prescription of a registered medical practitioner.</p>
    </div>
  `;

  detailRoot.innerHTML = `
    <!-- Top Action Bar -->
    <div class="monograph-nav-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:20px;">
      <a href="index.html#drugs" class="back-link">← Back to Antibiotic Directory</a>
      <button class="btn-share" onclick="shareCurrentDrug('${escapeHtml(drug.name)}', '${escapeHtml(drug.brands.join(", "))}')" style="background:#25D366; color:#fff; border:none; padding:8px 16px; border-radius:50px; cursor:pointer; font-weight:700;">
        📲 Share This Drug on WhatsApp
      </button>
    </div>

    <!-- Hero Header -->
    <div class="detail-hero" style="border-top-color:${drug.color}; background:${drug.color}14;">
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
        <span class="badge" style="background:${drug.color}">${escapeHtml(drug.drugClass)}</span>
        <span class="badge aware-${drug.aware.toLowerCase()}">WHO ${drug.aware}</span>
        <span class="schedule-h1-tag">${escapeHtml(drug.schedule || "Schedule H")}</span>
      </div>
      <h1>${escapeHtml(drug.name)}</h1>
      <p class="brand-names">Indian Pharmacy Brands: <strong>${escapeHtml(drug.brands.join(", "))}</strong></p>
      <p class="hero-desc">${escapeHtml(drug.shortDesc)}</p>
    </div>

    ${scheduleNotice}

    <!-- ================= PUBLIC / PATIENT VIEW ================= -->
    <article class="detail-card public-view" style="background:#f0fdf4; border-left-color:#16a34a;">
      <h2 style="color:#15803d;">💡 Patient &amp; Family Quick Guide</h2>
      <div style="display:grid; gap:12px; margin-top:10px;">
        <div>
          <strong style="color:var(--text);">🎯 What this medicine is used for:</strong>
          <ul class="chip-list" style="margin-top:6px;">
            ${drug.treats.map(t => `<li>${escapeHtml(t)}</li>`).join("")}
          </ul>
        </div>
        <div style="margin-top:8px;">
          <strong style="color:var(--text);">🗣️ Key Things to Remember:</strong>
          <ul class="side-effect-list" style="margin-top:6px;">
            ${drug.counselingPoints ? drug.counselingPoints.map(c => `<li>${escapeHtml(c)}</li>`).join("") : "<li>Follow your doctor's prescription strictly.</li>"}
          </ul>
        </div>
        <div style="margin-top:8px;">
          <strong style="color:var(--text);">⚠️ Important Precautions:</strong>
          <ul class="warn-box" style="margin:8px 0 0; padding:16px;">
            ${drug.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </article>

    <!-- ================= ACADEMIC / PHARMACY VIEW ================= -->
    <article class="detail-card academic-view">
      <h2>📖 Mechanism of Action</h2>
      <p>${escapeHtml(drug.works)}</p>
    </article>

    ${spectrumHtml}

    <article class="detail-card academic-view">
      <h2>✅ Clinical Indications &amp; Approved Uses</h2>
      <ul class="chip-list">
        ${drug.treats.map(t => `<li>${escapeHtml(t)}</li>`).join("")}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>💊 Available Dosage Forms</h2>
      <ul class="plain-list">
        ${drug.forms.map(f => `<li>${escapeHtml(f)}</li>`).join("")}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>⚕️ Clinical &amp; Dispensing Guidance</h2>
      <p><strong>🤰 Pregnancy Safety:</strong> ${escapeHtml(drug.pregnancySafety || "Consult clinical specialist")}</p>
      <p style="margin-top:8px;"><strong>🫀 Organ Adjustments:</strong> ${escapeHtml(drug.organAdjustment || "Standard dosing")}</p>

      <div class="warn-box" style="margin-top:18px; background:#fffbeb; border-left-color:#f59e0b;">
        <h3 style="color:#d97706; margin-bottom:8px;">🔄 Major Drug Interactions</h3>
        <ul style="padding-left:20px;">
          ${drug.interactions && drug.interactions.length > 0 ? drug.interactions.map(i => `<li>${escapeHtml(i)}</li>`).join("") : "<li>No major drug interactions documented.</li>"}
        </ul>
      </div>

      <h3 style="margin-top:20px; color:var(--primary-dark);">🗣️ Pharmacist Counseling Points</h3>
      <ul class="side-effect-list">
        ${drug.counselingPoints ? drug.counselingPoints.map(c => `<li>${escapeHtml(c)}</li>`).join("") : "<li>Follow prescription instructions closely.</li>"}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>🩺 Common Side Effects (Adverse Drug Reactions)</h2>
      <p class="side-note">Most patients tolerate therapy well, but the following adverse events may occur:</p>
      <ul class="side-effect-list">
        ${drug.commonSideEffects.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
      </ul>
    </article>

    <div class="warn-box academic-view">
      <h2>⚠️ Critical Warnings &amp; Black Box Precautions</h2>
      <ul>
        ${drug.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join("")}
      </ul>
    </div>

    <div class="tip-box">
      <h3>💡 Indian Pharmacy Market Insight</h3>
      <p>${escapeHtml(drug.tip || "Always adhere to antibiotic stewardship guidelines and dispense strictly upon a valid prescription.")}</p>
    </div>

    <p class="detail-disclaimer">
      ⚕️ AB|Info is an educational resource for pharmacy practice and healthcare students. Dosage depends on patient age, renal function, weight, and microbiological sensitivity.
    </p>
  `;
}