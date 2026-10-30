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

// Clinically accurate, drug-specific food & drink interaction guidance (All 33 Drugs)
const drugFoodAdvice = {
  "amoxicillin": {
    howToTake: "Can be taken with or without food. Taking with a light meal or a glass of water helps reduce mild stomach irritation.",
    avoidFoods: "None. No specific foods must be avoided."
  },
  "amoxicillin-clavulanate": {
    howToTake: "Always take right at the start of a meal or substantial snack to maximize absorption and reduce stomach upset or diarrhea.",
    avoidFoods: "Avoid taking on an empty stomach to prevent nausea and abdominal cramps."
  },
  "ampicillin": {
    howToTake: "Must be taken on an empty stomach with a full glass of water, 1 hour before or 2 hours after meals.",
    avoidFoods: "Food significantly reduces absorption. Avoid taking with snacks or meals."
  },
  "benzylpenicillin": {
    howToTake: "Administered as an injection/infusion by healthcare staff in a hospital setting.",
    avoidFoods: "No specific food restrictions. Stay well-hydrated."
  },
  "benzathine-penicillin": {
    howToTake: "Administered as a deep intramuscular injection by healthcare staff.",
    avoidFoods: "No specific food restrictions. Stay well-hydrated."
  },
  "cloxacillin": {
    howToTake: "Must be taken on an empty stomach with a full glass of water, at least 1 hour before or 2 hours after meals.",
    avoidFoods: "Food blocks oral absorption. Avoid meals within 1 to 2 hours of taking your capsule."
  },
  "piperacillin-tazobactam": {
    howToTake: "Administered intravenously in hospital inpatient departments.",
    avoidFoods: "No direct food interactions. Drink adequate fluids as advised."
  },
  "cephalexin": {
    howToTake: "Can be taken with or without meals. Taking with food or milk helps prevent stomach ache and nausea.",
    avoidFoods: "None. No specific foods blocked."
  },
  "cefazolin": {
    howToTake: "Administered intravenously or intramuscularly before surgery or during inpatient care.",
    avoidFoods: "No food restrictions."
  },
  "cefuroxime": {
    howToTake: "Tablets must always be taken with food (or milk) to ensure proper absorption into the bloodstream.",
    avoidFoods: "Do not crush tablets (extremely bitter taste). Avoid taking on an empty stomach."
  },
  "cefixime": {
    howToTake: "Can be taken with or without food. Taking with a meal helps minimize loose stools.",
    avoidFoods: "None. No specific foods restricted."
  },
  "ceftriaxone": {
    howToTake: "Administered by healthcare professionals as an intravenous infusion or deep intramuscular injection.",
    avoidFoods: "No food restrictions."
  },
  "cefotaxime": {
    howToTake: "Administered by healthcare professionals as an injection/infusion.",
    avoidFoods: "No food restrictions."
  },
  "cefepime": {
    howToTake: "Administered as an intravenous hospital infusion.",
    avoidFoods: "No food restrictions."
  },
  "ceftaroline": {
    howToTake: "Administered as an intravenous hospital infusion.",
    avoidFoods: "No food restrictions."
  },
  "meropenem": {
    howToTake: "Administered as an intravenous infusion in hospital intensive care.",
    avoidFoods: "No direct food interactions."
  },
  "imipenem-cilastatin": {
    howToTake: "Administered as an intravenous hospital infusion.",
    avoidFoods: "No direct food interactions."
  },
  "azithromycin": {
    howToTake: "Can be taken with or without food. Taking with a light meal helps reduce nausea and stomach cramps.",
    avoidFoods: "Avoid taking antacids containing aluminum or magnesium (e.g. Gelusil, Digene) within 2 hours of your dose."
  },
  "clarithromycin": {
    howToTake: "Standard tablets can be taken with or without food. Extended-Release (XL) tablets must be taken with a meal.",
    avoidFoods: "Avoid large quantities of grapefruit juice. Avoid taking XL tablets on an empty stomach."
  },
  "doxycycline": {
    howToTake: "Swallow the capsule whole with a full glass of water while sitting or standing upright. Do NOT lie down for at least 30 minutes to prevent throat and food-pipe ulcers. Can be taken with a light meal to reduce nausea.",
    avoidFoods: "AVOID milk, curd, cheese, calcium-fortified juices, iron tablets, or antacids for 2 hours before and after your dose (calcium and iron bind the medicine and stop it from working)."
  },
  "minocycline": {
    howToTake: "Take with a full glass of water while sitting upright. Taking with a light meal helps reduce dizziness and stomach upset.",
    avoidFoods: "AVOID milk, cheese, yogurt, and calcium/iron supplements within 2 hours of your dose."
  },
  "ciprofloxacin": {
    howToTake: "Drink plenty of fluids (2 to 3 liters daily) throughout therapy to prevent crystals from forming in the urine.",
    avoidFoods: "AVOID milk, yogurt, curd, cheese, calcium-fortified drinks, iron tablets, or antacids for 2 hours before and 4 hours after taking your dose (calcium binds and blocks absorption)."
  },
  "levofloxacin": {
    howToTake: "Take with a full glass of water with or without food. Stay well-hydrated throughout the day.",
    avoidFoods: "Separate by at least 2 hours from antacids, calcium, iron, or zinc supplements."
  },
  "norfloxacin": {
    howToTake: "Take on an empty stomach with a full glass of water, 1 hour before or 2 hours after meals.",
    avoidFoods: "AVOID milk, yogurt, dairy products, and antacids within 2 hours before or after your dose."
  },
  "cotrimoxazole": {
    howToTake: "Take with a full glass of water. Drink at least 2 liters of water daily to prevent kidney irritation and crystal formation.",
    avoidFoods: "Avoid excessive potassium-rich supplements without physician consultation."
  },
  "clindamycin": {
    howToTake: "Take each capsule with a full glass of water while sitting or standing upright to prevent painful irritation of the food pipe.",
    avoidFoods: "Can be taken with or without food."
  },
  "metronidazole": {
    howToTake: "Take with or after meals with a glass of water to reduce metallic taste and stomach discomfort.",
    avoidFoods: "STRICT WARNING: Do NOT drink ANY alcohol (beer, wine, liquor) or take alcohol-containing cough syrups while taking this medicine and for at least 72 hours (3 days) after finishing it. Ingesting alcohol causes severe vomiting, pounding headache, chest pain, and collapse."
  },
  "nitrofurantoin": {
    howToTake: "Always take with food or a glass of milk. Food significantly improves drug absorption and helps prevent stomach upset and nausea.",
    avoidFoods: "Avoid magnesium antacids (which reduce absorption)."
  },
  "linezolid": {
    howToTake: "Can be taken with or without food.",
    avoidFoods: "Avoid eating large amounts of aged/fermented foods rich in tyramine (aged cheeses, soy sauce, yeast extracts, tap/draft beer, red wine) which can trigger dangerous blood pressure spikes."
  },
  "vancomycin": {
    howToTake: "Oral capsules can be taken with or without food. IV formulations are administered in hospital.",
    avoidFoods: "No specific food restrictions for oral capsules."
  },
  "amikacin": {
    howToTake: "Administered as an injection in hospital clinics.",
    avoidFoods: "Ensure good daily fluid intake."
  },
  "gentamicin": {
    howToTake: "Administered as an injection by healthcare professionals.",
    avoidFoods: "Ensure good daily fluid intake."
  },
  "colistin": {
    howToTake: "Administered in intensive care units via IV or nebulizer.",
    avoidFoods: "No direct food interactions."
  }
};

