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
          title="Toggle sidebar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item" exact>
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
        <!-- Theme & Lang controls -->
        <div class="sidebar-controls">
          <button
            class="ctrl-btn"
            @click="toggleTheme"
            :title="isDark ? 'Light mode' : 'Dark mode'"
          >
            <img :src="isDark ? sunIcon : moonIcon" class="ctrl-icon" />
            <span class="nav-label">{{ isDark ? "Light" : "Dark" }} Mode</span>
          </button>
          <button class="ctrl-btn" @click="toggleLang">
            <img :src="lang === 'en' ? flagKH : flagUS" class="ctrl-flag" />
            <span class="nav-label">{{
              lang === "en" ? "Khmer" : "English"
            }}</span>
          </button>
        </div>

        <!-- User info -->
        <div class="sidebar-user" v-if="currentUser">
          <div class="sidebar-avatar">{{ avatarInitials }}</div>
          <div class="sidebar-user-info">
            <p class="sidebar-user-name">{{ currentUser.name }}</p>
            <p class="sidebar-user-plan">{{ currentUser.plan }} Plan</p>
          </div>
          <button class="logout-btn" @click="handleLogout" title="Logout">
            <img
              src="../../assets/icons/logout.svg"
              class="nav-icon"
              alt="Logout"
            />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="dash-main">
      <!-- Top bar -->
      <header class="dash-topbar">
        <div>
          <h1 class="dash-greeting">
            Good {{ timeGreeting }}, {{ firstName }} 👋
          </h1>
          <p class="dash-date">{{ today }}</p>
        </div>
        <div class="topbar-actions">
          <button
            class="notif-btn-top"
            @click="showNotifs = !showNotifs"
            title="Notifications"
          >
            <img
              src="../../assets/icons/bell.svg"
              class="topbar-icon"
              alt="Notifications"
            />
            <span class="notif-badge" v-if="unreadCount > 0">{{
              unreadCount
            }}</span>
          </button>
          <router-link to="/dashboard/builder" class="btn-new">
            <img src="../../assets/icons/plus.svg" class="btn-icon" alt="" />
            New Portfolio
          </router-link>
        </div>
      </header>

      <!-- Notifications panel -->
      <div class="notif-panel" v-if="showNotifs">
        <div class="notif-panel-head">
          <span>Notifications</span>
          <button class="mark-read-btn" @click="markAllRead">
            Mark all read
          </button>
          <button class="notif-close" @click="showNotifs = false">✕</button>
        </div>
        <div
          v-for="n in notifications"
          :key="n.id"
          class="notif-row"
          :class="{ unread: !n.read }"
        >
          <div class="notif-dot-sm" :class="n.type"></div>
          <div>
            <p class="notif-msg-sm">{{ n.message }}</p>
            <span class="notif-time-sm">{{ n.time }}</span>
          </div>
        </div>
      </div>

      <!-- Stats cards -->
      <section class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
            <img :src="stat.icon" class="stat-icon" alt="" />
          </div>
          <div>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </section>

      <!-- Projects section -->
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">My Portfolios</h2>
          <router-link to="/dashboard/builder" class="section-link"
            >+ New Portfolio</router-link
          >
        </div>

        <div class="projects-grid" v-if="projects.length">
          <div class="project-card" v-for="p in projects" :key="p.id">
            <div class="project-thumb">
              <img :src="p.img" :alt="p.title" loading="lazy" />
              <span class="project-status" :class="p.status">{{
                p.status
              }}</span>
            </div>
            <div class="project-body">
              <h3 class="project-title">{{ p.title }}</h3>
              <p class="project-meta">
                {{ p.template }} · Last edited {{ p.lastEdited }}
              </p>
              <div class="project-stats">
                <span class="pstat">
                  <img
                    src="../../assets/icons/eye.svg"
                    class="pstat-icon"
                    alt=""
                  />
                  {{ p.views }} views
                </span>
              </div>
            </div>
            <div class="project-actions">
              <button class="paction-btn" title="Edit">
                <img
                  src="../../assets/icons/edit.svg"
                  class="paction-icon"
                  alt="Edit"
                />
              </button>
              <button class="paction-btn" title="Download">
                <img
                  src="../../assets/icons/download.svg"
                  class="paction-icon"
                  alt="Download"
                />
              </button>
              <button
                class="paction-btn danger"
                title="Delete"
                @click="deleteProject(p.id)"
              >
                <img
                  src="../../assets/icons/trash.svg"
                  class="paction-icon"
                  alt="Delete"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="empty-projects" v-else>
          <img src="../../assets/icons/grid.svg" class="empty-icon" alt="" />
          <p>No portfolios yet. Create your first one!</p>
          <router-link to="/dashboard/builder" class="btn-create"
            >Start Building</router-link
          >
        </div>
      </section>

      <!-- Quick actions -->
      <section class="section quick-section">
        <div class="section-head">
          <h2 class="section-title">Quick Actions</h2>
        </div>
        <div class="quick-grid">
          <router-link to="/templates" class="quick-card">
            <img
              src="../../assets/icons/search.svg"
              class="quick-icon"
              alt=""
            />
            <span>Browse Templates</span>
          </router-link>
          <router-link to="/dashboard/account" class="quick-card">
            <img
              src="../../assets/icons/settings.svg"
              class="quick-icon"
              alt=""
            />
            <span>Account Settings</span>
          </router-link>
          <router-link to="/pricing" class="quick-card">
            <img src="../../assets/icons/chart.svg" class="quick-icon" alt="" />
            <span>Upgrade Plan</span>
          </router-link>
          <router-link to="/dashboard/builder" class="quick-card">
            <img src="../../assets/icons/plus.svg" class="quick-icon" alt="" />
            <span>New Portfolio</span>
          </router-link>
        </div>
      </section>
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
  projects,
  deleteProject,
  notifications,
  unreadCount,
  markAllRead,
  logout,
} from "../../stores/app.js";
import sunIcon from "../../assets/icons/sun.svg";
import moonIcon from "../../assets/icons/moon.svg";

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

