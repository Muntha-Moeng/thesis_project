<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">Curate your expertise</h1>
      <p class="step-sub">
        Define the technical pillars of your professional portfolio.
      </p>
    </div>

    <div class="content-area">
      <div class="expertise-grid">
        <div
          class="expertise-col"
          v-for="(cat, ci) in categories"
          :key="cat.id"
        >
          <!-- Category header -->
          <div class="cat-header">
            <div
              class="cat-icon-wrap"
              :style="{ background: cat.color + '22', color: cat.color }"
            >
              <img
                :src="cat.iconSrc"
                width="16"
                height="16"
                :alt="cat.name"
                class="cat-icon-img"
              />
            </div>
            <div class="cat-info">
              <input
                v-if="cat.isNew"
                v-model="cat.name"
                class="cat-name-input"
                placeholder="Category name"
                :ref="
                  (el) => {
                    if (el) newInputRefs[ci] = el;
                  }
                "
                @blur="finalizeName(ci)"
                @keydown.enter.prevent="finalizeName(ci)"
              />
              <span v-else class="cat-name">{{ cat.name }}</span>
              <span class="cat-desc">{{ cat.desc }}</span>
            </div>
            <div class="cat-header-right">
              <span
                class="cat-badge"
                :style="{ background: cat.color + '1a', color: cat.color }"
              >
                {{ cat.skills.length }} Active
              </span>
              <button
                v-if="cat.isRemovable"
                class="btn-remove-cat"
                title="Remove category"
                @click="removeCategory(ci)"
              >
                <img
                  :src="icons.trash"
                  width="12"
                  height="12"
                  alt="remove"
                  class="btn-icon"
                />
              </button>
            </div>
          </div>

          <!-- Skills -->
          <div class="skills-area">
            <div class="skill-tags">
              <span
                v-for="(skill, si) in cat.skills"
                :key="si"
                class="skill-tag"
              >
                {{ skill }}
                <button class="tag-remove" @click="removeSkill(ci, si)">
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
              <p class="add-label">ADD ANOTHER SKILL</p>
              <div class="skill-input-wrap">
                <input
                  v-model="cat.inputVal"
                  class="skill-input"
                  type="text"
                  :placeholder="`e.g. ${cat.placeholder}`"
                  @keydown.enter.prevent="addSkill(ci)"
                />
                <button class="btn-add-skill" @click="addSkill(ci)">
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

    <!-- Footer -->
    <div class="step-foot">
      <button class="btn-add-project" @click="addCategory">
        <img
          :src="icons.plus"
          width="15"
          height="15"
          alt="add category"
          class="btn-icon"
        />
        Add Another Skill Category
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
import { reactive, nextTick, ref } from "vue";

// ── Icon imports  ──
import iconEdit from "/src/assets/icons/edit.svg";
import iconSettings from "/src/assets/icons/settings.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconTrash from "/src/assets/icons/trash.svg";
import iconPlus from "/src/assets/icons/plus.svg";

const icons = {
  trash: iconTrash,
  plus: iconPlus,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

const newInputRefs = ref({});

// ── Color palette for new categories ──
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

let idCounter = 100;

// ── Categories ──
const categories = reactive([
  {
    id: 1,
    name: "Frontend",
    desc: "UI Architecture & Experience",
    iconSrc: iconEdit,
    color: "#7c3aed",
    placeholder: "Vue.js",
    inputVal: "",
    isNew: false,
    isRemovable: false,
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    id: 2,
    name: "Backend",
    desc: "Logic & Data Systems",
    iconSrc: iconSettings,
    color: "#0ea5e9",
    placeholder: "Docker",
    inputVal: "",
    isNew: false,
    isRemovable: false,
    skills: ["Node.js", "PostgreSQL", "GraphQL", "Redis", "AWS Lambda"],
  },
]);

// ── Actions ──
async function addCategory() {
  const color = PALETTE[categories.length % PALETTE.length];
  const newIndex = categories.length;
  idCounter++;
  categories.push({
    id: idCounter,
    name: "",
    desc: "New skill category",
    iconSrc: iconGrid,
    color,
    placeholder: "e.g. IT Support",
    inputVal: "",
    isNew: true,
    isRemovable: true,
    skills: [],
  });
  await nextTick();
  const el = newInputRefs.value[newIndex];
  if (el) el.focus();
}

function finalizeName(ci) {
  if (!categories[ci].name.trim()) categories[ci].name = "New Category";
  categories[ci].isNew = false;
}

function removeCategory(ci) {
  categories.splice(ci, 1);
}

function addSkill(catIdx) {
  const cat = categories[catIdx];
  const val = cat.inputVal.trim();
  if (val && !cat.skills.includes(val)) cat.skills.push(val);
  cat.inputVal = "";
}

function removeSkill(catIdx, skillIdx) {
  categories[catIdx].skills.splice(skillIdx, 1);
}
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
  padding: 1.75rem;
  box-shadow: var(--shadow);
}

.expertise-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.expertise-col {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg);
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

/* Category header */
.cat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.cat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cat-icon-img {
  display: block;
  opacity: 0.85;
}
.cat-info {
  flex: 1;
  min-width: 0;
}
.cat-name {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
}
.cat-name-input {
  display: block;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  background: var(--card-bg);
  border: 1.5px solid var(--blue);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  outline: none;
  font-family: var(--sans);
  box-shadow: 0 0 0 3px rgba(26, 63, 204, 0.1);
  box-sizing: border-box;
}
.cat-desc {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cat-header-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}
.cat-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Icon utility */
.btn-icon {
  display: block;
  opacity: 0.6;
}
.btn-icon--white {
  filter: brightness(0) invert(1);
  opacity: 1;
}

/* Remove category button */
.btn-remove-cat {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 5px;
  transition: background 0.15s;
  flex-shrink: 0;
}
.btn-remove-cat:hover {
  background: #fee2e2;
}
.btn-remove-cat:hover .btn-icon {
  filter: invert(27%) sepia(89%) saturate(1234%) hue-rotate(336deg)
    brightness(97%) contrast(97%);
  opacity: 1;
}

/* Skills */
.skills-area {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
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
  .expertise-grid {
    grid-template-columns: 1fr;
  }
}
</style>
