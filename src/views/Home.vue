<template>
  <main class="home">
    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="hero-badge fade-up">{{ t("heroBadge") }}</span>
        <h1 class="hero-heading fade-up delay-1">
          {{ t("heroHeading1") }}<br />
          {{ t("heroHeading2") }}
          <em class="accent">{{ t("heroHeadingAccent") }}</em
          ><br />
          {{ t("heroHeading3") }}
        </h1>
        <p class="hero-sub fade-up delay-2">{{ t("heroSub") }}</p>
        <div class="hero-actions fade-up delay-3">
          <router-link to="/builder" class="btn-primary">{{
            t("startBuilding")
          }}</router-link>
          <router-link to="/templates" class="btn-secondary">
            <img
              :src="icons.info"
              width="15"
              height="15"
              alt=""
              class="btn-icon-img"
            />
            {{ t("viewShowcases") }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- ── TEMPLATES ── -->
    <section class="templates-section">
      <div class="section-inner">
        <div class="section-header" data-reveal>
          <div>
            <h2 class="section-title">{{ t("startWithTemplate") }}</h2>
            <p class="section-sub">{{ t("templatesSub") }}</p>
          </div>
          <router-link to="/templates" class="explore-link">{{
            t("exploreAll")
          }}</router-link>
        </div>
        <div class="templates-grid" data-reveal>
          <div
            v-for="tpl in templates"
            :key="tpl.titleKey"
            class="template-card"
            @mouseenter="hoveredTpl = tpl.titleKey"
            @mouseleave="hoveredTpl = null"
          >
            <div class="template-img-wrap">
              <img :src="tpl.img" :alt="tpl.titleKey" />
              <div
                class="template-overlay"
                :class="{ active: hoveredTpl === tpl.titleKey }"
              >
                <router-link to="/builder" class="preview-btn">{{
                  t("useTemplate")
                }}</router-link>
              </div>
            </div>
            <div class="template-meta">
              <span class="template-title">{{ tpl.titleKey }}</span>
              <span class="template-role">{{ tpl.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ── -->
    <section class="features-section">
      <div class="section-inner">
        <div class="features-header" data-reveal>
          <h2 class="features-title">{{ t("featuresTitle") }}</h2>
          <p class="features-sub">{{ t("featuresSub") }}</p>
        </div>
        <div class="features-grid" data-reveal>
          <div class="feature-card" v-for="f in features" :key="f.nameKey">
            <div class="feature-icon">
              <img
                :src="f.icon"
                width="22"
                height="22"
                alt=""
                class="feature-icon-img"
              />
            </div>
            <div class="feature-stat">{{ f.stat }}</div>
            <div class="feature-name">{{ t(f.nameKey) }}</div>
            <p class="feature-desc">{{ t(f.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ── -->
    <section class="how-section">
      <div class="section-inner">
        <h2 class="how-title" data-reveal>{{ t("howItWorks2") }}</h2>
        <div class="how-grid" data-reveal>
          <div class="how-step" v-for="(step, i) in steps" :key="step.title">
            <div class="step-circle">
              <img
                :src="step.iconSrc"
                width="28"
                height="28"
                :alt="step.title"
                class="step-icon"
              />
            </div>
            <div v-if="i < steps.length - 1" class="step-connector"></div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
        <div class="cta-wrap" data-reveal>
          <router-link to="/templates" class="btn-cta"
            >Get Started for Free →</router-link
          >
        </div>
      </div>
    </section>

    <!-- ── PRICING ── -->
    <section class="pricing-section">
      <div class="page-inner">
        <h1 class="page-title">{{ t("pricingTitle") }}</h1>
        <p class="page-sub">{{ t("pricingSub") }}</p>

        <div class="plans-grid">
          <div
            class="plan"
            v-for="plan in plans"
            :key="plan.nameKey"
            :class="{ featured: plan.featured }"
          >
            <div class="plan-badge" v-if="plan.featured">
              {{ t("mostPopular") }}
            </div>
            <div class="plan-icon">{{ plan.icon }}</div>
            <h2 class="plan-name">{{ t(plan.nameKey) }}</h2>
            <div class="plan-price">
              <span class="price-currency">$</span>
              <span class="price-amount">{{ plan.monthlyPrice }}</span>
              <span class="price-period" v-if="plan.monthlyPrice > 0">/mo</span>
            </div>
            <p class="plan-desc">{{ t(plan.descKey) }}</p>
            <ul class="plan-features">
              <li v-for="fk in plan.featureKeys" :key="fk">
                <span class="check">✓</span> {{ t(fk) }}
              </li>
            </ul>
            <router-link
              to="/signup"
              class="plan-cta"
              :class="{
                'cta-primary': plan.featured,
                'cta-ghost': !plan.featured,
              }"
            >
              {{ t("getStartedBtn") }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA BANNER ── -->
    <section class="cta-section" data-reveal>
      <div class="cta-inner">
        <h2 class="cta-title">{{ t("ctaTitle") }}</h2>
        <p class="cta-sub">{{ t("ctaSub") }}</p>
        <router-link to="/signup" class="btn-primary cta-btn">{{
          t("ctaBtn")
        }}</router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { t } from "../stores/app.js";

// ── Icons ──
import iconGrid from "/src/assets/icons/grid.svg";
import iconUpload from "/src/assets/icons/upload.svg";
import iconDownload from "/src/assets/icons/download.svg";
import iconCheck from "/src/assets/icons/check.svg";
import iconInfo from "/src/assets/icons/bell.svg";
import iconStar from "/src/assets/icons/star.png";
import iconBolt from "/src/assets/icons/plus.svg";
import iconBuilding from "/src/assets/icons/home.svg";
import iconChart from "/src/assets/icons/chart.svg";
import iconSettings from "/src/assets/icons/settings.svg";
import iconEdit from "/src/assets/icons/edit.svg";

const icons = {
  check: iconCheck,
  info: iconInfo,
};

// ── State ──
const hoveredTpl = ref(null);

// ── Templates ──
const templates = [
  {
    titleKey: "UX/UI",
    role: "Web Designer",
    img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&auto=format&fit=crop&q=80",
  },
  {
    titleKey: "Software-Developer",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
  },
  {
    titleKey: "Networking",
    role: "IT Support",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=80",
  },
  {
    titleKey: "Cybersecurity",
    role: "IT Security",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80",
  },
];

// ── Features ──
const features = [
  { icon: iconChart, stat: "99%", nameKey: "opt", descKey: "optDesc" },
  {
    icon: iconSettings,
    stat: "99%",
    nameKey: "success",
    descKey: "successDesc",
  },
  {
    icon: iconEdit,
    stat: "Easy",
    nameKey: "intuitive",
    descKey: "intuitiveDesc",
  },
];

// ── How It Works ──
const steps = [
  {
    iconSrc: iconGrid,
    title: "Choose a Template",
    desc: "Browse our curated collection of designer-crafted templates. Each one is built to make your work look stunning and professional.",
  },
  {
    iconSrc: iconUpload,
    title: "Input Your Information",
    desc: "Fill in your details, upload your projects, and personalize every section to match your unique identity.",
  },
  {
    iconSrc: iconDownload,
    title: "Export & Publish",
    desc: "Export your finished portfolio as source code, PDF, or PNG — or publish it live with one click.",
  },
];

// ── Pricing ──
const plans = [
  {
    icon: "",
    nameKey: "freeName",
    monthlyPrice: 0,
    descKey: "freeDesc",
    featureKeys: ["freeF1", "freeF2", "freeF3"],
    featured: false,
  },
  {
    icon: "",
    nameKey: "proName",
    monthlyPrice: 12,
    descKey: "proDesc",
    featureKeys: ["proF1", "proF2", "proF3", "proF4", "proF5"],
    featured: true,
  },
  {
    icon: "",
    nameKey: "studioName",
    monthlyPrice: 29,
    descKey: "studioDesc",
    featureKeys: ["studioF1", "studioF2", "studioF3", "studioF4", "studioF5"],
    featured: false,
  },
];

// ── Scroll reveal ──
let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("revealed");
      }),
    { threshold: 0.08 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => observer.observe(el));
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.home {
  padding-top: 64px;
}

/* ── Hero ── */
.hero {
  background: linear-gradient(165deg, var(--bg) 60%, var(--blue-light) 100%);
  padding: 7rem 2rem 6rem;
  text-align: center;
}
.hero-inner {
  max-width: 780px;
  margin: 0 auto;
}
.hero-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
  background: var(--blue-light);
  border: 1px solid rgba(26, 63, 204, 0.18);
  padding: 0.3rem 0.9rem;
  border-radius: 99px;
  margin-bottom: 1.8rem;
}
.hero-heading {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 1.4rem;
}
.accent {
  color: var(--blue);
  font-style: italic;
}
.hero-sub {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 2.5rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--blue);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.75rem 1.7rem;
  border-radius: 9px;
  box-shadow: 0 4px 18px rgba(26, 63, 204, 0.28);
  transition:
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;
}
.btn-primary:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 63, 204, 0.35);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.75rem 1.7rem;
  border-radius: 9px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition:
    border-color 0.2s,
    transform 0.15s;
}
.btn-secondary:hover {
  border-color: var(--blue);
  transform: translateY(-1px);
}
.btn-icon-img {
  display: block;
  opacity: 0.5;
}

