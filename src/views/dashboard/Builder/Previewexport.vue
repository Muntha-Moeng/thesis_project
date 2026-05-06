<template>
  <div class="step-panel">
    <!-- Header -->
    <div class="step-header">
      <h1 class="step-title">Preview & Export</h1>
      <p class="step-sub">
        Review your portfolio and export it in your preferred format.
      </p>
    </div>

    <!-- ── Preview Frame ── -->
    <div class="preview-container">
      <div class="preview-toolbar">
        <div class="preview-toolbar-left">
          <span class="preview-label">
            <img
              :src="icons.eye"
              width="14"
              height="14"
              alt="preview"
              class="toolbar-icon"
            />
            Live Preview
          </span>
          <div class="preview-dot-group">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
        </div>

        <div class="preview-url-bar">
          <img
            :src="icons.settings"
            width="12"
            height="12"
            alt="secure"
            class="toolbar-icon"
          />
          <span>yourname.portfoliobuilder.io</span>
        </div>

        <div class="device-switcher">
          <button
            v-for="d in devices"
            :key="d.key"
            class="device-btn"
            :class="{ active: activeDevice === d.key }"
            :title="d.label"
            @click="activeDevice = d.key"
          >
            <img
              :src="d.iconSrc"
              width="15"
              height="15"
              :alt="d.label"
              class="device-icon"
            />
          </button>
        </div>
      </div>

      <!-- Portfolio Preview Viewport -->
      <div class="preview-viewport" :class="activeDevice">
        <div class="portfolio-preview">
          <!-- Nav -->
          <nav class="pf-nav">
            <span class="pf-nav-logo">{{
              portfolioData.name || "Your Name"
            }}</span>
            <div class="pf-nav-links">
              <a href="#">About</a>
              <a href="#">Work</a>
              <a href="#">Contact</a>
            </div>
          </nav>

          <!-- Hero -->
          <section class="pf-hero">
            <div class="pf-hero-content">
              <div class="pf-avatar">
                <img
                  v-if="portfolioData.avatarUrl"
                  :src="portfolioData.avatarUrl"
                  alt="Profile"
                />
                <span v-else class="pf-avatar-initials">{{ initials }}</span>
              </div>
              <div class="pf-hero-text">
                <p class="pf-badge">
                  {{ portfolioData.badge || "Available for work ✦" }}
                </p>
                <h1 class="pf-name">
                  {{ portfolioData.name || "Alexander Sterling" }}
                </h1>
                <p class="pf-role">
                  {{ portfolioData.role || "Full-Stack Developer" }}
                </p>
                <p class="pf-tagline">
                  {{
                    portfolioData.tagline ||
                    "Building beautiful digital experiences that users love."
                  }}
                </p>
                <div class="pf-hero-actions">
                  <a class="pf-btn-primary" href="#">View My Work</a>
                  <a class="pf-btn-ghost" href="#">Get In Touch</a>
                </div>
              </div>
            </div>
          </section>

          <!-- About -->
          <section class="pf-section pf-about">
            <h2 class="pf-section-title">About Me</h2>
            <p class="pf-about-text">
              {{
                portfolioData.bio ||
                "Passionate developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful interfaces."
              }}
            </p>
          </section>

          <!-- Skills -->
          <section class="pf-section pf-skills">
            <h2 class="pf-section-title">Expertise</h2>
            <div class="pf-skill-grid">
              <span
                v-for="skill in portfolioData.skills || defaultSkills"
                :key="skill"
                class="pf-skill-tag"
                >{{ skill }}</span
              >
            </div>
          </section>

          <!-- Projects -->
          <section class="pf-section pf-projects">
            <h2 class="pf-section-title">Featured Projects</h2>
            <div class="pf-project-grid">
              <div
                v-for="proj in portfolioData.projects || defaultProjects"
                :key="proj.title"
                class="pf-project-card"
              >
                <div
                  class="pf-project-img"
                  :style="{ background: proj.color || '#1a3fcc22' }"
                >
                  <img
                    :src="icons.grid"
                    width="28"
                    height="28"
                    alt="project"
                    class="proj-placeholder-icon"
                  />
                </div>
                <div class="pf-project-body">
                  <h3>{{ proj.title }}</h3>
                  <p>
                    {{
                      proj.description ||
                      "A showcase project built with modern technologies."
                    }}
                  </p>
                  <div class="pf-project-tags">
                    <span
                      v-for="tag in proj.tags || ['React', 'Node.js']"
                      :key="tag"
                      >{{ tag }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section class="pf-section pf-contact">
            <h2 class="pf-section-title">Get In Touch</h2>
            <p>Have a project in mind? Let's build something great together.</p>
            <div class="pf-contact-links">
              <a
                v-if="portfolioData.linkedin"
                :href="portfolioData.linkedin"
                class="pf-contact-link"
              >
                <img
                  :src="icons.user"
                  width="16"
                  height="16"
                  alt="linkedin"
                  class="contact-icon"
                />
                LinkedIn
              </a>
              <a
                v-if="portfolioData.github"
                :href="portfolioData.github"
                class="pf-contact-link"
              >
                <img
                  :src="icons.settings"
                  width="16"
                  height="16"
                  alt="github"
                  class="contact-icon"
                />
                GitHub
              </a>
              <a
                v-if="!portfolioData.linkedin && !portfolioData.github"
                href="#"
                class="pf-contact-link"
              >
                <img
                  :src="icons.bell"
                  width="16"
                  height="16"
                  alt="email"
                  class="contact-icon"
                />
                Email Me
              </a>
            </div>
          </section>

          <!-- Portfolio Footer -->
          <footer class="pf-footer">
            <p>
              © 2026 {{ portfolioData.name || "Your Name" }}. Built with
              Portfolio Builder.
            </p>
          </footer>
        </div>
      </div>
    </div>

    <!-- ── Export Options ── -->
    <div class="export-section">
      <h3 class="export-title">Export Your Portfolio</h3>
      <p class="export-sub">
        Choose how you want to share your work with the world.
      </p>

      <div class="export-cards">
        <!-- Link Export -->
        <div class="export-card" :class="{ loading: exporting === 'link' }">
          <div class="export-card-icon export-icon-link">
            <img
              :src="icons.bell"
              width="28"
              height="28"
              alt="link"
              class="export-card-img export-card-img--blue"
            />
          </div>
          <div class="export-card-body">
            <h4>Share as Link</h4>
            <p>
              Copy a shareable link to your portfolio. Send it to anyone — no
              downloads required.
            </p>
            <ul class="export-features">
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                Instant shareable URL
              </li>
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                Works on any device
              </li>
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                No account needed to view
              </li>
            </ul>
          </div>
          <button
            class="export-btn export-btn-link"
            :disabled="exporting === 'link'"
            @click="copyLink"
          >
            <span v-if="exporting === 'link'" class="export-spinner"></span>
            <img
              v-else
              :src="icons.plus"
              width="16"
              height="16"
              alt="copy"
              class="btn-icon btn-icon--white"
            />
            {{ exporting === "link" ? "Copying…" : "Copy Link" }}
          </button>
        </div>

        <!-- ZIP Export -->
        <div class="export-card" :class="{ loading: exporting === 'zip' }">
          <div class="export-card-icon export-icon-zip">
            <img
              :src="icons.grid"
              width="28"
              height="28"
              alt="zip"
              class="export-card-img export-card-img--purple"
            />
          </div>
          <div class="export-card-body">
            <h4>Export Source Code</h4>
            <p>
              Download a clean, standalone HTML/CSS/JS bundle ready to host
              anywhere — no build tools needed.
            </p>
            <ul class="export-features">
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                Single HTML file + README
              </li>
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                Deploy to GitHub Pages, Netlify, Vercel
              </li>
              <li>
                <img
                  :src="icons.check"
                  width="12"
                  height="12"
                  alt="check"
                  class="feat-check"
                />
                All styles &amp; assets included
              </li>
            </ul>
          </div>
          <button
            class="export-btn export-btn-zip"
            :disabled="exporting === 'zip'"
            @click="exportZip"
          >
            <span v-if="exporting === 'zip'" class="export-spinner"></span>
            <img
              v-else
              :src="icons.download"
              width="16"
              height="16"
              alt="download"
              class="btn-icon btn-icon--white"
            />
            {{ exporting === "zip" ? "Packaging ZIP…" : "Download ZIP" }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Bottom Actions ── -->
    <div class="step-footer">
      <button class="btn-draft" @click="$emit('save-draft')">
        <img
          :src="icons.download"
          width="14"
          height="14"
          alt="save"
          class="btn-icon"
        />
        Save as Draft
      </button>
    </div>

    <!-- ── Toast ── -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast-notif" :class="toast.type">
        <img
          :src="toast.type === 'success' ? icons.check : icons.bell"
          width="16"
          height="16"
          :alt="toast.type"
          class="toast-icon"
        />
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

// ── Icons ──
import iconEye from "/src/assets/icons/eye.svg";
import iconSettings from "/src/assets/icons/settings.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconHome from "/src/assets/icons/home.svg";
import iconUser from "/src/assets/icons/user.svg";
import iconBell from "/src/assets/icons/bell.svg";
import iconCheck from "/src/assets/icons/check.svg";
import iconMoon from "/src/assets/icons/moon.svg";
import iconDownload from "/src/assets/icons/download.svg";
import iconPlus from "/src/assets/icons/plus.svg";

const icons = {
  eye: iconEye,
  settings: iconSettings,
  grid: iconGrid,
  home: iconHome,
  user: iconUser,
  bell: iconBell,
  check: iconCheck,
  moon: iconMoon,
  download: iconDownload,
  plus: iconPlus,
};

// ── Emits ──
const emit = defineEmits(["save-draft"]);

// ── Device toggle ──
const activeDevice = ref("desktop");
const devices = [
  { key: "desktop", label: "Desktop", iconSrc: iconHome },
  { key: "tablet", label: "Tablet", iconSrc: iconGrid },
  { key: "mobile", label: "Mobile", iconSrc: iconUser },
];

// ── Mock portfolio data ──
const portfolioData = reactive({
  name: "Alexander Sterling",
  role: "Full-Stack Developer",
  tagline: "Building beautiful digital experiences that users love.",
  bio: "Passionate developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful interfaces.",
  badge: "Available for work ✦",
  avatarUrl: "",
  skills: [
    "JavaScript",
    "Vue.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "React",
    "GraphQL",
  ],
  linkedin: "",
  github: "",
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time inventory.",
      tags: ["Vue", "Node.js", "MongoDB"],
      color: "#1a3fcc18",
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization platform for business insights.",
      tags: ["React", "D3.js", "Python"],
      color: "#0e7c5b18",
    },
    {
      title: "Mobile Banking App",
      description: "Secure, fast mobile banking experience.",
      tags: ["React Native", "TypeScript"],
      color: "#9333ea18",
    },
  ],
});

