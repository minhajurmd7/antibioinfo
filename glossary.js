// ===== A–Z CLINICAL & PHARMACOLOGICAL GLOSSARY =====
const glossaryTerms = [
  {
    term: "AMR (Antimicrobial Resistance)",
    category: "microbiology",
    simple: "When bacteria, viruses, or fungi adapt and survive exposure to medicines designed to kill them, turning ordinary infections into superbug threats.",
    academic: "The evolutionary biological phenomenon where microorganisms acquire or select genetic mutations (e.g. via plasmids, transposons) enabling survival against antimicrobial concentrations that previously inhibited them."
  },
  {
    term: "Antimicrobial Stewardship (AMS)",
    category: "policy",
    simple: "A coordinated system in hospitals and clinics to ensure patients receive the exact right antibiotic, at the right dose, for only the necessary duration.",
    academic: "Systematic, evidence-based organizational interventions designed to optimize clinical outcomes, minimize drug toxicity, reduce healthcare costs, and retard the emergence of multi-drug resistant pathogens."
  },
  {
    term: "Bactericidal vs. Bacteriostatic",
    category: "pharmacology",
    simple: "Bactericidal antibiotics kill bacteria directly; bacteriostatic antibiotics freeze bacterial multiplication so your body's immune system can clear them.",
    academic: "Bactericidal agents reduce the bacterial inoculum by >= 99.9% (3-log10 kill) within 18–24 hours (e.g. beta-lactams, aminoglycosides); bacteriostatic agents inhibit protein/folic acid synthesis without immediate lysis (e.g. tetracyclines, macrolides)."
  },
  {
    term: "Beta-Lactam Ring",
    category: "pharmacology",
    simple: "A four-sided chemical core structure found in penicillins and cephalosporins that attacks the bacterial cell wall.",
    academic: "A cyclic amide four-membered heteroatomic ring that mimics the D-Ala-D-Ala terminus of peptidoglycan, acylating penicillin-binding proteins (PBPs) to block bacterial wall transpeptidation."
  },
  {
    term: "Beta-Lactamase Inhibitors",
    category: "pharmacology",
    simple: "'Shield' medicines (like clavulanic acid or tazobactam) combined with antibiotics to stop bacterial enzymes from destroying the antibiotic.",
    academic: "Molecules that irreversibly bind and inactivate bacterial beta-lactamase enzymes (suicide substrates), restoring the antibacterial potency of co-administered beta-lactam antibiotics against resistant strains."
  },
  {
    term: "Broad-Spectrum Antibiotics",
    category: "pharmacology",
    simple: "Antibiotics that target a wide range of different bacteria at once, but also risk killing beneficial protective gut bacteria.",
    academic: "Antimicrobial agents active across diverse bacterial taxa (both Gram-positive and Gram-negative organisms), useful in empiric therapy but associated with collateral damage to the host microbiome and secondary Clostridioides difficile infection."
  },
  {
    term: "Carbapenem-Resistant Enterobacterales (CRE)",
    category: "microbiology",
    simple: "Extremely dangerous hospital bacteria (such as Klebsiella or E. coli) that survive even our strongest reserve carbapenem antibiotics.",
    academic: "Enterobacterales strains exhibiting resistance to at least one carbapenem (meropenem, imipenem, ertapenem) via carbapenemase production (NDM, KPC, OXA-48) or combined outer-membrane porin loss with ESBL/AmpC hyperproduction."
  },
  {
    term: "Clostridioides difficile Colitis",
    category: "microbiology",
    simple: "Severe watery diarrhea caused by toxic bacterial overgrowth in the gut after normal healthy bacteria are wiped out by strong antibiotics.",
    academic: "Toxin-mediated pseudomembranous colitis resulting from disruption of the normal colonic microbiota, classically triggered by clindamycin, fluoroquinolones, or cephalosporins. Treated with oral vancomycin or fidaxomicin."
  },
  {
    term: "Disulfiram-Like Reaction",
    category: "pharmacology",
    simple: "A severe sickness (vomiting, flushing, pounding headache) that happens if you drink alcohol while taking medicines like metronidazole.",
    academic: "Inhibition of hepatic aldehyde dehydrogenase resulting in toxic systemic accumulation of acetaldehyde upon ethanol ingestion, precipitating hypotension, tachycardia, diaphoresis, and severe nausea."
  },
  {
    term: "e-PIL (Electronic Patient Information Leaflet)",
    category: "policy",
    simple: "A digital information sheet accessed by scanning a QR code on a medicine strip, providing patient instructions in multiple local languages.",
    academic: "A digital health platform delivering standardized, regulatory-compliant pharmacological, dosage, and adverse reaction guidance directly to patients' mobile devices via 2D barcodes on dispensed packaging."
  },
  {
    term: "ESBL (Extended-Spectrum Beta-Lactamase)",
    category: "microbiology",
    simple: "Enzymes made by resistant bacteria that break down penicillins and cephalosporins, requiring stronger reserve treatments.",
    academic: "Plasmid-mediated enzymes (predominantly CTX-M, TEM, and SHV variants) produced by Gram-negative bacilli that hydrolyze penicillins, 1st–3rd generation cephalosporins, and monobactams, but are typically inhibited by clavulanate and tazobactam."
  },
  {
    term: "Gram-Positive vs. Gram-Negative",
    category: "microbiology",
    simple: "A test dividing bacteria into two groups: Gram-positive have a thick outer mesh wall; Gram-negative have a tough double-membrane barrier making them harder to treat.",
    academic: "Classification based on cell envelope architecture: Gram-positives possess a thick peptidoglycan layer containing teichoic acids; Gram-negatives feature a thin peptidoglycan layer enveloped by an outer lipopolysaccharide (LPS) membrane with selective porin channels."
  },
  {
    term: "Jarisch-Herxheimer Reaction",
    category: "pharmacology",
    simple: "A short fever and shivering episode that can happen shortly after the first dose of penicillin when treating syphilis, caused by dying bacteria.",
    academic: "A transient systemic inflammatory cytokine release (TNF-alpha, IL-6) occurring within 2–24 hours of initiating bactericidal therapy for spirochetal infections (e.g. Treponema pallidum, Borrelia), causing rigors, fever, and transient hypotension."
  },
  {
    term: "MIC (Minimum Inhibitory Concentration)",
    category: "pharmacology",
    simple: "The smallest amount of an antibiotic needed in a laboratory test to prevent visible bacterial growth.",
    academic: "The lowest concentration of an antimicrobial agent (in mg/L or mcg/mL) that prevents visible in vitro growth of a standardized bacterial inoculum under defined incubation conditions."
  },
  {
    term: "MRSA (Methicillin-Resistant Staphylococcus aureus)",
    category: "microbiology",
    simple: "A strain of staph bacteria that resists standard penicillins and requires specific alternative antibiotics like vancomycin or linezolid.",
    academic: "Staphylococcus aureus isolates carrying the mecA or mecC gene, encoding an altered penicillin-binding protein (PBP2a) with low binding affinity for nearly all beta-lactams except 5th-generation cephalosporins (ceftaroline)."
  },
  {
    term: "Narrow-Spectrum Antibiotics",
    category: "pharmacology",
    simple: "Targeted antibiotics that kill only a specific small group of bacteria, protecting healthy gut flora.",
    academic: "Antimicrobial agents with selective activity against specific bacterial genera or species (e.g. benzylpenicillin for Strep pyogenes), minimizing collateral ecological damage to commensal microbiota."
  },
  {
    term: "NDM-1 (New Delhi Metallo-Beta-Lactamase)",
    category: "microbiology",
    simple: "A powerful bacterial enzyme that destroys almost all beta-lactams and carbapenems, creating superbugs treatable only with last-line drugs.",
    academic: "A Class B zinc-dependent metallo-beta-lactamase enzyme capable of hydrolyzing all penicillins, cephalosporins, and carbapenems (sparing only monobactams), carried on mobile plasmids across Enterobacterales and Pseudomonas."
  },
  {
    term: "Nephrotoxicity",
    category: "pharmacology",
    simple: "Kidney irritation or damage caused by certain strong medicines like colistin, vancomycin, or aminoglycosides.",
    academic: "Drug-induced renal functional impairment manifested by elevated serum creatinine, reduced glomerular filtration rate, or tubular necrosis, requiring therapeutic drug monitoring and dosage adjustment."
  },
  {
    term: "Ototoxicity",
    category: "pharmacology",
    simple: "Inner ear damage causing dizziness or permanent hearing loss, associated with high doses of aminoglycosides like amikacin or gentamicin.",
    academic: "Direct drug-mediated damage to cochlear hair cells or vestibular sensory epithelia resulting in sensorineural hearing loss, tinnitus, or ataxia, commonly mediated by reactive oxygen species and non-selective endocytosis."
  },
  {
    term: "Penicillin-Binding Proteins (PBPs)",
    category: "pharmacology",
    simple: "Essential bacterial enzymes responsible for building cell walls; the primary target of penicillin and cephalosporin antibiotics.",
    academic: "Membrane-bound transpeptidases, transglycosylases, and carboxypeptidases that catalyze the cross-linking of peptidoglycan polymers during bacterial cell wall synthesis."
  },
  {
    term: "Red Line Campaign",
    category: "policy",
    simple: "The Indian health campaign placing a prominent vertical red line on medicine packages to remind patients that these drugs require a prescription.",
    academic: "A public health and regulatory initiative launched by the Ministry of Health & Family Welfare (Govt. of India) designating Schedule H and H1 prescription-only medicines with a distinct vertical red stripe to curb OTC dispensing."
  },
  {
    term: "Schedule H and H1",
    category: "policy",
    simple: "Indian drug rules requiring pharmacies to sell antibiotics only with a written doctor's prescription and maintain record books.",
    academic: "Statutory schedules under the Drugs and Cosmetics Rules (1945) of India. Schedule H1 mandates that pharmacies maintain a separate register detailing patient name, doctor, drug quantity, and date for 3 years, barring over-the-counter dispensing."
  },
  {
    term: "VRE (Vancomycin-Resistant Enterococci)",
    category: "microbiology",
    simple: "Resistant gut bacteria that survive vancomycin treatment and require reserve drugs like linezolid.",
    academic: "Enterococcal strains (primarily Enterococcus faecium) carrying vanA or vanB gene clusters that replace the cell-wall target D-Ala-D-Ala with D-Ala-D-Lac, reducing vancomycin binding affinity by 1,000-fold."
  },
  {
    term: "WHO AWaRe Classification",
    category: "policy",
    simple: "A World Health Organization system dividing antibiotics into three groups: Access (first-line), Watch (higher resistance risk), and Reserve (last-resort).",
    academic: "An antimicrobial stewardship tool developed by the WHO classifying antibiotics into Access, Watch, and Reserve tiers to monitor consumption targets (>= 60% of total national antibiotic use should be from the Access category) and preserve global antibiotic efficacy."
  }
];

