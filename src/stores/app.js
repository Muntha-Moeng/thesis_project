import { ref, computed, watch } from "vue";

// ── Theme ──
const savedTheme = localStorage.getItem("pb_theme");
export const isDark = ref(savedTheme ? savedTheme === "dark" : false);

watch(isDark, (val) => {
  localStorage.setItem("pb_theme", val ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", val ? "dark" : "light");
});

export function toggleTheme() {
  isDark.value = !isDark.value;
}

// ── Language ──
const savedLang = localStorage.getItem("pb_lang");
export const lang = ref(savedLang || "en");
watch(lang, (val) => localStorage.setItem("pb_lang", val));

export function toggleLang() {
  lang.value = lang.value === "en" ? "kh" : "en";
}

export function t(key) {
  const map = translations[lang.value] || translations.en;
  return map[key] || key;
}

// ── Auth ──
const savedUser = localStorage.getItem("pb_user");
export const currentUser = ref(savedUser ? JSON.parse(savedUser) : null);
export const isLoggedIn = computed(() => !!currentUser.value);

export function login(userData) {
  currentUser.value = userData;
  localStorage.setItem("pb_user", JSON.stringify(userData));
}

export function logout() {
  currentUser.value = null;
  localStorage.removeItem("pb_user");
}

// ── Projects (mock) ──
const defaultProjects = [
  { id: 1, title: "My Dev Portfolio", template: "Software Developer", role: "Full-Stack Developer", status: "published", lastEdited: "2026-04-28", views: 142, img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop&q=80" },
  { id: 2, title: "UX Showcase", template: "UX/UI", role: "Web Design", status: "draft", lastEdited: "2026-04-25", views: 0, img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&auto=format&fit=crop&q=80" },
];

const savedProjects = localStorage.getItem("pb_projects");
export const projects = ref(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
watch(projects, (val) => localStorage.setItem("pb_projects", JSON.stringify(val)), { deep: true });

export function addProject(project) {
  projects.value.unshift({ id: Date.now(), lastEdited: new Date().toISOString().split("T")[0], views: 0, status: "draft", ...project });
}

export function deleteProject(id) {
  projects.value = projects.value.filter((p) => p.id !== id);
}

// ── Notifications ──
export const notifications = ref([
  { id: 1, type: "info", message: "Welcome to Portfolio Builder! Start creating your first portfolio.", time: "Just now", read: false },
  { id: 2, type: "success", message: "Your portfolio 'My Dev Portfolio' was published successfully.", time: "2 days ago", read: false },
]);
export const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);
export function markAllRead() { notifications.value.forEach((n) => (n.read = true)); }

// ── Translations ──
export const translations = {
  en: {
    home: "Home", templates: "Templates", howItWorks: "How it Works", pricing: "Pricing",
    login: "Login", getStarted: "Get Started", dashboard: "Dashboard",
    heroBadge: "BUILT FOR CREATIVES", heroHeading1: "Build your Portfolio", heroHeading2: "website.",
    heroHeadingAccent: "No coding", heroHeading3: "and Easy to use.",
    heroSub: "The high-end builder for designers, architects, and visual storytellers. Showcase your work in a digital frame that feels as premium as your art.",
    startBuilding: "Start Building Now →", viewShowcases: "View Showcases",
    startWithTemplate: "Start with a Stunning Template",
    templatesSub: "Curated by world-class art directors to ensure your work always looks intentional and professional.",
    exploreAll: "Explore all templates →", useTemplate: "Use Template",
    featuresTitle: "Precision-built for creating professional portfolios",
    featuresSub: "We've handled the technical heavy lifting so you can focus on what matters: your vision.",
    opt: "Optimization Built-in", optDesc: "Automatic image compression and lazy loading ensure your portfolio scores top marks on every speed test.",
    success: "Success Rate", successDesc: "Our users report a significant increase in client inquiries within 30 days of launching their new portfolio.",
    intuitive: "Intuitive Creation", intuitiveDesc: "No drag-and-drop complexity. Our smart editor guides you through a seamless, artistic creation process.",
    howItWorks2: "How it works?", step1Title: "Choose a Template", step1Desc: "Select a designer-crafted template that matches your personal aesthetic and professional goals.",
    step2Title: "Input Information", step2Desc: "Feel free to copy and fill out any of the following templates.", step3Title: "Export", step3Desc: "Export your Portfolio such as source code, PDF, and PNG.",
    pricingTitle: "Simple, Transparent Pricing", pricingSub: "Start free, upgrade when you're ready. No hidden fees.",
    mostPopular: "Most Popular", monthly: "Monthly", annually: "Annually", save: "Save 20%",
    freeName: "Free", freeDesc: "Perfect to get started.", freeF1: "3 Templates", freeF2: "Portfolio Export (PNG)", freeF3: "Community Support",
    proName: "Pro", proDesc: "For serious creatives.", proF1: "All Templates", proF2: "Custom Domain", proF3: "PDF & Source Export", proF4: "Priority Support", proF5: "Analytics Dashboard",
    studioName: "Studio", studioDesc: "For teams & agencies.", studioF1: "Everything in Pro", studioF2: "5 Team Members", studioF3: "White Label", studioF4: "API Access", studioF5: "Dedicated Support",
    getStartedBtn: "Get Started", contactSales: "Contact Sales",
    ctaTitle: "Ready to showcase your work?", ctaSub: "Join thousands of creatives who already launched with Portfolio Builder.", ctaBtn: "Start for Free →",
  },
  kh: {
    home: "ទំព័រដើម", templates: "គំរូ", howItWorks: "របៀបប្រើ", pricing: "តម្លៃ",
    login: "ចូល", getStarted: "ចាប់ផ្ដើម", dashboard: "ផ្ទាំងគ្រប់គ្រង",
    heroBadge: "សម្រាប់អ្នកច្នៃប្រឌិត", heroHeading1: "បង្កើត Portfolio", heroHeading2: "របស់អ្នក។",
    heroHeadingAccent: "គ្មានការសរសេរកូដ", heroHeading3: "ងាយស្រួលប្រើ។",
    heroSub: "ឧបករណ៍ប្រើប្រាស់ខ្ពស់សម្រាប់អ្នករចនា, ស្ថាបត្យករ, និងអ្នករៀបរាប់រឿងតាមរូបភាព។",
    startBuilding: "ចាប់ផ្ដើមបង្កើត →", viewShowcases: "មើលគំរូ",
    startWithTemplate: "ចាប់ផ្ដើមដោយគំរូដ៏ស្រស់ស្អាត",
    templatesSub: "ត្រូវបានរចនាដោយអ្នករចនាកម្រិតពិភពលោក ដើម្បីធានាថាស្នាដៃរបស់អ្នកតែងតែមើលទៅមានវិជ្ជាជីវៈ។",
    exploreAll: "មើលគំរូទាំងអស់ →", useTemplate: "ប្រើគំរូ",
    featuresTitle: "បង្កើតឡើងដោយភាពបញ្ចប់សម្រាប់ Portfolio វិជ្ជាជីវៈ",
    featuresSub: "យើងបានដោះស្រាយបន្ទុកបច្ចេកទេសសម្រាប់អ្នក ដើម្បីឱ្យអ្នកផ្តោតលើចក្ខុវិស័យ។",
    opt: "បង្កើនប្រសិទ្ធភាពដោយស្វ័យប្រវត្តិ", optDesc: "ការបង្ហាប់រូបភាពដោយស្វ័យប្រវត្តិ ធានាថា Portfolio របស់អ្នកមានពិន្ទុល្អ។",
    success: "អត្រាជោគជ័យ", successDesc: "អ្នកប្រើប្រាស់យើងរាយការណ៍ការកើនឡើងក្នុង 30 ថ្ងៃ។",
    intuitive: "ការបង្កើតងាយស្រួល", intuitiveDesc: "គ្មានភាពស្មុគស្មាញ drag-and-drop ។",
    howItWorks2: "របៀបប្រើ?", step1Title: "ជ្រើសរើសគំរូ", step1Desc: "ជ្រើសរើសគំរូដែលត្រូវនឹងសោភ័ណ្ឌ។",
    step2Title: "បញ្ចូលព័ត៌មាន", step2Desc: "សូមបំពេញព័ត៌មានរបស់អ្នក។", step3Title: "នាំចេញ", step3Desc: "នាំចេញ Portfolio ដូចជា source code, PDF, និង PNG.",
    pricingTitle: "តម្លៃសាមញ្ញ ច្បាស់លាស់", pricingSub: "ចាប់ផ្ដើមដោយឥតគិតថ្លៃ គ្មានថ្លៃលាក់បាំង។",
    mostPopular: "ពេញនិយមបំផុត", monthly: "ប្រចាំខែ", annually: "ប្រចាំឆ្នាំ", save: "សន្សំ 20%",
    freeName: "ឥតគិតថ្លៃ", freeDesc: "ល្អឥតខ្ចោះដើម្បីចាប់ផ្ដើម។", freeF1: "គំរូ 3", freeF2: "នាំចេញ Portfolio (PNG)", freeF3: "ការគាំទ្រសហគមន៍",
    proName: "Pro", proDesc: "សម្រាប់អ្នកច្នៃប្រឌិតស្ម័គ្រចិត្ត។", proF1: "គំរូទាំងអស់", proF2: "ដែនផ្ទាល់ខ្លួន", proF3: "នាំចេញ PDF & Source", proF4: "ការគាំទ្រអាទិភាព", proF5: "ផ្ទាំងវិភាគ",
    studioName: "Studio", studioDesc: "សម្រាប់ក្រុម & ភ្នាក់ងារ។", studioF1: "ទាំងអស់ក្នុង Pro", studioF2: "សមាជិកក្រុម 5 នាក់", studioF3: "White Label", studioF4: "ការចូលប្រើ API", studioF5: "ការគាំទ្រផ្ដាច់មុខ",
    getStartedBtn: "ចាប់ផ្ដើម", contactSales: "ទំនាក់ទំនងការលក់",
    ctaTitle: "ត្រៀមខ្លួនដើម្បីបង្ហាញស្នាដៃរបស់អ្នក?", ctaSub: "ចូលរួមជាមួយអ្នកច្នៃប្រឌិតរាប់ពាន់នាក់។", ctaBtn: "ចាប់ផ្ដើមដោយឥតគិតថ្លៃ →",
  },
};
