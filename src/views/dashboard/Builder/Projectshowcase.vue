<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">Project Showcase Editor</h1>
      <p class="step-sub">
        Curate your portfolio by adding the details of your latest professional
        work.
      </p>
    </div>

    <div class="projects-list">
      <div class="project-card" v-for="(project, pi) in projects" :key="pi">
        <!-- Card header -->
        <div class="project-card-header">
          <span class="project-num">Project {{ pi + 1 }}</span>
          <button
            v-if="projects.length > 1"
            class="btn-remove-project"
            @click="removeProject(pi)"
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
          <!-- Identity -->
          <div class="field-row">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Identity</span>
                <span class="label-desc"
                  >The public-facing name of this project.</span
                >
              </div>
              <input
                v-model="project.name"
                class="field-input"
                type="text"
                placeholder="e.g. Modernist Brand System 2024"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="field-row">
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Description</span>
                <span class="label-desc"
                  >Detail the creative process and case study findings.</span
                >
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
                  <button class="toolbar-btn" title="Link">
                    <img
                      :src="icons.search"
                      width="12"
                      height="12"
                      alt="link"
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
                  v-model="project.description"
                  class="proj-textarea"
                  placeholder="Start writing your case study here..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Deployment + Visual Anchor -->
          <div class="field-row two-col">
            <!-- Deployment URL -->
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Deployment</span>
                <span class="label-desc"
                  >Where can visitors see the final live result?</span
                >
              </div>
              <div class="url-input-wrap">
                <img
                  :src="icons.grid"
                  width="13"
                  height="13"
                  alt="url"
                  class="url-icon"
                />
                <input
                  v-model="project.url"
                  class="field-input url-field"
                  type="url"
                  placeholder="https://project-url.com"
                />
              </div>
            </div>

            <!-- Visual Anchor / Cover image -->
            <div class="field-block">
              <div class="side-label">
                <span class="label-title">Visual Anchor</span>
                <span class="label-desc"
                  >High-quality preview image (Recommended 16:9 ratio).</span
                >
              </div>
              <div
                class="img-drop-zone"
                :class="{ filled: project.coverUrl }"
                @click="triggerImgUpload(pi)"
                @dragover.prevent
                @drop.prevent="(e) => handleImgDrop(e, pi)"
              >
                <input
                  :ref="(el) => (imgInputs[pi] = el)"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="(e) => handleImgFile(e, pi)"
                />
                <div v-if="!project.coverUrl" class="img-placeholder">
                  <div class="img-drop-icon">
                    <img
                      :src="icons.download"
                      width="22"
                      height="22"
                      alt="upload"
                      class="drop-icon"
                    />
                  </div>
                  <p class="img-drop-text">Drag & drop project cover</p>
                  <p class="img-drop-hint">PNG, JPG or WebP up to 10MB</p>
                </div>
                <div v-else class="img-preview">
                  <img :src="project.coverUrl" alt="Cover" />
                  <button
                    class="remove-cover"
                    @click.stop="project.coverUrl = null"
                  >
                    <img
                      :src="icons.trash"
                      width="12"
                      height="12"
                      alt="remove cover"
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
      <button class="btn-add-project" @click="addProject">
        <img
          :src="icons.plus"
          width="15"
          height="15"
          alt="add"
          class="btn-icon"
        />
        Add Another Project
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
import { reactive, ref } from "vue";

// ── Icon imports ──
import iconTrash from "/src/assets/icons/trash.svg";
import iconEdit from "/src/assets/icons/edit.svg";
import iconSearch from "/src/assets/icons/search.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconDownload from "/src/assets/icons/download.svg";
import iconPlus from "/src/assets/icons/plus.svg";

const icons = {
  trash: iconTrash,
  edit: iconEdit,
  search: iconSearch,
  grid: iconGrid,
  download: iconDownload,
  plus: iconPlus,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

// ── State ──
const imgInputs = ref({});
const projects = reactive([
  { name: "", description: "", url: "", coverUrl: null },
]);

// ── Actions ──
function addProject() {
  projects.push({ name: "", description: "", url: "", coverUrl: null });
}
function removeProject(idx) {
  projects.splice(idx, 1);
}
function triggerImgUpload(idx) {
  imgInputs.value[idx]?.click();
}

function handleImgFile(e, idx) {
  const file = e.target.files[0];
  if (file) readImg(file, idx);
}
function handleImgDrop(e, idx) {
  const file = e.dataTransfer.files[0];
  if (file) readImg(file, idx);
}
function readImg(file, idx) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    projects[idx].coverUrl = ev.target.result;
  };
  reader.readAsDataURL(file);
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

/* Project list */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-card {
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card-bg);
  overflow: hidden;
  box-shadow: var(--shadow);
}
.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.project-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.btn-remove-project {
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
.btn-remove-project:hover {
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
.drop-icon {
  display: block;
  opacity: 0.6;
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

/* URL field */
.url-input-wrap {
  position: relative;
}
.url-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.45;
}
.url-field {
  padding-left: 2.25rem;
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

.proj-textarea {
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
.proj-textarea::placeholder {
  color: var(--text-muted);
}

/* Image drop zone */
.img-drop-zone {
  border: 2px dashed var(--border);
  border-radius: 10px;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
}
.img-drop-zone:hover {
  border-color: var(--blue);
  background: var(--blue-light);
}
.img-drop-zone.filled {
  border-style: solid;
}

.img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1rem;
}
.img-drop-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--bg);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-drop-text {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-mid);
  text-align: center;
}
.img-drop-hint {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.img-preview {
  width: 100%;
  height: 100%;
  min-height: 130px;
  position: relative;
}
.img-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 130px;
}

.remove-cover {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.remove-cover:hover {
  background: #ef4444;
}

/* Footer */
.step-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
