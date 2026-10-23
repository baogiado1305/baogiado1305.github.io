/*
 * Site content. Edit this file to add papers or news; both pages update automatically.
 *
 * Publications
 *   type      "journal" or "conference" (decides the tab)
 *   authors   APA-style names in order. Your own name is detected by SELF_PATTERN and shown in bold.
 *   short     Short venue label used on thumbnails, e.g. "PACLIC 2026"
 *   badges    [kind, label] pairs. kind sets the color and must be one of:
 *             "wos", "sjr", "abdc", "core", "scopus", "note"
 *             ("note" is neutral grey, for things like TREO, Workshop, To appear, Under review)
 *   links     { paper, code, slides, project } — leave out any you don't have
 *   cite      the full citation copied from Google Scholar (shown as-is); leave it out to hide the Cite button
 *   thumb     optional image path, e.g. "assets/img/thumbs/viqa.png" (16:10 works best)
 *   selected  reserved for a "selected publications" list (not shown at the moment)
 *
 * Anything marked TODO still needs your input before you publish.
 */

const SELF_PATTERN = /^\s*(Do,\s*B(\.(\s*G\.)?|ao\b)|B\.(\s*G\.)?\s*Do|(Gia\s+)?Bao(\s+Gia)?\s+Do|Đỗ\s+Gia\s+Bảo)(?![A-Za-zÀ-ỹ])/;