const defaultSkills = [
  "JavaScript",
  "Vue.js",
  "Node.js",
  "TypeScript",
  "CSS",
  "Docker",
];
const defaultProjects = [
  {
    title: "My Project",
    description: "A showcase project built with modern technologies.",
    tags: ["React", "Node.js"],
    color: "#1a3fcc18",
  },
];

const initials = computed(() => {
  if (!portfolioData.name) return "YN";
  return portfolioData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// ── Toast ──
const toast = reactive({ show: false, message: "", type: "success" });
function showToast(message, type = "success") {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  setTimeout(() => (toast.show = false), 3500);
}

// ── Export state ──
const exporting = ref(null);

// ── Build portfolio HTML ──
function buildPortfolioHTML() {
  const name = portfolioData.name || "Your Name";
  const role = portfolioData.role || "Your Role";
  const badge = portfolioData.badge || "Available for work ✦";
  const tagline =
    portfolioData.tagline || "Building beautiful digital experiences.";
  const bio = portfolioData.bio || "Your bio will appear here.";
  const avatarContent = portfolioData.avatarUrl
    ? `<img src="${portfolioData.avatarUrl}" alt="Profile" style="width:100%;height:100%;object-fit:cover;" />`
    : initials.value;

  const skills = (portfolioData.skills || defaultSkills)
    .map((s) => `<span class="skill-tag">${s}</span>`)
    .join("");

  const projects = (portfolioData.projects || defaultProjects)
    .map(
      (p) => `
      <div class="project-card">
        <div class="project-thumb" style="background:${p.color || "#1a3fcc18"}"></div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.description || ""}</p>
          <div class="project-tags">${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
      </div>`,
    )
    .join("");

  const contactLinks =
    [
      portfolioData.linkedin
        ? `<a href="${portfolioData.linkedin}" class="contact-link">LinkedIn</a>`
        : "",
      portfolioData.github
        ? `<a href="${portfolioData.github}" class="contact-link">GitHub</a>`
        : "",
    ]
      .filter(Boolean)
      .join("") || '<a href="#" class="contact-link">Email Me</a>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--blue:#1a3fcc;--blue-dark:#1530a8;--blue-light:#e8edff;--bg:#eef1f8;--card:#fff;--text:#111827;--text-mid:#374151;--text-muted:#6b7280;--border:#d1d9f0;--radius:12px;--sans:'Plus Jakarta Sans',sans-serif}
    body{font-family:var(--sans);background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
    a{text-decoration:none;color:inherit}
    nav{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 5%;background:rgba(238,241,248,.92);backdrop-filter:blur(12px);position:sticky;top:0;z-index:10;border-bottom:1px solid var(--border)}
    .logo{font-weight:800;font-size:1.1rem;color:var(--blue)}
    .nav-links{display:flex;gap:2rem;font-size:.9rem;color:var(--text-mid)}
    .nav-links a:hover{color:var(--blue)}
    .hero{padding:5rem 5% 4rem;max-width:960px;margin:0 auto;display:flex;gap:3rem;align-items:center;flex-wrap:wrap}
    .avatar{width:120px;height:120px;border-radius:50%;background:var(--blue-light);display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:var(--blue);flex-shrink:0;overflow:hidden}
    .hero-text{flex:1;min-width:260px}
    .badge{display:inline-block;background:var(--blue-light);color:var(--blue);font-size:.75rem;font-weight:700;padding:.3rem .9rem;border-radius:99px;margin-bottom:1rem;letter-spacing:.04em}
    h1{font-size:clamp(2rem,5vw,3rem);font-weight:800;color:var(--text);line-height:1.15;margin-bottom:.4rem}
    .role{font-size:1.1rem;color:var(--blue);font-weight:600;margin-bottom:.75rem}
    .tagline{font-size:1rem;color:var(--text-mid);max-width:480px;margin-bottom:1.75rem}
    .hero-actions{display:flex;gap:.75rem;flex-wrap:wrap}
    .btn-primary{background:var(--blue);color:#fff;padding:.75rem 1.75rem;border-radius:var(--radius);font-weight:700;font-size:.9rem;transition:background .2s}
    .btn-primary:hover{background:var(--blue-dark)}
    .btn-ghost{border:1.5px solid var(--blue);color:var(--blue);padding:.75rem 1.75rem;border-radius:var(--radius);font-weight:700;font-size:.9rem;transition:all .2s}
    .btn-ghost:hover{background:var(--blue-light)}
    section{padding:3.5rem 5%;max-width:960px;margin:0 auto}
    h2{font-size:1.6rem;font-weight:800;margin-bottom:1.25rem}
    .about p{font-size:1rem;color:var(--text-mid);line-height:1.8}
    .skill-grid{display:flex;flex-wrap:wrap;gap:.6rem}
    .skill-tag{background:var(--blue-light);color:var(--blue);padding:.4rem 1rem;border-radius:99px;font-size:.85rem;font-weight:600}
    .project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem}
    .project-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:box-shadow .2s}
    .project-card:hover{box-shadow:0 8px 32px rgba(26,63,204,.12)}
    .project-thumb{height:120px}
    .project-body{padding:1.1rem}
    .project-body h3{font-size:1rem;font-weight:700;margin-bottom:.4rem}
    .project-body p{font-size:.85rem;color:var(--text-muted);margin-bottom:.75rem}
    .project-tags{display:flex;flex-wrap:wrap;gap:.4rem}
    .project-tags span{background:var(--bg);border:1px solid var(--border);font-size:.75rem;padding:.2rem .6rem;border-radius:99px}
    .contact-section{text-align:center;background:var(--card);border:1px solid var(--border);border-radius:1.5rem;max-width:960px;margin:1rem auto;padding:3.5rem 5%}
    .contact-section p{color:var(--text-muted);margin-bottom:1.5rem}
    .contact-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
    .contact-link{background:var(--blue);color:#fff;padding:.65rem 1.5rem;border-radius:var(--radius);font-weight:600;font-size:.9rem;transition:background .2s}
    .contact-link:hover{background:var(--blue-dark)}
    footer{text-align:center;padding:2rem;color:var(--text-muted);font-size:.85rem;border-top:1px solid var(--border)}
    @media(max-width:600px){.nav-links{display:none}.hero{flex-direction:column;text-align:center}}
  </style>
</head>
<body>
  <nav>
    <span class="logo">${name}</span>
    <div class="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></div>
  </nav>
  <div class="hero">
    <div class="avatar">${avatarContent}</div>
    <div class="hero-text">
      <span class="badge">${badge}</span>
      <h1>${name}</h1>
      <p class="role">${role}</p>
      <p class="tagline">${tagline}</p>
      <div class="hero-actions">
        <a href="#work" class="btn-primary">View My Work</a>
        <a href="#contact" class="btn-ghost">Get In Touch</a>
      </div>
    </div>
  </div>
  <section id="about" class="about"><h2>About Me</h2><p>${bio}</p></section>
  <section id="skills"><h2>Expertise</h2><div class="skill-grid">${skills}</div></section>
  <section id="work"><h2>Featured Projects</h2><div class="project-grid">${projects}</div></section>
  <section id="contact" class="contact-section">
    <h2>Get In Touch</h2>
    <p>Have a project in mind? Let's build something great together.</p>
    <div class="contact-links">${contactLinks}</div>
  </section>
  <footer>
    <p>© 2026 ${name}. Built with <a href="https://portfoliobuilder.io" style="color:var(--blue);font-weight:600">Portfolio Builder</a>.</p>
  </footer>
</body>
</html>`;
}

// ── Copy Link ──
async function copyLink() {
  exporting.value = "link";
  try {
    await new Promise((r) => setTimeout(r, 500));
    const slug = (portfolioData.name || "portfolio")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const url = `https://${slug}.portfoliobuilder.io`;
    await navigator.clipboard.writeText(url);
    showToast("Link copied to clipboard!", "success");
  } catch {
    showToast("Could not copy link. Please try manually.", "error");
  } finally {
    exporting.value = null;
  }
}

// ── ZIP Export ──
async function exportZip() {
  exporting.value = "zip";
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const html = buildPortfolioHTML();
    const slugName = (portfolioData.name || "portfolio")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const readme = `# ${portfolioData.name || "My Portfolio"}\n\nBuilt with Portfolio Builder.\n\n## Getting Started\nOpen \`index.html\` in your browser, or deploy to GitHub Pages / Netlify.\n`;

    if (!window.JSZip) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    const zip = new window.JSZip();
    const folder = zip.folder(`${slugName}-portfolio`);
    folder.file("index.html", html);
    folder.file("README.md", readme);

    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugName}-portfolio.zip`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("ZIP downloaded successfully!", "success");
  } catch {
    const html = buildPortfolioHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded portfolio.html — deploy it anywhere!", "success");
  } finally {
    exporting.value = null;
  }
}

// ── Publish ──
function handlePublish() {
  showToast("🚀 Portfolio published! Your link is ready to share.", "success");
  setTimeout(() => emit("save-draft"), 1800);
}
</script>

<style scoped>
/* ── Panel ── */
.step-panel {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: relative;
}
.step-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.3rem;
}
.step-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ── Preview Container ── */
.preview-container {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.preview-toolbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.preview-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}
.toolbar-icon {
  display: block;
  opacity: 0.55;
}

.preview-dot-group {
  display: flex;
  gap: 5px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #febc2e;
}
.dot-green {
  background: #28c840;
}

.preview-url-bar {
  flex: 1;
  max-width: 360px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0 auto;
}

/* Device switcher */
.device-switcher {
  display: flex;
  gap: 4px;
}
.device-btn {
  background: none;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 5px 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.15s;
}
.device-btn:hover {
  border-color: var(--border);
}
.device-btn.active {
  background: var(--blue-light);
  border-color: var(--blue);
}
.device-icon {
  display: block;
  opacity: 0.55;
}
.device-btn.active .device-icon {
  opacity: 1;
  filter: invert(20%) sepia(90%) saturate(1500%) hue-rotate(210deg)
    brightness(90%);
}

/* ── Viewport frames ── */
.preview-viewport {
  height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s ease;
  background: #c8cfe0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
}
.preview-viewport.tablet {
  padding: 1.5rem;
}
.preview-viewport.mobile {
  padding: 1.5rem 2.5rem;
}

.portfolio-preview {
  width: 100%;
  background: #eef1f8;
  min-height: 100%;
  font-family: var(--sans);
  transition: all 0.3s;
}
.preview-viewport.tablet .portfolio-preview {
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
}
.preview-viewport.mobile .portfolio-preview {
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.22);
}

/* ── Mini portfolio inside preview ── */
.pf-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 5%;
  background: rgba(238, 241, 248, 0.95);
  border-bottom: 1px solid #d1d9f0;
  position: sticky;
  top: 0;
  z-index: 5;
}
.pf-nav-logo {
  font-weight: 800;
  font-size: 0.9rem;
  color: #1a3fcc;
}
.pf-nav-links {
  display: flex;
  gap: 1.2rem;
  font-size: 0.75rem;
  color: #374151;
}
.preview-viewport.mobile .pf-nav-links {
  display: none;
}

.pf-hero {
  padding: 2rem 5% 1.5rem;
}
.pf-hero-content {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  flex-wrap: wrap;
}
.preview-viewport.mobile .pf-hero-content {
  flex-direction: column;
  text-align: center;
}

.pf-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e8edff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a3fcc;
  flex-shrink: 0;
  overflow: hidden;
}
.pf-hero-text {
  flex: 1;
  min-width: 180px;
}
.pf-badge {
  display: inline-block;
  background: #e8edff;
  color: #1a3fcc;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 99px;
  margin-bottom: 0.45rem;
  letter-spacing: 0.04em;
}
.pf-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.15rem;
  line-height: 1.2;
}
.pf-role {
  font-size: 0.82rem;
  color: #1a3fcc;
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.pf-tagline {
  font-size: 0.76rem;
  color: #374151;
  margin-bottom: 0.9rem;
}
.pf-hero-actions {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}
.preview-viewport.mobile .pf-hero-actions {
  justify-content: center;
}
.pf-btn-primary {
  background: #1a3fcc;
  color: #fff;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.72rem;
  text-decoration: none;
}
.pf-btn-ghost {
  border: 1.5px solid #1a3fcc;
  color: #1a3fcc;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.72rem;
  text-decoration: none;
}

.pf-section {
  padding: 1.25rem 5%;
}
.pf-section-title {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.65rem;
}
.pf-about-text {
  font-size: 0.78rem;
  color: #374151;
  line-height: 1.75;
}

.pf-skill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.pf-skill-tag {
  background: #e8edff;
  color: #1a3fcc;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  font-size: 0.7rem;
  font-weight: 600;
}

.pf-project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.65rem;
}
.pf-project-card {
  background: #fff;
  border: 1px solid #d1d9f0;
  border-radius: 10px;
  overflow: hidden;
}
.pf-project-img {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.proj-placeholder-icon {
  display: block;
  opacity: 0.25;
}
.pf-project-body {
  padding: 0.6rem;
}
.pf-project-body h3 {
  font-size: 0.77rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.pf-project-body p {
  font-size: 0.68rem;
  color: #6b7280;
  margin-bottom: 0.35rem;
}
.pf-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}
.pf-project-tags span {
  background: #eef1f8;
  border: 1px solid #d1d9f0;
  font-size: 0.62rem;
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
}

.pf-contact {
  background: #fff;
  border: 1px solid #d1d9f0;
  border-radius: 12px;
  margin: 0.5rem 5%;
  padding: 1.5rem;
  text-align: center;
}
.pf-contact p {
  font-size: 0.76rem;
  color: #6b7280;
  margin-bottom: 0.9rem;
}
.pf-contact-links {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.pf-contact-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #1a3fcc;
  color: #fff;
  padding: 0.38rem 0.8rem;
  border-radius: 7px;
  font-size: 0.72rem;
  font-weight: 600;
  text-decoration: none;
}
.contact-icon {
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.pf-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.7rem;
  color: #6b7280;
  border-top: 1px solid #d1d9f0;
  margin-top: 0.5rem;
}

/* ── Export Section ── */
.export-section {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.75rem;
}
.export-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.3rem;
}
.export-sub {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.export-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.export-card {
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.export-card:hover {
  border-color: var(--blue);
  box-shadow: 0 4px 20px rgba(26, 63, 204, 0.1);
}
.export-card.loading {
  opacity: 0.7;
  pointer-events: none;
}

.export-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.export-icon-link {
  background: #dbeafe;
}
.export-icon-zip {
  background: #ede9fe;
}

.export-card-img {
  display: block;
  opacity: 0.7;
}
.export-card-img--blue {
  filter: invert(20%) sepia(90%) saturate(1500%) hue-rotate(210deg)
    brightness(90%);
}
.export-card-img--purple {
  filter: invert(25%) sepia(80%) saturate(1500%) hue-rotate(250deg)
    brightness(90%);
}

.export-card-body h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.35rem;
}
.export-card-body p {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.export-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.export-features li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--text-mid);
}
.feat-check {
  display: block;
  filter: invert(42%) sepia(93%) saturate(400%) hue-rotate(90deg)
    brightness(95%);
  flex-shrink: 0;
}

.export-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: auto;
}
.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.export-btn-link {
  background: #1a3fcc;
  color: #fff;
}
.export-btn-link:hover:not(:disabled) {
  background: #1530a8;
}

.export-btn-zip {
  background: #7c3aed;
  color: #fff;
}
.export-btn-zip:hover:not(:disabled) {
  background: #6d28d9;
}

/* Icon utilities */
.btn-icon {
  display: block;
  opacity: 0.6;
}
.btn-icon--white {
  filter: brightness(0) invert(1);
  opacity: 1;
}

.export-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Footer Actions ── */
.step-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.25rem;
}

.btn-draft {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.25rem;
  background: var(--card-bg);
  color: var(--text-mid);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-draft:hover {
  border-color: var(--blue);
  color: var(--blue);
}

/* ── Toast ── */
.toast-notif {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.25rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
.toast-notif.success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.toast-notif.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.toast-icon {
  display: block;
  flex-shrink: 0;
}
.toast-notif.success .toast-icon {
  filter: invert(42%) sepia(93%) saturate(400%) hue-rotate(90deg)
    brightness(95%);
}
.toast-notif.error .toast-icon {
  filter: invert(20%) sepia(90%) saturate(2000%) hue-rotate(340deg)
    brightness(95%);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
