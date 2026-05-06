<template>
  <div class="dash-layout" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <router-link to="/" class="sidebar-logo">
          <img
            src="../../assets/icons/logo.svg"
            alt="Logo"
            class="sidebar-logo-img"
          />
          <span class="sidebar-logo-text">Portfolio Builder</span>
        </router-link>
        <button
          class="collapse-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <img
            :src="icons.chevronLeft"
            width="16"
            height="16"
            alt="collapse"
            class="collapse-icon"
          />
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item">
          <img src="../../assets/icons/home.svg" class="nav-icon" alt="" />
          <span class="nav-label">Dashboard</span>
        </router-link>
        <router-link to="/dashboard/builder" class="nav-item">
          <img src="../../assets/icons/grid.svg" class="nav-icon" alt="" />
          <span class="nav-label">Builder</span>
        </router-link>
        <router-link to="/templates" class="nav-item">
          <img src="../../assets/icons/search.svg" class="nav-icon" alt="" />
          <span class="nav-label">Templates</span>
        </router-link>
        <div class="nav-divider"></div>
        <router-link to="/dashboard/account" class="nav-item">
          <img src="../../assets/icons/user.svg" class="nav-icon" alt="" />
          <span class="nav-label">Account</span>
        </router-link>
        <router-link to="/pricing" class="nav-item">
          <img src="../../assets/icons/chart.svg" class="nav-icon" alt="" />
          <span class="nav-label">Upgrade Plan</span>
        </router-link>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-controls">
          <button class="ctrl-btn" @click="toggleTheme">
            <img
              :src="isDark ? icons.sun : icons.moon"
              class="ctrl-icon"
              alt=""
            />
            <span class="nav-label">{{ isDark ? "Light" : "Dark" }}</span>
          </button>
          <button class="ctrl-btn" @click="toggleLang">
            <img
              :src="lang === 'en' ? flagKH : flagUS"
              class="ctrl-flag"
              alt=""
            />
            <span class="nav-label">{{ lang === "en" ? "KH" : "EN" }}</span>
          </button>
        </div>
        <div class="sidebar-user" v-if="currentUser">
          <div class="sidebar-avatar">{{ avatarInitials }}</div>
          <div class="sidebar-user-info">
            <p class="sidebar-user-name">{{ currentUser.name }}</p>
            <p class="sidebar-user-plan">{{ currentUser.plan }} Plan</p>
          </div>
          <button class="logout-btn" @click="handleLogout">
            <img
              src="../../assets/icons/logout.svg"
              class="nav-icon"
              alt="Logout"
            />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="dash-main">
      <!-- Template chooser (step 0) -->
      <div v-if="builderStep === 0">
        <header class="page-header">
          <h1 class="page-title">Choose a Template</h1>
          <p class="page-sub">
            Pick a template to start building your portfolio
          </p>
        </header>

        <div class="filter-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="tab-btn"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="templates-grid">
          <div
            class="tpl-card"
            v-for="tpl in filteredTemplates"
            :key="tpl.id"
            :class="{ selected: selectedTemplate?.id === tpl.id }"
            @click="selectedTemplate = tpl"
          >
            <div class="tpl-thumb">
              <img :src="tpl.img" :alt="tpl.title" loading="lazy" />
              <div class="tpl-overlay">
                <span class="tpl-check" v-if="selectedTemplate?.id === tpl.id">
                  <img
                    src="../../assets/icons/check.svg"
                    class="check-img"
                    alt="Selected"
                  />
                </span>
              </div>
            </div>
            <div class="tpl-meta">
              <h3 class="tpl-title">{{ tpl.title }}</h3>
              <p class="tpl-role">{{ tpl.role }}</p>
            </div>
          </div>
        </div>

        <div class="step-foot">
          <button
            class="btn-next"
            :disabled="!selectedTemplate"
            @click="builderStep = 1"
          >
            Continue with "{{ selectedTemplate?.title || "..." }}" →
          </button>
        </div>
      </div>

      <!-- Stepper (steps 1–6) -->
      <div v-else class="stepper-layout">
        <!-- Step sidebar nav -->
        <div class="step-sidebar">
          <div class="step-sidebar-head">
            <button class="back-to-templates" @click="builderStep = 0">
              <img
                :src="icons.arrowLeft"
                width="14"
                height="14"
                alt="back"
                class="back-icon"
              />
              Templates
            </button>
            <div class="selected-tpl-badge" v-if="selectedTemplate">
              <div class="tpl-badge-thumb">
                <img
                  :src="selectedTemplate.img"
                  :alt="selectedTemplate.title"
                />
              </div>
              <div>
                <p class="tpl-badge-name">{{ selectedTemplate.title }}</p>
                <p class="tpl-badge-role">{{ selectedTemplate.role }}</p>
              </div>
            </div>
          </div>

          <nav class="step-nav">
            <button
              v-for="(step, idx) in steps"
              :key="idx"
              class="step-nav-item"
              :class="{
                active: builderStep === idx + 1,
                completed: builderStep > idx + 1,
              }"
              @click="builderStep = idx + 1"
            >
              <div class="step-indicator">
                <div class="step-circle">
                  <img
                    v-if="builderStep > idx + 1"
                    :src="icons.check"
                    width="11"
                    height="11"
                    alt="done"
                    class="step-check-icon"
                  />
                  <span v-else>{{ idx + 1 }}</span>
                </div>
                <div class="step-connector" v-if="idx < steps.length - 1"></div>
              </div>
              <div class="step-info">
                <p class="step-name">{{ step.name }}</p>
                <p class="step-desc">{{ step.desc }}</p>
              </div>
            </button>
          </nav>

          <div class="step-sidebar-progress">
            <div class="progress-label">
              <span>Progress</span>
              <span
                >{{
                  Math.round(((builderStep - 1) / steps.length) * 100)
                }}%</span
              >
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{
                  width: ((builderStep - 1) / steps.length) * 100 + '%',
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Step content -->
        <div class="step-content">
          <Transition name="step-fade" mode="out-in">
            <IntroPageEditor
              v-if="builderStep === 1"
              key="1"
              @next="builderStep = 2"
              @save-draft="handleSaveDraft"
            />
            <AboutSection
              v-else-if="builderStep === 2"
              key="2"
              @next="builderStep = 3"
              @save-draft="handleSaveDraft"
            />
            <ExpertiseEditor
              v-else-if="builderStep === 3"
              key="3"
              @next="builderStep = 4"
              @save-draft="handleSaveDraft"
              @add-project="builderStep = 4"
            />
            <ProjectShowcase
              v-else-if="builderStep === 4"
              key="4"
              @next="builderStep = 5"
              @save-draft="handleSaveDraft"
            />
            <ContactVisibility
              v-else-if="builderStep === 5"
              key="5"
              @next="builderStep = 6"
              @save-draft="handleSaveDraft"
              @add-contact="() => {}"
            />
            <PreviewExport
              v-else-if="builderStep === 6"
              key="6"
              @save-draft="handleSaveDraft"
            />
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  isDark,
  lang,
  toggleTheme,
  toggleLang,
  currentUser,
  addProject,
  logout,
} from "../../stores/app.js";