// ===== PATIENT-FRIENDLY EVERYDAY LANGUAGE FOR NON-MEDICAL USERS (All 33 Drugs) =====
const patientFriendlyTreats = {
  "amoxicillin": [
    "Ear infection (pain or pressure inside the ear)",
    "Throat infection (strep throat & painful tonsils)",
    "Sinus infection (facial pain & blocked nose)",
    "Tooth infection & gum swelling (dental abscess)",
    "Bladder infection (pain or burning when urinating)"
  ],
  "amoxicillin-clavulanate": [
    "Stubborn sinus & ear infections that didn't heal with basic antibiotics",
    "Animal or pet bites and infected scratches",
    "Diabetic foot sores and infected skin cuts",
    "Chest & lung infections (bacterial pneumonia)",
    "Complicated urinary and kidney infections"
  ],
  "ampicillin": [
    "Serious newborn baby blood and brain infections (in hospital)",
    "Severe gut bacteria infections (Listeria)",
    "Heart valve bacterial infections",
    "Protection during childbirth against Group B Strep"
  ],
  "benzylpenicillin": [
    "Syphilis infection (all stages)",
    "Severe heart valve bacterial infection",
    "Gas gangrene (severe muscle wound infection)",
    "Bacterial brain infection (meningitis)"
  ],
  "benzathine-penicillin": [
    "Preventing rheumatic heart fever (monthly long-acting injection)",
    "Syphilis treatment",
    "Bacterial skin & bone infections (yaws)"
  ],
  "cloxacillin": [
    "Painful skin boils, carbuncles, and pus bumps",
    "Infected surgical wounds and stitches",
    "Deep bone infections caused by staph bacteria",
    "Breast infection in nursing mothers (mastitis)"
  ],
  "piperacillin-tazobactam": [
    "Severe hospital lung infections (ventilator pneumonia)",
    "Severe abdominal & appendix infections (peritonitis)",
    "Deep diabetic foot & bone infections",
    "Severe blood poisoning (sepsis) in ICU patients"
  ],
  "cephalexin": [
    "Red, hot, spreading skin infections (cellulitis)",
    "Crusty skin sores and boils (impetigo)",
    "Bladder & urine infection (burning urination)",
    "Throat infections in penicillin-allergic patients"
  ],
  "cefazolin": [
    "Preventing infection before operations and surgeries (given in OT)",
    "Severe blood infections caused by staph bacteria",
    "Deep wound and skin infections"
  ],
  "cefuroxime": [
    "Chest & lung infections (bronchitis and pneumonia)",
    "Ear and sinus infections",
    "Throat and tonsil infections",
    "Tick-bite fever (Lyme disease)"
  ],
  "cefixime": [
    "Typhoid fever (enteric fever)",
    "Bladder & urinary tract infections",
    "Throat and ear infections",
    "Sexually transmitted gonorrhea infection"
  ],
  "ceftriaxone": [
    "Severe typhoid fever",
    "Brain and spinal cord infection (meningitis)",
    "Kidney infections with high fever (pyelonephritis)",
    "Severe hospitalized lung infections"
  ],
  "cefotaxime": [
    "Severe blood and brain infections in newborn babies",
    "Severe stomach fluid infection in liver disease (peritonitis)",
    "Severe childhood chest infections"
  ],
  "cefepime": [
    "High-fever blood infections in cancer & chemotherapy patients",
    "Severe hospital-acquired lung infections",
    "Tough pseudomonas bacterial infections"
  ],
  "ceftaroline": [
    "Severe MRSA superbug skin and wound infections",
    "Difficult community lung infections (pneumonia)"
  ],
  "meropenem": [
    "Life-threatening hospital blood infections (sepsis)",
    "Severe ICU lung infections",
    "Severe peritonitis and abdominal infections",
    "Bacterial brain infections (meningitis)"
  ],
  "imipenem-cilastatin": [
    "Complex post-surgery abdominal infections",
    "Deep bone, joint, and pelvic infections",
    "Severe hospital-acquired infections"
  ],
  "azithromycin": [
    "Walking pneumonia and atypical chest infections",
    "Mite-bite fever (scrub typhus) common in South India",
    "Chlamydia intimate infections",
    "Bacterial throat and tonsil infections"
  ],
  "clarithromycin": [
    "Stomach ulcer bacteria eradication (H. pylori triple therapy)",
    "Chest and lung infections",
    "Sinus and throat infections"
  ],
  "doxycycline": [
    "Mite-bite fever (scrub typhus) with high fever & headache",
    "Severe inflammatory acne and red facial pimples",
    "Malaria prevention and treatment",
    "Tick fever and leptospirosis (rat fever)"
  ],
  "minocycline": [
    "Deep cystic acne and painful red facial lumps",
    "Resistant hospital bacterial infections"
  ],
  "ciprofloxacin": [
    "Complicated kidney and bladder infections",
    "Severe bacterial diarrhea and food poisoning",
    "Typhoid fever (when confirmed sensitive by lab)",
    "Bacterial eye and ear infections (drops)"
  ],
  "levofloxacin": [
    "Severe chest infections and pneumonia",
    "Drug-resistant tuberculosis regimens (MDR-TB)",
    "Severe kidney infections"
  ],
  "norfloxacin": [
    "Bladder infections (burning when passing urine)",
    "Traveler's diarrhea and bacterial loose motions"
  ],
  "cotrimoxazole": [
    "Resistant staph skin boils and abscesses (MRSA)",
    "Bladder and urinary tract infections",
    "Specialized chest infections in low-immunity patients (PCP)"
  ],
  "clindamycin": [
    "Tooth infections and painful jaw/gum abscesses",
    "Resistant skin boils and wound pus (MRSA)",
    "Deep bone infections",
    "Severe lung abscesses"
  ],
  "metronidazole": [
    "Amoebic diarrhea & stomach cramps (parasite infection)",
    "Liver abscess caused by amoebas",
    "Intimate vaginal discharge and odor (bacterial vaginosis)",
    "Deep gum and dental abscesses"
  ],
  "nitrofurantoin": [
    "Bladder infections (cystitis) with burning, frequent urination",
    "Long-term prevention for women with repeat urinary tract infections"
  ],
  "linezolid": [
    "Resistant MRSA superbug lung infections",
    "Severe diabetic foot sores and ulcers",
    "Drug-resistant tuberculosis (MDR-TB)"
  ],
  "vancomycin": [
    "Severe hospital MRSA blood, heart, and bone infections",
    "Severe gut superbug diarrhea (C. diff - capsule form only)"
  ],
  "amikacin": [
    "Severe hospital-acquired blood infections",
    "Newborn baby sepsis (hospital nursery care)",
    "Drug-resistant tuberculosis (second-line injection)"
  ],
  "gentamicin": [
    "Severe bloodstream infections (sepsis)",
    "Heart valve bacterial infections (combined with other antibiotics)",
    "Bacterial eye infections (drops)"
  ],
  "colistin": [
    "Last-resort hospital medicine for pan-drug resistant superbugs in the ICU"
  ]
};

