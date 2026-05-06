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

    <!-- Main content -->
    <main class="dash-main">
      <header class="page-header">
        <div>
          <h1 class="page-title">Account Management</h1>
          <p class="page-sub">Manage your profile, security and preferences</p>
        </div>
      </header>

      <div class="account-grid">
        <!-- Profile Card -->
        <section class="card profile-card">
          <div class="card-head">
            <h2 class="card-title">Profile Information</h2>
          </div>
          <div class="profile-avatar-row">
            <div class="profile-avatar">{{ avatarInitials }}</div>
            <div>
              <p class="avatar-name">{{ profileForm.name }}</p>
              <p class="avatar-email">{{ profileForm.email }}</p>
              <span class="plan-badge"
                >{{ currentUser?.plan || "Free" }} Plan</span
              >
            </div>
          </div>
          <div class="form-grid">
            <div class="field-group">
              <label class="field-label">FULL NAME</label>
              <input
                v-model="profileForm.name"
                class="field-input"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div class="field-group">
              <label class="field-label">EMAIL ADDRESS</label>
              <input
                v-model="profileForm.email"
                class="field-input"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div class="field-group">
              <label class="field-label">JOB TITLE</label>
              <input
                v-model="profileForm.jobTitle"
                class="field-input"
                type="text"
                placeholder="e.g. Full-Stack Developer"
              />
            </div>
            <div class="field-group">
              <label class="field-label">WEBSITE</label>
              <input
                v-model="profileForm.website"
                class="field-input"
                type="url"
                placeholder="https://yoursite.com"
              />
            </div>
            <div class="field-group full-width">
              <label class="field-label">BIO</label>
              <textarea
                v-model="profileForm.bio"
                class="field-input field-textarea"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </div>
          <div class="card-foot">
            <button
              class="btn-save"
              @click="saveProfile"
              :class="{ loading: saving }"
            >
              <span v-if="!saving">Save Changes</span>
              <span v-else class="spinner"></span>
            </button>
            <span class="save-success" v-if="savedMsg">
              <img :src="icons.check" class="check-icon" alt="" />
              Saved!
            </span>
          </div>
        </section>

        <!-- Security Card -->
        <section class="card">
          <div class="card-head">
            <h2 class="card-title">Security</h2>
          </div>
          <div class="form-grid">
            <div class="field-group full-width">
              <label class="field-label">CURRENT PASSWORD</label>
              <div class="field-wrap">
                <input
                  v-model="secForm.current"
                  :type="showCurrent ? 'text' : 'password'"
                  class="field-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  class="field-eye"
                  @click="showCurrent = !showCurrent"
                >
                  <img
                    :src="showCurrent ? icons.eyeOff : icons.eye"
                    width="15"
                    height="15"
                    alt="toggle password"
                    class="eye-icon"
                  />
                </button>
              </div>
            </div>
            <div class="field-group">
              <label class="field-label">NEW PASSWORD</label>
              <input
                v-model="secForm.newPass"
                type="password"
                class="field-input"
                placeholder="Min. 8 characters"
              />
            </div>
            <div class="field-group">
              <label class="field-label">CONFIRM PASSWORD</label>
              <input
                v-model="secForm.confirm"
                type="password"
                class="field-input"
                placeholder="Repeat password"
              />
            </div>
          </div>
          <div class="card-foot">
            <button class="btn-save" @click="changePassword">
              Update Password
            </button>
          </div>
        </section>

        <!-- Plan Card -->
        <section class="card plan-card">
          <div class="card-head">
            <h2 class="card-title">Current Plan</h2>
          </div>
          <div class="plan-info">
            <div class="plan-name">{{ currentUser?.plan || "Free" }}</div>
            <p class="plan-desc">
              {{
                currentUser?.plan === "Pro"
                  ? "All templates, custom domain, PDF export."
                  : "Get started with 3 templates and PNG export."
              }}
            </p>
          </div>
          <div class="plan-features">
            <div class="pf-item" v-for="f in planFeatures" :key="f">
              <img :src="icons.check" class="pf-check" alt="" />
              <span>{{ f }}</span>
            </div>
          </div>
          <router-link to="/pricing" class="btn-upgrade"
            >Upgrade to Pro →</router-link
          >
        </section>

        <!-- Danger Zone -->
        <section class="card danger-card">
          <div class="card-head">
            <h2 class="card-title danger-title">Danger Zone</h2>
          </div>
          <div class="danger-row">
            <div>
              <p class="danger-label">Delete Account</p>
              <p class="danger-desc">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </div>
            <button class="btn-danger" @click="confirmDelete = true">
              Delete Account
            </button>
          </div>
        </section>
      </div>

      <!-- Confirm Delete Modal -->
      <Teleport to="body">
        <div
          class="modal-backdrop"
          v-if="confirmDelete"
          @click.self="confirmDelete = false"
        >
          <div class="modal-box">
            <h3 class="modal-title">Delete Account?</h3>
            <p class="modal-desc">
              This action is permanent and cannot be undone. All your portfolios
              and data will be lost.
            </p>
            <div class="modal-actions">
              <button class="btn-cancel" @click="confirmDelete = false">
                Cancel
              </button>
              <button class="btn-danger-confirm" @click="handleDeleteAccount">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  isDark,
  lang,
  toggleTheme,
  toggleLang,
  currentUser,
  logout,
} from "../../stores/app.js";

