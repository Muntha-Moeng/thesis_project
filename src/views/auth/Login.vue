<template>
  <div class="auth-layout" :data-theme="isDark ? 'dark' : 'light'">
    <!-- ── Left Panel ── -->
    <div class="auth-left">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="left-content">
        <router-link to="/" class="auth-logo">
          <img
            src="../../assets/icons/logo.svg"
            alt="Logo"
            class="auth-logo-img"
          />
          Portfolio Builder
        </router-link>
        <div class="left-text">
          <h1 class="left-heading">
            Welcome<br />back<span class="heading-dot">.</span>
          </h1>
          <p class="left-sub">Sign in to continue building your portfolio</p>
        </div>
        <div class="left-dots">
          <span class="dot"></span>
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <!-- ── Right Panel ── -->
    <div class="auth-right">
      <!-- Theme + Lang controls -->
      <div class="auth-controls">
        <button
          class="ctrl-btn"
          :title="lang === 'en' ? 'Switch to Khmer' : 'Switch to English'"
          @click="toggleLang"
        >
          <img
            :src="lang === 'en' ? flagKH : flagUS"
            class="ctrl-flag"
            :alt="lang === 'en' ? 'KH' : 'US'"
          />
          <span>{{ lang === "en" ? "KH" : "EN" }}</span>
        </button>
        <button
          class="ctrl-btn"
          :title="isDark ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <img
            :src="isDark ? icons.sun : icons.moon"
            class="ctrl-icon"
            :alt="isDark ? 'Light' : 'Dark'"
          />
        </button>
      </div>

      <div class="form-card">
        <div class="form-header">
          <h2 class="form-title">Hello! Welcome back</h2>
          <p class="form-sub">
            Log in to your account to continue your journey
          </p>
        </div>

        <form class="auth-form" novalidate @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="field-group" :class="{ error: errors.email }">
            <label class="field-label">EMAIL ADDRESS</label>
            <div class="field-wrap">
              <span class="field-icon">
                <img
                  :src="icons.user"
                  width="16"
                  height="16"
                  alt="email"
                  class="input-icon"
                />
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="name@company.com"
                class="field-input"
                @blur="validate('email')"
              />
            </div>
            <span class="field-error" v-if="errors.email">{{
              errors.email
            }}</span>
          </div>

          <!-- Password -->
          <div class="field-group" :class="{ error: errors.password }">
            <label class="field-label">PASSWORD</label>
            <div class="field-wrap">
              <span class="field-icon">
                <img
                  :src="icons.lock"
                  width="16"
                  height="16"
                  alt="password"
                  class="input-icon"
                />
              </span>
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="••••••••"
                class="field-input"
                @blur="validate('password')"
              />
              <button
                type="button"
                class="field-eye"
                @click="showPass = !showPass"
              >
                <img
                  :src="showPass ? icons.eyeOff : icons.eye"
                  width="16"
                  height="16"
                  :alt="showPass ? 'Hide' : 'Show'"
                  class="eye-icon"
                />
              </button>
            </div>
            <span class="field-error" v-if="errors.password">{{
              errors.password
            }}</span>
          </div>

          <!-- Remember + Forgot -->
          <div class="remember-row">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.remember"
                class="checkbox-input"
              />
              <span class="checkbox-custom"></span>
              <span class="remember-text">Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn-submit"
            :class="{ loading: isLoading }"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="spinner"></span>
          </button>

          <!-- Login Error -->
          <div class="form-error" v-if="loginError">
            <img
              :src="icons.user"
              width="14"
              height="14"
              alt="error"
              class="error-icon"
            />
            {{ loginError }}
          </div>

          <p class="switch-auth">
            Don't have an account?
            <router-link to="/signup" class="switch-link"
              >Create Account</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  isDark,
  lang,
  toggleTheme,
  toggleLang,
  login,
} from "../../stores/app.js";

// ── Icon imports  ──
import iconSun from "/src/assets/icons/sun.svg";
import iconMoon from "/src/assets/icons/moon.svg";
import iconUser from "/src/assets/icons/user.svg";
import iconlock from "/src/assets/icons/lock.png";
import iconEye from "/src/assets/icons/eye.svg";
import iconEyeoff from "/src/assets/icons/eye-off.svg";

const icons = {
  sun: iconSun,
  moon: iconMoon,
  user: iconUser,
  lock: iconlock,
  eye: iconEye,
  eyeOff: iconEyeoff,
};

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

// ── State ──
const router = useRouter();
const showPass = ref(false);
const isLoading = ref(false);
const loginError = ref("");
const form = reactive({ email: "", password: "", remember: false });
const errors = reactive({ email: "", password: "" });

// ── Validation ──
function validate(field) {
  errors[field] = "";
  if (field === "email") {
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Enter a valid email.";
  }
  if (field === "password" && !form.password)
    errors.password = "Password is required.";
}

function validateAll() {
  ["email", "password"].forEach(validate);
  return !Object.values(errors).some((e) => e);
}

