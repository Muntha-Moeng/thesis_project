<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">Build your experience</h1>
      <p class="step-sub">
        Highlight your professional journey and career milestones.
      </p>
    </div>

    <div class="experiences-list">
      <div
        class="experience-card"
        v-for="(exp, ei) in experiences"
        :key="exp.id"
      >
        <!-- Card header -->
        <div class="experience-card-header">
          <div class="card-header-left">
            <div
              class="exp-icon-wrap"
              :style="{ background: exp.color + '22', color: exp.color }"
            >
              <img
                :src="icons.briefcase"
                width="15"
                height="15"
                :alt="exp.company"
                class="btn-icon"
                :style="{ filter: exp.iconFilter }"
              />
            </div>
            <span class="exp-num">Experience {{ ei + 1 }}</span>
          </div>
          <button
            v-if="experiences.length > 1"
            class="btn-remove-exp"
            @click="removeExperience(ei)"
          >
            <img
              :src="icons.trash"
              width="13"
              height="13"
              alt="remove"
              class="btn-icon btn-icon--red"
            />
            Remove
          </button>
        </div>

        <div class="content-area">
          <!-- Role + Company -->
          <div class="field-row two-col">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Job Title</span>
                <span class="label-desc">Your role at this company.</span>
              </div>
              <input
                v-model="exp.role"
                class="field-input"
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Company</span>
                <span class="label-desc">Name of the organisation.</span>
              </div>
              <input
                v-model="exp.company"
                class="field-input"
                type="text"
                placeholder="e.g. Acme Corporation"
              />
            </div>
          </div>

          <!-- Start + End dates -->
          <div class="field-row two-col">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Start Date</span>
                <span class="label-desc">When did you join?</span>
              </div>
              <input v-model="exp.startDate" class="field-input" type="month" />
            </div>
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">End Date</span>
                <span class="label-desc">Leave blank if current role.</span>
              </div>
              <input
                v-model="exp.endDate"
                class="field-input"
                type="month"
                :disabled="exp.current"
              />
              <label class="checkbox-row">
                <input
                  type="checkbox"
                  v-model="exp.current"
                  @change="exp.current && (exp.endDate = '')"
                  class="checkbox-input"
                />
                <span class="checkbox-label">I currently work here</span>
              </label>
            </div>
          </div>

          <!-- Employment type + Location -->
          <div class="field-row two-col">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Employment Type</span>
                <span class="label-desc">Type of engagement.</span>
              </div>
              <select v-model="exp.type" class="field-input field-select">
                <option value="">Select type…</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Location</span>
                <span class="label-desc">City or remote.</span>
              </div>
              <input
                v-model="exp.location"
                class="field-input"
                type="text"
                placeholder="e.g. San Francisco, CA · Remote"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="field-row">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Description</span>
                <span class="label-desc">
                  What did you achieve? Focus on impact and outcomes.
                </span>
              </div>
              <div class="editor-wrap">
                <div class="editor-toolbar">
                  <button class="toolbar-btn" title="Bold">
                    <img
                      :src="icons.edit"
                      width="12"
                      height="12"
                      alt="bold"
                      class="toolbar-icon"
                    />
                  </button>
                  <button class="toolbar-btn" title="Italic">
                    <img
                      :src="icons.edit"
                      width="12"
                      height="12"
                      alt="italic"
                      class="toolbar-icon"
                    />
                  </button>
                  <button class="toolbar-btn" title="List">
                    <img
                      :src="icons.grid"
                      width="12"
                      height="12"
                      alt="list"
                      class="toolbar-icon"
                    />
                  </button>
                </div>
                <textarea
                  v-model="exp.description"
                  class="exp-textarea"
                  placeholder="• Led redesign of core product UI, improving user retention by 24%&#10;• Mentored a team of 4 engineers across 3 sprints…"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Skills used -->
          <div class="field-row">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Skills Used</span>
                <span class="label-desc">
                  Technologies and tools you applied in this role.
                </span>
              </div>
              <div class="skill-tags">
                <span
                  v-for="(skill, si) in exp.skills"
                  :key="si"
                  class="skill-tag"
                >
                  {{ skill }}
                  <button class="tag-remove" @click="removeSkill(ei, si)">
                    <img
                      :src="icons.trash"
                      width="9"
                      height="9"
                      alt="remove skill"
                      class="btn-icon"
                    />
                  </button>
                </span>
              </div>
              <div class="skill-add-row">
                <p class="add-label">ADD A SKILL</p>
                <div class="skill-input-wrap">
                  <input
                    v-model="exp.skillInput"
                    class="skill-input"
                    type="text"
                    placeholder="e.g. Vue.js"
                    @keydown.enter.prevent="addSkill(ei)"
                  />
                  <button class="btn-add-skill" @click="addSkill(ei)">
                    <img
                      :src="icons.plus"
                      width="14"
                      height="14"
                      alt="add"
                      class="btn-icon btn-icon--white"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="step-foot">
      <button class="btn-add-project" @click="addExperience">
        <img
          :src="icons.plus"
          width="15"
          height="15"
          alt="add experience"
          class="btn-icon"
        />
        Add Another Experience
      </button>
      <div class="foot-right">
        <button class="btn-draft" @click="$emit('save-draft')">
          Save as Draft
        </button>
        <button class="btn-continue" @click="$emit('next')">
          Save & Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// ── Icon imports ──
