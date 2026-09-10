// ===== ALL 21 ANTIBIOTIC CLASSES AVAILABLE IN INDIA =====
const antibioticClasses = [
  {
    id: "natural-penicillins",
    icon: "🧪",
    name: "Natural Penicillins",
    aware: "Access",
    color: "#2563eb",
    desc: "The original penicillin antibiotics discovered by Alexander Fleming — narrow-spectrum but still life-saving today.",
    mech: "Inhibit penicillin-binding proteins (PBPs), weakening bacterial peptidoglycan walls until osmotic lysis occurs.",
    drugs: [
      { n: "Benzylpenicillin (Penicillin G)", id: "benzylpenicillin", b: "Benapen, Crystapen" },
      { n: "Benzathine Penicillin G", id: "benzathine-penicillin", b: "Penidure LA, Extencilline" },
      { n: "Procaine Penicillin", id: null, b: "Estrepencelin" }
    ],
    treats: ["Syphilis (all stages)", "Rheumatic fever secondary prevention", "Streptococcal endocarditis", "Gas gangrene"],
    india: "Penidure LA is manufactured in India (Sarabhai/Piramal) and supplied free under National Rheumatic Heart Disease control programs."
  },
  {
    id: "aminopenicillins",
    icon: "💊",
    name: "Aminopenicillins",
    aware: "Access",
    color: "#1d4ed8",
    desc: "Extended-spectrum penicillins designed to cover common community respiratory, ENT, dental, and urinary pathogens.",
    mech: "Disrupt bacterial cell-wall construction in multiplying susceptible Gram-positive and Gram-negative organisms.",
    drugs: [
      { n: "Amoxicillin", id: "amoxicillin", b: "Novamox, Mox, Amoxil" },
      { n: "Ampicillin", id: "ampicillin", b: "Ampilife, Campicillin, Bicil" }
    ],
    treats: ["Otitis media (ear infections)", "Strep throat & pharyngitis", "Sinusitis", "Uncomplicated cystitis", "Dental abscess"],
    india: "Amoxicillin is among the highest-volume oral antibiotics in Indian retail chemists; Novamox (Cipla) is a household brand."
  },
  {
    id: "penicillinase-resistant",
    icon: "🛡️",
    name: "Penicillinase-Resistant Penicillins",
    aware: "Access",
    color: "#0891b2",
    desc: "Bulky side-chain penicillins built specifically to resist destruction by staphylococcal beta-lactamase enzymes.",
    mech: "Sterically prevent staphylococcal beta-lactamase from breaking open the beta-lactam ring.",
    drugs: [
      { n: "Cloxacillin", id: "cloxacillin", b: "Klox, Cloxapen, Bioclox" },
      { n: "Dicloxacillin", id: null, b: "Diclolox" },
      { n: "Flucloxacillin", id: null, b: "Floxapen" }
    ],
    treats: ["Methicillin-Susceptible Staph aureus (MSSA) skin infections", "Furuncles & boils", "Wound infections", "Staph osteomyelitis"],
    india: "Cloxacillin capsules and fixed-dose combinations remain everyday staples across Indian surgical and orthopedic wards."
  },
  {
    id: "antipseudomonal-penicillins",
    icon: "⚔️",
    name: "Antipseudomonal Penicillins",
    aware: "Watch",
    color: "#7c3aed",
    desc: "High-tier parenteral penicillins engineered for aggressive Gram-negative hospital pathogens including Pseudomonas aeruginosa.",
    mech: "Penetrate Pseudomonas outer membrane porins and bind critical PBPs to trigger rapid cell death.",
    drugs: [
      { n: "Piperacillin", id: null, b: "Pipracil (almost always combined with Tazobactam)" },
      { n: "Ticarcillin", id: null, b: "Timentin (largely superseded by Pip-Tazo)" }
    ],
    treats: ["Hospital-acquired pneumonia", "Neutropenic fever in chemotherapy", "Burn wound sepsis", "Peritonitis"],
    india: "Monotherapy piperacillin is rarely used; it is almost universally dispensed as Piperacillin-Tazobactam in Indian ICUs."
  },
  {
    id: "bla-inhibitors",
    icon: "🔗",
    name: "Beta-Lactamase Inhibitor Combinations",
    aware: "Watch",
    color: "#0ea5e9",
    desc: "Antibiotics formulated with 'shield molecules' that disable bacterial resistance enzymes before they can destroy the antibiotic.",
    mech: "The inhibitor partner (clavulanate, sulbactam, tazobactam) suicide-inactivates beta-lactamases, allowing the antibiotic to lyse the bacteria.",
    drugs: [
      { n: "Amoxicillin + Clavulanate", id: "amoxicillin-clavulanate", b: "Augmentin, Clavam, Moxikind-CV" },
      { n: "Piperacillin + Tazobactam", id: "piperacillin-tazobactam", b: "Tazact, Zosyn, Pipzo" },
      { n: "Cefoperazone + Sulbactam", id: null, b: "Magnex Forte, Xone-SB, Sulbacef" }
    ],
    treats: ["Animal/human bite wounds", "Diabetic foot infections", "Hospital-acquired pneumonia", "Complicated intra-abdominal sepsis"],
    india: "India represents one of the largest global markets for Augmentin-type combinations; Clavam and Magnex Forte are top hospital blockbusters."
  },
  {
    id: "ceph-1st",
    icon: "1️⃣",
    name: "First-Generation Cephalosporins",
    aware: "Access",
    color: "#059669",
    desc: "Established workhorses strongest against Gram-positive staphylococcal and streptococcal skin, wound, and urinary infections.",
    mech: "Inhibit bacterial peptidoglycan wall assembly during active cell division.",
    drugs: [
      { n: "Cephalexin", id: "cephalexin", b: "Sporidex, Phexin, Keflex" },
      { n: "Cefazolin", id: "cefazolin", b: "Cezolin, Orizolin, Reflin" },
      { n: "Cefadroxil", id: null, b: "Droxyl, Cefadrox" }
    ],
    treats: ["Cellulitis & impetigo", "Surgical wound prophylaxis", "Uncomplicated UTIs", "Staph boils"],
    india: "Sporidex (Sun Pharma) is a classic outpatient skin antibiotic; Cefazolin is routine surgical prophylaxis nationwide."
  },
  {
    id: "ceph-2nd",
    icon: "2️⃣",
    name: "Second-Generation Cephalosporins",
    aware: "Watch",
    color: "#0284c7",
    desc: "Balanced spectrum with augmented Gram-negative coverage against respiratory pathogens like Haemophilus and Moraxella.",
    mech: "Resist destruction by beta-lactamases produced by respiratory bacteria while inhibiting cell-wall creation.",
    drugs: [
      { n: "Cefuroxime Axetil", id: "cefuroxime", b: "Ceftum, Zeffu, Altacef" },
      { n: "Cefaclor", id: null, b: "Keflor, Distaclor" }
    ],
    treats: ["Community-acquired pneumonia", "Acute otitis media", "Sinusitis", "Exacerbations of chronic bronchitis", "Lyme disease"],
    india: "Ceftum (GSK) is widely prescribed in private outpatient pulmonology clinics across metro cities in India."
  },
  {
    id: "ceph-3rd",
    icon: "3️⃣",
    name: "Third-Generation Cephalosporins",
    aware: "Watch",
    color: "#047857",
    desc: "Potent broad-spectrum cephalosporins with high stability against enteric bacteria — India's best-selling antibiotic family.",
    mech: "High affinity for Gram-negative PBPs with resistance to many plasmid-mediated beta-lactamases.",
    drugs: [
      { n: "Cefixime", id: "cefixime", b: "Taxim-O, Zifi, Cefiget" },
      { n: "Ceftriaxone", id: "ceftriaxone", b: "Monocef, Cefaxone, Oframax" },
      { n: "Cefotaxime", id: "cefotaxime", b: "Claforan, Omnatax, Taxim" },
      { n: "Cefpodoxime Proxetil", id: null, b: "Monocef-O, Cepodem, Doxcef" }
    ],
    treats: ["Enteric fever (Typhoid)", "Bacterial meningitis", "Paediatric respiratory infections", "Pyelonephritis", "Gonorrhea"],
    india: "Monocef (Aristo) and Taxim-O (Alkem) rank among the highest-volume pharmaceutical products across the country."
  },
  {
    id: "ceph-4th",
    icon: "4️⃣",
    name: "Fourth-Generation Cephalosporins",
    aware: "Watch",
    color: "#0f766e",
    desc: "Zwitterionic cephalosporins capable of penetrating AmpC-producing Gram-negative bacteria and Pseudomonas aeruginosa.",
    mech: "Zwitterionic molecular charge facilitates rapid transit through outer-membrane porins to bind PBPs.",
    drugs: [
      { n: "Cefepime", id: "cefepime", b: "Maxipime, Kefage, Cefepime IV" }
    ],
    treats: ["Febrile neutropenia in cancer patients", "Hospital-acquired pneumonia", "Severe pseudomonal bacteremia", "Complicated UTIs"],
    india: "Essential in oncology and bone-marrow transplant centers; requires strict renal dose titration to prevent encephalopathy."
  },
  {
    id: "ceph-5th",
    icon: "5️⃣",
    name: "Fifth-Generation Cephalosporins",
    aware: "Reserve",
    color: "#115e59",
    desc: "Advanced anti-MRSA cephalosporins engineered specifically to bind modified PBP2a in resistant staph strains.",
    mech: "Binds with high affinity to PBP2a in MRSA and PBP2x in penicillin-resistant pneumococci.",
    drugs: [
      { n: "Ceftaroline Fosamil", id: "ceftaroline", b: "Zinforo, Teflaro" },
      { n: "Ceftobiprole", id: null, b: "Zevtera" }
    ],
    treats: ["Complicated MRSA skin and soft-tissue infections", "Refractory community-acquired pneumonia", "MRSA bacteremia salvage"],
    india: "Classified strictly as Reserve in Indian tertiary hospitals to safeguard alternatives to vancomycin and linezolid."
  },
  {
    id: "carbapenems",
    icon: "💠",
    name: "Carbapenems",
    aware: "Watch",
    color: "#475569",
    desc: "Ultra-broad intravenous beta-lactams resistant to nearly all ESBL enzymes, reserved for severe inpatient sepsis.",
    mech: "Demolish cell walls by binding multiple PBPs; immune to degradation by classic extended-spectrum beta-lactamases (ESBL).",
    drugs: [
      { n: "Meropenem", id: "meropenem", b: "Meronem, Meromac, Merowin" },
      { n: "Imipenem + Cilastatin", id: "imipenem-cilastatin", b: "Tienam, Cilanem, Imicas" },
      { n: "Ertapenem", id: null, b: "Invanz" }
    ],
    treats: ["ESBL-producing Enterobacterales sepsis", "ICU ventilator pneumonia", "Complicated intra-abdominal infections", "Severe pyelonephritis"],
    india: "High consumption in Indian ICUs has accelerated the spread of New Delhi Metallo-beta-lactamase (NDM-1) carbapenem resistance."
  },
  {
    id: "monobactams",
    icon: "🔲",
    name: "Monobactams",
    aware: "Reserve",
    color: "#64748b",
    desc: "Single-ring beta-lactams that do not cross-react with penicillin allergies, active solely against aerobic Gram-negative bacilli.",
    mech: "Binds selectively to PBP3 in Gram-negative aerobes; structurally safe in severe penicillin anaphylaxis.",
    drugs: [
      { n: "Aztreonam", id: null, b: "Azactam, Treonam, Aztro" }
    ],
    treats: ["Gram-negative hospital sepsis in severe penicillin-allergic patients", "Cystic fibrosis pseudomonal lung infections", "NDM infections (combined with Avibactam)"],
    india: "Aztreonam combined with Ceftazidime-Avibactam is emerging as a critical clinical combo in India to overcome NDM-1 metallo-beta-lactamases."
  },
  {
    id: "macrolides",
    icon: "🟨",
    name: "Macrolides",
    aware: "Watch",
    color: "#ca8a04",
    desc: "Atypical respiratory bug specialists and the primary oral alternatives for penicillin-allergic patients.",
    mech: "Reversibly bind the bacterial 50S ribosomal subunit, halting protein translation.",
    drugs: [
      { n: "Azithromycin", id: "azithromycin", b: "Azithral, Azee, Zithromax" },
      { n: "Clarithromycin", id: "clarithromycin", b: "Claribid, Crixan, Synclar" },
      { n: "Roxithromycin", id: null, b: "Roxid, Roxifast" }
    ],
    treats: ["Atypical pneumonia (Mycoplasma/Legionella)", "H. pylori ulcer eradication", "Chlamydia infections", "Scrub typhus"],
    india: "Azithromycin was among the most heavily consumed oral tablets in India during COVID-19; Azithral is a household brand."
  },
  {
    id: "tetracyclines",
    icon: "🟪",
    name: "Tetracyclines",
    aware: "Access",
    color: "#7c3aed",
    desc: "Broad-spectrum oral agents targeting unusual intracellular bugs like Rickettsia, Chlamydia, and vector-borne pathogens.",
    mech: "Bind the 30S ribosomal subunit, preventing the attachment of aminoacyl-tRNA to the ribosomal acceptor site.",
    drugs: [
      { n: "Doxycycline", id: "doxycycline", b: "Doxt, Microdox, Doxy-1" },
      { n: "Minocycline", id: "minocycline", b: "Cynomycin, Minoz, Minocin" }
    ],
    treats: ["Scrub typhus (Rickettsial fever)", "Acne vulgaris", "Lyme disease & Leptospirosis", "Malaria prophylaxis", "Community MRSA skin infections"],
    india: "Doxt-SL (Micro Labs) is standard empiric therapy across Karnataka and South India for acute undifferentiated fevers."
  },
  {
    id: "glycylcyclines",
    icon: "🧬",
    name: "Glycylcyclines",
    aware: "Reserve",
    color: "#5b21b6",
    desc: "Next-generation tetracycline derivatives designed to overcome classic tetracycline ribosomal-protection and efflux resistance.",
    mech: "Binds the 30S ribosomal subunit with 5-fold higher affinity than minocycline, ignoring bacterial efflux pumps.",
    drugs: [
      { n: "Tigecycline", id: null, b: "Tygacil, Tigebax, Critig" }
    ],
    treats: ["Complicated intra-abdominal sepsis caused by MDR bugs", "Complicated skin and soft tissue infections", "Acinetobacter hospital infections"],
    india: "Heavily utilized in Indian intensive care units; monitored carefully due to FDA warnings regarding all-cause mortality risks."
  },
  {
    id: "fluoroquinolones",
    icon: "🟥",
    name: "Fluoroquinolones",
    aware: "Watch",
    color: "#dc2626",
    desc: "Synthetic DNA-cleaving bactericidal agents — potent, but severely limited today by high community resistance.",
    mech: "Inhibit bacterial DNA gyrase (topoisomerase II) and topoisomerase IV, preventing DNA replication.",
    drugs: [
      { n: "Ciprofloxacin", id: "ciprofloxacin", b: "Ciplox, Cifran, Ciprolet" },
      { n: "Levofloxacin", id: "levofloxacin", b: "Levoflox, Glevo, L-Cin" },
      { n: "Norfloxacin", id: "norfloxacin", b: "Norflox, Uriflox" },
      { n: "Ofloxacin", id: null, b: "Zanocin, Oflox" }
    ],
    treats: ["Complicated UTIs & pyelonephritis", "Typhoid fever (culture sensitive)", "Respiratory infections", "Bacterial diarrhea"],
    india: "Fluoroquinolone resistance in Indian E. coli and Salmonella exceeds 70–80%; national stewardship programs restrict routine empiric use."
  },
  {
    id: "sulfonamides",
    icon: "🟧",
    name: "Sulfonamides & Folate Blockers",
    aware: "Access",
    color: "#0891b2",
    desc: "Synergistic metabolic inhibitors that starve bacteria by blocking two sequential steps of folic acid synthesis.",
    mech: "Sulfamethoxazole blocks dihydropteroate synthase; Trimethoprim blocks dihydrofolate reductase.",
    drugs: [
      { n: "Trimethoprim / Sulfamethoxazole", id: "cotrimoxazole", b: "Septran, Bactrim DS, Ciplin" }
    ],
    treats: ["Pneumocystis jirovecii (PCP) pneumonia in HIV", "Community MRSA boils", "Uncomplicated UTIs", "Stenotrophomonas sepsis"],
    india: "Septran DS is an ultra-low-cost, essential medicine widely available across Indian government supply chains."
  },
  {
    id: "aminoglycosides",
    icon: "⚡",
    name: "Aminoglycosides",
    aware: "Access",
    color: "#0284c7",
    desc: "Parenteral bactericidal workhorses for severe Gram-negative bacilli sepsis and enterococcal endocarditis synergy.",
    mech: "Irreversibly bind the 30S bacterial ribosome, inducing mistranslation of proteins and cell membrane breakdown.",
    drugs: [
      { n: "Amikacin", id: "amikacin", b: "Amicin, Mikacin, Amikamac" },
      { n: "Gentamicin", id: "gentamicin", b: "Garamycin, Genticyn" },
      { n: "Tobramycin", id: null, b: "Tobacin" }
    ],
    treats: ["Hospital-acquired Gram-negative sepsis", "Multidrug-resistant Tuberculosis (MDR-TB)", "Endocarditis synergy", "Neonatal sepsis"],
    india: "Mikacin and Genticyn are low-cost mainstays across Indian government district hospitals and NICUs."
  },
  {
    id: "glycopeptides",
    icon: "🏛️",
    name: "Glycopeptides",
    aware: "Watch",
    color: "#e11d48",
    desc: "Large-molecule cell-wall inhibitors reserved as standard intravenous therapy for serious hospital MRSA infections.",
    mech: "Bind to D-Ala-D-Ala terminals of peptidoglycan precursors, preventing transpeptidase cross-linking.",
    drugs: [
      { n: "Vancomycin", id: "vancomycin", b: "Vancocin, Vanlid, Vancomate" },
      { n: "Teicoplanin", id: null, b: "Targocid, Ticocin" }
    ],
    treats: ["Severe MRSA bacteremia & endocarditis", "Hospital-acquired MRSA pneumonia", "C. difficile colitis (oral vancomycin ONLY)"],
    india: "Vanlid (Cipla) and Targocid (Sanofi) are core MRSA injectables monitored by hospital stewardship committees."
  },
  {
    id: "oxazolidinones",
    icon: "🔺",
    name: "Oxazolidinones",
    aware: "Watch",
    color: "#be123c",
    desc: "Modern synthetic Gram-positive specialists with 100% oral bioavailability against MRSA and Vancomycin-Resistant Enterococci (VRE).",
    mech: "Bind the 50S ribosomal subunit at the 23S rRNA interface, blocking formation of the 70S translation initiation complex.",
    drugs: [
      { n: "Linezolid", id: "linezolid", b: "Linospan, Lizomac, Zyvoxid" }
    ],
    treats: ["Hospital MRSA pneumonia", "VRE bacteremia", "Complicated diabetic foot infections", "Drug-resistant TB regimens (XDR-TB)"],
    india: "Fully genericized in India; Linospan costs a fraction of Western prices, making oral MRSA therapy accessible."
  },
  {
    id: "polymyxins",
    icon: "🚨",
    name: "Polymyxins (Last-Line Reserve)",
    aware: "Reserve",
    color: "#7f1d1d",
    desc: "The end-of-the-road intravenous injectables deployed when all other options fail against pan-drug-resistant Gram-negatives.",
    mech: "Act as cationic detergents, disrupting the outer membrane lipopolysaccharides of Gram-negative bacilli.",
    drugs: [
      { n: "Colistin (Colistimethate Sodium)", id: "colistin", b: "Xelistra, Coly-Mycin, Colistin-AS" },
      { n: "Polymyxin B", id: null, b: "Poly-B, Polymyx" }
    ],
    treats: ["Carbapenem-Resistant Klebsiella (CRKP) sepsis", "Acinetobacter baumannii ICU outbreaks", "Ventilator-associated pneumonia"],
    india: "High consumption in Indian tertiary ICUs makes colistin stewardship critical to preserve our final defense line against superbugs."
  }
];