// ── Icons ──
import iconSun from "/src/assets/icons/sun.svg";
import iconMoon from "/src/assets/icons/moon.svg";
import iconChevronLeft from "/src/assets/icons/chevron-left.svg";
import iconArrowLeft from "/src/assets/icons/arrow-left.svg";
import iconCheck from "/src/assets/icons/check.svg";

const icons = {
  sun: iconSun,
  moon: iconMoon,
  chevronLeft: iconChevronLeft,
  arrowLeft: iconArrowLeft,
  check: iconCheck,
};

// ── Step components ──
import IntroPageEditor from "./builder/IntroPageEditor.vue";
import AboutSection from "./builder/AboutSection.vue";
import ExpertiseEditor from "./builder/ExpertiseEditor.vue";
import ProjectShowcase from "./builder/ProjectShowcase.vue";
import ContactVisibility from "./builder/ContactVisibility.vue";
import PreviewExport from "./builder/PreviewExport.vue";

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

// ── State ──
const router = useRouter();
const sidebarCollapsed = ref(false);
const builderStep = ref(0);
const activeTab = ref("See All");
const selectedTemplate = ref(null);

// ── Tabs & templates ──
const tabs = [
  "See All",
  "Software Developer",
  "UX/UI Design",
  "Networking",
  "Cybersecurity",
];

