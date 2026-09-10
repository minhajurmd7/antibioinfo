// ===== COMPLETE 33-DRUG CLINICAL DATABASE =====
const antibiotics = [
  // --- 1. PENICILLINS & BETA-LACTAMS ---
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    brands: ["Novamox", "Mox", "Amoxil", "Trimox"],
    drugClass: "Aminopenicillins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#2563eb",
    shortDesc: "A core broad-spectrum aminopenicillin widely used for respiratory, dental, and urinary tract infections.",
    works: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs), causing cell lysis and death.",
    forms: ["Capsules (250mg, 500mg)", "Tablets", "Dry Syrup / Oral Suspension"],
    treats: ["Ear infections (Otitis media)", "Strep throat & pharyngitis", "Acute bacterial sinusitis", "Dental abscesses", "Uncomplicated UTIs"],
    spectrum: { gramPos: "Good (Strep, Enterococci)", gramNeg: "Moderate (H. influenzae, E. coli)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Mild skin rash"],
    pregnancySafety: "Category B (Generally considered safe under medical supervision)",
    interactions: [
      "Concurrent allopurinol significantly increases the incidence of skin rashes.",
      "May slightly lower estrogen re-absorption via gut flora changes."
    ],
    organAdjustment: "Renal dose interval extension required when CrCl < 30 mL/min.",
    counselingPoints: [
      "Can be taken with or without food; taking with food reduces stomach irritation.",
      "Space your doses evenly across the day (every 8 hours).",
      "Complete the entire prescribed duration even if you feel completely better."
    ],
    warnings: [
      "Strictly contraindicated in documented severe penicillin allergy (anaphylaxis).",
      "Causes a high incidence of non-allergic maculopapular rash in patients with infectious mononucleosis (EBV)."
    ],
    tip: "Novamox (Cipla) and Mox (Sun) are household staples across Indian retail pharmacies."
  },
  {
    id: "amoxicillin-clavulanate",
    name: "Amoxicillin + Clavulanate",
    brands: ["Augmentin", "Clavam", "Moxikind-CV", "Mega-CV"],
    drugClass: "Beta-Lactamase Inhibitor Combinations",
    aware: "Access",
    schedule: "Schedule H",
    color: "#0ea5e9",
    shortDesc: "Amoxicillin combined with clavulanic acid to protect against beta-lactamase producing resistant bacteria.",
    works: "Amoxicillin lyses bacterial cell walls; clavulanate irreversibly inactivates beta-lactamase enzymes.",
    forms: ["Tablets (375mg, 625mg, 1g)", "Oral suspension", "IV injection"],
    treats: ["Resistant sinusitis & otitis media", "Animal & human bites", "Diabetic foot infections", "Community-acquired pneumonia", "Complicated UTIs"],
    spectrum: { gramPos: "Strong (Strep, MSSA)", gramNeg: "Broad (beta-lactamase producers)", anaerobes: "Moderate (Bacteroides)", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea (frequent)", "Nausea", "Abdominal cramping", "Vaginal candidiasis"],
    pregnancySafety: "Category B (Widely used; avoid near term if preterm labor is suspected due to risk of necrotizing enterocolitis)",
    interactions: [
      "Probenecid decreases renal tubular secretion of amoxicillin.",
      "Increases methotrexate toxicity risk."
    ],
    organAdjustment: "Adjust dose frequency in severe renal impairment (CrCl < 30 mL/min); avoid 1g tablets.",
    counselingPoints: [
      "Always take at the start of a meal to optimize absorption and minimize gastrointestinal intolerance.",
      "Stay well-hydrated throughout the treatment course."
    ],
    warnings: [
      "Higher rate of drug-induced cholestatic jaundice and hepatic impairment, primarily due to the clavulanate component.",
      "Contraindicated in patients with a history of penicillin-associated liver dysfunction."
    ],
    tip: "Clavam (Alkem) and Augmentin (GSK) are among the highest-grossing pharmaceutical brands in India."
  },
  {
    id: "ampicillin",
    name: "Ampicillin",
    brands: ["Ampilife", "Campicillin", "Bicil"],
    drugClass: "Aminopenicillins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#3b82f6",
    shortDesc: "The pioneer aminopenicillin, now used primarily as an intravenous agent in hospital inpatient settings.",
    works: "Binds PBPs to halt bacterial cell wall synthesis during active replication.",
    forms: ["IV / IM Injection (500mg, 1g)", "Capsules (250mg, 500mg)"],
    treats: ["Listeria monocytogenes meningitis", "Enterococcal endocarditis (with aminoglycoside)", "Paediatric sepsis", "Peripartum GBS prophylaxis"],
    spectrum: { gramPos: "Broad (Enterococcus faecalis, Listeria)", gramNeg: "Moderate (susceptible strains)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea", "Nausea", "Maculopapular rash", "Injection site phlebitis"],
    pregnancySafety: "Category B (First-line choice for Listeria and Group B Strep in pregnancy)",
    interactions: [
      "Synergistic bactericidal action when combined with gentamicin for enterococci.",
      "Incompatible in solution with aminoglycosides (do not mix in the same IV line)."
    ],
    organAdjustment: "Extend dosing interval from every 6 hours to every 8–12 hours in renal impairment.",
    counselingPoints: [
      "Oral forms must be taken on an empty stomach with a full glass of water, 1 hour before or 2 hours after meals."
    ],
    warnings: [
      "High rate of gastrointestinal degradation makes oral absorption inferior to amoxicillin."
    ],
    tip: "Ampicillin remains indispensable in Indian teaching hospitals for suspected neonatal meningitis."
  },
  {
    id: "benzylpenicillin",
    name: "Benzylpenicillin (Penicillin G)",
    brands: ["Benapen", "Crystapen", "Penicillin G Sodium"],
    drugClass: "Natural Penicillins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#2563eb",
    shortDesc: "The historic gold-standard injectable natural penicillin, unmatched for syphilis and severe streptococcal infections.",
    works: "Demolishes the peptidoglycan cell wall of susceptible Gram-positive bacteria.",
    forms: ["IV / IM Injection vials (1 Million IU, 5 Million IU)"],
    treats: ["Neurosyphilis", "Streptococcal endocarditis", "Gas gangrene (Clostridium)", "Meningococcal meningitis", "Diphtheria"],
    spectrum: { gramPos: "Potent (Strep pyogenes, Strep pneumoniae)", gramNeg: "Neisseria meningitidis", anaerobes: "Clostridium (non-difficile)", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Local pain at injection site", "Jarisch-Herxheimer reaction in syphilis", "Hypersensitivity"],
    pregnancySafety: "Category B (Drug of choice for syphilis across all trimesters of pregnancy)",
    interactions: [
      "High IV doses contain significant potassium/sodium loads, affecting cardiac and renal patients."
    ],
    organAdjustment: "Dose reduction required in severe renal impairment to prevent central nervous system toxicity/seizures.",
    counselingPoints: [
      "Inpatient hospital administration only via deep IM injection or slow IV infusion."
    ],
    warnings: [
      "Mandatory intradermal skin sensitivity testing before first dose in Indian hospitals.",
      "High IV doses can precipitate neurological convulsions (neurotoxicity) in renal failure."
    ],
    tip: "Remains the most potent agent against Treponema pallidum; no documented syphilis resistance exists to date."
  },
  {
    id: "benzathine-penicillin",
    name: "Benzathine Penicillin G",
    brands: ["Penidure LA", "Extencilline", "Longacillin"],
    drugClass: "Natural Penicillins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#1d4ed8",
    shortDesc: "An ultra-long-acting repository penicillin releasing micro-doses over 3 to 4 weeks.",
    works: "Forms an intramuscular depot that slowly hydrolyzes into penicillin G over several weeks.",
    forms: ["Deep IM Injection (600,000 IU, 1.2 Million IU, 2.4 Million IU)"],
    treats: ["Rheumatic fever secondary prophylaxis", "Primary, secondary & early latent syphilis", "Yaws eradication"],
    spectrum: { gramPos: "Streptococcus pyogenes", gramNeg: "Treponema pallidum", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Severe localized injection-site ache", "Local muscle stiffness", "Vasovagal syncope"],
    pregnancySafety: "Category B (Sole proven therapy to prevent congenital syphilis transmission)",
    interactions: [
      "Co-administration with aspirin or indomethacin may extend plasma half-life."
    ],
    organAdjustment: "No routine adjustment needed for monthly rheumatic fever prophylaxis.",
    counselingPoints: [
      "MUST NEVER be administered intravenously; deep intramuscular gluteal injection only.",
      "Patients in rheumatic heart disease programs must receive doses strictly every 3 to 4 weeks."
    ],
    warnings: [
      "FATAL IF GIVEN INTRAVENOUSLY (causes microembolism, cardiac arrest, and transverse myelitis).",
      "Always keep resuscitation gear and adrenaline ready during administration."
    ],
    tip: "Supplied free across Indian government district hospitals under the National Rheumatic Heart Disease control program."
  },
  {
    id: "cloxacillin",
    name: "Cloxacillin",
    brands: ["Klox", "Cloxapen", "Bioclox"],
    drugClass: "Penicillinase-Resistant Penicillins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#0891b2",
    shortDesc: "An antistaphylococcal penicillin engineered to resist degradation by staphylococcal beta-lactamase enzymes.",
    works: "Sterically blocks staphylococcal beta-lactamase from hydrolyzing the beta-lactam ring.",
    forms: ["Capsules (250mg, 500mg)", "IV Injection (500mg, 1g)"],
    treats: ["Methicillin-susceptible Staph aureus (MSSA) skin infections", "Carbuncles & furunculosis", "Surgical wound infections", "Staphylococcal osteomyelitis"],
    spectrum: { gramPos: "Targeted (MSSA, Strep)", gramNeg: "None", anaerobes: "None", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Diarrhea", "Transient liver enzyme elevation", "Phlebitis"],
    pregnancySafety: "Category B (Safe for staphylococcal mastitis and breast abscesses in nursing mothers)",
    interactions: [
      "Increases serum concentration when given with probenecid."
    ],
    organAdjustment: "No dose reduction necessary in mild to moderate renal failure.",
    counselingPoints: [
      "Oral capsules must be taken 1 hour before or 2 hours after meals on an empty stomach.",
      "Swallow whole with plenty of drinking water."
    ],
    warnings: [
      "Has ZERO activity against Methicillin-Resistant Staphylococcus aureus (MRSA).",
      "Do not substitute for MRSA infections."
    ],
    tip: "A classic workhorse in Indian orthopedic and surgical wards for post-operative staph prophylaxis."
  },
  {
    id: "piperacillin-tazobactam",
    name: "Piperacillin + Tazobactam",
    brands: ["Tazact", "Zosyn", "Pipzo", "Tazomac"],
    drugClass: "Beta-Lactamase Inhibitor Combinations",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#7c3aed",
    shortDesc: "A potent hospital-grade antipseudomonal penicillin combination for severe inpatient sepsis.",
    works: "Piperacillin attacks Gram-negative cell walls; Tazobactam neutralizes beta-lactamases including those of Pseudomonas.",
    forms: ["IV infusion vials (2.25g, 4.5g)"],
    treats: ["Ventilator-associated pneumonia (HAP/VAP)", "Complicated intra-abdominal sepsis", "Diabetic foot osteomyelitis", "Neutropenic fever"],
    spectrum: { gramPos: "Good (Strep, MSSA, Enterococcus faecalis)", gramNeg: "Ultra-Broad (Pseudomonas, Enterobacterales)", anaerobes: "Broad (Bacteroides fragilis)", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Diarrhea", "Electrolyte imbalances (hypokalemia)", "Injection phlebitis", "Rash"],
    pregnancySafety: "Category B (Indicated in severe maternal intra-abdominal sepsis)",
    interactions: [
      "Concomitant vancomycin sharply increases the risk of Acute Kidney Injury (AKI).",
      "May prolong the neuromuscular blockade produced by vecuronium."
    ],
    organAdjustment: "Mandatory dose reduction and extended infusion interval in renal insufficiency.",
    counselingPoints: [
      "Administered strictly via hospital IV infusion over 3 to 4 hours (extended infusion) to maximize bactericidal time-over-MIC."
    ],
    warnings: [
      "Monitored closely by Indian Hospital Antibiotic Stewardship Committees to prevent emergence of carbapenem resistance."
    ],
    tip: "Tazact (Cipla) is one of the highest-volume injectables deployed in Indian intensive care units."
  },

  // --- 2. CEPHALOSPORINS (1st through 5th Gen) ---
  {
    id: "cephalexin",
    name: "Cephalexin",
    brands: ["Sporidex", "Keflex", "Phexin", "Alexin"],
    drugClass: "First-Generation Cephalosporins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#059669",
    shortDesc: "A first-line oral cephalosporin targeting staphylococcal and streptococcal skin and soft-tissue infections.",
    works: "Binds to bacterial PBPs, disrupting cell wall integrity during bacterial proliferation.",
    forms: ["Capsules (250mg, 500mg)", "Tablets (375mg, 750mg)", "Syrup / Pediatric Drops"],
    treats: ["Cellulitis & impetigo", "Boils & carbuncles", "Mastitis", "Uncomplicated UTIs", "Strep pharyngitis"],
    spectrum: { gramPos: "Excellent (MSSA, Strep)", gramNeg: "Modest (E. coli, Proteus, Klebsiella)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Mild diarrhea", "Dyspepsia", "Urticaria"],
    pregnancySafety: "Category B (Safe throughout pregnancy; preferred for skin infections and UTIs)",
    interactions: [
      "Probenecid elevates cephalexin blood levels by blocking renal excretion.",
      "Metformin concentrations may be elevated; monitor blood glucose."
    ],
    organAdjustment: "Reduce dosage or increase interval if CrCl < 50 mL/min.",
    counselingPoints: [
      "Can be taken with food if stomach upset occurs.",
      "Complete the entire 5 to 7-day course prescribed for skin infections."
    ],
    warnings: [
      "Cross-reactivity with penicillin allergy is very low (1–3%), but exercise caution if there is a history of anaphylaxis."
    ],
    tip: "Sporidex (Sun Pharma) and Phexin (Glaxo) are legacy staples in Indian outpatient dermatology."
  },
  {
    id: "cefazolin",
    name: "Cefazolin",
    brands: ["Cezolin", "Orizolin", "Reflin"],
    drugClass: "First-Generation Cephalosporins",
    aware: "Access",
    schedule: "Schedule H",
    color: "#10b981",
    shortDesc: "The universal gold-standard intravenous antibiotic for surgical site infection prophylaxis.",
    works: "Interferes with peptidoglycan synthesis, providing bactericidal coverage against wound pathogens.",
    forms: ["IV / IM Injection (500mg, 1g, 2g vials)"],
    treats: ["Surgical antibiotic prophylaxis (orthopedic, cardiac, abdominal)", "MSSA bacteremia & endocarditis", "Severe cellulitis"],
    spectrum: { gramPos: "Potent (MSSA, Strep)", gramNeg: "Moderate (Proteus, E. coli, Klebsiella)", anaerobes: "None", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Local thrombophlebitis", "Rash", "Eosinophilia"],
    pregnancySafety: "Category B (Standard first-line prophylaxis for Cesarean section)",
    interactions: [
      "Enhances the nephrotoxic potential of aminoglycosides when co-administered."
    ],
    organAdjustment: "Renal dose titration required based on creatinine clearance.",
    counselingPoints: [
      "Administered within 60 minutes prior to surgical incision in operating theaters."
    ],
    warnings: [
      "Not active against Enterococcus or MRSA."
    ],
    tip: "Administered in almost every surgical operating room in India before skin incision."
  },
  {
    id: "cefuroxime",
    name: "Cefuroxime Axetil",
    brands: ["Ceftum", "Zeffu", "Altacef", "Pulmocef"],
    drugClass: "Second-Generation Cephalosporins",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#0284c7",
    shortDesc: "A versatile 2nd-generation cephalosporin with enhanced stability against beta-lactamases and respiratory pathogens.",
    works: "Penetrates respiratory tissues and prevents bacterial cell wall assembly.",
    forms: ["Tablets (250mg, 500mg)", "Oral suspension", "IV injection (Cefuroxime Sodium 750mg, 1.5g)"],
    treats: ["Community-acquired pneumonia", "Acute otitis media", "Sinusitis", "Exacerbations of chronic bronchitis", "Lyme disease"],
    spectrum: { gramPos: "Good (Strep, MSSA)", gramNeg: "Broad (H. influenzae, Moraxella, E. coli)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea", "Nausea", "Headache", "Transient transaminase elevation"],
    pregnancySafety: "Category B (Safe during pregnancy; commonly used for maternal respiratory infections)",
    interactions: [
      "Antacids, H2-blockers, and proton pump inhibitors (PPIs) sharply reduce oral axetil tablet bioavailability."
    ],
    organAdjustment: "Requires dose interval adjustment if CrCl < 30 mL/min.",
    counselingPoints: [
      "Oral Cefuroxime Axetil tablets MUST be taken with food to ensure optimal gastrointestinal absorption.",
      "Do not crush tablets due to an intensely bitter taste."
    ],
    warnings: [
      "Schedule H1 drug: sale strictly prohibited without a valid medical practitioner prescription."
    ],
    tip: "Ceftum (GSK) is one of India's most recognized premium brand names in chest medicine."
  },
  {
    id: "cefixime",
    name: "Cefixime",
    brands: ["Taxim-O", "Zifi", "Cefiget", "Mahacef"],
    drugClass: "Third-Generation Cephalosporins",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#047857",
    shortDesc: "India's highest-volume oral 3rd-generation cephalosporin for enteric fever (typhoid) and respiratory tract infections.",
    works: "Highly resistant to hydrolysis by plasmid- and chromosome-mediated beta-lactamases.",
    forms: ["Tablets (100mg, 200mg)", "Dispersible tablets", "Dry syrup (50mg/5ml, 100mg/5ml)"],
    treats: ["Enteric fever (Typhoid)", "Uncomplicated gonorrhea", "Urinary tract infections", "Acute otitis media", "Pharyngitis"],
    spectrum: { gramPos: "Moderate (Streptococcus)", gramNeg: "Strong (Enterobacterales, Salmonella, N. gonorrhoeae)", anaerobes: "None", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea (common)", "Loose stools", "Flatulence", "Abdominal discomfort"],
    pregnancySafety: "Category B (Frequently chosen for UTI and typhoid during pregnancy)",
    interactions: [
      "May increase prothrombin time / INR in patients taking oral anticoagulants like warfarin."
    ],
    organAdjustment: "Dose reduction (to 200mg once daily) recommended if CrCl < 20 mL/min.",
    counselingPoints: [
      "Can be taken with or without food.",
      "Dispersible tablets can be stirred into a tablespoon of clean water before administration."
    ],
    warnings: [
      "Poor activity against Staphylococcus aureus; do not use for typical staphylococcal boil or wound infections.",
      "Schedule H1 drug: subject to strict pharmacy sales registry records."
    ],
    tip: "Taxim-O (Alkem) and Zifi (FDC) rank among India's all-time top-selling antibiotic brands."
  },
  {
    id: "ceftriaxone",
    name: "Ceftriaxone",
    brands: ["Monocef", "Cefaxone", "Oframax", "Intacef"],
    drugClass: "Third-Generation Cephalosporins",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#065f46",
    shortDesc: "The premier once-daily injectable 3rd-generation cephalosporin with broad tissue penetration and excellent CNS entry.",
    works: "Lyses bacterial cell walls; long plasma half-life allows once- or twice-daily dosing.",
    forms: ["IV / IM Injection vials (250mg, 500mg, 1g, 2g)"],
    treats: ["Bacterial meningitis", "Severe enteric fever (Typhoid sepsis)", "Pyelonephritis", "Hospitalized pneumonia", "Gonococcal infection"],
    spectrum: { gramPos: "Good (Strep pneumoniae)", gramNeg: "Potent (Enterobacterales, Neisseria, Salmonella, H. influenzae)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Injection site pain", "Diarrhea", "Biliary sludging (pseudo-lithiasis)", "Thrombocytosis"],
    pregnancySafety: "Category B (Safe throughout pregnancy; standard empiric choice for severe maternal sepsis)",
    interactions: [
      "FATAL PRECIPITATION RISK: Incompatible with calcium-containing IV solutions (like Ringer's Lactate) in neonates."
    ],
    organAdjustment: "Dual hepatic and renal excretion; no dose reduction needed unless combined severe hepatic and renal failure exists.",
    counselingPoints: [
      "Hospital or clinical daycare administration via slow IV infusion or deep IM with lidocaine solvent.",
      "Monitor for diarrhea or biliary pain."
    ],
    warnings: [
      "CONTRAINDICATED in hyperbilirubinemic neonates (displaces bilirubin from albumin, risking kernicterus).",
      "Do not reconstitute with calcium diluents."
    ],
    tip: "Monocef (Aristo) is an undisputed market leader across Indian hospital inpatient departments."
  },
  {
    id: "cefotaxime",
    name: "Cefotaxime",
    brands: ["Claforan", "Omnatax", "Taxim"],
    drugClass: "Third-Generation Cephalosporins",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#059669",
    shortDesc: "A safe, versatile injectable 3rd-generation cephalosporin preferred over ceftriaxone in neonates.",
    works: "Rapid bactericidal cell wall inhibition across a wide spectrum of Gram-negative rods.",
    forms: ["IV / IM Injection (250mg, 500mg, 1g vials)"],
    treats: ["Neonatal sepsis & meningitis", "Spontaneous bacterial peritonitis (SBP)", "Severe intra-abdominal infections", "Pediatric pneumonia"],
    spectrum: { gramPos: "Good (Strep)", gramNeg: "Broad (Enterobacterales, Neisseria)", anaerobes: "None", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Local phlebitis", "Diarrhea", "Transient eosinophilia"],
    pregnancySafety: "Category B (Safe during pregnancy)",
    interactions: [
      "Increased nephrotoxicity when combined with potent diuretics (furosemide)."
    ],
    organAdjustment: "Reduce dose by 50% when CrCl is below 20 mL/min.",
    counselingPoints: [
      "Administered via IV push or infusion every 6 to 8 hours."
    ],
    warnings: [
      "Unlike ceftriaxone, cefotaxime does NOT cause neonatal biliary sludging or kernicterus."
    ],
    tip: "The safest 3rd-generation cephalosporin for premature infants and neonates in Indian NICUs."
  },
  {
    id: "cefepime",
    name: "Cefepime",
    brands: ["Maxipime", "Kefage", "Cefepime IV"],
    drugClass: "Fourth-Generation Cephalosporins",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#0f766e",
    shortDesc: "A 4th-generation 'pseudomonal' cephalosporin possessing enhanced outer membrane permeability and AmpC beta-lactamase resistance.",
    works: "Zwitterionic structure enables rapid transit across outer Gram-negative porins, binding PBPs with high affinity.",
    forms: ["IV / IM Injection (500mg, 1g, 2g vials)"],
    treats: ["Febrile neutropenia (empiric monotherapy)", "Severe hospital-acquired pneumonia", "Pseudomonas bacteremia", "Complicated UTIs"],
    spectrum: { gramPos: "Potent (MSSA, Strep pneumoniae)", gramNeg: "Ultra-Broad (Pseudomonas aeruginosa, Enterobacter, Citrobacter)", anaerobes: "None", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Phlebitis", "Diarrhea", "Positive direct Coombs test without hemolysis"],
    pregnancySafety: "Category B (Used when clinical indications warrant hospital management)",
    interactions: [
      "Avoid concomitant nephrotoxins without monitoring."
    ],
    organAdjustment: "CRITICAL: Strict renal dose adjustment is mandatory. Failure to adjust causes neurotoxicity.",
    counselingPoints: [
      "Inpatient hospital administration via timed IV infusion."
    ],
    warnings: [
      "NEUROTOXICITY WARNING: Can induce encephalopathy, myoclonus, seizures, and nonconvulsive status epilepticus if doses are unadjusted in renal failure."
    ],
    tip: "A vital therapeutic option for hematology and oncology patients undergoing chemotherapy in India."
  },
  {
    id: "ceftaroline",
    name: "Ceftaroline Fosamil",
    brands: ["Zinforo", "Teflaro"],
    drugClass: "Fifth-Generation Cephalosporins",
    aware: "Reserve",
    schedule: "Schedule H1",
    color: "#115e59",
    shortDesc: "An advanced 5th-generation cephalosporin engineered specifically to bind PBP2a and kill MRSA.",
    works: "Binds with high affinity to modified penicillin-binding proteins (PBP2a in MRSA and PBP2x in resistant pneumococci).",
    forms: ["IV Infusion vials (600mg)"],
    treats: ["Complicated skin and soft-tissue infections (cSSTI) caused by MRSA", "Community-acquired bacterial pneumonia (CABP)", "MRSA bacteremia salvage"],
    spectrum: { gramPos: "Exceptional (MRSA, VRSA, Penicillin-resistant Strep)", gramNeg: "Moderate (Standard Enterobacterales, non-ESBL)", anaerobes: "Minimal", mrsa: "Yes (First-line cephalosporin)", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea", "Headache", "Nausea", "Pruritus", "Hypokalemia"],
    pregnancySafety: "Category B (Reserved for severe resistant infections in consultation with infectious disease specialists)",
    interactions: [
      "No major cytochrome P450 interactions documented."
    ],
    organAdjustment: "Renal dose titration required when CrCl <= 50 mL/min.",
    counselingPoints: [
      "Administered via IV infusion over 60 minutes in hospital settings."
    ],
    warnings: [
      "Has NO activity against Pseudomonas aeruginosa or ESBL-producing Gram-negative organisms."
    ],
    tip: "A WHO Reserve cephalosporin in Indian tertiary hospitals, protecting vancomycin and linezolid pipelines."
  },

  // --- 3. CARBAPENEMS ---
  {
    id: "meropenem",
    name: "Meropenem",
    brands: ["Meronem", "Meromac", "Merowin", "Meroiza"],
    drugClass: "Carbapenems",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#475569",
    shortDesc: "An ultra-broad-spectrum injectable carbapenem for severe hospital-acquired sepsis and ESBL infections.",
    works: "Penetrates bacterial cell walls with ease; impervious to nearly all extended-spectrum beta-lactamases (ESBL).",
    forms: ["IV Injection / Infusion (500mg, 1g vials)"],
    treats: ["ESBL septicemia", "Hospital-acquired pneumonia", "Severe intra-abdominal sepsis", "Bacterial meningitis", "Complicated skin infections"],
    spectrum: { gramPos: "Broad (excluding MRSA and Enterococcus faecium)", gramNeg: "Ultra-Broad (ESBL Enterobacterales, Pseudomonas)", anaerobes: "Broad (Bacteroides, Peptostreptococcus)", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Diarrhea", "Nausea", "Headache", "Constipation", "Low seizure risk (<0.1%)"],
    pregnancySafety: "Category B (Standard carbapenem of choice in pregnancy when indicated)",
    interactions: [
      "CONTRAINDICATED WITH VALPROIC ACID: Causes a catastrophic 60–90% drop in serum valproate within 24 hours, precipitating status epilepticus."
    ],
    organAdjustment: "Strict dose reduction required based on creatinine clearance in renal impairment.",
    counselingPoints: [
      "Administered as an extended IV infusion (over 3 hours) in intensive care units to maximize pharmacodynamic efficacy."
    ],
    warnings: [
      "Widespread overuse in India is fueling the spread of Carbapenem-Resistant Enterobacterales (CRE) and NDM-1 superbugs."
    ],
    tip: "Meronem (Pfizer) is a benchmark antibiotic monitored under hospital antimicrobial stewardship programs across India."
  },
  {
    id: "imipenem-cilastatin",
    name: "Imipenem + Cilastatin",
    brands: ["Tienam", "Cilanem", "Imicas", "Lastinem"],
    drugClass: "Carbapenems",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#334155",
    shortDesc: "The original carbapenem paired with cilastatin to inhibit renal dehydropeptidase degradation.",
    works: "Imipenem lyses bacterial walls; cilastatin blocks renal dehydropeptidase-I, preventing nephrotoxic metabolite formation.",
    forms: ["IV Infusion vials (500mg/500mg)"],
    treats: ["Polymicrobial hospital infections", "Post-surgical intra-abdominal sepsis", "Complicated UTIs", "Severe bone and joint sepsis"],
    spectrum: { gramPos: "Broad (including Enterococcus faecalis)", gramNeg: "Ultra-Broad (ESBLs, Pseudomonas)", anaerobes: "Broad", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Nausea and vomiting (during rapid IV infusion)", "Diarrhea", "Phlebitis", "Seizures (higher risk than meropenem)"],
    pregnancySafety: "Category C (Meropenem is preferred over imipenem during pregnancy)",
    interactions: [
      "Avoid concurrent ganciclovir (high risk of generalized seizures).",
      "Severe drop in valproic acid levels."
    ],
    organAdjustment: "Careful dose titration in renal dysfunction to avoid drug accumulation and neurotoxicity.",
    counselingPoints: [
      "Infuse slowly over 40 to 60 minutes to prevent infusion-related nausea."
    ],
    warnings: [
      "Higher pro-convulsant potential than meropenem; avoid in patients with CNS lesions or uncontrolled epilepsy."
    ],
    tip: "Cilanem (Ranbaxy/Sun) remains widely stocked across Indian tertiary surgical centers."
  },

  // --- 4. MACROLIDES ---
  {
    id: "azithromycin",
    name: "Azithromycin",
    brands: ["Azithral", "Azee", "Zithromax", "Azimax"],
    drugClass: "Macrolides",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#ca8a04",
    shortDesc: "A convenient once-daily macrolide with sustained intracellular tissue concentrations, ideal for atypical chest bugs.",
    works: "Reversibly binds the 50S ribosomal subunit, preventing bacterial transpeptidation and protein synthesis.",
    forms: ["Tablets (250mg, 500mg)", "Oral suspension", "IV infusion (500mg)"],
    treats: ["Atypical pneumonia (Mycoplasma/Chlamydia)", "Acute bacterial sinusitis", "Chlamydia urethritis / Cervicitis", "Scrub typhus", "Tonsillitis"],
    spectrum: { gramPos: "Good (Strep)", gramNeg: "Moderate (H. influenzae, Moraxella, Legionella)", anaerobes: "No", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Abdominal cramps", "Diarrhea", "Temporary taste alterations"],
    pregnancySafety: "Category B (Considered safe when indicated; preferred macrolide in pregnancy)",
    interactions: [
      "Additive risk of QT interval prolongation when taken with antiarrhythmics, hydroxychloroquine, or antipsychotics.",
      "Aluminum- and magnesium-containing antacids delay oral absorption (separate by 2 hours)."
    ],
    organAdjustment: "No dose adjustment required for mild to moderate renal or hepatic impairment.",
    counselingPoints: [
      "Take once daily at the same time each day, usually for 3 to 5 days.",
      "Tablets can be taken with or without meals, but food helps minimize stomach discomfort."
    ],
    warnings: [
      "CARDIAC WARNING: Can cause abnormal heart rhythms (prolonged QT interval, Torsades de Pointes) in susceptible patients.",
      "Schedule H1 drug: must not be dispensed without a registered prescription."
    ],
    tip: "Azithral (Alembic) became a household name across India during the COVID-19 pandemic."
  },
  {
    id: "clarithromycin",
    name: "Clarithromycin",
    brands: ["Claribid", "Crixan", "Synclar", "Biaxin"],
    drugClass: "Macrolides",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#a16207",
    shortDesc: "An acid-stable macrolide and core pillar of Helicobacter pylori peptic ulcer eradication regimens.",
    works: "Inhibits bacterial protein translation by binding to 23S rRNA in the 50S ribosomal subunit.",
    forms: ["Tablets (250mg, 500mg)", "Extended-Release (XL) tablets", "Dry suspension"],
    treats: ["H. pylori peptic ulcer disease (triple therapy)", "Community-acquired pneumonia", "Sinusitis", "Mycobacterium avium complex (MAC) in HIV"],
    spectrum: { gramPos: "Potent (Strep, MSSA)", gramNeg: "Moderate (H. pylori, Moraxella, Legionella)", anaerobes: "Minimal", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Bitter metallic taste (dysgeusia)", "Nausea", "Diarrhea", "Dyspepsia"],
    pregnancySafety: "Category C (Avoid in pregnancy unless no alternative exists; azithromycin preferred)",
    interactions: [
      "POTENT CYP3A4 INHIBITOR: Dramatically raises blood levels of statins (simvastatin/atorvastatin, risking rhabdomyolysis), carbamazepine, and colchicine."
    ],
    organAdjustment: "Halve the dose if CrCl < 30 mL/min.",
    counselingPoints: [
      "A bitter or metallic taste in the mouth is very common and harmless.",
      "Extended-Release (XL) formulations must be taken with food and swallowed whole."
    ],
    warnings: [
      "Contraindicated with statins due to acute muscle breakdown (rhabdomyolysis) risk.",
      "Cardiac QT prolongation precautions apply."
    ],
    tip: "Claribid (Abbott) is routinely prescribed in gastroenterology practices across India for acid peptic disease."
  },

  // --- 5. TETRACYCLINES ---
  {
    id: "doxycycline",
    name: "Doxycycline",
    brands: ["Doxt", "Microdox", "Doxy-1", "Vibramycin"],
    drugClass: "Tetracyclines",
    aware: "Access",
    schedule: "Schedule H",
    color: "#7c3aed",
    shortDesc: "A versatile oral tetracycline indispensable for scrub typhus, malaria prophylaxis, atypical pneumonia, and acne.",
    works: "Binds reversibly to the 30S bacterial ribosomal subunit, blocking transfer RNA attachment.",
    forms: ["Capsules (100mg)", "Tablets", "Injectable (100mg)"],
    treats: ["Scrub typhus (Rickettsial fever)", "Acne vulgaris", "Lyme disease & Leptospirosis", "Malaria prophylaxis & treatment", "Chlamydia infections"],
    spectrum: { gramPos: "Moderate (including CA-MRSA)", gramNeg: "Moderate (Brucella, Vibrio cholerae)", anaerobes: "Partial", mrsa: "Yes (Community strains)", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Severe pill-induced esophagitis", "Photosensitivity", "Epigastric burning"],
    pregnancySafety: "Category D (Contraindicated in 2nd/3rd trimester and children < 8 years: causes permanent tooth staining and bone growth inhibition)",
    interactions: [
      "Cation chelation: Iron tablets, calcium in milk, antacids, and zinc reduce oral absorption (separate by 2–3 hours).",
      "Concomitant oral retinoids (isotretinoin) increase benign intracranial hypertension risk."
    ],
    organAdjustment: "No dose adjustment required in renal failure (eliminated primarily via biliary/fecal routes).",
    counselingPoints: [
      "Take with a full glass of water and stay upright (sitting or standing) for at least 30 minutes to prevent pill-induced esophageal ulceration.",
      "Taking with food reduces nausea without significantly hurting absorption.",
      "Wear sunscreen outdoors due to exaggerated sunburn risk."
    ],
    warnings: [
      "DO NOT lie down immediately after taking the capsule.",
      "NEVER consume expired tetracyclines (causes renal Fanconi syndrome)."
    ],
    tip: "Doxt-SL (Micro Labs) is the empiric first choice across Karnataka for acute febrile illnesses like scrub typhus."
  },
  {
    id: "minocycline",
    name: "Minocycline",
    brands: ["Cynomycin", "Minocin", "Minoz"],
    drugClass: "Tetracyclines",
    aware: "Access",
    schedule: "Schedule H",
    color: "#6d28d9",
    shortDesc: "A lipophilic tetracycline with superior tissue penetration, used widely for severe inflammatory acne and resistant Acinetobacter.",
    works: "Inhibits bacterial protein translation at the 30S ribosome with high intracellular and sebaceous accumulation.",
    forms: ["Capsules (50mg, 100mg)", "Extended-release tablets"],
    treats: ["Moderate-to-severe inflammatory acne", "Multidrug-resistant Acinetobacter baumannii", "MDR-Staphylococcus infections", "Nocardiosis"],
    spectrum: { gramPos: "Good (MRSA, Staph)", gramNeg: "Moderate (Acinetobacter)", anaerobes: "Partial", mrsa: "Yes", pseudomonas: "No" },
    commonSideEffects: ["Vestibular symptoms (dizziness, vertigo, ataxia)", "Nausea", "Blue-grey skin and scleral pigmentation with long-term use"],
    pregnancySafety: "Category D (Contraindicated in pregnancy and children < 8 years)",
    interactions: [
      "Chelates with divalent cations (calcium, magnesium, aluminum, iron).",
      "Potentiates warfarin effect."
    ],
    organAdjustment: "Do not exceed 200mg/day in renal impairment.",
    counselingPoints: [
      "May cause lightheadedness or dizziness; avoid driving if affected.",
      "Long-term use may cause reversible dark pigmentation of scars, gums, or skin."
    ],
    warnings: [
      "Can induce drug-induced lupus erythematosus and autoimmune hepatitis during chronic acne regimens."
    ],
    tip: "Minoz (Sun Pharma) is a leading brand in Indian dermatology clinics for cystic acne."
  },

  // --- 6. FLUOROQUINOLONES ---
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    brands: ["Ciplox", "Cifran", "Ciprolet", "Zoxan"],
    drugClass: "Fluoroquinolones",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#dc2626",
    shortDesc: "A potent Gram-negative fluoroquinolone now heavily restricted due to widespread community antimicrobial resistance.",
    works: "Inhibits bacterial DNA gyrase (topoisomerase II) and topoisomerase IV, preventing DNA replication and repair.",
    forms: ["Tablets (250mg, 500mg, 750mg)", "IV infusion (200mg/100ml)", "Eye & Ear drops"],
    treats: ["Complicated UTIs & Pyelonephritis", "Infectious diarrhea & Shigellosis", "Typhoid fever (culture-proven sensitive)", "Bacterial conjunctivitis"],
    spectrum: { gramPos: "Weak", gramNeg: "Potent (Pseudomonas, Enterobacterales, Campylobacter)", anaerobes: "No", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Nausea", "Diarrhea", "Headache", "Dizziness", "Phototoxicity (sun sensitivity)"],
    pregnancySafety: "Category C (Avoid in pregnancy/lactation due to cartilage damage in animal models)",
    interactions: [
      "Chelates heavily with calcium (milk/dairy), antacids, iron, and sucralfate (take cipro 2 hours before or 6 hours after).",
      "CONTRAINDICATED WITH TIZANIDINE: Profound hypotension and sedation.",
      "Raises theophylline and warfarin levels."
    ],
    organAdjustment: "Renal dose reduction required when CrCl < 50 mL/min.",
    counselingPoints: [
      "Drink 2 to 3 liters of water daily to prevent crystal formation in urine.",
      "Avoid milk, antacids, and mineral supplements near dose times.",
      "Wear protective clothing outdoors."
    ],
    warnings: [
      "BLACK BOX WARNING: Increased risk of tendonitis and Achilles tendon rupture (higher risk in elderly and oral steroid users).",
      "Can cause peripheral neuropathy and central nervous system toxicity (anxiety, tremors, seizures).",
      "Schedule H1 drug: sale records must be retained for 3 years."
    ],
    tip: "Resistance in Indian E. coli and Salmonella isolates exceeds 70–80%, severely limiting empiric use."
  },
  {
    id: "levofloxacin",
    name: "Levofloxacin",
    brands: ["Levoflox", "Glevo", "L-Cin", "Loxof"],
    drugClass: "Fluoroquinolones",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#b91c1c",
    shortDesc: "A 'respiratory fluoroquinolone' with enhanced activity against Streptococcus pneumoniae and atypical respiratory pathogens.",
    works: "Pure L-isomer of ofloxacin; inhibits bacterial DNA topoisomerases with high oral bioavailability.",
    forms: ["Tablets (250mg, 500mg, 750mg)", "IV infusion (500mg/100ml)", "Eye drops"],
    treats: ["Community-acquired pneumonia", "Acute bacterial sinusitis", "Drug-resistant Tuberculosis (MDR-TB regimens)", "Complicated pyelonephritis"],
    spectrum: { gramPos: "Strong (Strep pneumoniae)", gramNeg: "Broad (Pseudomonas, Enterobacterales)", anaerobes: "No", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Insomnia", "Headache", "Nausea", "Tendon discomfort", "Dizziness"],
    pregnancySafety: "Category C (Avoided during pregnancy)",
    interactions: [
      "Chelation with multivalent metal ions (antacids, iron, zinc).",
      "QT prolongation risk with antiarrhythmics (amiodarone, sotalol)."
    ],
    organAdjustment: "Strict renal adjustment required (CrCl < 50 mL/min decrease dose and extend interval).",
    counselingPoints: [
      "Take with plenty of water.",
      "Report any sudden pain, swelling, or tenderness in joints or tendons immediately."
    ],
    warnings: [
      "Black box warning for tendon rupture, QT prolongation, and worsening of myasthenia gravis.",
      "Hypoglycemia risk in diabetic patients taking sulfonylureas or insulin."
    ],
    tip: "Glevo (Glenmark) and L-Cin (Lupin) are widely used in Indian chest medicine and National TB Elimination Programs (NTEP)."
  },
  {
    id: "norfloxacin",
    name: "Norfloxacin",
    brands: ["Norflox", "Uriflox", "Bacigyl"],
    drugClass: "Fluoroquinolones",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#991b1b",
    shortDesc: "A urinary fluoroquinolone with poor systemic absorption but high concentration in the urinary bladder and intestinal lumen.",
    works: "Inhibits bacterial DNA gyrase; concentrated primarily in urine and feces.",
    forms: ["Tablets (400mg)"],
    treats: ["Uncomplicated cystitis (second-line)", "Bacterial gastroenteritis / Traveler's diarrhea", "Spontaneous bacterial peritonitis prophylaxis"],
    spectrum: { gramPos: "Weak", gramNeg: "Moderate (E. coli, Klebsiella, Shigella)", anaerobes: "No", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Abdominal cramps", "Headache", "Dizziness"],
    pregnancySafety: "Category C (Avoided in pregnancy)",
    interactions: [
      "Absorption blocked by antacids, iron, and dairy products."
    ],
    organAdjustment: "Reduce to 400mg once daily if CrCl < 30 mL/min.",
    counselingPoints: [
      "Take on an empty stomach with a large glass of water, 1 hour before or 2 hours after meals.",
      "Stay well-hydrated throughout the day."
    ],
    warnings: [
      "Tendinopathy and CNS toxicity warnings apply as with all fluoroquinolones."
    ],
    tip: "Norflox-TZ (combination with tinidazole) was historically overprescribed across Indian pharmacies for loose motions."
  },

  // --- 7. SULFONAMIDES & FOLATE INHIBITORS ---
  {
    id: "cotrimoxazole",
    name: "Trimethoprim / Sulfamethoxazole",
    brands: ["Septran", "Bactrim DS", "Ciplin"],
    drugClass: "Sulfonamides & Folate Blockers",
    aware: "Access",
    schedule: "Schedule H",
    color: "#0891b2",
    shortDesc: "A synergistic antifolate combination blocking two sequential steps in bacterial folic acid synthesis.",
    works: "Sulfamethoxazole inhibits dihydropteroate synthase; Trimethoprim inhibits dihydrofolate reductase.",
    forms: ["Tablets (Single Strength, Double Strength DS)", "Syrup / Pediatric suspension", "IV infusion"],
    treats: ["Pneumocystis jirovecii pneumonia (PCP) prophylaxis and treatment", "Community MRSA skin infections", "Uncomplicated UTIs", "Nocardiosis", "Stenotrophomonas maltophilia"],
    spectrum: { gramPos: "Good (MSSA, Community-MRSA, Nocardia)", gramNeg: "Moderate (Stenotrophomonas, Burkholderia, E. coli)", anaerobes: "No", mrsa: "Yes (CA-MRSA)", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Anorexia", "Skin rash", "Hyperkalemia", "Photosensitivity"],
    pregnancySafety: "Category D (Contraindicated in 1st trimester due to neural tube defects and at term due to newborn kernicterus)",
    interactions: [
      "Significantly raises warfarin anticoagulant effect, causing severe bleeding.",
      "Hyperkalemia risk rises when combined with ACE inhibitors, ARBs, or spironolactone.",
      "Increases methotrexate toxicity."
    ],
    organAdjustment: "Halve dose if CrCl is 15–30 mL/min; contraindicated if CrCl < 15 mL/min.",
    counselingPoints: [
      "Drink at least 2 liters of fluid daily to prevent crystalluria and kidney stones.",
      "Wear sunscreen to prevent photosensitive skin eruptions."
    ],
    warnings: [
      "DISCONTINUE IMMEDIATELY at the first sign of skin rash (risk of fatal Stevens-Johnson Syndrome / TEN).",
      "Contraindicated in documented sulfa allergy and G6PD deficiency (causes severe hemolysis)."
    ],
    tip: "Septran DS (GSK/legacy) is an affordable lifeline for immunocompromised patients across India."
  },

  // --- 8. LINCOSAMIDES ---
  {
    id: "clindamycin",
    name: "Clindamycin",
    brands: ["Dalacin C", "Clindac-A", "Clincin"],
    drugClass: "Lincosamides",
    aware: "Access",
    schedule: "Schedule H",
    color: "#db2777",
    shortDesc: "An anaerobic specialist and anti-toxin protein synthesis inhibitor for dental, bone, and MRSA skin infections.",
    works: "Binds the 50S ribosomal subunit to stop protein synthesis; inhibits staphylococcal/streptococcal toxin production (e.g. PVL, TSS toxin).",
    forms: ["Capsules (150mg, 300mg)", "Topical gel / lotion (1%)", "IV / IM Injection"],
    treats: ["Dental abscesses & oral infections", "MRSA skin & soft-tissue infections", "Diabetic foot infections (in combination)", "Aspiration pneumonia & lung abscess", "Acne vulgaris (topical)"],
    spectrum: { gramPos: "Strong (Strep, MSSA, Community-MRSA)", gramNeg: "None", anaerobes: "Potent (Bacteroides fragilis, Peptostreptococcus)", mrsa: "Yes (Community strains)", pseudomonas: "No" },
    commonSideEffects: ["Diarrhea", "Nausea", "Abdominal cramps", "Metallic taste"],
    pregnancySafety: "Category B (Considered safe when indicated; used for bacterial vaginosis in pregnancy)",
    interactions: [
      "Has neuromuscular blocking properties; enhances action of surgical paralytic agents.",
      "Antagonistic with erythromycin (competes for the identical ribosomal binding site)."
    ],
    organAdjustment: "Dose reduction recommended in severe hepatic cirrhosis; no adjustment needed for renal impairment.",
    counselingPoints: [
      "Swallow capsules with a full glass of water while sitting upright to avoid pill-induced esophageal ulceration.",
      "Can be taken with meals."
    ],
    warnings: [
      "BLACK BOX WARNING: Strongly linked to Clostridioides difficile-associated diarrhea (pseudomembranous colitis).",
      "Stop medication and notify your physician immediately if severe watery diarrhea occurs."
    ],
    tip: "Dalacin C (Pfizer) is prescribed by dental surgeons across Bengaluru; Clindac-A gel is a top topical acne treatment."
  },

  // --- 9. NITROIMIDAZOLES ---
  {
    id: "metronidazole",
    name: "Metronidazole",
    brands: ["Metrogyl", "Flagyl", "Aristogyl"],
    drugClass: "Nitroimidazoles",
    aware: "Access",
    schedule: "Schedule H",
    color: "#ea580c",
    shortDesc: "An essential anti-anaerobic and antiprotozoal agent famous for its strict alcohol prohibition.",
    works: "Reduced inside anaerobic cells to unstable reactive nitro intermediates that break DNA strands and cause microbial cell death.",
    forms: ["Tablets (200mg, 400mg)", "IV infusion (500mg/100ml)", "Suspension", "Topical / Vaginal gel"],
    treats: ["Amebic liver abscess & intestinal amebiasis", "Giardiasis & Trichomoniasis", "Bacterial vaginosis", "Intra-abdominal anaerobic sepsis (with ceftriaxone)", "Dental infections"],
    spectrum: { gramPos: "Anaerobes only (Clostridium)", gramNeg: "Anaerobes only (Bacteroides fragilis)", anaerobes: "Extremely Potent", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Metallic taste (very common)", "Nausea", "Headache", "Dark or reddish-brown urine (harmless)"],
    pregnancySafety: "Category B (Historically avoided in 1st trimester; use when clearly indicated)",
    interactions: [
      "STRICT DISULFIRAM-LIKE REACTION WITH ALCOHOL: Ingestion of alcohol causes severe flushing, pounding headache, vomiting, chest pain, and collapse.",
      "Potentiates warfarin, sharply increasing INR and bleeding risk."
    ],
    organAdjustment: "Reduce dose by 50% in severe hepatic impairment (Child-Pugh Class C).",
    counselingPoints: [
      "DO NOT DRINK ALCOHOL while taking this medicine and for at least 72 hours after finishing the course (including alcohol in cough syrups).",
      "Darkening of urine during treatment is completely harmless."
    ],
    warnings: [
      "Prolonged or high-dose therapy can cause peripheral neuropathy (numbness/tingling in hands or feet) and ataxia."
    ],
    tip: "Metrogyl (JB Chemicals) is one of the most accessible and inexpensive essential medicines in India."
  },

  // --- 10. NITROFURANS ---
  {
    id: "nitrofurantoin",
    name: "Nitrofurantoin",
    brands: ["Martifur", "Niftran", "Urifast"],
    drugClass: "Nitrofurans",
    aware: "Access",
    schedule: "Schedule H",
    color: "#15803d",
    shortDesc: "A targeted urinary antiseptic that concentrates in the bladder, maintaining high cure rates against resistant E. coli.",
    works: "Reduced by bacterial nitroreductases into multiple reactive species that attack bacterial ribosomes, DNA, and metabolic enzymes.",
    forms: ["Sustained-Release (SR) Tablets (100mg)", "Capsules", "Suspension"],
    treats: ["Acute uncomplicated lower urinary tract infection (cystitis)", "Recurrent UTI prevention/prophylaxis"],
    spectrum: { gramPos: "Enterococcus faecalis, Staph saprophyticus", gramNeg: "E. coli, Citrobacter (No Proteus, Klebsiella variable)", anaerobes: "No", mrsa: "No", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Anorexia", "Harmless brown or rust-yellow urine discoloration", "Headache"],
    pregnancySafety: "Category B (Safe in 1st/2nd trimester; CONTRAINDICATED at term 38–42 weeks due to risk of neonatal hemolytic anemia)",
    interactions: [
      "Magnesium trisilicate antacids reduce absorption (avoid simultaneous use).",
      "Probenecid blocks renal excretion, lowering urinary efficacy and increasing toxicity."
    ],
    organAdjustment: "CONTRAINDICATED if eGFR < 30 mL/min (fails to reach therapeutic urine levels; risk of systemic peripheral neuropathy).",
    counselingPoints: [
      "Always take with food or milk to enhance drug absorption and prevent stomach upset.",
      "Brown or rust-colored urine is completely expected and harmless."
    ],
    warnings: [
      "DO NOT USE FOR KIDNEY INFECTIONS (Pyelonephritis) or sepsis: tissue levels in the kidney and blood are negligible.",
      "Long-term use (>6 months) carries risk of irreversible pulmonary fibrosis and peripheral neuropathy."
    ],
    tip: "Martifur (Centaur) is recommended as a preferred first-line choice in Indian urology guidelines due to low resistance."
  },

  // --- 11. OXAZOLIDINONES ---
  {
    id: "linezolid",
    name: "Linezolid",
    brands: ["Linospan", "Lizomac", "Zyvoxid", "Lizoforce"],
    drugClass: "Oxazolidinones",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#be123c",
    shortDesc: "A synthetic oxazolidinone with 100% oral bioavailability, essential for MRSA, VRE, and drug-resistant tuberculosis.",
    works: "Binds the 23S ribosomal RNA of the 50S subunit, preventing formation of the 70S initiation complex.",
    forms: ["Tablets (600mg)", "Dry syrup / Oral suspension", "IV infusion (600mg/300ml)"],
    treats: ["Hospital-acquired MRSA pneumonia", "Vancomycin-Resistant Enterococcus (VRE) infections", "Complicated diabetic foot infections", "Multidrug-resistant Tuberculosis (MDR/XDR-TB)"],
    spectrum: { gramPos: "Exceptional (MRSA, VRE, Strep, Listeria)", gramNeg: "None", anaerobes: "Minimal", mrsa: "Yes (First-line oral)", pseudomonas: "No" },
    commonSideEffects: ["Nausea", "Diarrhea", "Headache", "Bone marrow suppression (thrombocytopenia, anemia)"],
    pregnancySafety: "Category C (Use when benefits outweigh potential risks)",
    interactions: [
      "WEAK NON-SELECTIVE MAO INHIBITOR: High risk of Serotonin Syndrome when co-administered with SSRIs/SNRIs (fluoxetine, sertraline, tramadol).",
      "Avoid tyramine-rich foods (aged cheeses, draft beer, fermented soy sauce) to prevent hypertensive crisis."
    ],
    organAdjustment: "No dose adjustment required for mild to moderate renal or hepatic impairment.",
    counselingPoints: [
      "Can be taken with or without food.",
      "Avoid large amounts of aged cheese, yeast extracts, and tap beer while on therapy."
    ],
    warnings: [
      "MYELOSUPPRESSION: Complete Blood Count (CBC) monitoring is mandatory weekly if therapy exceeds 10–14 days.",
      "Prolonged treatment (>28 days) can cause irreversible optic neuropathy and peripheral neuropathy."
    ],
    tip: "Linospan (Cipla) costs a fraction of Western prices in India, making outpatient oral MRSA therapy accessible."
  },

  // --- 12. GLYCOPEPTIDES ---
  {
    id: "vancomycin",
    name: "Vancomycin",
    brands: ["Vancocin", "Vanlid", "Vancomate"],
    drugClass: "Glycopeptides",
    aware: "Watch",
    schedule: "Schedule H1",
    color: "#e11d48",
    shortDesc: "The classic intravenous glycopeptide cornerstone for serious Methicillin-Resistant Staphylococcus aureus (MRSA) sepsis.",
    works: "Binds D-alanyl-D-alanine termini of cell wall peptidoglycan precursors, blocking cell wall polymer elongation.",
    forms: ["IV Infusion vials (500mg, 1g)", "Oral capsules (125mg, 250mg - for C. difficile only)"],
    treats: ["Severe MRSA bacteremia & endocarditis", "MRSA hospital pneumonia", "Prosthetic joint infections", "Severe Clostridioides difficile colitis (oral form ONLY)"],
    spectrum: { gramPos: "Potent (MRSA, MSSA, Enterococcus, C. diff)", gramNeg: "None", anaerobes: "C. difficile", mrsa: "Yes (IV gold standard)", pseudomonas: "No" },
    commonSideEffects: ["Nephrotoxicity", "Ototoxicity", "Phlebitis", "'Red Man Syndrome' (histamine flush if infused too quickly)"],
    pregnancySafety: "Category C (IV used in confirmed life-threatening maternal MRSA infections)",
    interactions: [
      "Synergistic nephrotoxicity when administered with piperacillin-tazobactam, aminoglycosides, or amphotericin B."
    ],
    organAdjustment: "Mandatory therapeutic drug monitoring (TDM); adjust doses according to trough levels and eGFR.",
    counselingPoints: [
      "Must be infused slowly via IV over at least 60 to 120 minutes to prevent flushing reactions.",
      "Oral vancomycin is NOT absorbed into the blood and is used exclusively for intestinal C. difficile."
    ],
    warnings: [
      "'RED MAN SYNDROME': Rapid IV infusion induces massive non-IgE histamine release causing intense facial erythema, hypotension, and hives.",
      "Requires routine serum trough level monitoring in hospitals."
    ],
    tip: "Vanlid (Cipla) is the premier inpatient injectable for suspected MRSA across Indian intensive care units."
  },

  // --- 13. AMINOGLYCOSIDES ---
  {
    id: "amikacin",
    name: "Amikacin",
    brands: ["Amicin", "Mikacin", "Amikamac"],
    drugClass: "Aminoglycosides",
    aware: "Access",
    schedule: "Schedule H",
    color: "#0369a1",
    shortDesc: "A potent bactericidal aminoglycoside resilient against most bacterial aminoglycoside-modifying enzymes.",
    works: "Irreversibly binds the 30S bacterial ribosome subunit, inducing codon misreading and membrane disruption.",
    forms: ["IV / IM Injection (100mg, 250mg, 500mg vials)"],
    treats: ["Severe Gram-negative hospital sepsis", "Multidrug-resistant Tuberculosis (MDR-TB second-line)", "Complicated intra-abdominal infections", "Neonatal sepsis"],
    spectrum: { gramPos: "Synergy with beta-lactams against Staph/Enterococci", gramNeg: "Potent (Pseudomonas, Klebsiella, E. coli, Acinetobacter)", anaerobes: "None", mrsa: "Synergy only", pseudomonas: "Yes" },
    commonSideEffects: ["Nephrotoxicity (elevated creatinine)", "Ototoxicity (vestibular damage and irreversible hearing loss)", "Injection discomfort"],
    pregnancySafety: "Category D (Risk of congenital permanent bilateral nerve deafness in fetus)",
    interactions: [
      "Additive nephrotoxicity and ototoxicity with loop diuretics (furosemide), vancomycin, and cisplatin."
    ],
    organAdjustment: "Careful therapeutic drug monitoring and extended-interval dosing based on creatinine clearance.",
    counselingPoints: [
      "Administered as a once-daily hospital IV infusion or deep IM injection.",
      "Immediately report any ringing in ears (tinnitus), hearing reduction, or dizziness."
    ],
    warnings: [
      "OTOTOXICITY & NEPHROTOXICITY: Hearing loss can be irreversible.",
      "Can precipitate acute neuromuscular blockade in patients with myasthenia gravis."
    ],
    tip: "Mikacin (Aristo) is widely prescribed in Indian public hospitals as an affordable antipseudomonal agent."
  },
  {
    id: "gentamicin",
    name: "Gentamicin",
    brands: ["Garamycin", "Genticyn", "Gentabac"],
    drugClass: "Aminoglycosides",
    aware: "Access",
    schedule: "Schedule H",
    color: "#0284c7",
    shortDesc: "A low-cost, rapidly bactericidal aminoglycoside workhorse for synergy in endocarditis and neonatal sepsis.",
    works: "Binds 30S ribosomal subunits to block protein synthesis; exhibits concentration-dependent killing.",
    forms: ["IV / IM Injection (20mg, 80mg vials)", "Eye / Ear drops (0.3%)", "Topical cream"],
    treats: ["Enterococcal and streptococcal endocarditis synergy", "Neonatal sepsis (with ampicillin)", "Pelvic inflammatory disease (PID)", "Bacterial conjunctivitis"],
    spectrum: { gramPos: "Synergy only", gramNeg: "Potent (Enterobacterales, Pseudomonas)", anaerobes: "None", mrsa: "Synergy only", pseudomonas: "Yes" },
    commonSideEffects: ["Renal tubular toxicity", "Vestibular balance loss", "Hearing impairment"],
    pregnancySafety: "Category D (Risk of fetal eighth cranial nerve toxicity)",
    interactions: [
      "Inactivated if mixed in the same IV fluid bag with penicillins.",
      "Enhanced nephrotoxicity with NSAIDs and contrast dyes."
    ],
    organAdjustment: "Requires strict dosing interval extensions based on renal clearance.",
    counselingPoints: [
      "Ensure adequate hydration during intravenous therapy."
    ],
    warnings: [
      "Narrow therapeutic index: requires serum peak and trough concentration monitoring in prolonged hospital therapy."
    ],
    tip: "Genticyn is a mainstay low-cost injectable across government primary healthcare centers (PHCs) in India."
  },

  // --- 14. POLYMYXINS (LAST-LINE RESERVE) ---
  {
    id: "colistin",
    name: "Colistin (Colistimethate Sodium)",
    brands: ["Xelistra", "Coly-Mycin", "Colistin-AS", "Walycin"],
    drugClass: "Polymyxins (Last-Line Reserve)",
    aware: "Reserve",
    schedule: "Schedule H1",
    color: "#7f1d1d",
    shortDesc: "A critical intravenous and nebulized last-resort polymyxin antibiotic deployed against pan-drug-resistant Gram-negative superbugs.",
    works: "Acts as a cationic detergent, displacing magnesium/calcium from bacterial lipopolysaccharides and disrupting the outer membrane.",
    forms: ["IV / Inhalation vials (1 Million IU, 2 Million IU, 3 Million IU)"],
    treats: ["Carbapenem-resistant Klebsiella pneumoniae (CRKP)", "Acinetobacter baumannii sepsis", "MDR Pseudomonas aeruginosa in ICU", "Ventilator-associated pneumonia (VAP)"],
    spectrum: { gramPos: "None", gramNeg: "Last-line against Carbapenem-Resistant Gram-Negatives (CRGN)", anaerobes: "None", mrsa: "No", pseudomonas: "Yes" },
    commonSideEffects: ["Nephrotoxicity (acute tubular necrosis in 30–40% of patients)", "Neurotoxicity (paresthesias, muscle weakness, confusion, respiratory apnea)"],
    pregnancySafety: "Category C (Reserved solely for life-threatening drug-resistant infections where no alternatives exist)",
    interactions: [
      "Avoid concomitant nephrotoxins (aminoglycosides, NSAIDs, vancomycin) without intensive therapeutic drug monitoring."
    ],
    organAdjustment: "Strict renal dose titration calculated from baseline creatinine clearance is critical to prevent kidney shutdown.",
    counselingPoints: [
      "Strict hospital inpatient use with regular serum creatinine and urine output monitoring."
    ],
    warnings: [
      "WHO RESERVE ANTIBIOTIC: Must be initiated only after microbiological culture confirms pan-resistance.",
      "High rate of reversible nephrotoxicity (up to 30–40% in intensive care patients)."
    ],
    tip: "Colistin is one of the final defense lines in ICMR surveillance reports against NDM-1 positive bacteria in India."
  }
];

// Helper: retrieve single drug by its ID
function getDrugById(id) {
  if (!id) return null;
  return antibiotics.find(d => d.id.toLowerCase() === id.toLowerCase().trim());
}

// Helper: retrieve all drugs
function getAllDrugs() {
  return antibiotics;
}