// ===== GENUINE DRUG-SPECIFIC PATIENT GUIDELINES (All 33 Drugs) =====
const drugPatientGuide = {
  "amoxicillin": {
    dos: [
      "Take your doses evenly spaced (every 8 hours, e.g. morning, afternoon, night).",
      "Drink a full glass of water with each capsule.",
      "Take with or after food if you feel any stomach discomfort.",
      "Finish the entire pack, even if your fever or pain stops after 2 days."
    ],
    donts: [
      "Do NOT take this medicine if you have ever had an allergic swelling or rash from penicillin.",
      "Do NOT stop early; surviving bacteria multiply and become resistant superbugs.",
      "Do NOT save leftover capsules for future colds or flu."
    ],
    sideEffects: [
      "Mild loose stools or diarrhea",
      "Mild nausea or tummy upset",
      "Temporary mild skin rash (contact your doctor)"
    ],
    missedDose: "Take the missed dose as soon as you remember. If it is almost time for your next regular dose, skip the missed one. Never take two doses at the same time.",
    pregnancy: "✅ Generally Safe: Penicillins like amoxicillin have a strong safety record in all months of pregnancy and breastfeeding when prescribed by your doctor.",
    emergency: [
      "Sudden swelling of your face, lips, tongue, or throat",
      "Sudden tight chest, wheezing, or difficulty breathing",
      "Severe widespread skin rash, hives, or peeling skin",
      "Severe watery diarrhea happening several times a day with fever"
    ]
  },
  "amoxicillin-clavulanate": {
    dos: [
      "ALWAYS take your tablet right at the start of a meal or large snack (prevents diarrhea and stomach cramps).",
      "Drink plenty of water throughout the day.",
      "Keep oral syrups in the refrigerator and shake well before every use."
    ],
    donts: [
      "Do NOT take on an empty stomach (causes strong stomach nausea and loose motions).",
      "Do NOT take if you have ever had liver jaundice or yellow eyes from Augmentin or Clavam.",
      "Do NOT stop taking the pills early just because your wound or fever feels better."
    ],
    sideEffects: [
      "Frequent loose watery motions or diarrhea (very common with this combination)",
      "Mild stomach ache, nausea, or bloating",
      "Mild vaginal itching or white discharge (yeast overgrowth)"
    ],
    missedDose: "Take the missed tablet with food as soon as you remember. If your next dose is within 4 hours, skip the missed one. Never double up.",
    pregnancy: "✅ Generally Safe: Used for maternal chest, kidney, and bite infections. Always inform your doctor if you are in preterm labor.",
    emergency: [
      "Yellowing of your skin or the whites of your eyes (jaundice or liver irritation)",
      "Severe watery or bloody diarrhea with belly cramps (even weeks after stopping)",
      "Sudden swelling of lips, throat, or difficulty breathing (allergic reaction)"
    ]
  },
  "ampicillin": {
    dos: [
      "Take oral forms on an empty stomach with a full glass of water, 1 hour before or 2 hours after meals.",
      "Hospital injections must be given on a strict time schedule by nurses."
    ],
    donts: [
      "Do NOT take with food or milk (food blocks absorption into the blood).",
      "Do NOT use if you have a documented allergy to penicillins."
    ],
    sideEffects: [
      "Mild stomach upset and loose stools",
      "Red skin rash (very common if taken during viral glandular fever)"
    ],
    missedDose: "Take on an empty stomach as soon as remembered. If close to the next dose, continue normal schedule without doubling.",
    pregnancy: "✅ Safe for Pregnancy: Standard first-line choice used in hospitals for pregnant mothers and newborn babies.",
    emergency: [
      "Sudden hives, intense itching, face swelling, or wheezing",
      "Severe watery diarrhea that does not stop"
    ]
  },
  "benzylpenicillin": {
    dos: [
      "Hospital inpatient medicine given strictly via slow IV drip or deep muscle injection by nurses.",
      "Inform hospital staff immediately if you have any history of penicillin allergy."
    ],
    donts: [
      "Not for home self-use.",
      "Do NOT skip intradermal skin allergy testing before your first dose."
    ],
    sideEffects: [
      "Pain or soreness at the injection site",
      "Temporary shivering or mild fever a few hours after the first injection in syphilis (dying bacteria reaction)"
    ],
    missedDose: "Administered on a strict hospital chart. Your healthcare team ensures exact timing.",
    pregnancy: "✅ Safe for Pregnancy: Gold standard and sole proven cure to protect unborn babies from congenital syphilis.",
    emergency: [
      "Sudden chest tightness, facial swelling, or severe dizziness during infusion",
      "Sudden convulsions or severe muscle twitching"
    ]
  },
  "benzathine-penicillin": {
    dos: [
      "Must be given strictly as a deep injection into the buttock muscle by a trained healthcare professional.",
      "Patients in rheumatic heart programs must receive their injection strictly every 3 to 4 weeks."
    ],
    donts: [
      "MUST NEVER BE GIVEN INTO A VEIN (IV) — injection into a vein is life-threatening.",
      "Do NOT skip scheduled monthly doses; rheumatic fever can permanently damage heart valves."
    ],
    sideEffects: [
      "Dull ache and muscle stiffness at the injection site lasting 1 to 2 days",
      "Mild temporary dizziness or fainting right after injection (sit down for 15 minutes)"
    ],
    missedDose: "If you miss your monthly appointment, visit your clinic or hospital immediately to receive your injection.",
    pregnancy: "✅ Safe for Pregnancy: Essential to protect both mother and baby from syphilis and rheumatic heart complications.",
    emergency: [
      "Sudden rash, breathing difficulty, or cold sweaty collapse within minutes of the injection",
      "Severe persistent numbness or weakness in the leg"
    ]
  },
  "cloxacillin": {
    dos: [
      "Take on an empty stomach with a full glass of water, at least 1 hour before or 2 hours after meals.",
      "Swallow capsules whole with plenty of drinking water."
    ],
    donts: [
      "Do NOT take with meals or snacks (food blocks the medicine from getting into your blood).",
      "Do NOT use for resistant MRSA superbug boils (it only works on regular staph bacteria)."
    ],
    sideEffects: [
      "Mild nausea, heartburn, or stomach discomfort",
      "Mild loose motions"
    ],
    missedDose: "Take on an empty stomach as soon as you remember. If it is almost time for your next capsule, skip the missed one.",
    pregnancy: "✅ Safe for Pregnancy: Safe during pregnancy and preferred for breast infections (mastitis) in nursing mothers.",
    emergency: [
      "Sudden hives, facial swelling, or wheezing",
      "Yellow skin or eyes, or dark tea-colored urine (liver reaction)"
    ]
  },
  "piperacillin-tazobactam": {
    dos: [
      "Hospital ICU/ward medicine administered as an extended IV drip over 3 to 4 hours.",
      "Drink plenty of fluids if you are allowed oral drinks."
    ],
    donts: [
      "Inpatient hospital administration only.",
      "Do NOT take without kidney blood test monitoring if you are also receiving vancomycin."
    ],
    sideEffects: [
      "Diarrhea or loose stools",
      "Mild soreness or redness at the IV cannula site",
      "Mild headache"
    ],
    missedDose: "Managed directly by hospital nursing and intensive care teams.",
    pregnancy: "✅ Used in Pregnancy: Reserved for severe maternal abdominal or kidney sepsis when benefits outweigh risks.",
    emergency: [
      "Sudden severe watery or bloody diarrhea",
      "Severe drop in urine output or sudden body swelling (kidney strain)"
    ]
  },
  "cephalexin": {
    dos: [
      "Can be taken with food or milk if your stomach feels sensitive.",
      "Complete the entire 5 to 7 days prescribed for skin sores and boils."
    ],
    donts: [
      "Do NOT stop taking the capsules when the skin redness begins to fade.",
      "Do NOT take if you have had a life-threatening throat-swelling reaction to cephalosporins."
    ],
    sideEffects: [
      "Mild stomach ache, nausea, or indigestion",
      "Mild loose stools"
    ],
    missedDose: "Take as soon as you remember. If your next dose is within 3 hours, skip the missed one and continue your normal schedule.",
    pregnancy: "✅ Safe for Pregnancy: Highly trusted first-line antibiotic for skin infections and urinary tract infections during pregnancy.",
    emergency: [
      "Sudden hives, lip swelling, or tight throat",
      "Severe persistent watery diarrhea"
    ]
  },
  "cefazolin": {
    dos: [
      "Administered as an IV injection in operating rooms 30 to 60 minutes before surgical incision.",
      "Given to prevent surgical cuts and implants from getting infected."
    ],
    donts: [
      "Hospital surgical and inpatient use only."
    ],
    sideEffects: [
      "Mild soreness or redness at the IV injection line",
      "Mild transient skin rash"
    ],
    missedDose: "Timed by the surgical and anesthesia team in the hospital.",
    pregnancy: "✅ Safe for Pregnancy: First choice surgical preventative antibiotic for Cesarean section delivery.",
    emergency: [
      "Sudden allergic skin rash or wheezing during pre-surgery infusion"
    ]
  },
  "cefuroxime": {
    dos: [
      "ALWAYS take your tablet with food or a glass of milk (food doubles the absorption into your bloodstream).",
      "Swallow tablets whole."
    ],
    donts: [
      "Do NOT crush or chew the tablet (it has an intensely bitter taste).",
      "Do NOT take on an empty stomach (you will absorb less than half the medicine)."
    ],
    sideEffects: [
      "Mild loose stools or tummy upset",
      "Mild headache",
      "Temporary bitter taste in the mouth"
    ],
    missedDose: "Take with a light snack as soon as you remember. If your next dose is within 4 hours, skip the missed one.",
    pregnancy: "✅ Safe for Pregnancy: Widely prescribed and considered safe for chest and urine infections in pregnant women.",
    emergency: [
      "Sudden hives, facial swelling, or breathing difficulty",
      "Watery diarrhea lasting more than 48 hours"
    ]
  },
  "cefixime": {
    dos: [
      "Can be taken with or without food (taking with food reduces stomach upset).",
      "Dispersible tablets can be dissolved in a tablespoon of clean water before drinking."
    ],
    donts: [
      "Do NOT take for ordinary skin boils or pus wounds (cefixime does not kill skin staph bacteria).",
      "Do NOT stop early when treating typhoid fever (prevents dangerous relapse)."
    ],
    sideEffects: [
      "Loose stools or mild diarrhea (quite common)",
      "Stomach bloating or gas",
      "Mild nausea"
    ],
    missedDose: "Take as soon as you remember. If it is close to your next dose, skip the missed pill and continue your normal schedule.",
    pregnancy: "✅ Safe for Pregnancy: Frequently chosen by doctors for urinary tract infections and typhoid during pregnancy.",
    emergency: [
      "Severe watery diarrhea happening many times a day with high fever",
      "Sudden allergic hives, lip swelling, or wheezing"
    ]
  },
  "ceftriaxone": {
    dos: [
      "Administered as an IV drip or deep muscle injection by nurses or doctors.",
      "Stay well-hydrated during treatment."
    ],
    donts: [
      "NEVER mix with calcium-containing drips (like Ringer's Lactate) in newborn babies (forms fatal crystals in lungs and kidneys).",
      "Hospital or daycare clinic use only."
    ],
    sideEffects: [
      "Pain or stinging at the injection site",
      "Mild loose motions",
      "Temporary gallbladder sludge (resolves after course ends)"
    ],
    missedDose: "Administered once daily by healthcare staff. If you miss your daycare injection, visit the clinic immediately.",
    pregnancy: "✅ Safe for Pregnancy: One of the most trusted antibiotics for severe maternal infections and typhoid sepsis.",
    emergency: [
      "Severe pain in upper right stomach with vomiting (gallbladder inflammation)",
      "Sudden facial swelling, rash, or breathing difficulty during injection"
    ]
  },
  "cefotaxime": {
    dos: [
      "Administered via hospital IV injection every 6 to 8 hours.",
      "Safe and preferred choice in premature and newborn infants."
    ],
    donts: [
      "Hospital inpatient administration only."
    ],
    sideEffects: [
      "Mild loose stools",
      "Mild soreness at the IV cannula site"
    ],
    missedDose: "Managed by hospital medical and neonatal staff.",
    pregnancy: "✅ Safe for Pregnancy: Safely used for severe maternal and newborn infections.",
    emergency: [
      "Sudden severe allergic reaction (hives, wheezing, facial puffiness)"
    ]
  },
  "cefepime": {
    dos: [
      "Administered via hospital IV drip for high-risk ICU or cancer chemotherapy patients.",
      "Doctors carefully adjust the dose based on your kidney blood tests."
    ],
    donts: [
      "Inpatient hospital administration only."
    ],
    sideEffects: [
      "Mild diarrhea or stomach ache",
      "Mild headache"
    ],
    missedDose: "Administered on a strict hospital schedule.",
    pregnancy: "✅ Used in Pregnancy: Used when serious pseudomonas or hospital infections require strong coverage.",
    emergency: [
      "Sudden confusion, extreme drowsiness, hallucinations, or muscle twitches (brain toxicity from kidney buildup)"
    ]
  },
  "ceftaroline": {
    dos: [
      "Administered via hospital IV infusion over 60 minutes.",
      "Specifically targeted against resistant MRSA superbug skin infections."
    ],
    donts: [
      "Reserve hospital antibiotic only."
    ],
    sideEffects: [
      "Mild diarrhea, nausea, or headache",
      "Mild skin itching"
    ],
    missedDose: "Managed by hospital infectious disease doctors.",
    pregnancy: "⚠️ Use with Doctor Guidance: Reserved for serious resistant MRSA infections when alternatives cannot be used.",
    emergency: [
      "Sudden allergic reaction or severe persistent watery diarrhea"
    ]
  },
  "meropenem": {
    dos: [
      "Administered via hospital IV drip (often over 3 hours) in intensive care units.",
      "A high-strength reserve medicine for severe hospital infections."
    ],
    donts: [
      "STRICTLY FORBIDDEN with valproic acid epilepsy tablets (causes immediate dangerous drop in seizure medicine, triggering fits).",
      "Inpatient hospital use only."
    ],
    sideEffects: [
      "Mild nausea, headache, or diarrhea",
      "Constipation"
    ],
    missedDose: "Scheduled by hospital intensive care staff.",
    pregnancy: "✅ Safe in Pregnancy: Preferred carbapenem for life-threatening maternal hospital infections.",
    emergency: [
      "Sudden seizures or convulsions (especially in patients with kidney problems)",
      "Severe watery diarrhea with fever"
    ]
  },
  "imipenem-cilastatin": {
    dos: [
      "Infused slowly over 40 to 60 minutes to prevent nausea.",
      "Hospital reserve antibiotic for complicated surgical infections."
    ],
    donts: [
      "Avoid in patients with history of epilepsy or brain injury (higher seizure risk than meropenem)."
    ],
    sideEffects: [
      "Nausea or vomiting if infused too rapidly",
      "Mild loose stools"
    ],
    missedDose: "Administered by hospital nursing staff.",
    pregnancy: "⚠️ Caution in Pregnancy: Meropenem is preferred over imipenem during pregnancy.",
    emergency: [
      "Sudden muscle jerks or convulsions"
    ]
  },
  "azithromycin": {
    dos: [
      "Take once daily at the exact same time every day for the short 3-to-5 day course.",
      "Can be taken with or without food (taking with food reduces stomach cramps)."
    ],
    donts: [
      "Do NOT take antacid syrups (like Gelusil, Digene) within 2 hours of your tablet.",
      "Do NOT take extra tablets if you feel your cold is not improving (it does not treat viral colds)."
    ],
    sideEffects: [
      "Mild stomach cramps or nausea",
      "Loose stools or mild diarrhea",
      "Temporary taste changes"
    ],
    missedDose: "Take your missed tablet as soon as you remember that day. If it is already the next day, take only your normal single dose.",
    pregnancy: "✅ Safe for Pregnancy: Considered safe throughout pregnancy and is the preferred macrolide for chest and chlamydia infections.",
    emergency: [
      "Sudden pounding heartbeat, racing pulse, or fainting (heart rhythm warning)",
      "Severe dizziness or sudden facial swelling"
    ]
  },
  "clarithromycin": {
    dos: [
      "Swallow Extended-Release (XL) tablets whole with a meal.",
      "Expect a temporary bitter or metallic taste in your mouth (harmless)."
    ],
    donts: [
      "Do NOT take with cholesterol statin tablets (like Atorvastatin, Simvastatin) without doctor approval (causes muscle breakdown).",
      "Do NOT drink large amounts of grapefruit juice while on this medicine."
    ],
    sideEffects: [
      "Strong bitter or metallic taste in the mouth (very common)",
      "Mild nausea, stomach ache, or loose stools",
      "Mild headache"
    ],
    missedDose: "Take as soon as you remember with a meal. If it is almost time for your next dose, skip the missed one.",
    pregnancy: "⚠️ Avoid in Pregnancy: Avoid unless no alternatives exist; azithromycin is preferred during pregnancy.",
    emergency: [
      "Severe unexplained muscle pain, tenderness, or brown urine (muscle breakdown)",
      "Irregular, fluttering heartbeat or severe dizziness"
    ]
  },
  "doxycycline": {
    dos: [
      "Swallow the capsule whole with a full large glass of water while standing or sitting upright.",
      "STAY UPRIGHT (do not lie down) for at least 30 minutes after swallowing.",
      "Take with a light meal to reduce stomach burning.",
      "Wear sunscreen or hats outdoors (your skin burns very easily in the sun)."
    ],
    donts: [
      "DO NOT LIE DOWN for 30 minutes (a capsule stuck in your food pipe causes painful ulcers).",
      "DO NOT take milk, curd, cheese, paneer, calcium tablets, iron tonics, or antacids within 2 hours before or after your dose.",
      "NEVER take expired capsules (causes serious kidney damage)."
    ],
    sideEffects: [
      "Heartburn, nausea, or burning sensation in the chest",
      "Skin burns or rashes rapidly in bright sunlight"
    ],
    missedDose: "Take with a full glass of water while sitting upright as soon as you remember. If it is almost time for your next capsule, skip it.",
    pregnancy: "❌ DANGEROUS IN PREGNANCY: Contraindicated in 2nd/3rd trimester and nursing. Permanently stains baby's teeth gray-yellow and slows bone growth.",
    emergency: [
      "Severe chest pain or painful difficulty swallowing (food pipe ulcer)",
      "Severe throbbing headache with blurred vision"
    ]
  },
  "minocycline": {
    dos: [
      "Take with a full glass of water while sitting upright.",
      "Taking with a light meal helps prevent nausea and dizziness."
    ],
    donts: [
      "Do NOT drive or ride a bike if you feel dizzy or lightheaded.",
      "Do NOT take with milk, curd, iron, or calcium supplements within 2 hours."
    ],
    sideEffects: [
      "Dizziness, lightheadedness, or feeling off-balance",
      "Mild nausea or tummy upset",
      "Slight blue-gray coloring of old skin scars or gums with long-term use"
    ],
    missedDose: "Take as soon as you remember while sitting upright. If near next dose, skip and continue normal schedule.",
    pregnancy: "❌ DANGEROUS IN PREGNANCY: Contraindicated in pregnancy and nursing; permanently stains baby's teeth and affects bone development.",
    emergency: [
      "Severe spinning sensation (vertigo) with vomiting",
      "Severe joint pain, fever, or butterfly rash across cheeks (lupus-like reaction)"
    ]
  },
  "ciprofloxacin": {
    dos: [
      "Drink 2 to 3 liters of water daily throughout your course (prevents medicine crystals in kidneys).",
      "Wear sunscreen or long sleeves outdoors (skin becomes very sensitive to sun)."
    ],
    donts: [
      "DO NOT take with milk, curd, paneer, cheese, calcium drinks, iron tonics, or antacids within 2 hours before or 4 hours after (calcium stops it from working).",
      "DO NOT take muscle relaxant tizanidine (causes severe drop in blood pressure).",
      "DO NOT perform strenuous sports or heavy lifting if your heels hurt."
    ],
    sideEffects: [
      "Mild nausea, loose motions, or stomach cramps",
      "Mild headache or lightheadedness",
      "Sun sensitivity (sunburns easily)"
    ],
    missedDose: "Take as soon as you remember with a large glass of water. If your next dose is within 6 hours, skip the missed one.",
    pregnancy: "⚠️ Avoid in Pregnancy: Avoided during pregnancy and nursing due to risks to cartilage and bone development in the baby.",
    emergency: [
      "Sudden sharp pain, popping, or swelling behind your ankle or heel (Achilles tendon strain or rupture)",
      "Sudden burning, tingling, numbness, or shooting pain in hands or feet (nerve damage)",
      "Heart palpitations, flutter, or sudden fainting"
    ]
  },
  "levofloxacin": {
    dos: [
      "Take with a full glass of water with or without meals.",
      "Drink plenty of fluids throughout the day.",
      "Report any sudden joint or tendon ache immediately."
    ],
    donts: [
      "Do NOT take antacids, iron, or zinc tablets within 2 hours.",
      "Do NOT ignore sudden pain in the back of your ankle or calf."
    ],
    sideEffects: [
      "Difficulty sleeping (insomnia) or vivid dreams",
      "Mild nausea, headache, or dizziness",
      "Mild loose stools"
    ],
    missedDose: "Take as soon as remembered. If close to next dose, continue on regular timing without doubling.",
    pregnancy: "⚠️ Avoid in Pregnancy: Generally avoided during pregnancy and breastfeeding unless life-saving for drug-resistant TB.",
    emergency: [
      "Sudden pain, snapping sound, or swelling in your heel or shoulder tendon",
      "Extreme anxiety, confusion, hallucinations, or trembling",
      "Sudden severe drop in blood sugar (sweating, shaking, confusion) in diabetics"
    ]
  },
  "norfloxacin": {
    dos: [
      "Take on an empty stomach with a full glass of water, 1 hour before or 2 hours after meals.",
      "Drink at least 2 liters of water daily."
    ],
    donts: [
      "Do NOT take with milk, curd, dairy products, or antacids within 2 hours.",
      "Do NOT take for ordinary viral loose motions without doctor's advice."
    ],
    sideEffects: [
      "Mild nausea, stomach cramps, or loss of appetite",
      "Mild headache or dizziness"
    ],
    missedDose: "Take on an empty stomach as soon as remembered. If near next dose, skip the missed one.",
    pregnancy: "⚠️ Avoid in Pregnancy: Avoid during pregnancy; safer bladder antibiotics like nitrofurantoin are preferred.",
    emergency: [
      "Sudden pain or tenderness in your heel tendon",
      "Severe allergic skin reaction or breathing trouble"
    ]
  },
  "cotrimoxazole": {
    dos: [
      "Drink at least 2 liters of water daily to flush kidneys and prevent stone crystals.",
      "Take with meals to reduce nausea."
    ],
    donts: [
      "STOP IMMEDIATELY at the very first sign of any skin rash or lip blisters.",
      "Do NOT take if you have sulfa drug allergy or G6PD deficiency (causes severe anemia)."
    ],
    sideEffects: [
      "Mild nausea, loss of appetite, or stomach discomfort",
      "Mild skin sensitivity to bright sunlight"
    ],
    missedDose: "Take with food as soon as you remember. If it is close to your next dose, skip the missed pill.",
    pregnancy: "❌ Avoid in Early & Late Pregnancy: Avoid during 1st trimester (blocks folic acid) and near delivery (risks newborn jaundice/brain toxicity).",
    emergency: [
      "ANY new skin rash, red spots, peeling skin, or mouth/lip ulcers (sign of life-threatening Stevens-Johnson reaction)",
      "Unusual sore throat, mouth sores, or extreme pale tiredness (blood cell drop)"
    ]
  },
  "clindamycin": {
    dos: [
      "Swallow each capsule with a full glass of water while standing or sitting upright.",
      "Can be taken with or without food."
    ],
    donts: [
      "DO NOT LIE DOWN immediately after taking the capsule (prevents food-pipe burning).",
      "STOP IMMEDIATELY and call your doctor if you develop severe watery diarrhea."
    ],
    sideEffects: [
      "Mild loose stools or nausea",
      "Mild stomach cramping",
      "Temporary unpleasant metallic taste"
    ],
    missedDose: "Take with water as soon as you remember. If it is almost time for your next regular dose, skip the missed one.",
    pregnancy: "✅ Safe for Pregnancy: Considered safe during pregnancy when prescribed for dental or bacterial vaginal infections.",
    emergency: [
      "Severe, frequent watery diarrhea (5–10 times a day) with fever and severe belly pain (dangerous C. diff bowel infection)"
    ]
  },
  "metronidazole": {
    dos: [
      "Take with or after meals to avoid bitter metallic taste and nausea.",
      "Note that dark, reddish-brown urine during treatment is completely harmless."
    ],
    donts: [
      "STRICTLY ZERO ALCOHOL: DO NOT drink beer, wine, whiskey, or alcohol cough syrups during treatment and for 3 FULL DAYS (72 hours) after stopping (causes violent vomiting, rapid pulse, and collapse).",
      "Do NOT take blood-thinner warfarin without close doctor monitoring."
    ],
    sideEffects: [
      "Strong metallic taste in your mouth (very common)",
      "Dark or reddish-brown urine (completely harmless)",
      "Mild nausea, loss of appetite, or furry tongue"
    ],
    missedDose: "Take with food as soon as remembered. If close to next dose, continue on schedule without doubling.",
    pregnancy: "⚠️ Use with Doctor Advice: Used when clearly indicated; avoid single large mega-doses while breastfeeding.",
    emergency: [
      "Severe violent vomiting, pounding headache, and chest pain after touching alcohol",
      "Numbness, tingling 'pins and needles' in hands and feet, or unsteady walking (nerve warning)"
    ]
  },
  "nitrofurantoin": {
    dos: [
      "ALWAYS take with meals or a glass of milk (food helps your body absorb the drug and prevents nausea).",
      "Expect your urine to turn dark yellow, brown, or rust-colored (this is completely normal and harmless)."
    ],
    donts: [
      "Do NOT take for kidney infections or fever with back pain (it only works inside the urinary bladder).",
      "Do NOT take magnesium antacids (they block the medicine from working).",
      "Do NOT take if you have severe kidney failure."
    ],
    sideEffects: [
      "Harmless brown, rust, or dark yellow urine discoloration",
      "Mild nausea or tummy discomfort (taking with food prevents this)",
      "Mild headache"
    ],
    missedDose: "Take with a snack or glass of milk as soon as you remember. If near next regular dose, skip the missed pill.",
    pregnancy: "⚠️ Safe in 1st/2nd Trimester, STOP near Delivery: Safe for bladder infections in early pregnancy, but MUST STOP after 36–38 weeks (can harm newborn red blood cells).",
    emergency: [
      "Sudden shortness of breath, chest tightness, or dry cough (lung reaction)",
      "Persistent numbness, tingling, or weakness in toes and fingers"
    ]
  },
  "linezolid": {
    dos: [
      "Can be taken with or without food.",
      "Inform your doctor about all other medicines, especially antidepressants (SSRIs) or migraine tablets."
    ],
    donts: [
      "Do NOT eat large amounts of aged cheese, yeast extracts, tap/draft beer, red wine, or soy sauce (can trigger dangerous blood pressure spikes).",
      "Do NOT take for longer than 10 to 14 days without routine weekly blood count tests."
    ],
    sideEffects: [
      "Mild nausea, headache, or diarrhea",
      "Mild temporary change in tongue color"
    ],
    missedDose: "Take as soon as remembered. If near next dose, skip and continue regular 12-hour schedule.",
    pregnancy: "⚠️ Caution in Pregnancy: Reserved for difficult resistant MRSA or drug-resistant TB when benefits outweigh risks.",
    emergency: [
      "Shivering, heavy sweating, high fever, and sudden muscle twitching (Serotonin Syndrome)",
      "Sudden vision changes, blurred vision, or loss of color vision (optic nerve reaction)",
      "Unusual tiredness, pale skin, or easy bleeding/bruising (bone marrow cell drop)"
    ]
  },
  "vancomycin": {
    dos: [
      "IV form must be infused slowly over at least 60 to 120 minutes in hospital.",
      "Oral liquid/capsules are used ONLY for gut C. diff diarrhea (not absorbed into blood)."
    ],
    donts: [
      "NEVER infuse rapidly via IV (causes Red Man syndrome).",
      "Hospital inpatient monitoring required."
    ],
    sideEffects: [
      "Mild soreness at the IV cannula line",
      "Mild nausea with oral capsules"
    ],
    missedDose: "Administered on a strict hospital infusion chart.",
    pregnancy: "⚠️ Used in Life-Threatening Sepsis: IV used in hospital for confirmed severe maternal MRSA infections.",
    emergency: [
      "Sudden intense red flushing, burning heat, and hives across face and chest during IV drip ('Red Man' reaction)",
      "Ringing in ears, hearing loss, or sudden drop in daily urine output"
    ]
  },
  "amikacin": {
    dos: [
      "Administered as a hospital injection or slow IV infusion.",
      "Drink plenty of water to protect your kidneys."
    ],
    donts: [
      "Hospital and clinic prescription use only.",
      "Do NOT ignore any ear ringing or hearing changes."
    ],
    sideEffects: [
      "Soreness or ache at the injection site"
    ],
    missedDose: "Administered once daily by healthcare professionals.",
    pregnancy: "❌ DANGEROUS IN PREGNANCY: Can cause permanent nerve deafness in the unborn baby. Used only for maternal life-threatening emergencies.",
    emergency: [
      "Ringing in your ears (tinnitus), muffled hearing, or severe spinning dizziness",
      "Sudden noticeable drop in urine output (kidney strain)"
    ]
  },
  "gentamicin": {
    dos: [
      "Administered as an injection in hospital clinics.",
      "Eye drops should be applied with clean hands."
    ],
    donts: [
      "Do NOT use prolonged injections without regular kidney and hearing checks."
    ],
    sideEffects: [
      "Mild stinging with eye drops",
      "Injection site ache"
    ],
    missedDose: "Scheduled by hospital nursing team.",
    pregnancy: "❌ DANGEROUS IN PREGNANCY: Carries risk of permanent fetal ear and hearing nerve damage.",
    emergency: [
      "Ringing in your ears or loss of balance",
      "Reduced urine output"
    ]
  },
  "colistin": {
    dos: [
      "Administered in intensive care units via IV drip or nebulizer inhaler.",
      "A critical last-defense antibiotic for superbugs."
    ],
    donts: [
      "ICU hospital inpatient reserve use only."
    ],
    sideEffects: [
      "Mild numbness around mouth or lips"
    ],
    missedDose: "Strictly regulated by ICU intensive care specialists.",
    pregnancy: "⚠️ Last-Resort Emergency Use: Used in ICU when no other antibiotic can save the patient's life.",
    emergency: [
      "Sudden muscle weakness, difficulty breathing, or severe drop in urine (kidney failure)"
    ]
  }
};