// ── Icons ──
import iconSun from "/src/assets/icons/sun.svg";
import iconMoon from "/src/assets/icons/moon.svg";
import iconChevronLeft from "/src/assets/icons/chevron-left.svg";
import iconEye from "/src/assets/icons/eye.svg";
import iconEyeOff from "/src/assets/icons/eye-off.svg";
import iconCheck from "/src/assets/icons/check.svg";

const icons = {
  sun: iconSun,
  moon: iconMoon,
  chevronLeft: iconChevronLeft,
  eye: iconEye,
  eyeOff: iconEyeOff,
  check: iconCheck,
};

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

// ── State ──
const router = useRouter();
const sidebarCollapsed = ref(false);
const saving = ref(false);
const savedMsg = ref(false);
const showCurrent = ref(false);
const confirmDelete = ref(false);

const profileForm = reactive({
  name: currentUser.value?.name || "",
  email: currentUser.value?.email || "",
  jobTitle: "",
  website: "",
  bio: "",
});

const secForm = reactive({ current: "", newPass: "", confirm: "" });

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

const planFeatures = computed(() =>
  currentUser.value?.plan === "Pro"
    ? [
        "All Templates",
        "Custom Domain",
        "PDF & Source Export",
        "Priority Support",
        "Analytics Dashboard",
      ]
    : ["3 Templates", "Portfolio Export (PNG)", "Community Support"],
);

// ── Handlers ──
async function saveProfile() {
  saving.value = true;
  await new Promise((r) => setTimeout(r, 900));
  saving.value = false;
  savedMsg.value = true;
  setTimeout(() => (savedMsg.value = false), 2500);
}

function changePassword() {
  alert("Password updated successfully! (mock)");
  secForm.current = "";
  secForm.newPass = "";
  secForm.confirm = "";
}

function handleLogout() {
  logout();
  router.push("/login");
}

function handleDeleteAccount() {
  logout();
  router.push("/");
}
</script>

<style scoped>
/* ── Layout ── */
.dash-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg, #eef1f8);
  color: var(--text, #111827);
  font-family: var(--sans, "Plus Jakarta Sans", sans-serif);
}