import iconTrash from "/src/assets/icons/trash.svg";
import iconEdit from "/src/assets/icons/edit.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconPlus from "/src/assets/icons/plus.svg";
import iconSettings from "/src/assets/icons/settings.svg";

const icons = {
  trash: iconTrash,
  edit: iconEdit,
  grid: iconGrid,
  plus: iconPlus,
  briefcase: iconSettings,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

// ── Color palette ──
const PALETTE = [
  "#7c3aed",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

let idCounter = 200;

// ── Experiences ──
const experiences = reactive([
  {
    id: 1,
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    type: "",
    location: "",
    description: "",
    skills: [],
    skillInput: "",
    color: PALETTE[0],
  },
]);

// ── Actions ──
function addExperience() {
  idCounter++;
  experiences.push({
    id: idCounter,
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    type: "",
    location: "",
    description: "",
    skills: [],
    skillInput: "",
    color: PALETTE[experiences.length % PALETTE.length],
  });
}

function removeExperience(ei) {
  experiences.splice(ei, 1);
}

function addSkill(ei) {
  const exp = experiences[ei];
  const val = exp.skillInput.trim();
  if (val && !exp.skills.includes(val)) exp.skills.push(val);
  exp.skillInput = "";
}

function removeSkill(ei, si) {
  experiences[ei].skills.splice(si, 1);
}
</script>

<style scoped>
.step-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

/* Experience list */
.experiences-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.experience-card {
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card-bg);
  overflow: hidden;
  box-shadow: var(--shadow);
  animation: fadeSlideIn 0.22s ease;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.experience-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.exp-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.exp-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.btn-remove-exp {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: 1px solid #fca5a5;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-remove-exp:hover {
  background: #fef2f2;
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
.btn-icon--red {
  filter: invert(27%) sepia(89%) saturate(1234%) hue-rotate(336deg)
    brightness(97%) contrast(97%);
  opacity: 1;
}
.toolbar-icon {
  display: block;
  opacity: 0.55;
}

/* Content */
.content-area {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.field-row.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.field-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.side-label {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.label-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
}
.label-desc {
  font-size: 0.72rem;
  color: var(--text-muted);
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
  box-sizing: border-box;
}
.field-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  background: var(--card-bg);
}
.field-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.field-select {
  appearance: none;
  cursor: pointer;
}

/* Checkbox */
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  margin-top: 0.15rem;
}
.checkbox-input {
  width: 14px;
  height: 14px;
  accent-color: var(--blue);
  cursor: pointer;
}
.checkbox-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Toolbar / editor */
.editor-wrap {
  border: 1.5px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.editor-toolbar {
  display: flex;
  gap: 0.25rem;
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.toolbar-btn {
  width: 26px;
  height: 26px;
  border-radius: 5px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.toolbar-btn:hover {
  background: var(--blue-light);
}
.toolbar-btn:hover .toolbar-icon {
  opacity: 0.9;
}

.exp-textarea {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  border: none;
  outline: none;
  padding: 0.85rem;
  font-family: var(--sans);
  font-size: 0.85rem;
  color: var(--text);
  background: var(--card-bg);
  line-height: 1.6;
  box-sizing: border-box;
}
.exp-textarea::placeholder {
  color: var(--text-muted);
}

/* Skills */
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  min-height: 1rem;
}
.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  color: var(--text-mid);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  transition: all 0.15s;
}
.skill-tag:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.tag-remove {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  line-height: 1;
}
.tag-remove:hover .btn-icon {
  filter: invert(27%) sepia(89%) saturate(1234%) hue-rotate(336deg)
    brightness(97%) contrast(97%);
  opacity: 1;
}

/* Add skill row */
.skill-add-row {
  margin-top: 0.5rem;
}
.add-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}
.skill-input-wrap {
  display: flex;
  gap: 0.5rem;
}
.skill-input {
  flex: 1;
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 0.55rem 0.8rem;
  font-family: var(--sans);
  font-size: 0.82rem;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
}
.skill-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
}
.btn-add-skill {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--blue);
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.btn-add-skill:hover {
  background: var(--blue-dark);
}

/* Footer */
.step-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.btn-add-project {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  padding: 0.65rem 1.25rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-add-project:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.btn-add-project:hover .btn-icon {
  opacity: 0.9;
}

.foot-right {
  display: flex;
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
  .field-row.two-col {
    grid-template-columns: 1fr;
  }
}
</style>