const templates = [
  {
    id: 1,
    title: "Software Developer",
    role: "Full-Stack Developer",
    category: "Software Developer",
    img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    role: "Web Design",
    category: "UX/UI Design",
    img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Network Admin",
    role: "Network Administrator",
    category: "Networking",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Cybersecurity",
    role: "IT Cybersecurity",
    category: "Cybersecurity",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Frontend Dev",
    role: "Front-end Developer",
    category: "Software Developer",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Backend Dev",
    role: "Backend Developer",
    category: "Software Developer",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&auto=format&fit=crop&q=80",
  },
];

const filteredTemplates = computed(() =>
  activeTab.value === "See All"
    ? templates
    : templates.filter((t) => t.category === activeTab.value),
);

// ── Steps ──
const steps = [
  { name: "Intro Page", desc: "Name, title & social links" },
  { name: "About Section", desc: "Bio & cover image" },
  { name: "Expertise", desc: "Skills & tech stack" },
  { name: "Projects", desc: "Showcase your work" },
  { name: "Contact", desc: "Visibility & integrations" },
  { name: "Preview & Export", desc: "Publish your portfolio" },
];

// ── Computed ──
const avatarInitials = computed(() => {
  if (!currentUser.value?.name) return "U";
  return currentUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// ── Handlers ──
function handleSaveDraft() {
  addProject({
    title: (currentUser.value?.name || "My") + "'s Portfolio",
    template: selectedTemplate.value?.title,
    role: selectedTemplate.value?.role,
    status: "draft",
    img: selectedTemplate.value?.img,
  });
  router.push("/dashboard");
}

function handleLogout() {
  logout();
  router.push("/login");
}
</script>

<style scoped>
/* ── Layout ── */
.dash-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans, "Plus Jakarta Sans", sans-serif);
}

/* ── Sidebar ── */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--card-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: width 0.3s;
  overflow: hidden;
}
.sidebar.collapsed {
  width: 68px;
}
.sidebar.collapsed .sidebar-logo-text,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .sidebar-user-info {
  display: none;
}
.sidebar.collapsed .sidebar-user {
  justify-content: center;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem 1rem;
  border-bottom: 1px solid var(--border);
  gap: 0.5rem;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
}
.sidebar-logo-img {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.collapse-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  transition: all 0.2s;
}
.collapse-btn:hover {
  border-color: var(--blue);
}
.collapse-icon {
  display: block;
  opacity: 0.6;
}
.collapse-btn:hover .collapse-icon {
  opacity: 1;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-mid);
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}
.nav-item:hover,
.nav-item.router-link-active {
  background: var(--blue-light);
  color: var(--blue);
}
.nav-item.router-link-active {
  font-weight: 600;
}
.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
}
.nav-item:hover .nav-icon,
.nav-item.router-link-active .nav-icon {
  opacity: 1;
}
.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
}

.sidebar-bottom {
  padding: 0.75rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sidebar-controls {
  display: flex;
  gap: 0.5rem;
}
.ctrl-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  padding: 0.45rem 0.6rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-mid);
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s;
}
.ctrl-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.ctrl-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.ctrl-flag {
  width: 18px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.25rem;
}
.sidebar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sidebar-user-info {
  flex: 1;
  overflow: hidden;
}
.sidebar-user-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-user-plan {
  font-size: 0.7rem;
  color: var(--text-muted);
}
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0.25rem;
  border-radius: 5px;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.logout-btn:hover {
  opacity: 0.6;
}

