<template>
  <div class="auth-layout" :data-theme="isDark ? 'dark' : 'light'">
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
            Your story<br />starts here<span class="heading-dot">.</span>
          </h1>
          <p class="left-sub">
            Join thousands of creatives showcasing their work
          </p>
        </div>
        <div class="left-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-controls">
        <button class="ctrl-btn" @click="toggleLang">
          <img
            :src="lang === 'en' ? flagKH : flagUS"
            class="ctrl-flag"
            alt=""
          />
          <span>{{ lang === "en" ? "KH" : "EN" }}</span>
        </button>
        <button class="ctrl-btn" @click="toggleTheme">
          <img
            :src="isDark ? icons.sun : icons.moon"
            class="ctrl-icon"
            alt=""
          />
        </button>
      </div>

      <div class="form-card">
        <div class="form-header">
          <h2 class="form-title">Create your account</h2>
          <p class="form-sub">Start building your portfolio in minutes</p>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
          <!-- Full Name -->
          <div class="field-group" :class="{ error: errors.name }">
            <label class="field-label">FULL NAME</label>
            <div class="field-wrap">
              <span class="field-icon">
                <img
                  :src="icons.user"
                  width="16"
                  height="16"
                  alt=""
                  class="input-icon"
                />
              </span>
              <input
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="field-input"
                @blur="validate('name')"
              />
            </div>
            <span class="field-error" v-if="errors.name">{{
              errors.name
            }}</span>
          </div>

          <!-- Email -->
          <div class="field-group" :class="{ error: errors.email }">
            <label class="field-label">EMAIL ADDRESS</label>
            <div class="field-wrap">
              <span class="field-icon">
                <img
                  :src="icons.mail"
                  width="16"
                  height="16"
                  alt=""
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
                  alt=""
                  class="input-icon"
                />
              </span>
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Min. 8 characters"
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
                  alt="toggle password"
                  class="eye-icon"
                />
              </button>
            </div>
            <div class="password-strength" v-if="form.password">
              <div class="strength-bar">
                <div
                  class="strength-fill"
                  :style="{
                    width: strengthPct + '%',
                    background: strengthColor,
                  }"
                ></div>
              </div>
              <span class="strength-label" :style="{ color: strengthColor }">{{
                strengthLabel
              }}</span>
            </div>
            <span class="field-error" v-if="errors.password">{{
              errors.password
            }}</span>
          </div>

          <!-- Terms -->
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="form.terms"
              class="checkbox-input"
            />
            <span class="checkbox-custom"></span>
            <span class="terms-text">
              I agree to the
              <a href="#" class="terms-link">Terms of Service</a> and
              <a href="#" class="terms-link">Privacy Policy</a>
            </span>
          </label>
          <span class="field-error" v-if="errors.terms">{{
            errors.terms
          }}</span>

          <button
            type="submit"
            class="btn-submit"
            :class="{ loading: isLoading }"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="spinner"></span>
          </button>

          <p class="switch-auth">
            Already have an account?
            <router-link to="/login" class="switch-link">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import {
  isDark,
  lang,
  toggleTheme,
  toggleLang,
  login,
} from "../../stores/app.js";

// ── Icons ──
import iconSun from "/src/assets/icons/sun.svg";
import iconMoon from "/src/assets/icons/moon.svg";
import iconUser from "/src/assets/icons/user.svg";
import iconMail from "/src/assets/icons/mail.svg";
import iconLock from "/src/assets/icons/lock.png";
import iconEye from "/src/assets/icons/eye.svg";
import iconEyeOff from "/src/assets/icons/eye-off.svg";

const icons = {
  sun: iconSun,
  moon: iconMoon,
  user: iconUser,
  mail: iconMail,
  lock: iconLock,
  eye: iconEye,
  eyeOff: iconEyeOff,
};

const flagKH = "/images/flags/kh.png";
const flagUS = "/images/flags/us.png";

// ── State ──
const router = useRouter();
const showPass = ref(false);
const isLoading = ref(false);

const form = reactive({ name: "", email: "", password: "", terms: false });
const errors = reactive({ name: "", email: "", password: "", terms: "" });

// ── Password strength ──
const strength = computed(() => {
  const p = form.password;
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
});
const strengthPct = computed(() => (strength.value / 4) * 100);
const strengthColor = computed(
  () =>
    ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"][strength.value - 1] ||
    "#ef4444",
);
const strengthLabel = computed(
  () => ["Weak", "Fair", "Good", "Strong"][strength.value - 1] || "Weak",
);

