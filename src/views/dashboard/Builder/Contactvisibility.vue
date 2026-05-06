<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">Contact & Visibility</h1>
      <p class="step-sub">
        Control how visitors reach you and which details appear on your
        portfolio.
      </p>
    </div>

    <!-- ── Contact Information ── -->
    <div class="content-area">
      <p class="section-label">CONTACT INFORMATION</p>
      <div class="fields-grid">
        <!-- Phone -->
        <div class="field-group">
          <label class="field-label">Phone Number</label>
          <div
            class="input-wrap"
            :class="{ focused: focusedField === 'phone', error: errors.phone }"
          >
            <span class="input-icon">
              <img
                :src="icons.user"
                width="15"
                height="15"
                alt="phone"
                class="field-svg-icon"
              />
            </span>
            <div class="phone-prefix" @click="toggleCountry">
              <img
                :src="selectedCountry.flag"
                :alt="selectedCountry.code"
                class="flag-img"
              />
              <span class="prefix-text">{{ selectedCountry.dial }}</span>
              <span class="chevron" :class="{ open: showCountry }">▾</span>
              <div v-if="showCountry" class="country-drop">
                <div
                  v-for="c in countries"
                  :key="c.code"
                  class="country-option"
                  :class="{ active: c.code === selectedCountry.code }"
                  @click.stop="selectCountry(c)"
                >
                  <img :src="c.flag" :alt="c.code" class="flag-img" />
                  <span class="country-name">{{ c.name }}</span>
                  <span class="dial-badge">{{ c.dial }}</span>
                </div>
              </div>
            </div>
            <input
              v-model="form.phone"
              type="tel"
              class="field-input no-left"
              placeholder="012 345 6789"
              @focus="focusedField = 'phone'"
              @blur="
                focusedField = '';
                validatePhone();
              "
            />
          </div>
          <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
        </div>

        <!-- Email -->
        <div class="field-group">
          <label class="field-label">Email Address</label>
          <div
            class="input-wrap"
            :class="{ focused: focusedField === 'email', error: errors.email }"
          >
            <span class="input-icon">
              <img
                :src="icons.bell"
                width="15"
                height="15"
                alt="email"
                class="field-svg-icon"
              />
            </span>
            <input
              v-model="form.email"
              type="email"
              class="field-input"
              placeholder="you@example.com"
              @focus="focusedField = 'email'"
              @blur="
                focusedField = '';
                validateEmail();
              "
            />
          </div>
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <!-- Location -->
        <div class="field-group">
          <label class="field-label">Location</label>
          <div
            class="input-wrap"
            :class="{ focused: focusedField === 'location' }"
          >
            <span class="input-icon">
              <img
                :src="icons.search"
                width="15"
                height="15"
                alt="location"
                class="field-svg-icon"
              />
            </span>
            <input
              v-model="form.location"
              type="text"
              class="field-input"
              placeholder="Phnom Penh, Cambodia"
              @focus="focusedField = 'location'"
              @blur="focusedField = ''"
            />
          </div>
        </div>

        <!-- Website -->
        <div class="field-group">
          <label class="field-label">Personal Website</label>
          <div
            class="input-wrap"
            :class="{
              focused: focusedField === 'website',
              error: errors.website,
            }"
          >
            <span class="input-icon">
              <img
                :src="icons.grid"
                width="15"
                height="15"
                alt="website"
                class="field-svg-icon"
              />
            </span>
            <input
              v-model="form.website"
              type="url"
              class="field-input"
              placeholder="https://yoursite.com"
              @focus="focusedField = 'website'"
              @blur="
                focusedField = '';
                validateWebsite();
              "
            />
          </div>
          <p v-if="errors.website" class="field-error">{{ errors.website }}</p>
        </div>
      </div>
    </div>

    <!-- ── Social Links ── -->
    <div class="content-area">
      <p class="section-label">SOCIAL LINKS</p>
      <div class="socials-list">
        <div v-for="social in socials" :key="social.key" class="social-row">
          <div class="social-brand" :style="{ '--brand': social.color }">
            <img
              :src="social.iconSrc"
              width="14"
              height="14"
              :alt="social.label"
              class="social-icon-img"
            />
            <span class="social-name">{{ social.label }}</span>
          </div>
          <div
            class="input-wrap social-input"
            :class="{ focused: focusedField === social.key }"
          >
            <input
              v-model="form.socials[social.key]"
              type="url"
              class="field-input"
              :placeholder="social.placeholder"
              @focus="focusedField = social.key"
              @blur="focusedField = ''"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Footer ── -->
    <div class="step-foot">
      <button class="btn-draft" @click="$emit('save-draft')">
        Save as Draft
      </button>
      <button class="btn-continue" @click="handleSave">Save & Continue</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

// ── Icon ──
import iconUser from "/src/assets/icons/user.svg";
import iconBell from "/src/assets/icons/bell.svg";
import iconSearch from "/src/assets/icons/search.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconLinkedin from "/src/assets/icons/linkedin.png";
import iconGithub from "/src/assets/icons/github.svg";