/* Top menu and footer, shared by every page. "page" must match <body data-page="..."> */
const SITE = {
  name: "Bao (Billy) Do",
  owner: "Bao (Billy) Do",
  lastUpdated: "October 2026",
  nav: [
    { page: "home", label: "Home", href: "index.html" },
    { page: "projects", label: "Projects", href: "projects.html" },
    { page: "publications", label: "Publications", href: "publications.html" },
    { page: "news", label: "News", href: "news.html" },
    { page: "cv", label: "CV", href: "cv.html" }
  ],
  /* Footer buttons. icon = Bootstrap Icons name (icons.getbootstrap.com); style = email | scholar | github | linkedin | orcid */
  profiles: [
    { label: "Email", href: "mailto:baogiado1305@gmail.com", icon: "envelope", style: "email" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=0iP_eFUAAAAJ", icon: "google", style: "scholar" },
    { label: "GitHub", href: "https://github.com/baogiado1305", icon: "github", style: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bao-do-gia/", icon: "linkedin", style: "linkedin" },
    { label: "ORCID", href: "https://orcid.org/0009-0009-9010-6629", icon: "person-badge", style: "orcid" },
    { label: "ResearchGate", href: "https://www.researchgate.net/profile/Bao-Do-19?ev=hdr_xprf", icon: "share", style: "researchgate" },
  ]
};

const PUBLICATIONS = [
  {
    id: "viqa-lorabench-2026",
    type: "conference",
    year: 2026,
    title: "ViQA-LoRABench: A Controlled Benchmark of Low-Rank Adapters for Vietnamese Question Answering",
    authors: ["Nhat-Huy Dang", "Khanh-Long Ho-Vuong", "Bao Do", "Luan Thanh Nguyen", "Huy Quoc To"],
    venue: "The 40th Pacific Asia Conference on Language, Information and Computation (PACLIC 40)",
    short: "PACLIC 2026",
    badges: [["core", "CORE C"], ["note", "Forthcoming"]],
    links: {},
    // cite: "In Proceedings of the 40th Pacific Asia Conference on Language, Information and Computation (PACLIC 40).",
    selected: true
  },
  {
    id: "vicorpreviews-2026",
    type: "conference",
    year: 2026,
    title: "ViCorpReviews: A Benchmark Dataset for Multi-Dimensional Sentiment and Hate Speech Detection in Vietnamese Workplace Context",
    authors: ["Ho-Vuong, K. L.", "Dang, N. H.", "Do, B.", "To, H. Q."],
    venue: "The 9th International Conference on Multimedia Analysis and Pattern Recognition (MAPR 2026)",
    short: "MAPR 2026",
    badges: [["scopus", "Scopus"]],
    links: { paper: "https://ieeexplore.ieee.org/document/11685810" },
    cite: "Ho-Vuong, K. L., Dang, N. H., Do, B., & To, H. Q. (2026, August). ViCorpReviews: A Benchmark Dataset for Multi-Dimensional Sentiment and Hate Speech Detection in Vietnamese Workplace Context. In 2026 International Conference on Multimedia Analysis and Pattern Recognition (MAPR) (pp. 192-197). IEEE.",
    selected: false
  },
  {
    id: "social-commerce-2026",
    type: "journal",
    year: 2026,
    title: "Understanding social commerce adoption in Vietnam: A synergy of social, technological, and behavioral drivers",
    authors: ["Le, B. H.", "Nguyen, H. H.", "Giang, T. T.", "Duong, C. H.", "Do, B.", "Nguyen, P. N.-D."],
    venue: "Acta Psychologica, 266, 106925",
    short: "Acta Psychologica",
    /* IF and CiteScore left out on purpose: pick one source and year (e.g. latest JCR) before adding them. */
    badges: [["wos", "WoS SSCI"], ["sjr", "SJR Q1"], ["if", "IF: 3.8"], ["citescore", "CiteScore: 3.4"], ["abdc", "ABDC A"]],
    links: { paper: "https://doi.org/10.1016/j.actpsy.2026.106925" },
    cite: "Le, B. H., Nguyen, H. H., Giang, T. T., Duong, C. H., Do, B., & Nguyen, P. N. D. (2026). Understanding social commerce adoption in Vietnam: A synergy of social, technological, and behavioral drivers. Acta Psychologica, 266, 106925.",
    selected: true
  },
  {
    id: "trifusion-2025",
    type: "conference",
    year: 2025,
    title: "TriFusion: GNN-Based Multimodal Fusion for 3D Object Detection in Autonomous Driving",
    authors: ["Vo, T. A.", "Nguyen, L. A.", "Do, B.", "Ma, C. T.", "Doan, S.-T.", "Ngo, S.-H."],
    venue: "The 14th International Symposium on Information and Communication Technology (SoICT 2025)",
    short: "SoICT 2025",
    badges: [["scopus", "Scopus"]],
    links: { paper: "https://doi.org/10.1007/978-981-92-2584-2_2" },
    cite: "Vo, T. A., Nguyen, L. A., Do, B., Ma, C. T., Doan, S. T., & Ngo, S. H. (2025, December). TriFusion: GNN-Based Multimodal Fusion for 3D Object Detection in Autonomous Driving. In International Symposium on Information and Communication Technology (pp. 11-23). Singapore: Springer Nature Singapore.",
    selected: true
  },
  {
    id: "icis-treo-2024",
    type: "conference",
    year: 2024,
    title: "Leveraging Machine Learning to Combat AI-Driven Sophisticated Social Engineering Threats Online",
    authors: ["Do, B.", "Nguyen, H. H.", "Tran, T.", "Sarkar, S."],
    venue: "International Conference on Information Systems (ICIS 2024), TREO track",
    short: "ICIS 2024",
    badges: [["core", "CORE A*"], ["note", "TREO"]],
    links: { paper: "https://aisel.aisnet.org/treos_icis2024/107/" },
    cite: "Do, Bao; Nguyen, Huan Hong; Tran, Thi; and Sarkar, Sumantra, \"Leveraging Machine Learning to Combat AI-Driven Sophisticated Social Engineering Threats Online\" (2024). ICIS 2024 TREOS. 107. https://aisel.aisnet.org/treos_icis2024/107",
    selected: true
  },
  {
    id: "pacis-2024",
    type: "conference",
    year: 2024,
    title: "The Impacts of Layoffs Announcement on Cybersecurity Breaches",
    authors: ["Tran, T.", "Do, B. G.", "Ngo, A.", "Krishtipati, S.", "Dang, N. A.", "Sarkar, S."],
    venue: "Pacific-Asia Conference on Information Systems (PACIS 2024)",
    short: "PACIS 2024",
    badges: [["core", "CORE A"], ["scopus", "Scopus"]],
    links: { paper: "https://aisel.aisnet.org/pacis2024/track07_secprivacy/track07_secprivacy/10/" },
    cite: "Tran, Thi; Do, Bao Gia; Ngo, Anh; Krishtipati, Sathwik; Dang, Nhat Anh; and Sarkar, Sumantra, \"The Impacts of Layoffs Announcement on Cybersecurity Breaches\" (2024). PACIS 2024 Proceedings. 10. https://aisel.aisnet.org/pacis2024/track07_secprivacy/track07_secprivacy/10",
    selected: false
  },
  {
    id: "bigs-2023",
    type: "conference",
    year: 2023,
    title: "My Data Matters: Examining Public Sentiments and Reactions Facing Data Breach Incidents",
    authors: ["Bao Do", "Tuan-Anh Ngo", "Sathwik Krishtipati", "Thi N Tran", "Sumantra Sarkar"],
    venue: "Bright Internet Global Symposium (BIGS 2023), Pre-ICIS",
    short: "BIGS 2023",
    badges: [["note", "Pre-ICIS symposium"]],
    links: { paper: "https://brightinternet.org/bigs2023/program/" },
    cite: "In <i>Bright Internet Global Symposium (BIGS 2023), Pre-ICIS</i>.",
    selected: false
  },
  {
    id: "nics-2022",
    type: "conference",
    year: 2022,
    title: "A Multi-scale Approach for Vietnamese Image Captioning in Healthcare Domain",
    authors: ["Do, B. G.", "Bui, D. C.", "Vo, N. D.", "Nguyen, K."],
    venue: "The 9th NAFOSTED Conference on Information and Computer Science (NICS 2022)",
    short: "NICS 2022",
    badges: [["scopus", "Scopus"]],
    links: { paper: "https://ieeexplore.ieee.org/document/10013398" },
    cite: "Do, B. G., Bui, D. C., Vo, N. D., & Nguyen, K. (2022, October). A multi-scale approach for vietnamese image captioning in healthcare domain. In 2022 9th NAFOSTED Conference on Information and Computer Science (NICS) (pp. 142-147). IEEE.",
    selected: false
  }
];

/* Newest first. "html" may contain links and <i>/<b>. */
const NEWS = [
  { date: "Oct 2026", html: "ViQA-LoRABench accepted at <b>PACLIC 2026</b>." },
  { date: "Jul 2026", html: "ViCorpReviews accepted at <b>MAPR 2026</b>." },
  { date: "Apr 2026", html: "My first journal article accepted at <i>Acta Psychologica</i> (SSCI, Q1)." },
  { date: "Oct 2025", html: "TriFusion accepted at <b>SoICT 2025</b>." },
  { date: "Sep 2024", html: "First-author TREO paper accepted at <b>ICIS 2024</b>." },
  { date: "May 2024", html: "Paper on layoffs and cybersecurity breaches accepted at <b>PACIS 2024</b>." },
  { date: "Nov 2023", html: "Paper on public reactions to data breaches presented at <b>BIGS 2023</b> (Pre-ICIS)." },
  { date: "Oct 2022", html: "Paper on Vietnamese medical image captioning accepted at <b>NICS 2022</b>." }
];