/* ── Section base ── */
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Templates ── */
.templates-section {
  padding: 6rem 0;
  background: var(--bg);
}
.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}
.section-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  margin-bottom: 0.6rem;
}
.section-sub {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.explore-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--blue);
  white-space: nowrap;
  transition: opacity 0.2s;
}
.explore-link:hover {
  opacity: 0.75;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.template-card {
  cursor: pointer;
}
.template-img-wrap {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--bg);
  box-shadow: var(--shadow);
}
.template-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.template-card:hover .template-img-wrap img {
  transform: scale(1.05);
}
.template-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 63, 204, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.template-overlay.active {
  opacity: 1;
}
.preview-btn {
  background: #fff;
  color: var(--blue);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.55rem 1.2rem;
  border-radius: 7px;
  transition: transform 0.2s;
}
.preview-btn:hover {
  transform: scale(1.05);
}
.template-meta {
  padding: 0.75rem 0 0.25rem;
}
.template-title {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
}
.template-role {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

/* ── Features ── */
.features-section {
  padding: 6rem 0;
  background: var(--features-bg);
}
.features-header {
  text-align: center;
  margin-bottom: 4rem;
}
.features-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  margin-bottom: 1rem;
}
.features-sub {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.75;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.feature-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 2.2rem 2rem;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.feature-icon {
  width: 44px;
  height: 44px;
  background: var(--blue-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.feature-icon-img {
  display: block;
  opacity: 0.75;
}
.feature-stat {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin-bottom: 0.3rem;
}
.feature-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 0.75rem;
}
.feature-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.7;
}

/* ── How It Works ── */
.how-section {
  background: var(--how-bg);
  padding: 6rem 0;
}
.how-title {
  text-align: center;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 4rem;
  color: var(--how-text);
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
.step-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--how-text);
  margin-bottom: 0.6rem;
}
.step-desc {
  font-size: 0.85rem;
  color: var(--how-sub);
  line-height: 1.7;
  max-width: 240px;
}
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