/* ── Main ── */
.dash-main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.page-header {
  margin-bottom: 0.25rem;
}
.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.3rem;
}
.page-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* ── Filter tabs ── */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
.tab-btn {
  font-family: var(--sans);
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.45rem 1.1rem;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.tab-btn.active {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
}

/* ── Templates grid ── */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}
.tpl-card {
  cursor: pointer;
  border: 2px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  transition: all 0.2s;
}
.tpl-card:hover {
  border-color: var(--blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.tpl-card.selected {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.15);
}
.tpl-thumb {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}
.tpl-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.tpl-card:hover .tpl-thumb img {
  transform: scale(1.05);
}
.tpl-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 63, 204, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.tpl-card.selected .tpl-overlay {
  opacity: 1;
}
.tpl-check {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.check-img {
  width: 18px;
  height: 18px;
}
.tpl-meta {
  padding: 0.75rem 0.85rem;
}
.tpl-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.15rem;
}
.tpl-role {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.step-foot {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
}
.btn-next {
  background: var(--blue);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 4px 14px rgba(26, 63, 204, 0.3);
}
.btn-next:hover:not(:disabled) {
  background: var(--blue-dark);
  transform: translateY(-1px);
}
.btn-next:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Stepper layout ── */
.stepper-layout {
  display: grid;
  grid-template-columns: 272px 1fr;
  gap: 1.75rem;
  align-items: start;
  flex: 1;
}

/* ── Step sidebar ── */
.step-sidebar {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.25rem;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow);
}
.step-sidebar-head {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.back-to-templates {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
}
.back-to-templates:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.back-icon {
  display: block;
  opacity: 0.6;
}
.back-to-templates:hover .back-icon {
  opacity: 1;
}

.selected-tpl-badge {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.tpl-badge-thumb {
  width: 40px;
  height: 28px;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
}
.tpl-badge-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tpl-badge-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}
.tpl-badge-role {
  font-size: 0.65rem;
  color: var(--text-muted);
}

/* ── Step nav ── */
.step-nav {
  display: flex;
  flex-direction: column;
}
.step-nav-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem 0;
  text-align: left;
  width: 100%;
}
.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 3px;
}
.step-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all 0.25s;
}
.step-nav-item.active .step-circle {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(26, 63, 204, 0.15);
}
.step-nav-item.completed .step-circle {
  background: #22c55e;
  border-color: #22c55e;
  color: #fff;
}

.step-check-icon {
  display: block;
  filter: brightness(0) invert(1);
}

.step-connector {
  width: 2px;
  flex: 1;
  min-height: 18px;
  margin: 3px 0;
  background: var(--border);
  border-radius: 99px;
}
.step-nav-item.completed .step-connector {
  background: #22c55e;
}

.step-info {
  padding: 2px 0 0.6rem;
}
.step-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 0.1rem;
  transition: color 0.2s;
}
.step-desc {
  font-size: 0.68rem;
  color: var(--text-muted);
  opacity: 0.7;
}
.step-nav-item.active .step-name {
  color: var(--blue);
}
.step-nav-item.completed .step-name {
  color: #22c55e;
}
.step-nav-item:hover:not(.active) .step-name {
  color: var(--text);
}

/* ── Progress ── */
.step-sidebar-progress {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}
.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}
.progress-bar {
  height: 6px;
  border-radius: 99px;
  background: var(--border);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--blue);
  transition: width 0.4s ease;
}

/* ── Step content ── */
.step-content {
  min-width: 0;
}

/* ── Transition ── */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.2s ease;
}
.step-fade-enter-from {
  opacity: 0;
  transform: translateX(14px);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}

@media (max-width: 1100px) {
  .stepper-layout {
    grid-template-columns: 1fr;
  }
  .step-sidebar {
    position: static;
  }
  .step-nav {
    flex-direction: row;
    overflow-x: auto;
    gap: 0;
  }
  .step-nav-item {
    flex-direction: column;
    align-items: center;
    min-width: 85px;
    padding: 0;
    gap: 0.3rem;
  }
  .step-indicator {
    flex-direction: row;
    align-items: center;
  }
  .step-connector {
    width: 20px;
    height: 2px;
    min-height: unset;
    margin: 0 2px;
  }
  .step-info {
    text-align: center;
    padding: 0 0 0.5rem;
  }
}
@media (max-width: 640px) {
  .dash-main {
    padding: 1rem;
  }
  .stepper-layout {
    gap: 1rem;
  }
}
</style>
