// ===== TRILINGUAL INTERNATIONALIZATION (i18n) ENGINE =====
// Supported Languages: English (en), Hindi (hi), Kannada (kn)

const translations = {
  en: {
    disclaimerText: "⚕️ Medical Disclaimer: AB|Info is strictly an educational project. Not medical advice. Always consult a registered medical practitioner.",
    navHome: "Home",
    navClasses: "Classes",
    navDatabase: "A–Z Catalog",
    navResistance: "Resistance",
    navFlowchart: "Flowchart",
    navQuiz: "Safety Quiz",
    navGlossary: "Glossary",
    navReferences: "References",
    navAbout: "About & Docs",
    pathTitle: "Choose Your Learning Path:",
    pathPublicBtn: "👤 Common Person (Simple & Visual)",
    pathAcademicBtn: "🔬 Student / Researcher (Clinical & Deep)",
    heroTitle: "Understand Your Antibiotics",
    heroSubtitle: "Evidence-based clinical guidance on antibiotic classes, mechanisms, Indian brand names, and antimicrobial resistance surveillance.",
    searchPlaceholder: "🔍 Search drug name, brand (e.g. Novamox, Ciplox), or condition...",
    heroNote: "⚕️ Educational resource for pharmacy & healthcare education — not clinical medical advice.",
    browseClassesTitle: "Browse by Antibiotic Class",
    browseClassesSubtitle: "Explore all 21 antibiotic families including Penicillins, Cephalosporins, Carbapenems, and Polymyxins with mechanisms, spectra, and Indian market brands.",
    browseClassesBtn: "Open Classes of Antibiotics (21) →",
    commonAntibioticsTitle: "Common Antibiotics",
    allCategories: "All Categories",
    whoAccess: "🟢 WHO Access",
    whoWatch: "🟡 WHO Watch",
    whoReserve: "🔴 WHO Reserve",
    noMatches: "😕 No antibiotics matched your search criteria.",
    safetyTitle: "Safety & Antibiotic Stewardship ⚠️",
    safetyCourseTitle: "✅ Finish the full course",
    safetyCourseDesc: "Stop taking antibiotics only when your physician instructs — stopping early selects for resistant mutant bacteria.",
    safetySelfTitle: "🚫 Never self-medicate",
    safetySelfDesc: "Never take leftover antibiotics or share with others. Antibiotics have zero activity against viral colds, flu, or viral sore throats.",
    safetySuperbugsTitle: "🦠 Fight superbugs",
    safetySuperbugsDesc: "Misuse and over-the-counter dispensing without culture sensitivity are primary drivers of multi-drug resistance in India.",
    redLineTitle: "🔴 The 'Medicines with a Red Line' Campaign",
    redLineDesc: "In India, antibiotics and potent prescription medicines feature a prominent vertical red line on their packaging strip. This indicates that the medicine falls under Schedule H or Schedule H1 of the Drugs and Cosmetics Rules and must NEVER be consumed without a registered doctor's prescription.",
    resistanceTitle: "🦠 Resistance Reality: Bengaluru & India",
    resistanceIntro: "Antibiotic resistance is an urgent public health reality in Karnataka. Surveillance data from tertiary hospital networks and city wastewater analysis demonstrate rising resistance across first- and second-line molecules.",
    quizTitle: "🧠 Test Your Antibiotic Safety IQ (10-MCQ Quiz)",
    quizSubtitle: "Test your understanding of antibiotic safety, WHO guidelines, and Indian red-line regulations.",
    footerRights: "AB|Info © 2026 — Evidence-Based Antibiotic Information & Antimicrobial Resistance Portal.",
    footerRefLink: "Academic References",
    footerDocsLink: "Project Documentation",
    whatsappShareBtn: "📲 Share on WhatsApp"
  },
  hi: {
    disclaimerText: "⚕️ चिकित्सा अस्वीकरण: AB|Info केवल शैक्षिक उद्देश्यों के लिए है। यह चिकित्सीय सलाह नहीं है। हमेशा पंजीकृत चिकित्सक से परामर्श लें।",
    navHome: "मुख्य पृष्ठ",
    navClasses: "दवा वर्ग",
    navDatabase: "एंटीबायोटिक सूची",
    navResistance: "प्रतिरोध (AMR)",
    navFlowchart: "निर्णय चार्ट",
    navQuiz: "क्विज",
    navGlossary: "शब्दावली",
    navReferences: "संदर्भ",
    navAbout: "हमारे बारे में",
    pathTitle: "अपनी अध्ययन श्रेणी चुनें:",
    pathPublicBtn: "👤 सामान्य नागरिक (सरल एवं व्यावहारिक)",
    pathAcademicBtn: "🔬 छात्र / शोधकर्ता (गहन एवं वैज्ञानिक)",
    heroTitle: "अपनी एंटीबायोटिक दवाओं को समझें",
    heroSubtitle: "एंटीबायोटिक वर्गों, उनकी कार्यप्रणाली, भारतीय ब्रांडों और दवा प्रतिरोध (AMR) पर प्रामाणिक जानकारी।",
    searchPlaceholder: "🔍 दवा का नाम, ब्रांड (उदा. Novamox, Ciplox) या बीमारी खोजें...",
    heroNote: "⚕️ फार्मेसी एवं स्वास्थ्य शिक्षा हेतु शैक्षिक संसाधन — चिकित्सीय परामर्श नहीं।",
    browseClassesTitle: "एंटीबायोटिक वर्गों के आधार पर देखें",
    browseClassesSubtitle: "पेनिसिलिन, सेफलोस्पोरिन, कार्बापेनेम सहित सभी 21 वर्गों की कार्यप्रणाली और भारतीय ब्रांड जानें।",
    browseClassesBtn: "सभी 21 एंटीबायोटिक वर्ग देखें →",
    commonAntibioticsTitle: "प्रमुख एंटीबायोटिक्स",
    allCategories: "सभी श्रेणियां",
    whoAccess: "🟢 WHO एक्सेस (Access)",
    whoWatch: "🟡 WHO वॉच (Watch)",
    whoReserve: "🔴 WHO रिज़र्व (Reserve)",
    noMatches: "😕 आपकी खोज से कोई एंटीबायोटिक नहीं मिला।",
    safetyTitle: "सुरक्षा एवं एंटीबायोटिक का सही उपयोग ⚠️",
    safetyCourseTitle: "✅ पूरा कोर्स अवश्य समाप्त करें",
    safetyCourseDesc: "डॉक्टर के निर्देशानुसार पूरी दवा लें — बीच में दवा बंद करने से प्रतिरोधी बैक्टीरिया पनपते हैं।",
    safetySelfTitle: "🚫 बिना डॉक्टरी सलाह के दवा न लें",
    safetySelfDesc: "बची हुई दवा कभी न खाएं। एंटीबायोटिक्स सर्दी-जुकाम या वायरल बुखार पर बिल्कुल काम नहीं करतीं।",
    safetySuperbugsTitle: "🦠 सुपरबग्स से बचें",
    safetySuperbugsDesc: "बिना जांच और पर्चे के एंटीबायोटिक लेना भारत में दवा प्रतिरोध (Drug Resistance) का मुख्य कारण है।",
    redLineTitle: "🔴 'लाल लकीर वाली दवाएं' अभियान",
    redLineDesc: "भारत में एंटीबायोटिक दवाओं के पैकेट पर एक लाल खड़ी लकीर (Red Line) होती है। यह दर्शाती है कि यह दवा शेड्यूल H/H1 के अंतर्गत आती है और इसे बिना डॉक्टर के पर्चे के नहीं खरीदा जा सकता।",
    resistanceTitle: "🦠 एंटीबायोटिक प्रतिरोध की वास्तविकता: भारत और बेंगलुरु",
    resistanceIntro: "कर्नाटक और पूरे भारत में एंटीबायोटिक प्रतिरोध एक गंभीर समस्या बन चुका है। अस्पतालों और अपशिष्ट जल निगरानी के आंकड़े इसकी पुष्टि करते हैं।",
    quizTitle: "🧠 एंटीबायोटिक सुरक्षा क्विज (10 प्रश्न)",
    quizSubtitle: "एंटीबायोटिक के सुरक्षित उपयोग, WHO नियमों और भारतीय लाल लकीर नीति पर अपनी समझ परखें।",
    footerRights: "AB|Info © 2026 — प्रमाण-आधारित एंटीबायोटिक जानकारी एवं जागरूकता पोर्टल।",
    footerRefLink: "शैक्षणिक संदर्भ",
    footerDocsLink: "परियोजना दस्तावेज",
    whatsappShareBtn: "📲 व्हाट्सएप पर शेयर करें"
  },
  kn: {
    disclaimerText: "⚕️ ವೈದ್ಯಕೀಯ ಹಕ್ಕುತ್ಯಾಗ: AB|Info ಕೇವಲ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ ಯೋಜನೆಯಾಗಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ. ಯಾವಾಗಲೂ ನೋಂದಾಯಿತ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    navHome: "ಮುಖಪುಟ",
    navClasses: "ಔಷಧಿ ವರ್ಗಗಳು",
    navDatabase: "ಔಷಧಿ ಪಟ್ಟಿ",
    navResistance: "ಪ್ರತಿರೋಧ (AMR)",
    navFlowchart: "ಫ್ಲೋಚಾರ್ಟ್",
    navQuiz: "ರಸಪ್ರಶ್ನೆ",
    navGlossary: "ಪದಕೋಶ",
    navReferences: "ಉಲ್ಲೇಖಗಳು",
    navAbout: "ಮಾಹಿತಿ & ದಾಖಲೆಗಳು",
    pathTitle: "ನಿಮ್ಮ ಕಲಿಕೆಯ ಹಂತವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    pathPublicBtn: "👤 ಸಾರ್ವಜನಿಕರು (ಸರಳ & ದೃಶ್ಯ ವಿವರಣೆ)",
    pathAcademicBtn: "🔬 ವಿದ್ಯಾರ್ಥಿಗಳು / ಸಂಶೋಧಕರು (ವೈಜ್ಞಾನಿಕ ವಿವರ)",
    heroTitle: "ನಿಮ್ಮ ಆಂಟಿಬಯೋಟಿಕ್ ಔಷಧಿಗಳನ್ನು ಸರಿಯಾಗಿ ತಿಳಿಯಿರಿ",
    heroSubtitle: "ಆಂಟಿಬಯೋಟಿಕ್ ವರ್ಗಗಳು, ಅವುಗಳ ಕಾರ್ಯವಿಧಾನ, ಭಾರತೀಯ ಬ್ರ್ಯಾಂಡ್‌ಗಳು ಮತ್ತು ಔಷಧ ಪ್ರತಿರೋಧದ ಬಗೆಗಿನ ನಿಖರ ಮಾರ್ಗದರ್ಶಿ.",
    searchPlaceholder: "🔍 ಔಷಧದ ಹೆಸರು, ಬ್ರ್ಯಾಂಡ್ (ಉದಾ. Novamox, Ciplox) ಅಥವಾ ಕಾಯಿಲೆ ಹುಡುಕಿ...",
    heroNote: "⚕️ ಫಾರ್ಮಸಿ ಮತ್ತು ಆರೋಗ್ಯ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಶೈಕ್ಷಣಿಕ ಸಂಪನ್ಮೂಲ — ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ.",
    browseClassesTitle: "ವರ್ಗಗಳ ಪ್ರಕಾರ ವೀಕ್ಷಿಸಿ",
    browseClassesSubtitle: "ಪೆನಿಸಿಲಿನ್, ಸೆಫಲೋಸ್ಪೊರಿನ್, ಕಾರ್ಬಾಪೆನೆಮ್ ಸೇರಿದಂತೆ ಎಲ್ಲಾ 21 ವರ್ಗಗಳ ವಿವರಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    browseClassesBtn: "ಎಲ್ಲಾ 21 ವರ್ಗಗಳನ್ನು ನೋಡಿ →",
    commonAntibioticsTitle: "ಪ್ರಮುಖ ಆಂಟಿಬಯೋಟಿಕ್ಸ್",
    allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    whoAccess: "🟢 WHO ಆಕ್ಸೆಸ್ (Access)",
    whoWatch: "🟡 WHO ವಾಚ್ (Watch)",
    whoReserve: "🔴 WHO ರಿಸರ್ವ್ (Reserve)",
    noMatches: "😕 ನೀವು ಹುಡುಕಿದ ಆಂಟಿಬಯೋಟಿಕ್ ಲಭ್ಯವಿಲ್ಲ.",
    safetyTitle: "ಸುರಕ್ಷತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಬಳಕೆ ⚠️",
    safetyCourseTitle: "✅ ಸಂಪೂರ್ಣ ಕೋರ್ಸ್ ಮುಗಿಸಿ",
    safetyCourseDesc: "ವೈದ್ಯರು ಸೂಚಿಸಿದ ದಿನಗಳವರೆಗೆ ಮಾತ್ರ ಔಷಧ ಸೇವಿಸಿ — ಅರ್ಧಕ್ಕೆ ನಿಲ್ಲಿಸುವುದರಿಂದ ಬ್ಯಾಕ್ಟೀರಿಯಾಗಳು ಬಲಗೊಳ್ಳುತ್ತವೆ.",
    safetySelfTitle: "🚫 ಸ್ವಯಂ ಔಷಧ ಸೇವನೆ ಮಾಡಬೇಡಿ",
    safetySelfDesc: "ಹಿಂದೆ ಉಳಿದ ಮಾತ್ರೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ. ಸಾಮಾನ್ಯ ಶೀತ ಮತ್ತು ವೈರಲ್ ಜ್ವರಕ್ಕೆ ಆಂಟಿಬಯೋಟಿಕ್ ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ.",
    safetySuperbugsTitle: "🦠 ಸೂಪರ್‌ಬಗ್‌ಗಳ ವಿರುದ್ಧ ಜಾಗೃತಿ",
    safetySuperbugsDesc: "ಪರೀಕ್ಷೆ ಇಲ್ಲದೆ ಮತ್ತು ಚೀಟಿ ಇಲ್ಲದೆ ಆಂಟಿಬಯೋಟಿಕ್ ಸೇವಿಸುವುದು ಭಾರತದಲ್ಲಿ ಔಷಧ ಪ್ರತಿರೋಧಕ್ಕೆ ಮುಖ್ಯ ಕಾರಣವಾಗಿದೆ.",
    redLineTitle: "🔴 'ಕೆಂಪು ಗೆರೆಯ ಔಷಧಿಗಳು' ಅಭಿಯಾನ",
    redLineDesc: "ಭಾರತದಲ್ಲಿ ಆಂಟಿಬಯೋಟಿಕ್ ಪ್ಯಾಕೆಟ್‌ಗಳ ಮೇಲೆ ಲಂಬವಾದ ಕೆಂಪು ಗೆರೆ (Red Line) ಇರುತ್ತದೆ. ಇದು ಷೆಡ್ಯೂಲ್ H ಅಥವಾ H1 ಅಡಿಯಲ್ಲಿ ಬರುವ ಔಷಧಿಯಾಗಿದ್ದು, ವೈದ್ಯರ ಚೀಟಿ ಇಲ್ಲದೆ ಖರೀದಿಸುವುದು ನಿಷಿದ್ಧ.",
    resistanceTitle: "🦠 ಔಷಧ ಪ್ರತಿರೋಧದ ವಾಸ್ತವ: ಬೆಂಗಳೂರು ಮತ್ತು ಭಾರತ",
    resistanceIntro: "ಕರ್ನಾಟಕದಲ್ಲಿ ಆಂಟಿಬಯೋಟಿಕ್ ಪ್ರತಿರೋಧ ಗಂಭೀರ ಸಮಸ್ಯೆಯಾಗಿದೆ. ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಬೆಂಗಳೂರಿನ ತ್ಯಾಜ್ಯನೀರಿನ ಮಾದರಿಗಳು ಇದನ್ನು ಸ್ಪಷ್ಟಪಡಿಸುತ್ತವೆ.",
    quizTitle: "🧠 ಆಂಟಿಬಯೋಟಿಕ್ ಸುರಕ್ಷತಾ ರಸಪ್ರಶ್ನೆ (10 ಪ್ರಶ್ನೆಗಳು)",
    quizSubtitle: "ಸುರಕ್ಷಿತ ಬಳಕೆ ಮತ್ತು ಕೆಂಪು ಗೆರೆ ನಿಯಮಗಳ ಕುರಿತು ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಿ.",
    footerRights: "AB|Info © 2026 — ವೈಜ್ಞಾನಿಕ ಆಂಟಿಬಯೋಟಿಕ್ ಮಾಹಿತಿ ಮತ್ತು ಜಾಗೃತಿ ಪೋರ್ಟಲ್.",
    footerRefLink: "ಶೈಕ್ಷಣಿಕ ಉಲ್ಲೇಖಗಳು",
    footerDocsLink: "ಯೋಜನೆಯ ದಾಖಲೆಗಳು",
    whatsappShareBtn: "📲 ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ"
  }
};

// Current active language
let currentLang = localStorage.getItem("abinfo_language") || "en";

function setLanguage(lang) {
  if (!translations[lang]) lang = "en";
  currentLang = lang;
  localStorage.setItem("abinfo_language", lang);

  // Update active status on buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    const isTarget = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-pressed", isTarget);
  });

  // Translate all matching elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      elem.textContent = translations[lang][key];
    }
  });

  // Translate placeholder attributes if present
  const searchInput = document.getElementById("searchInput");
  if (searchInput && translations[lang].searchPlaceholder) {
    searchInput.setAttribute("placeholder", translations[lang].searchPlaceholder);
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      setLanguage(selectedLang);
    });
  });
});