/* ── Sidebar ── */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--card-bg, #fff);
  border-right: 1px solid var(--border, #d1d9f0);
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
  display: flex;
  flex-shrink: 0;
  transition: all 0.2s;
}
.collapse-btn:hover {
  border-color: var(--blue, #1a3fcc);
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
  color: var(--text-mid, #374151);
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
}
.nav-item:hover,
.nav-item.router-link-active {
  background: var(--blue-light, #e8edff);
  color: var(--blue, #1a3fcc);
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
  display: flex;
  padding: 0.25rem;
  border-radius: 5px;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.logout-btn:hover {
  opacity: 0.7;
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
.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text, #111827);
  margin-bottom: 0.3rem;
}
.page-sub {
  font-size: 0.88rem;
  color: var(--text-muted, #6b7280);
}

/* ── Account grid ── */
.account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #d1d9f0);
  border-radius: 14px;
  padding: 1.75rem;
  box-shadow: var(--shadow, 0 2px 16px rgba(26, 63, 204, 0.08));
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.card-head {
  border-bottom: 1px solid var(--border, #d1d9f0);
  padding-bottom: 1rem;
}
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text, #111827);
}

.profile-card {
  grid-column: 1 / -1;
}
.profile-avatar-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.profile-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--blue, #1a3fcc);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.avatar-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text, #111827);
  margin-bottom: 0.15rem;
}
.avatar-email {
  font-size: 0.82rem;
  color: var(--text-muted, #6b7280);
  margin-bottom: 0.4rem;
}
.plan-badge {
  font-size: 0.68rem;
  font-weight: 700;
  background: var(--blue-light, #e8edff);
  color: var(--blue, #1a3fcc);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
}

/* ── Form ── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field-group.full-width {
  grid-column: 1 / -1;
}
.field-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted, #6b7280);
}
.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-input {
  width: 100%;
  background: var(--bg, #eef1f8);
  border: 1.5px solid var(--border, #d1d9f0);
  border-radius: 9px;
  padding: 0.7rem 1rem;
  font-family: var(--sans);
  font-size: 0.875rem;
  color: var(--text, #111827);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field-input:focus {
  border-color: var(--blue, #1a3fcc);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  background: var(--card-bg, #fff);
}
.field-textarea {
  min-height: 90px;
  resize: vertical;
}
.field-eye {
  position: absolute;
  right: 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
}
.eye-icon {
  display: block;
  opacity: 0.5;
}
.field-eye:hover .eye-icon {
  opacity: 1;
}

.card-foot {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid var(--border, #d1d9f0);
  padding-top: 1rem;
}
.btn-save {
  background: var(--blue, #1a3fcc);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  min-height: 38px;
}
.btn-save:hover {
  background: var(--blue-dark, #1530a8);
  transform: translateY(-1px);
}
.btn-save.loading {
  opacity: 0.8;
  pointer-events: none;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.save-success {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #16a34a;
}
.check-icon {
  width: 14px;
  height: 14px;
}

/* ── Plan card ── */
.plan-info {
  background: linear-gradient(
    135deg,
    var(--blue, #1a3fcc),
    var(--blue-mid, #2b50e8)
  );
  border-radius: 10px;
  padding: 1.25rem;
  color: #fff;
}
.plan-name {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}
.plan-desc {
  font-size: 0.82rem;
  opacity: 0.85;
  line-height: 1.5;
}
.plan-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pf-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--text, #111827);
}
.pf-check {
  width: 14px;
  height: 14px;
}
.btn-upgrade {
  display: block;
  text-align: center;
  background: var(--blue, #1a3fcc);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 9px;
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 2px 10px rgba(26, 63, 204, 0.3);
  margin-top: auto;
}
.btn-upgrade:hover {
  background: var(--blue-dark, #1530a8);
  transform: translateY(-1px);
}

/* ── Danger zone ── */
.danger-card {
  border-color: #fecaca;
}
.danger-title {
  color: #dc2626;
}
.danger-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.danger-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text, #111827);
  margin-bottom: 0.3rem;
}
.danger-desc {
  font-size: 0.8rem;
  color: var(--text-muted, #6b7280);
  line-height: 1.5;
  max-width: 340px;
}
.btn-danger {
  flex-shrink: 0;
  background: #fef2f2;
  color: #dc2626;
  border: 1.5px solid #fecaca;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-danger:hover {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(5, 10, 50, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: var(--card-bg, #fff);
  border-radius: 14px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}
.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text, #111827);
  margin-bottom: 0.75rem;
}
.modal-desc {
  font-size: 0.85rem;
  color: var(--text-muted, #6b7280);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
.btn-cancel {
  background: var(--bg, #eef1f8);
  border: 1px solid var(--border, #d1d9f0);
  color: var(--text-mid, #374151);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover {
  border-color: var(--text-muted, #6b7280);
}
.btn-danger-confirm {
  background: #dc2626;
  color: #fff;
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-danger-confirm:hover {
  background: #b91c1c;
}

@media (max-width: 900px) {
  .account-grid {
    grid-template-columns: 1fr;
  }
  .profile-card {
    grid-column: 1;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