import homeIcon from "../../assets/icons/home.svg";
import historyIcon from "../../assets/icons/history.svg";
import userIcon from "../../assets/icons/user.svg";
import chartIcon from "../../assets/icons/chart.svg";

const router = useRouter();
const sidebarCollapsed = ref(false);
const showNotifs = ref(false);

const firstName = computed(
  () => currentUser.value?.name?.split(" ")[0] || "there",
);
const avatarInitials = computed(() => {
  if (!currentUser.value?.name) return "U";
  return currentUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const hour = new Date().getHours();
const timeGreeting =
  hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const totalViews = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.views || 0), 0),
);
const publishedCount = computed(
  () => projects.value.filter((p) => p.status === "published").length,
);

const stats = computed(() => [
  {
    label: "Total Portfolios",
    value: projects.value.length,
    icon: homeIcon,
    iconBg: "rgba(26,63,204,0.12)",
  },
  {
    label: "Draft Portfolios",
    value: projects.value.length - publishedCount.value,
    icon: historyIcon,
    iconBg: "rgba(99,102,241,0.12)",
  },
]);

const activity = ref([
  {
    id: 1,
    type: "success",
    text: "Portfolio 'My Dev Portfolio' was published",
    time: "2 days ago",
  },
  {
    id: 2,
    type: "info",
    text: "You logged in from a new device",
    time: "3 days ago",
  },
  {
    id: 3,
    type: "info",
    text: "Account created successfully",
    time: "5 days ago",
  },
]);

function handleLogout() {
  logout();
  router.push("/login");
}
</script>