// ── Validation ──
function validate(field) {
  errors[field] = "";
  if (field === "name" && !form.name.trim())
    errors.name = "Full name is required.";
  if (field === "email" && !form.email.trim())
    errors.email = "Email is required.";
  else if (field === "email" && !/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email.";
  if (field === "password" && form.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  if (field === "terms" && !form.terms)
    errors.terms = "You must accept the terms.";
}

async function handleSubmit() {
  ["name", "email", "password", "terms"].forEach(validate);
  if (Object.values(errors).some((e) => e)) return;
  isLoading.value = true;
  await new Promise((r) => setTimeout(r, 1400));
  isLoading.value = false;
  login({ name: form.name, email: form.email, plan: "Free", avatar: "" });
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

/* ── Left panel ── */
.auth-left {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    145deg,
    #1a3fcc,
    #2b50e8 40%,
    #1730b8 70%,
    #2236c0
  );
}
[data-theme="dark"] .auth-left {
  background: linear-gradient(
    145deg,
    #0d1f6b,
    #1a2fa0 40%,
    #0f1d7a 70%,
    #152490
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
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
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
  background: #fff;
  width: 24px;
  border-radius: 4px;
}

/* ── Right panel ── */
.auth-right {
  background: var(--bg-white, #f5f6fa);
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
  min-height: 100vh;
}
[data-theme="dark"] .auth-right {
  background: var(--bg, #0f1117);
}

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
  background: var(--card-bg, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-mid, #374151);
  cursor: pointer;
  transition: all 0.2s;
}
.ctrl-btn:hover {
  border-color: var(--blue, #1a3fcc);
  color: var(--blue, #1a3fcc);
}
.ctrl-flag {
  width: 20px;
  height: 14px;
  border-radius: 2px;
}
.ctrl-icon {
  width: 15px;
  height: 15px;
}

.form-card {
  background: var(--bg-white, #fff);
  padding: 3.5rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
[data-theme="dark"] .form-card {
  background: var(--bg, #0f1117);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}
.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text, #111827);
  margin-bottom: 0.4rem;
}
.form-sub {
  font-size: 0.88rem;
  color: var(--text-muted, #6b7280);
}

/* ── Form ── */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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
  color: var(--text-muted, #6b7280);
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
  background: var(--bg, #f1f3f9);
  border: 1.5px solid var(--border, #e5e7eb);
  border-radius: 9px;
  padding: 0.75rem 2.8rem 0.75rem 2.6rem;
  font-family: var(--sans);
  font-size: 0.88rem;
  color: var(--text, #111827);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field-input::placeholder {
  color: var(--text-muted, #b0b7c3);
}
.field-input:focus {
  border-color: var(--blue, #1a3fcc);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  background: var(--bg-white, #fff);
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
  opacity: 0.45;
  transition: opacity 0.2s;
}
.field-eye:hover .eye-icon {
  opacity: 1;
}
.field-error {
  font-size: 0.72rem;
  color: #ef4444;
}

/* ── Password strength ── */
.password-strength {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.strength-bar {
  flex: 1;
  height: 4px;
  background: var(--border, #e5e7eb);
  border-radius: 99px;
  overflow: hidden;
}
.strength-fill {
  height: 100%;
  border-radius: 99px;
  transition:
    width 0.3s,
    background 0.3s;
}
.strength-label {
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
}

/* ── Checkbox ── */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.83rem;
}
.checkbox-input {
  display: none;
}
.checkbox-custom {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  border: 1.5px solid var(--border, #d1d5db);
  border-radius: 4px;
  background: var(--bg, #f9fafb);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.checkbox-input:checked + .checkbox-custom {
  background: var(--blue, #1a3fcc);
  border-color: var(--blue, #1a3fcc);
}
.checkbox-input:checked + .checkbox-custom::after {
  content: "";
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.terms-text {
  font-size: 0.82rem;
  color: var(--text-mid, #374151);
  line-height: 1.5;
}
.terms-link {
  color: var(--blue, #1a3fcc);
  font-weight: 600;
}

/* ── Submit ── */
.btn-submit {
  width: 100%;
  background: var(--blue, #1a3fcc);
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
}
.btn-submit:hover {
  background: var(--blue-dark, #1530a8);
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

.switch-auth {
  text-align: center;
  font-size: 0.83rem;
  color: var(--text-muted, #6b7280);
}
.switch-link {
  color: var(--blue, #1a3fcc);
  font-weight: 700;
  margin-left: 0.25rem;
}
.switch-link:hover {
  text-decoration: underline;
}

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
