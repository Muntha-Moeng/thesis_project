<template>
  <div class="step-panel">
    <div class="step-header">
      <h1 class="step-title">About Section Settings</h1>
      <p class="step-sub">
        Refine your professional narrative with editorial precision.
      </p>
    </div>

    <div class="content-area">
      <!-- ── Image Upload ── -->
      <div class="upload-section">
        <div class="upload-left">
          <h3 class="upload-label">Upload Image</h3>
          <p class="upload-hint">High-quality preview image</p>
        </div>
        <div
          class="drop-zone"
          :class="{
            'drop-zone--active': isDragging,
            'drop-zone--filled': previewUrl,
          }"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
          @click="triggerUpload"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg"
            style="display: none"
            @change="handleFile"
          />

          <div v-if="!previewUrl" class="drop-placeholder">
            <div class="drop-icon-wrap">
              <img
                :src="icons.download"
                width="28"
                height="28"
                alt="upload"
                class="drop-icon"
              />
            </div>
            <p class="drop-text">Drag Image cover</p>
            <p class="drop-format">PNG, JPG up to 10MB</p>
          </div>

          <div v-else class="drop-preview">
            <img :src="previewUrl" alt="Cover" class="preview-img" />
            <button class="remove-img" @click.stop="previewUrl = null">
              <img
                :src="icons.trash"
                width="14"
                height="14"
                alt="remove"
                class="remove-icon"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- ── Biography ── -->
      <div class="bio-section">
        <label class="bio-label">PROFESSIONAL BIOGRAPHY</label>
        <div class="editor-wrap">
          <div class="editor-toolbar">
            <button
              class="toolbar-btn"
              :class="{ active: bold }"
              @click="bold = !bold"
              title="Bold"
            >
              <img
                :src="icons.edit"
                width="13"
                height="13"
                alt="bold"
                class="toolbar-icon"
              />
            </button>
            <button
              class="toolbar-btn"
              :class="{ active: italic }"
              @click="italic = !italic"
              title="Italic"
            >
              <img
                :src="icons.edit"
                width="13"
                height="13"
                alt="italic"
                class="toolbar-icon"
              />
            </button>
            <button class="toolbar-btn" title="Unordered list">
              <img
                :src="icons.grid"
                width="13"
                height="13"
                alt="list"
                class="toolbar-icon"
              />
            </button>
            <button class="toolbar-btn" title="Ordered list">
              <img
                :src="icons.grid"
                width="13"
                height="13"
                alt="ordered list"
                class="toolbar-icon"
              />
            </button>
            <button class="toolbar-btn" title="Link">
              <img
                :src="icons.search"
                width="13"
                height="13"
                alt="link"
                class="toolbar-icon"
              />
            </button>
            <button class="toolbar-btn" title="Image">
              <img
                :src="icons.plus"
                width="13"
                height="13"
                alt="image"
                class="toolbar-icon"
              />
            </button>
          </div>
          <textarea
            v-model="biography"
            class="bio-editor"
            :class="{ 'text-bold': bold, 'text-italic': italic }"
            placeholder="Start typing your professional story here..."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- ── Footer ── -->
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
import { ref } from "vue";

// ── Icon  ──
import iconDownload from "/src/assets/icons/download.svg";
import iconTrash from "/src/assets/icons/trash.svg";
import iconEdit from "/src/assets/icons/edit.svg";
import iconGrid from "/src/assets/icons/grid.svg";
import iconSearch from "/src/assets/icons/search.svg";
import iconPlus from "/src/assets/icons/plus.svg";

const icons = {
  download: iconDownload,
  trash: iconTrash,
  edit: iconEdit,
  grid: iconGrid,
  search: iconSearch,
  plus: iconPlus,
};

// ── Emits ──
const emit = defineEmits(["next", "save-draft"]);

// ── State ──
const isDragging = ref(false);
const previewUrl = ref(null);
const fileInput = ref(null);
const biography = ref("");
const bold = ref(false);
const italic = ref(false);

// ── File handlers ──
function triggerUpload() {
  fileInput.value?.click();
}

function handleFile(e) {
  const file = e.target.files[0];
  if (file) readFile(file);
}

function handleDrop(e) {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  if (file) readFile(file);
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    previewUrl.value = ev.target.result;
  };
  reader.readAsDataURL(file);
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  box-shadow: var(--shadow);
}

/* Upload */
.upload-section {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.5rem;
  align-items: start;
}
.upload-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
}
.upload-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.drop-zone {
  border: 2px dashed var(--border);
  border-radius: 12px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.drop-zone:hover,
.drop-zone--active {
  border-color: var(--blue);
  background: var(--blue-light);
}
.drop-zone--filled {
  border-style: solid;
  border-color: var(--border);
}

.drop-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
}
.drop-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.drop-icon {
  opacity: 0.6;
  display: block;
}
.drop-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-mid);
}
.drop-format {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.drop-preview {
  width: 100%;
  height: 100%;
  min-height: 140px;
  position: relative;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 140px;
}

.remove-img {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.remove-img:hover {
  background: #ef4444;
}
.remove-icon {
  display: block;
  filter: brightness(0) invert(1);
}

/* Bio */
.bio-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.bio-label {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.editor-wrap {
  border: 1.5px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.editor-toolbar {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.toolbar-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.toolbar-btn:hover {
  background: var(--blue-light);
}
.toolbar-btn.active {
  background: var(--blue);
}

.toolbar-icon {
  display: block;
  opacity: 0.55;
}
.toolbar-btn:hover .toolbar-icon {
  opacity: 0.9;
}
.toolbar-btn.active .toolbar-icon {
  filter: brightness(0) invert(1);
  opacity: 1;
}

.bio-editor {
  width: 100%;
  min-height: 160px;
  resize: vertical;
  border: none;
  outline: none;
  padding: 1rem;
  font-family: var(--sans);
  font-size: 0.875rem;
  color: var(--text);
  background: var(--card-bg);
  line-height: 1.65;
  box-sizing: border-box;
}
.bio-editor.text-bold {
  font-weight: 700;
}
.bio-editor.text-italic {
  font-style: italic;
}
.bio-editor::placeholder {
  color: var(--text-muted);
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
  .upload-section {
    grid-template-columns: 1fr;
  }
}
</style>
