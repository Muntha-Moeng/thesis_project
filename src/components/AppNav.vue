<template>
  <nav class="nav" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">
        <img src="../assets/icons/logo.svg" alt="Logo" class="logo-img" />
        Portfolio Builder
      </router-link>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to" class="nav-link">{{
            link.label
          }}</router-link>
        </li>
      </ul>

      <div class="nav-actions">
        <!-- Language toggle -->
        <button
          class="toggle-btn lang-btn"
          @click="toggleLang"
          :title="lang === 'en' ? 'Switch to Khmer' : 'Switch to English'"
        >
          <img
            :src="lang === 'en' ? flagKH : flagUS"
            class="lang-flag-img"
            :alt="lang === 'en' ? 'KH' : 'US'"
          />
          <span class="lang-label">{{ lang === "en" ? "KH" : "EN" }}</span>
        </button>

        <!-- Theme toggle -->
        <button
          class="toggle-btn theme-btn"
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light' : 'Switch to Dark'"
        >
          <img
            :src="isDark ? sunIcon : moonIcon"
            class="theme-icon-img"
            :alt="isDark ? 'Light mode' : 'Dark mode'"
          />
        </button>

        <!-- Logged out -->
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="btn-login">{{
            t("login")
          }}</router-link>
          <router-link to="/signup" class="btn-get-started">{{
            t("getStarted")
          }}</router-link>
        </template>

        <!-- Logged in -->
        <template v-else>
          <!-- Notification bell -->
          <button
            class="toggle-btn notif-btn"
            @click="showNotifs = !showNotifs"
            title="Notifications"
          >
            <img
              src="../assets/icons/bell.svg"
              class="theme-icon-img"
              alt="Notifications"
            />
            <span class="notif-badge" v-if="unreadCount > 0">{{
              unreadCount
            }}</span>
          </button>

          <!-- Notifications dropdown -->
          <div
            class="notif-dropdown"
            v-if="showNotifs"
            v-click-outside="() => (showNotifs = false)"
          >
            <div class="notif-head">
              <span>Notifications</span>
              <button class="mark-read-btn" @click="markAllRead">
                Mark all read
              </button>
            </div>
            <div class="notif-list">
              <div
                v-for="n in notifications"
                :key="n.id"
                class="notif-item"
                :class="{ unread: !n.read }"
              >
                <div class="notif-dot" :class="n.type"></div>
                <div class="notif-body">
                  <p class="notif-msg">{{ n.message }}</p>
                  <span class="notif-time">{{ n.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Avatar / Dashboard link -->
          <router-link
            to="/dashboard"
            class="user-avatar"
            :title="currentUser?.name"
          >
            {{ avatarInitials }}
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  isDark,
  lang,
  toggleTheme,
  toggleLang,
  t,
  isLoggedIn,
  currentUser,
  notifications,
  unreadCount,
  markAllRead,
} from "../stores/app.js";

import sunIcon from "../assets/icons/sun.svg";
import moonIcon from "../assets/icons/moon.svg";

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

const scrolled = ref(false);
const showNotifs = ref(false);

const links = computed(() => [
  { to: "/", label: t("home") },
  { to: "/templates", label: t("templates") },
  { to: "/howitworks", label: t("howItWorks") },
  { to: "/pricing", label: t("pricing") },
]);

const avatarInitials = computed(() => {
  if (!currentUser.value?.name) return "U";
  return currentUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

function onScroll() {
  scrolled.value = window.scrollY > 40;
}
onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el._handler = (e) => {
      if (!el.contains(e.target)) binding.value(e);
    };
    document.addEventListener("click", el._handler);
  },
  unmounted(el) {
    document.removeEventListener("click", el._handler);
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--nav-bg);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    background 0.3s;
}
.nav.scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 2px 20px rgba(26, 63, 204, 0.07);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 2rem;
  height: 64px;
}

.nav-logo {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}
.logo-img {
  width: 24px;
  height: 24px;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0 auto;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-mid);
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
}
.nav-link:hover,
.router-link-exact-active.nav-link {
  color: var(--blue);
}
.router-link-exact-active.nav-link {
  border-bottom: 2px solid var(--blue);
  border-radius: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  position: relative;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.4rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
  height: 34px;
  position: relative;
}
.toggle-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
  background: var(--blue-light);
}

.theme-icon-img {
  width: 16px;
  height: 16px;
  display: block;
}
.lang-flag-img {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  display: block;
}
.lang-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notif-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 340px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  z-index: 300;
  overflow: hidden;
}
.notif-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}
.mark-read-btn {
  font-size: 0.75rem;
  color: var(--blue);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.notif-list {
  max-height: 300px;
  overflow-y: auto;
}
.notif-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}
.notif-item:last-child {
  border-bottom: none;
}
.notif-item.unread {
  background: var(--blue-light);
}
.notif-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.notif-dot.info {
  background: var(--blue);
}
.notif-dot.success {
  background: #22c55e;
}
.notif-dot.warning {
  background: #f59e0b;
}
.notif-msg {
  font-size: 0.82rem;
  color: var(--text);
  line-height: 1.45;
  margin-bottom: 0.2rem;
}
.notif-time {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.btn-login {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-mid);
  padding: 0.45rem 1rem;
  transition: color 0.2s;
}
.btn-login:hover {
  color: var(--blue);
}
.btn-get-started {
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--blue);
  color: #fff;
  padding: 0.55rem 1.3rem;
  border-radius: 8px;
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 2px 8px rgba(26, 63, 204, 0.25);
}
.btn-get-started:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(26, 63, 204, 0.3);
}
.user-avatar:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 14px rgba(26, 63, 204, 0.4);
}
</style>