// Activity Spectrum Formatter
function formatActivityBadge(val) {
  if (!val) return "N/A";
  const v = String(val).trim();
  if (v.toLowerCase() === "yes") return "✅ Yes";
  if (v.toLowerCase() === "no") return "❌ No";
  if (v.toLowerCase().startsWith("yes")) return "✅ " + escapeHtml(v);
  if (v.toLowerCase().includes("synergy")) return "🔄 " + escapeHtml(v);
  return escapeHtml(v);
}

// WhatsApp drug share helper
function shareCurrentDrug(drugName, brandNames) {
  const currentUrl = window.location.href;
  const shareText = "💊 Check out clinical guidance for " + drugName + " (" + brandNames + ") on AB|Info: " + currentUrl;
  if (typeof shareOnWhatsApp === "function") {
    shareOnWhatsApp(shareText);
  } else {
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText), "_blank");
  }
}

// Learning Path Switcher that directly sets display style on cards
function applyDrugLearningPath(path) {
  const currentPath = (path === "academic") ? "academic" : "public";
  localStorage.setItem("abinfo_learning_path", currentPath);

  // 1. Sync button states
  document.querySelectorAll(".path-btn").forEach(function(btn) {
    const isTarget = btn.getAttribute("data-path") === currentPath;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-pressed", isTarget);
  });

  // 2. Add classes to body
  document.body.classList.toggle("path-academic", currentPath === "academic");
  document.body.classList.toggle("path-public", currentPath === "public");
  document.body.classList.toggle("mode-academic", currentPath === "academic");
  document.body.classList.toggle("mode-public", currentPath === "public");

  // 3. Direct visual toggle - guarantees elements show/hide reliably
  const publicCards = document.querySelectorAll(".public-view");
  const academicCards = document.querySelectorAll(".academic-view");

  publicCards.forEach(function(el) {
    el.style.display = (currentPath === "public") ? "block" : "none";
  });

  academicCards.forEach(function(el) {
    el.style.display = (currentPath === "academic") ? "block" : "none";
  });
}