// ===== RENDER & SEARCH CONTROLLER =====
const classGrid = document.getElementById("classGrid");
const classSearchInput = document.getElementById("classSearchInput");

function renderClasses(list) {
  if (!classGrid) return;
  classGrid.innerHTML = "";

  const countBadge = document.getElementById("classCount");
  if (countBadge) {
    countBadge.textContent = `(${list.length} classes)`;
  }

  if (list.length === 0) {
    classGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; color:var(--text-muted);">
        <p style="font-size:1.2rem;">😕 No antibiotic classes matched your search.</p>
        <button class="btn-primary" onclick="resetClassSearch()" style="margin-top:14px;">Reset Search</button>
      </div>`;
    return;
  }

  list.forEach(cls => {
    const card = document.createElement("article");
    card.className = "class-card expanded-card";
    card.id = `class-${cls.id}`;

    const bannerHtml = `
      <div class="class-banner" style="background:linear-gradient(135deg, ${cls.color}, ${cls.color}99);">
        <span>${cls.icon}</span>
      </div>`;

    card.innerHTML = `
      ${bannerHtml}
      <div class="class-body">
        <h3>${cls.icon} ${cls.name}</h3>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin: 8px 0 10px;">
          <span class="badge" style="background:${cls.color}">${cls.name.split(" ")[0]}</span>
          <span class="badge aware-${cls.aware.toLowerCase()}">WHO ${cls.aware}</span>
        </div>
        <p class="class-desc">${cls.desc}</p>

        <details class="class-details">
          <summary>View ${cls.drugs.length} drugs, mechanism &amp; India details ▾</summary>

          <div class="mech-box">
            <strong>🧬 How they work:</strong> ${cls.mech}
          </div>

          <div style="margin: 12px 0;">
            <strong style="font-size:0.88rem; color:var(--primary-dark);">🎯 Common Clinical Uses:</strong>
            <ul class="chip-list" style="margin-top:6px;">
              ${cls.treats.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>

          <h4>💊 Key Drugs in India:</h4>
          <ul class="drug-rows">
            ${cls.drugs.map(d => {
              if (d.id) {
                return `<li>
                  <a href="drug.html?drug=${d.id}" style="text-decoration:none; color:var(--primary); font-weight:700;">
                    ${d.n} ↗
                  </a>
                  <span class="brand-names">${d.b}</span>
                </li>`;
              } else {
                return `<li>
                  <strong>${d.n}</strong>
                  <span class="brand-names">${d.b}</span>
                </li>`;
              }
            }).join("")}
          </ul>

          <div class="class-india">
            <strong>📍 Indian Market Insight:</strong> ${cls.india}
          </div>
        </details>
      </div>`;
    classGrid.appendChild(card);
  });
}

function filterClasses() {
  const query = classSearchInput ? classSearchInput.value.toLowerCase().trim() : "";
  const filtered = antibioticClasses.filter(cls => {
    return (
      cls.name.toLowerCase().includes(query) ||
      cls.desc.toLowerCase().includes(query) ||
      cls.mech.toLowerCase().includes(query) ||
      cls.drugs.some(d => d.n.toLowerCase().includes(query) || d.b.toLowerCase().includes(query)) ||
      cls.treats.some(t => t.toLowerCase().includes(query))
    );
  });
  renderClasses(filtered);
}

function resetClassSearch() {
  if (classSearchInput) {
    classSearchInput.value = "";
  }
  renderClasses(antibioticClasses);
}

if (classSearchInput) {
  classSearchInput.addEventListener("input", filterClasses);
}

// Initial invocation on load
if (classGrid) {
  renderClasses(antibioticClasses);
}