/* ── Pricing ── */
.page {
  padding-top: 100px;
  min-height: 100vh;
  background: var(--bg);
}
.page-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  text-align: center;
}
.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 0.75rem;
  margin-top: 1rem;
  color: var(--text);
}
.page-sub {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

/* ── Plans Grid ── */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  text-align: left;
}
.plan {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.plan:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.plan.featured {
  border-color: var(--blue);
  border-width: 2px;
  box-shadow: 0 8px 32px rgba(26, 63, 204, 0.16);
}

.plan-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--blue);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.28rem 0.85rem;
  border-radius: 99px;
  white-space: nowrap;
}
.plan-icon {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
.plan-name {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  margin-bottom: 0.5rem;
}
.price-currency {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-muted);
}
.price-amount {
  font-size: 2.6rem;
  font-weight: 900;
  color: var(--text);
  line-height: 1;
}
.price-period {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-left: 0.2rem;
}

.plan-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 2rem;
  flex: 1;
}
.plan-features li {
  font-size: 0.85rem;
  color: var(--text-mid);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.check {
  color: var(--blue);
  font-weight: 700;
}

.plan-cta {
  display: block;
  text-align: center;
  padding: 0.78rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
}
.cta-primary {
  background: var(--blue);
  color: #fff;
}
.cta-primary:hover {
  background: var(--blue-dark);
}
.cta-ghost {
  border: 1.5px solid var(--border);
  color: var(--text);
}
.cta-ghost:hover {
  border-color: var(--blue);
  color: var(--blue);
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
}

/* ── CTA Banner ── */
.cta-section {
  background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%);
  padding: 6rem 2rem;
  text-align: center;
}
.cta-inner {
  max-width: 600px;
  margin: 0 auto;
}
.cta-title {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
}
.cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2rem;
  line-height: 1.6;
}
.cta-btn {
  background: #fff;
  color: var(--blue);
}
.cta-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
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
.fade-up {
  opacity: 0;
  transform: translateY(18px);
  animation: fadeUp 0.6s ease forwards;
}
.delay-1 {
  animation-delay: 0.1s;
}
.delay-2 {
  animation-delay: 0.2s;
}
.delay-3 {
  animation-delay: 0.3s;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .how-grid {
    grid-template-columns: 1fr;
  }
  .step-connector {
    display: none;
  }
  .plans-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