// Main Monograph Renderer
function renderDrugMonograph() {
  const params = new URLSearchParams(window.location.search);
  const drugId = params.get("drug");
  const detailRoot = document.getElementById("drugDetail");

  if (!detailRoot) return;

  const drug = typeof getDrugById === "function" ? getDrugById(drugId) : null;

  if (!drug) {
    document.title = "Drug Not Found | AB|Info";
    detailRoot.innerHTML = `
      <div class="detail-notfound" style="text-align:center; padding:60px 20px;">
        <h1>😕 Antibiotic Not Found</h1>
        <p>We couldn't find "${drugId ? escapeHtml(drugId) : ""}" in our database.</p>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-top:8px;">Please select an antibiotic from the A–Z catalog or class list.</p>
        <a class="btn-primary" href="index.html#drugs" style="margin-top:16px;">← Browse All Antibiotics</a>
      </div>
    `;
    return;
  }

  document.title = drug.name + " (" + drug.brands[0] + ") | AB|Info Monograph";

  // Retrieve drug-specific food guidance
  const foodAdvice = drugFoodAdvice[drug.id] || {
    howToTake: "Take with a full glass of water as directed by your physician.",
    avoidFoods: "Follow your doctor's specific dietary instructions."
  };

  // Retrieve drug-specific patient guide (Fallback gracefully if ever missing)
  const patientGuide = drugPatientGuide[drug.id] || {
    dos: [
      "Take your doses at the same time every day.",
      "Drink a full glass of water with each tablet.",
      "Finish the entire course prescribed by your doctor."
    ],
    donts: [
      "Do NOT stop early just because fever or pain stops.",
      "Do NOT share pills with family members."
    ],
    sideEffects: drug.commonSideEffects,
    missedDose: "Take the missed dose as soon as you remember. If it is almost time for your next regular dose, skip the missed one.",
    pregnancy: drug.pregnancySafety || "Consult your doctor before taking this medicine during pregnancy or breastfeeding.",
    emergency: [
      "Difficulty breathing or tight chest",
      "Swelling of your face, lips, tongue, or throat",
      "Severe skin rash, peeling skin, or mouth sores",
      "Severe persistent watery diarrhea"
    ]
  };

  // Pre-build all HTML lists using string concatenation (+) to prevent template string escaping bugs
  const patientTreatsList = (patientFriendlyTreats[drug.id] || drug.treats).map(function(t) {
    return "<li>" + escapeHtml(t) + "</li>";
  }).join("");

  const dosList = patientGuide.dos.map(function(d) {
    return "<li>" + escapeHtml(d) + "</li>";
  }).join("");

  const dontsList = patientGuide.donts.map(function(d) {
    return "<li>" + escapeHtml(d) + "</li>";
  }).join("");

  const patientSideEffectsList = patientGuide.sideEffects.map(function(s) {
    return "<li>" + escapeHtml(s) + "</li>";
  }).join("");
 
 const academicSideEffectsList = (drug.commonSideEffects || []).map(function(s) {
    return "<li>" + escapeHtml(s) + "</li>";
  }).join("");

  const patientEmergencyList = patientGuide.emergency.map(function(e) {
    return "<li>" + escapeHtml(e) + "</li>";
  }).join("");

  const academicTreatsList = drug.treats.map(function(t) {
    return "<li>" + escapeHtml(t) + "</li>";
  }).join("");

  const everydayWarningsList = drug.warnings.map(function(w) {
    return "<li>" + escapeHtml(w) + "</li>";
  }).join("");

  const dosageFormsList = drug.forms.map(function(f) {
    return "<li>" + escapeHtml(f) + "</li>";
  }).join("");

  const counselingList = (drug.counselingPoints && drug.counselingPoints.length > 0)
    ? drug.counselingPoints.map(function(c) { return "<li>" + escapeHtml(c) + "</li>"; }).join("")
    : "<li>Follow prescription instructions closely.</li>";

  const interactionsList = (drug.interactions && drug.interactions.length > 0)
    ? drug.interactions.map(function(i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("")
    : "<li>No major drug interactions documented.</li>";

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
          <span>${formatActivityBadge(drug.spectrum.mrsa)}</span>
        </div>
        <div class="spectrum-item">
          <strong>Pseudomonas Active:</strong>
          <span>${formatActivityBadge(drug.spectrum.pseudomonas)}</span>
        </div>
      </div>
    </article>
  ` : "";

  // Schedule H vs H1 Notice Box
  const scheduleNotice = drug.schedule === "Schedule H1" ? `
    <div class="red-line-box">
      <h3>🔴 Indian Schedule H1 Prescription Medicine</h3>
      <p>This antibiotic has a <strong>prominent vertical red line</strong> on its packaging strip. Under the Drugs &amp; Cosmetics Rules (Schedule H1), it requires a registered medical practitioner's written prescription and pharmacies must maintain a separate register detailing patient, doctor, and quantity for 3 years. Over-the-counter sale is strictly prohibited.</p>
    </div>
  ` : `
    <div class="red-line-box" style="border-left-color: #2563eb; border-color: #bfdbfe; background: #eff6ff;">
      <h3 style="color: #1e40af;">🔴 Indian Schedule H Prescription Medicine</h3>
      <p style="color: #1e3a8a;">This medicine carries a <strong>vertical red line</strong> on its packaging under the Ministry of Health's Red Line Campaign. It is sold strictly upon the prescription of a registered medical practitioner.</p>
    </div>
  `;

// Food restriction helper (clean string concatenation - prevents escaping bugs)
  const hasFoodWarning = foodAdvice.avoidFoods && 
    !foodAdvice.avoidFoods.toLowerCase().startsWith("no ") && 
    !foodAdvice.avoidFoods.toLowerCase().startsWith("none") && 
    !foodAdvice.avoidFoods.toLowerCase().startsWith("can be taken") &&
    !foodAdvice.avoidFoods.toLowerCase().startsWith("ensure good");

  const avoidFoodsHtml = hasFoodWarning
    ? ("<div style=\"background:#ffffff; border-left:4px solid #ef4444; padding:10px 14px; border-radius:6px; font-size:0.9rem; color:#991b1b; margin-top:8px;\">" +
       "<strong>⚠️ Foods, Drinks &amp; Tonics to Avoid:</strong> " + escapeHtml(foodAdvice.avoidFoods) +
       "</div>")
    : ("<div style=\"background:#ffffff; border-left:4px solid #10b981; padding:10px 14px; border-radius:6px; font-size:0.9rem; color:#065f46; margin-top:8px;\">" +
       "<strong>✅ Food Friendly:</strong> No special dietary restrictions for this medicine." +
       "</div>");

  // Assemble Monograph
  detailRoot.innerHTML = `
    <!-- Top Action Bar with Print & Share -->
    <div class="monograph-nav-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:20px;">
      <a href="index.html#drugs" class="back-link" style="color:var(--primary); font-weight:700; text-decoration:none;">← Back to Antibiotic Directory</a>
      
      <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
        <button class="btn-print" onclick="window.print()" title="Print or save as PDF">
          🖨️ Print / Save as PDF
        </button>
        <button class="btn-share" onclick="shareCurrentDrug('${escapeHtml(drug.name)}', '${escapeHtml(drug.brands.join(", "))}')">
          📲 WhatsApp
        </button>
      </div>
    </div>

    <!-- Hero Header -->
    <div class="detail-hero" style="border-top-color:${drug.color}; background:${drug.color}14;">
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
        <span class="badge" style="background:${drug.color}">${escapeHtml(drug.drugClass)}</span>
        <span class="badge aware-${drug.aware.toLowerCase()}">WHO ${escapeHtml(drug.aware)}</span>
        <span class="schedule-h1-tag">${escapeHtml(drug.schedule || "Schedule H")}</span>
      </div>
      <h1>${escapeHtml(drug.name)}</h1>
      <p class="brand-names">Indian Pharmacy Brands: <strong>${escapeHtml(drug.brands.join(", "))}</strong></p>
      <p class="hero-desc">${escapeHtml(drug.shortDesc)}</p>
    </div>

    ${scheduleNotice}

    <!-- ================= PUBLIC / PATIENT VIEW (COMMON PERSON - SIMPLE & VISUAL) ================= -->
    <article class="detail-card public-view" style="background:#ffffff; border-left: 6px solid #16a34a; border-radius:var(--radius); padding:24px; box-shadow:var(--shadow);">
      
      <!-- Top Title & Badge -->
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
        <h2 style="color:#15803d; margin:0; display:flex; align-items:center; gap:8px; font-size:1.35rem;">
          💡 Easy Patient &amp; Family Guide
        </h2>
        <span style="background:#dcfce7; color:#166534; font-size:0.8rem; font-weight:700; padding:4px 12px; border-radius:var(--radius-full);">
          👤 Simple &amp; Visual Mode
        </span>
      </div>

      <!-- 1. Words to Know Before You Start -->
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:18px;">
        <h3 style="color:#334155; font-size:0.98rem; margin:0 0 8px; display:flex; align-items:center; gap:6px;">
          📖 Words to Know Before You Start:
        </h3>
        <p style="font-size:0.88rem; color:#475569; line-height:1.5; margin:0 0 6px;">
          • <strong>Antibiotic:</strong> A medicine made to kill <em>bacteria</em>. It does <strong>not</strong> work on viruses like common colds, viral coughs, or flu.
        </p>
        <p style="font-size:0.88rem; color:#475569; line-height:1.5; margin:0 0 6px;">
          • <strong>The Full Course:</strong> The exact number of days your doctor told you to take the medicine.
        </p>
        <p style="font-size:0.88rem; color:#475569; line-height:1.5; margin:0;">
          • <strong>Red Line Strip:</strong> The red vertical line on this medicine packet means it is illegal to buy or sell without a doctor's prescription.
        </p>
      </div>

      <div style="display:grid; gap:18px;">
        
        <!-- 2. Question: What is this medicine used for? -->
        <div>
          <h3 style="color:#166534; font-size:1.05rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🎯 1. What illness does this medicine treat?
          </h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:8px;">
            Your doctor prescribed this antibiotic to treat bacterial infections such as:
          </p>
          <ul class="chip-list">
            ${patientTreatsList}
          </ul>
        </div>

        <!-- 3. Question: How and when should I take it? -->
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:16px;">
          <h3 style="color:#1e40af; font-size:1.02rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🍽️ 2. How and when should I take my medicine?
          </h3>
          <p style="font-size:0.92rem; color:#1e3a8a; line-height:1.6; margin-bottom:8px;">
            <strong>Instructions:</strong> ${escapeHtml(foodAdvice.howToTake)}
          </p>
          ${avoidFoodsHtml}
        </div>

        <!-- 4. DO's and DON'Ts Checklist Card (Drug Specific) -->
        <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:18px;">
          <h3 style="color:#166534; font-size:1.05rem; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
            ⚖️ 3. Things You MUST DO and MUST NOT DO
          </h3>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:14px;">
            <div style="background:#ffffff; padding:12px 14px; border-radius:6px; border-left:4px solid #16a34a;">
              <strong style="color:#15803d; font-size:0.92rem; display:block; margin-bottom:6px;">✅ DO:</strong>
              <ul style="margin:0; padding-left:18px; font-size:0.88rem; color:#166534; line-height:1.6;">
                ${dosList}
              </ul>
            </div>
            <div style="background:#ffffff; padding:12px 14px; border-radius:6px; border-left:4px solid #dc2626;">
              <strong style="color:#b91c1c; font-size:0.92rem; display:block; margin-bottom:6px;">❌ DO NOT:</strong>
              <ul style="margin:0; padding-left:18px; font-size:0.88rem; color:#991b1b; line-height:1.6;">
                ${dontsList}
              </ul>
            </div>
          </div>
        </div>

        <!-- 5. Question: What side effects might I feel? (Drug Specific Layman Words) -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
          <h3 style="color:#334155; font-size:1.02rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🩺 4. What common side effects might I feel?
          </h3>
          <p style="font-size:0.88rem; color:#64748b; margin-bottom:10px;">
            Most people feel fine, but you may notice mild symptoms while your body clears the infection:
          </p>
          <ul class="side-effect-list">
            ${patientSideEffectsList}
          </ul>
        </div>

        <!-- 6. Question: What if I miss a dose? (Drug Specific Timing) -->
        <div style="background:#fefce8; border:1px solid #fef08a; border-radius:8px; padding:16px;">
          <h3 style="color:#854d0e; font-size:1.02rem; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            ⏰ 5. What should I do if I forget a dose?
          </h3>
          <p style="font-size:0.9rem; color:#713f12; line-height:1.6; margin:0;">
            ${escapeHtml(patientGuide.missedDose)}
          </p>
        </div>

        <!-- 7. Question: Pregnancy & Breastfeeding Safety (Drug Specific Plain Words) -->
        <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:8px; padding:16px;">
          <h3 style="color:#9d174d; font-size:1.02rem; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            🤰 6. Is this medicine safe during pregnancy or breastfeeding?
          </h3>
          <p style="font-size:0.9rem; color:#831843; line-height:1.6; margin:0;">
            ${escapeHtml(patientGuide.pregnancy)}
          </p>
        </div>

        <!-- 8. Red Flag Emergency Warnings Box (Drug Specific Red Flags) -->
        <div style="background:#fef2f2; border:2px solid #ef4444; border-radius:8px; padding:18px;">
          <h3 style="color:#991b1b; font-size:1.08rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🚨 7. When should I stop and get EMERGENCY doctor help?
          </h3>
          <p style="font-size:0.9rem; color:#7f1d1d; margin-bottom:10px; font-weight:600;">
            Stop taking this medicine and visit the nearest hospital or emergency room immediately if you notice:
          </p>
          <ul style="padding-left:20px; font-size:0.9rem; color:#991b1b; line-height:1.6; margin:0;">
            ${patientEmergencyList}
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
        ${academicTreatsList}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>💊 Available Dosage Forms</h2>
      <ul class="plain-list">
        ${dosageFormsList}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>⚕️ Clinical &amp; Dispensing Guidance</h2>
      <p><strong>🤰 Pregnancy Safety:</strong> ${escapeHtml(drug.pregnancySafety || "Consult clinical specialist")}</p>
      <p style="margin-top:8px;"><strong>🫀 Organ Adjustments:</strong> ${escapeHtml(drug.organAdjustment || "Standard dosing")}</p>

      <div class="warn-box" style="margin-top:18px; background:#fffbeb; border-left-color:#f59e0b;">
        <h3 style="color:#d97706; margin-bottom:8px;">🔄 Major Drug Interactions</h3>
        <ul style="padding-left:20px;">
          ${interactionsList}
        </ul>
      </div>

      <h3 style="margin-top:20px; color:var(--primary-dark);">🗣️ Pharmacist Counseling Points</h3>
      <ul class="side-effect-list">
        ${counselingList}
      </ul>
    </article>

    <article class="detail-card academic-view">
      <h2>🩺 Common Side Effects (Adverse Drug Reactions)</h2>
      <p class="side-note" style="color:var(--text-muted); font-size:0.9rem;">Clinical adverse events documented in pharmacovigilance and surveillance data:</p>
      <ul class="side-effect-list">
        ${academicSideEffectsList}
      </ul>
    </article>

    <div class="warn-box academic-view">
      <h2 style="color:#b45309; margin-bottom:10px;">⚠️ Critical Warnings &amp; Black Box Precautions</h2>
      <ul style="padding-left:20px;">
        ${everydayWarningsList}
      </ul>
    </div>

    <div class="tip-box">
      <h3 style="color:#1d4ed8; margin-bottom:8px;">💡 Indian Pharmacy Market Insight</h3>
      <p>${escapeHtml(drug.tip || "Always adhere to antibiotic stewardship guidelines and dispense strictly upon a valid prescription.")}</p>
    </div>

    <p class="detail-disclaimer">
      ⚕️ AB|Info is an educational resource for pharmacy practice and healthcare students. Dosage depends on patient age, renal function, weight, and microbiological sensitivity.
    </p>
  `;
}

// Robust page initialization & event listener binding
function initDrugPage() {
  renderDrugMonograph();
  const savedPath = localStorage.getItem("abinfo_learning_path") || "public";
  applyDrugLearningPath(savedPath);

  document.querySelectorAll(".path-btn").forEach(btn => {
    btn.onclick = () => {
      const selectedPath = btn.getAttribute("data-path");
      applyDrugLearningPath(selectedPath);
    };
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDrugPage);
} else {
  initDrugPage();
}