const icons = {
  user: iconUser,
  bell: iconBell,
  search: iconSearch,
  grid: iconGrid,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

// ── Country picker ──
const showCountry = ref(false);
const focusedField = ref("");

const countries = [
  { name: "Cambodia", code: "KH", dial: "+855", flag: "/images/flags/kh.png" },
  {
    name: "United States",
    code: "US",
    dial: "+1",
    flag: "/images/flags/us.png",
  },
];
const selectedCountry = ref(countries[0]);

function toggleCountry() {
  showCountry.value = !showCountry.value;
}
function selectCountry(c) {
  selectedCountry.value = c;
  showCountry.value = false;
}

function handleOutsideClick(e) {
  if (!e.target.closest(".phone-prefix")) showCountry.value = false;
}
onMounted(() => document.addEventListener("click", handleOutsideClick));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleOutsideClick),
);

// ── Form ──
const form = reactive({
  phone: "",
  email: "",
  location: "",
  website: "",
  socials: { linkedin: "", github: "" },
  visibility: {
    phone: true,
    email: true,
    location: true,
    website: true,
    socials: true,
  },
});

const errors = reactive({ phone: "", email: "", website: "" });

function validatePhone() {
  errors.phone =
    form.phone && !/^\d[\d\s\-()]{6,}$/.test(form.phone)
      ? "Please enter a valid phone number."
      : "";
}
function validateEmail() {
  errors.email =
    form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "Please enter a valid email address."
      : "";
}
function validateWebsite() {
  errors.website =
    form.website && !/^https?:\/\/.+/.test(form.website)
      ? "URL must start with http:// or https://"
      : "";
}
function handleSave() {
  validatePhone();
  validateEmail();
  validateWebsite();
  if (!errors.phone && !errors.email && !errors.website) emit("next");
}

// ── Socials ──
const socials = reactive([
  {
    key: "linkedin",
    label: "LinkedIn",
    color: "#0a66c2",
    placeholder: "https://linkedin.com/in/yourname",
    iconSrc: iconLinkedin,
  },
  {
    key: "github",
    label: "GitHub",
    color: "#24292e",
    placeholder: "https://github.com/yourname",
    iconSrc: iconGithub,
  },
]);
</script>

<style scoped>
.step-panel {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 0.35rem;
}
.step-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Content card */
.content-area {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow);
}

.section-label {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

/* Fields */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.field-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-mid);
}

/* Input wrapper */
.input-wrap {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--bg-white);
  overflow: hidden;
  transition:
    border-color 0.18s,
    box-shadow 0.18s;
}
.input-wrap.focused {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
}
.input-wrap.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.field-input {
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-family: var(--sans);
  font-size: 0.85rem;
  color: var(--text);
  padding: 0.65rem 0.75rem 0.65rem 0;
  min-width: 0;
}
.field-input.no-left {
  padding-left: 0;
}
.field-input::placeholder {
  color: var(--text-muted);
}

/* Asset icons */
.field-svg-icon {
  opacity: 0.5;
  display: block;
}
.social-icon-img {
  display: block;
}

/* Phone prefix */
.phone-prefix {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px 0 6px;
  border-right: 1.5px solid var(--border);
  cursor: pointer;
  position: relative;
  user-select: none;
  height: 100%;
  min-width: 80px;
}
.flag-img {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}
.prefix-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid);
}
.chevron {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1;
  display: inline-block;
  transition: transform 0.2s;
}
.chevron.open {
  transform: rotate(180deg);
}

/* Country dropdown */
.country-drop {
  position: absolute;
  top: calc(100% + 6px);
  left: -6px;
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  min-width: 180px;
  z-index: 100;
  overflow: hidden;
}
.country-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
  font-size: 0.82rem;
  color: var(--text);
}
.country-option:hover,
.country-option.active {
  background: var(--blue-light);
  color: var(--blue);
}
.country-name {
  flex: 1;
}
.dial-badge {
  font-size: 0.74rem;
  color: var(--text-muted);
  font-weight: 600;
}

.field-error {
  font-size: 0.72rem;
  color: #ef4444;
  margin-top: -0.1rem;
}

/* Social rows */
.socials-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.social-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 0.75rem;
}
.social-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--brand);
}
.social-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid);
  white-space: nowrap;
}
.social-input .field-input {
  padding: 0.55rem 0.75rem;
}

/* Footer */
.step-foot {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-draft {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  padding: 0.7rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-mid);
  cursor: pointer;
  font-family: var(--sans);
  transition: all 0.2s;
}
.btn-draft:hover {
  border-color: var(--blue);
  color: var(--blue);
}

.btn-continue {
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 9px;
  padding: 0.7rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--sans);
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 4px 14px rgba(26, 63, 204, 0.3);
}
.btn-continue:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 640px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }
  .social-row {
    grid-template-columns: 110px 1fr;
  }
  .content-area {
    padding: 1.25rem;
  }
}
</style>
