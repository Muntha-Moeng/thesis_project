<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">Intro Page Editor</h1>
      <p class="step-sub">
        These details will be visible on your public portfolio home.
      </p>
    </div>

    <div class="content-area">
      <!-- Avatar Upload -->
      <div class="avatar-row">
        <div class="avatar-wrap">
          <div class="avatar-preview" :style="avatarStyle">
            <span v-if="!form.avatarUrl" class="avatar-initials">{{
              initials
            }}</span>
            <img
              v-else
              :src="form.avatarUrl"
              alt="Profile"
              class="avatar-img"
            />
            <div class="avatar-edit-badge">
              <img
                :src="icons.edit"
                width="10"
                height="10"
                alt="edit"
                class="badge-icon"
              />
            </div>
          </div>
          <div class="avatar-actions">
            <label class="btn-upload">
              <img
                :src="icons.upload"
                width="14"
                height="14"
                alt="upload"
                class="btn-icon"
              />
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                @change="handleAvatarChange"
                style="display: none"
              />
            </label>
            <p class="upload-hint">
              Recommended: Square JPG or PNG, at least 400×400px. Maximum 2MB.
            </p>
          </div>
        </div>
      </div>

      <!-- Fields -->
      <div class="fields-grid">
        <div class="field-group">
          <label class="field-label">FULL NAME</label>
          <input
            v-model="form.name"
            class="field-input"
            type="text"
            placeholder="Alexander Sterling"
          />
        </div>
        <div class="field-group">
          <label class="field-label">CURRENT ROLE / JOB TITLE</label>
          <input
            v-model="form.jobTitle"
            class="field-input"
            type="text"
            placeholder="e.g. Senior Brand Designer"
          />
        </div>
        <div class="field-group full">
          <label class="field-label">SHORT INTRODUCTION / TAGLINE</label>
          <textarea
            v-model="form.tagline"
            class="field-input field-textarea"
            placeholder="Write a brief, compelling introduction about your work and creative philosophy..."
          ></textarea>
        </div>
      </div>

      <!-- Social Links -->
      <div class="section-block">
        <h3 class="section-label">Social Links</h3>
        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">
              <img
                :src="icons.linkedin"
                width="12"
                height="12"
                alt="linkedin"
                class="label-icon"
              />
              LINKEDIN
            </label>
            <input
              v-model="form.linkedin"
              class="field-input"
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div class="field-group">
            <label class="field-label">
              <img
                :src="icons.github"
                width="12"
                height="12"
                alt="github"
                class="label-icon"
              />
              GITHUB
            </label>
            <input
              v-model="form.github"
              class="field-input"
              type="url"
              placeholder="https://github.com/username"
            />
          </div>
          <div class="field-group">
            <label class="field-label">
              <img
                :src="icons.globe"
                width="12"
                height="12"
                alt="website"
                class="label-icon"
              />
              PORTFOLIO URL
            </label>
            <input
              v-model="form.portfolioUrl"
              class="field-input"
              type="url"
              placeholder="https://yourportfolio.com"
            />
          </div>
          <div class="field-group">
            <label class="field-label">
              <img
                :src="icons.mail"
                width="12"
                height="12"
                alt="email"
                class="label-icon"
              />
              EMAIL
            </label>
            <input
              v-model="form.email"
              class="field-input"
              type="email"
              placeholder="hello@example.com"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="step-foot">
      <button class="btn-draft" @click="$emit('save-draft')">
        Save as Draft
      </button>
      <button class="btn-continue" @click="$emit('next')">
        Save & Continue
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { currentUser } from "../../../stores/app.js";

// ── Icons ──
import iconEdit from "/src/assets/icons/edit.svg";
import iconUpload from "/src/assets/icons/upload.svg";
import iconLinkedin from "/src/assets/icons/linkedin.png";
import iconGithub from "/src/assets/icons/github.svg";
import iconGlobe from "/src/assets/icons/globe.svg";
import iconMail from "/src/assets/icons/mail.svg";

const icons = {
  edit: iconEdit,
  upload: iconUpload,
  linkedin: iconLinkedin,
  github: iconGithub,
  globe: iconGlobe,
  mail: iconMail,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

// ── Form state ──
const form = reactive({
  name: currentUser.value?.name || "",
  jobTitle: "",
  tagline: "",
  linkedin: "",
  github: "",
  portfolioUrl: "",
  email: currentUser.value?.email || "",
  avatarUrl: "",
});

// ── Computed ──
const initials = computed(() => {
  if (!form.name) return "U";
  return form.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const avatarStyle = computed(() => ({
  background: form.avatarUrl ? "transparent" : "var(--blue)",
}));

// ── Handlers ──
function handleAvatarChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    form.avatarUrl = ev.target.result;
  };
  reader.readAsDataURL(file);
}
</script>

<style scoped>
/* ── Panel ── */
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

/* ── Content card ── */
.content-area {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  box-shadow: var(--shadow);
}

/* ── Avatar ── */
.avatar-row {
  display: flex;
}
.avatar-wrap {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  border: 3px solid var(--border);
  overflow: hidden;
}
.avatar-initials {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-edit-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--card-bg);
}
.badge-icon {
  display: block;
  filter: brightness(0) invert(1);
}
.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
}
.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--blue);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
  width: fit-content;
}
.btn-upload:hover {
  background: var(--blue-dark);
}
.btn-icon {
  display: block;
  filter: brightness(0) invert(1);
}
.upload-hint {
  font-size: 0.73rem;
  color: var(--text-muted);
  line-height: 1.5;
  max-width: 240px;
}

/* ── Fields ── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field-group.full {
  grid-column: 1 / -1;
}
.field-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
.label-icon {
  display: block;
  opacity: 0.6;
}
.field-input {
  width: 100%;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-family: var(--sans);
  font-size: 0.85rem;
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  background: var(--card-bg);
}
.field-textarea {
  min-height: 90px;
  resize: vertical;
}

/* ── Section block ── */
.section-block {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.section-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}

/* ── Footer ── */
.step-foot {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.25rem;
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
  transition:
    background 0.2s,
    transform 0.15s;
  box-shadow: 0 4px 14px rgba(26, 63, 204, 0.3);
}
.btn-continue:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }
  .field-group.full {
    grid-column: 1;
  }
}
</style>
