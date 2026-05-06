<template>
  <main class="how-page">
    <section class="visual-section">
      <div class="section-inner">
        <h2 class="visual-title" data-reveal>Your journey starts here</h2>

        <div class="how-grid" data-reveal>
          <div class="how-step" v-for="(step, i) in steps" :key="step.title">
            <div class="step-circle">
              <img
                :src="step.icon"
                width="28"
                height="28"
                :alt="step.title"
                class="step-icon"
              />
            </div>
            <div v-if="i < steps.length - 1" class="step-connector"></div>
            <h3 class="how-step-title">{{ step.title }}</h3>
            <p class="how-step-desc">{{ step.desc }}</p>
          </div>
        </div>

        <div class="cta-wrap" data-reveal>
          <router-link to="/templates" class="btn-cta"
            >Get Started for Free →</router-link
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// ── Icons ──
import iconGrid from "/src/assets/icons/grid.svg";
import iconUpload from "/src/assets/icons/upload.svg";
import iconDownload from "/src/assets/icons/download.svg";

// ── Steps data ──
const steps = [
  {
    icon: iconGrid,
    title: "Choose a Template",
    desc: "Browse our curated collection of designer-crafted templates. Each one is built to make your work look stunning and professional.",
    items: [
      "Dozens of professional layouts",
      "Filter by industry or style",
      "Live preview before selecting",
    ],
  },
  {
    icon: iconUpload,
    title: "Input Your Information",
    desc: "Fill in your details, upload your projects, and personalize every section to match your unique identity.",
    items: [
      "Easy drag-and-drop editor",
      "Upload images and media",
      "Customize colors and fonts",
    ],
  },
  {
    icon: iconDownload,
    title: "Export",
    desc: "Export your finished portfolio as source code, or Link — with one click.",
    items: ["Export as source code or Link"],
  },
];

// ── Scroll reveal ──
let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => observer.observe(el));
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.how-page {
  padding-top: 64px;
}

/* ── Section base ── */
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Visual / How it works ── */
.visual-section {
  background: var(--blue);
  padding: 6rem 0;
  color: #fff;
}
.visual-title {
  text-align: center;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 4rem;
  color: #fff;
}

.how-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  position: relative;
}
.how-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
}
.how-step:hover .step-circle {
  background: rgba(255, 255, 255, 0.22);
}
.step-icon {
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.step-connector {
  position: absolute;
  top: 36px;
  left: calc(50% + 46px);
  right: calc(-50% + 46px);
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 0;
}
.how-step-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.6rem;
}
.how-step-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  max-width: 240px;
}

/* ── CTA ── */
.cta-wrap {
  text-align: center;
  margin-top: 4rem;
}
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff;
  color: var(--blue);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.9rem 2.2rem;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
}

/* ── Scroll reveal ── */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