// ── Submit ──
async function handleSubmit() {
  loginError.value = "";
  if (!validateAll()) return;
  isLoading.value = true;
  await new Promise((r) => setTimeout(r, 1400));
  isLoading.value = false;
  login({ name: form.email.split("@")[0], email: form.email, plan: "Free" });
  router.push("/dashboard");
}
</script>

<style scoped>
/* ── Layout ── */
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ── Left Panel ── */
.auth-left {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    145deg,
    #1a3fcc 0%,
    #2b50e8 40%,
    #1730b8 70%,
    #2236c0 100%
  );
}
[data-theme="dark"] .auth-left {
  background: linear-gradient(
    145deg,
    #0d1f6b 0%,
    #1a2fa0 40%,
    #0f1d7a 70%,
    #152490 100%
  );
}

.blob {
  position: absolute;
  border-radius: 50%;
}
.blob-1 {
  width: 380px;
  height: 380px;
  top: -120px;
  left: -100px;
  background: rgba(255, 255, 255, 0.1);
}
.blob-2 {
  width: 260px;
  height: 260px;
  bottom: -80px;
  right: -80px;
  background: rgba(255, 255, 255, 0.06);
}
.blob-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: 55%;
  background: rgba(255, 255, 255, 0.05);
}

.left-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 480px;
  width: 100%;
}
.auth-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
}
.auth-logo-img {
  width: 24px;
  height: 24px;
}

.left-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.left-heading {
  font-size: clamp(2.4rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}
.heading-dot {
  color: rgba(255, 255, 255, 0.6);
}
.left-sub {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.left-dots {
  display: flex;
  gap: 0.5rem;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
}
.dot.active {
  width: 24px;
  background: #fff;
  border-radius: 4px;
}

/* ── Right Panel ── */
.auth-right {
  background: var(--bg-white);
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
  min-height: 100vh;
}

/* ── Controls (theme + lang) ── */
.auth-controls {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}
.ctrl-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
}
.ctrl-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.ctrl-flag {
  width: 20px;
  height: 14px;
  border-radius: 2px;
}
.ctrl-icon {
  width: 15px;
  height: 15px;
  display: block;
}

/* ── Form Card ── */
.form-card {
  background: var(--bg-white);
  border-radius: 0;
  padding: 3.5rem 3rem;
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-header {
  margin-bottom: 2rem;
  text-align: center;
}
.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.4rem;
}
.form-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* ── Form ── */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field-group.error .field-input {
  border-color: #ef4444;
}
.field-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 0.85rem;
  display: flex;
  pointer-events: none;
}
.input-icon {
  display: block;
  opacity: 0.45;
}

.field-input {
  width: 100%;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 9px;
  padding: 0.75rem 2.8rem 0.75rem 2.6rem;
  font-family: var(--sans);
  font-size: 0.88rem;
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field-input::placeholder {
  color: var(--text-muted);
}
.field-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  background: var(--bg-white);
}

/* Eye toggle */
.field-eye {
  position: absolute;
  right: 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  transition: opacity 0.2s;
}
.eye-icon {
  display: block;
  opacity: 0.45;
}
.field-eye:hover .eye-icon {
  opacity: 0.85;
}

.field-error {
  font-size: 0.72rem;
  color: #ef4444;
}

/* ── Remember row ── */
.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.83rem;
  color: var(--text-mid);
}
.checkbox-input {
  display: none;
}
.checkbox-custom {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border: 1.5px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.checkbox-input:checked + .checkbox-custom {
  background: var(--blue);
  border-color: var(--blue);
}
.checkbox-input:checked + .checkbox-custom::after {
  content: "";
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.remember-text {
  font-size: 0.82rem;
  color: var(--text-mid);
}
.forgot-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--blue);
  transition: opacity 0.2s;
}
.forgot-link:hover {
  opacity: 0.75;
  text-decoration: underline;
}

/* ── Submit button ── */
.btn-submit {
  width: 100%;
  background: var(--blue);
  color: #fff;
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: 9px;
  padding: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(26, 63, 204, 0.3);
  transition:
    background 0.2s,
    transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  margin-top: 0.2rem;
}
.btn-submit:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}
.btn-submit.loading {
  opacity: 0.85;
  pointer-events: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Error banner ── */
.form-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  font-size: 0.82rem;
  color: #dc2626;
}
.error-icon {
  display: block;
  filter: invert(20%) sepia(90%) saturate(2000%) hue-rotate(340deg)
    brightness(95%);
  flex-shrink: 0;
}

/* ── Switch link ── */
.switch-auth {
  text-align: center;
  font-size: 0.83rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}
.switch-link {
  color: var(--blue);
  font-weight: 700;
  margin-left: 0.25rem;
}
.switch-link:hover {
  text-decoration: underline;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }
  .auth-left {
    display: none;
  }
  .form-card {
    padding: 2.5rem 1.5rem;
    padding-top: 4.5rem;
  }
}
</style>