<style scoped>
.dash-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg, #eef1f8);
  color: var(--text, #111827);
  font-family: var(--sans, "Plus Jakarta Sans", sans-serif);
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--card-bg, #fff);
  border-right: 1px solid var(--border, #d1d9f0);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  overflow: hidden;
  position: sticky;
  top: 0;
  height: 100vh;
}
.sidebar.collapsed {
  width: 68px;
}
.sidebar.collapsed .sidebar-logo-text,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .sidebar-user-info,
.sidebar.collapsed .sidebar-logo-text {
  display: none;
}
.sidebar.collapsed .sidebar-user {
  justify-content: center;
}
.sidebar.collapsed .sidebar-controls {
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem 1rem;
  border-bottom: 1px solid var(--border, #d1d9f0);
  gap: 0.5rem;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text, #111827);
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
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 6px;
  padding: 0.3rem;
  cursor: pointer;
  color: var(--text-muted, #6b7280);
  display: flex;
  flex-shrink: 0;
  transition: all 0.2s;
}
.collapse-btn:hover {
  border-color: var(--blue, #1a3fcc);
  color: var(--blue, #1a3fcc);
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
  color: var(--text-mid, #374151);
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}
.nav-item:hover {
  background: var(--blue-light, #e8edff);
  color: var(--blue, #1a3fcc);
}
.nav-item.router-link-active {
  background: var(--blue-light, #e8edff);
  color: var(--blue, #1a3fcc);
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
  background: var(--border, #d1d9f0);
  margin: 0.5rem 0;
}

.sidebar-bottom {
  padding: 0.75rem;
  border-top: 1px solid var(--border, #d1d9f0);
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
  background: var(--bg, #eef1f8);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-mid, #374151);
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s;
}
.ctrl-btn:hover {
  border-color: var(--blue, #1a3fcc);
  color: var(--blue, #1a3fcc);
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
  background: var(--blue, #1a3fcc);
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
  color: var(--text, #111827);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-user-plan {
  font-size: 0.7rem;
  color: var(--text-muted, #6b7280);
}
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted, #6b7280);
  display: flex;
  padding: 0.25rem;
  border-radius: 5px;
  transition: color 0.2s;
  flex-shrink: 0;
}
.logout-btn:hover {
  color: #ef4444;
}
.logout-btn .nav-icon {
  width: 16px;
  height: 16px;
}

/* MAIN */
.dash-main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
}

.dash-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.dash-greeting {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text, #111827);
  margin-bottom: 0.2rem;
}
.dash-date {
  font-size: 0.82rem;
  color: var(--text-muted, #6b7280);
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.notif-btn-top {
  position: relative;
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  transition: all 0.2s;
}
.notif-btn-top:hover {
  border-color: var(--blue, #1a3fcc);
}
.topbar-icon {
  width: 18px;
  height: 18px;
}
.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: #fff;
  font-size: 0.58rem;
  font-weight: 700;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-new {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--blue, #1a3fcc);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 2px 8px rgba(26, 63, 204, 0.25);
}
.btn-new:hover {
  background: var(--blue-dark, #1530a8);
  transform: translateY(-1px);
}
.btn-icon {
  width: 16px;
  height: 16px;
  filter: brightness(10);
}

.notif-panel {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.notif-panel-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border, #d1d9f0);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text, #111827);
}
.mark-read-btn {
  font-size: 0.75rem;
  color: var(--blue, #1a3fcc);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.notif-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted, #6b7280);
  font-size: 0.85rem;
}
.notif-row {
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border, #d1d9f0);
  transition: background 0.15s;
}
.notif-row:last-child {
  border-bottom: none;
}
.notif-row.unread {
  background: var(--blue-light, #e8edff);
}
.notif-dot-sm {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}
.notif-dot-sm.info {
  background: var(--blue, #1a3fcc);
}
.notif-dot-sm.success {
  background: #22c55e;
}
.notif-msg-sm {
  font-size: 0.82rem;
  color: var(--text, #111827);
  line-height: 1.45;
  margin-bottom: 0.2rem;
}
.notif-time-sm {
  font-size: 0.72rem;
  color: var(--text-muted, #6b7280);
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.stat-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow, 0 2px 16px rgba(26, 63, 204, 0.08));
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon {
  width: 20px;
  height: 20px;
}
.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text, #111827);
  line-height: 1;
  margin-bottom: 0.2rem;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted, #6b7280);
  font-weight: 500;
}

/* SECTION */
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text, #111827);
}
.section-link {
  font-size: 0.82rem;
  color: var(--blue, #1a3fcc);
  font-weight: 600;
}
.section-link:hover {
  text-decoration: underline;
}

/* PROJECTS */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.project-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.project-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.project-card:hover .project-thumb img {
  transform: scale(1.05);
}
.project-status {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.project-status.published {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}
.project-status.draft {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}
.project-body {
  padding: 0.85rem 1rem 0.5rem;
}
.project-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text, #111827);
  margin-bottom: 0.2rem;
}
.project-meta {
  font-size: 0.75rem;
  color: var(--text-muted, #6b7280);
  margin-bottom: 0.5rem;
}
.project-stats {
  display: flex;
  gap: 1rem;
}
.pstat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--text-muted, #6b7280);
}
.pstat-icon {
  width: 13px;
  height: 13px;
}
.project-actions {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 1rem 0.85rem;
  border-top: 1px solid var(--border, #d1d9f0);
  margin-top: 0.25rem;
}
.paction-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid var(--border, #d1d9f0);
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}
.paction-btn:hover {
  border-color: var(--blue, #1a3fcc);
  background: var(--blue-light, #e8edff);
}
.paction-btn.danger:hover {
  border-color: #ef4444;
  background: #fef2f2;
}
.paction-icon {
  width: 14px;
  height: 14px;
}

.empty-projects {
  background: var(--card-bg, #fff);
  border: 2px dashed var(--border, #d1d9f0);
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  color: var(--text-muted, #6b7280);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.empty-icon {
  width: 40px;
  height: 40px;
  opacity: 0.3;
}
.btn-create {
  background: var(--blue, #1a3fcc);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}
.btn-create:hover {
  background: var(--blue-dark, #1530a8);
}

/* ACTIVITY */
.activity-list {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 12px;
  overflow: hidden;
}
.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--border, #d1d9f0);
  align-items: flex-start;
}
.activity-item:last-child {
  border-bottom: none;
}
.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.activity-dot.success {
  background: #22c55e;
}
.activity-dot.info {
  background: var(--blue, #1a3fcc);
}
.activity-dot.warning {
  background: #f59e0b;
}
.activity-text {
  font-size: 0.85rem;
  color: var(--text, #111827);
  margin-bottom: 0.2rem;
}
.activity-time {
  font-size: 0.72rem;
  color: var(--text-muted, #6b7280);
}

/* QUICK ACTIONS */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.quick-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid, #374151);
  transition: all 0.2s;
  box-shadow: var(--shadow);
}
.quick-card:hover {
  border-color: var(--blue, #1a3fcc);
  color: var(--blue, #1a3fcc);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.quick-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dash-main {
    padding: 1.25rem;
  }
}
@media (max-width: 600px) {
  .dash-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    flex-direction: row;
    overflow-x: auto;
  }
  .sidebar-nav {
    flex-direction: row;
    padding: 0.5rem;
  }
  .sidebar-bottom {
    display: none;
  }
}
</style>