// Helper: safe HTML escaping
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Controller
const glossaryGrid = document.getElementById("glossaryGrid");
const glossarySearch = document.getElementById("glossarySearch");
let currentCategory = "ALL";

function renderGlossary(list) {
  if (!glossaryGrid) return;
  glossaryGrid.innerHTML = "";

  const countBadge = document.getElementById("glossaryCount");
  if (countBadge) {
    countBadge.textContent = `(${list.length} terms)`;
  }

  if (list.length === 0) {
    glossaryGrid.innerHTML = `
      <div style="grid-column:1 / -1; text-align:center; padding:40px 20px; color:var(--text-muted);">
        <p style="font-size:1.1rem;">😕 No glossary terms matched your query.</p>
      </div>`;
    return;
  }

  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "glossary-card";

    let catBadgeColor = "#2563eb";
    let catLabel = "Pharmacology";
    if (item.category === "microbiology") {
      catBadgeColor = "#7c3aed";
      catLabel = "Microbiology";
    } else if (item.category === "policy") {
      catBadgeColor = "#059669";
      catLabel = "Policy & Law";
    }

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
        <h3 style="color:var(--primary-dark); font-size:1.15rem; margin-bottom:8px;">${escapeHtml(item.term)}</h3>
        <span class="badge" style="background:${catBadgeColor}; font-size:0.72rem;">${catLabel}</span>
      </div>

      <!-- Public View: Plain Language -->
      <div class="public-view" style="margin-top:8px;">
        <p style="font-size:0.95rem; line-height:1.6; color:var(--text);">
          <strong>💡 Plain English:</strong> ${escapeHtml(item.simple)}
        </p>
      </div>

      <!-- Academic View: Clinical & Microbiological -->
      <div class="academic-view" style="margin-top:8px;">
        <p style="font-size:0.92rem; line-height:1.6; color:var(--text);">
          <strong>🔬 Clinical Definition:</strong> ${escapeHtml(item.academic)}
        </p>
      </div>
    `;

    glossaryGrid.appendChild(card);
  });
}

function filterGlossary() {
  const query = glossarySearch ? glossarySearch.value.toLowerCase().trim() : "";

  const filtered = glossaryTerms.filter(item => {
    const matchesCategory = currentCategory === "ALL" || item.category === currentCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(query) ||
      item.simple.toLowerCase().includes(query) ||
      item.academic.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  renderGlossary(filtered);
}

// Category filter button listeners
document.querySelectorAll(".glossary-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".glossary-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-cat");
    filterGlossary();
  });
});

if (glossarySearch) {
  glossarySearch.addEventListener("input", filterGlossary);
}

// Initial render
if (glossaryGrid) {
  renderGlossary(glossaryTerms);
}