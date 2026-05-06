<template>
  <main class="templates-page">
    <!-- ── Page Header ── -->
    <section class="page-header">
      <div class="page-inner">
        <h1 class="page-title fade-up">Portfolio Website Templates</h1>
        <p class="page-sub fade-up d1">
          Choose a portfolio website template and start building your showcase
          today.<br />
          Crafted for creative authority.
        </p>

        <!-- Filter Tabs -->
        <div class="filter-tabs fade-up d2">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="tab-btn"
            :class="{ active: activeTab === tab }"
            @click="setTab(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div>
    </section>

    <!-- ── Templates Grid ── -->
    <section class="grid-section">
      <div class="page-inner">
        <transition-group name="grid" tag="div" class="templates-grid">
          <div
            v-for="tpl in filteredTemplates"
            :key="tpl.id"
            class="template-card"
          >
            <div class="card-img-wrap">
              <img :src="tpl.img" :alt="tpl.title" loading="lazy" />
              <div class="card-overlay">
                <button
                  class="overlay-btn preview-btn"
                  @click="openPreview(tpl)"
                >
                  Preview
                </button>
                <button class="overlay-btn use-btn" @click="useTemplate">
                  Use Template →
                </button>
              </div>
            </div>
            <div class="card-meta">
              <h3 class="card-title">{{ tpl.title }}</h3>
              <p class="card-role">{{ tpl.role }}</p>
            </div>
          </div>
        </transition-group>

        <div class="empty-state" v-if="filteredTemplates.length === 0">
          <span class="empty-icon">◎</span>
          <p>No templates found for this category.</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta-section" data-reveal>
      <div class="cta-inner">
        <h2 class="cta-title">Ready to curate your Portfolio?</h2>
        <p class="cta-sub">
          Join thousands of creators who trust The Digital Curator to
          showcase<br />
          their professional journey.
        </p>
        <router-link
          :to="isLoggedIn ? '/dashboard/builder' : '/signup'"
          class="cta-btn"
        >
          Get Started for Free
        </router-link>
      </div>
    </section>

    <!-- ── Preview Modal ── -->
    <Teleport to="body">
      <div class="modal-backdrop" v-if="previewTpl" @click.self="closePreview">
        <div class="modal">
          <button class="modal-close" @click="closePreview">✕</button>
          <div class="modal-img">
            <img :src="previewTpl.img" :alt="previewTpl.title" />
          </div>
          <div class="modal-info">
            <div>
              <h3 class="modal-title">{{ previewTpl.title }}</h3>
              <p class="modal-role">{{ previewTpl.role }}</p>
            </div>
            <div class="modal-tags">
              <span class="mtag" v-for="tag in previewTpl.tags" :key="tag">{{
                tag
              }}</span>
            </div>
            <p class="modal-desc">
              A professionally designed portfolio template tailored for
              {{ previewTpl.role }}. Clean layout, fast performance, and fully
              customizable.
            </p>
            <router-link
              :to="isLoggedIn ? '/dashboard/builder' : '/signup'"
              class="modal-btn"
              @click="closePreview"
            >
              Use This Template →
            </router-link>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn } from "../stores/app.js";

const router = useRouter();
const activeTab = ref("See All");
const previewTpl = ref(null);

const tabs = [
  "See All",
  "Software Developer",
  "UX/UI Design",
  "Networking",
  "Cybersecurity",
];

const templates = [
  {
    id: 1,
    title: "Software-Developer",
    role: "Full-Stack Developer",
    category: "Software Developer",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "UX/UI",
    role: "Web Design",
    category: "UX/UI Design",
    tags: ["Figma", "CSS", "React"],
    img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Networking",
    role: "Network Administrator",
    category: "Networking",
    tags: ["Linux", "Cisco", "Security"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Cybersecurity",
    role: "IT Cybersecurity",
    category: "Cybersecurity",
    tags: ["Ethical Hacking", "Python", "SIEM"],
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Software Developer",
    role: "Front-end Developer",
    category: "Software Developer",
    tags: ["React", "TypeScript", "Tailwind"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Software Developer",
    role: "Front-end Developer",
    category: "Software Developer",
    tags: ["Next.js", "Prisma", "AWS"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&auto=format&fit=crop&q=80",
  },
];

const filteredTemplates = computed(() =>
  activeTab.value === "See All"
    ? templates
    : templates.filter((t) => t.category === activeTab.value),
);

function setTab(tab) {
  activeTab.value = tab;
}
function openPreview(tpl) {
  previewTpl.value = tpl;
  document.body.style.overflow = "hidden";
}
function closePreview() {
  previewTpl.value = null;
  document.body.style.overflow = "";
}
function useTemplate() {
  const user = localStorage.getItem("pb_user");
  router.push(user ? "/dashboard/builder" : "/signup");
}

// Scroll reveal
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
onUnmounted(() => {
  observer?.disconnect();
  document.body.style.overflow = "";
});
</script>

<style scoped>
.templates-page {
  padding-top: 64px;
  min-height: 100vh;
  background: var(--bg);
}

/* ── Page Header ── */
.page-header {
  background: var(--card-bg);
  padding: 4.5rem 2rem 3rem;
  border-bottom: 1px solid var(--border);
}
.page-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.page-title {
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--blue); /* ✅ already a var — keep */
  margin-bottom: 1rem;
  line-height: 1.1;
}
.page-sub {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 2.5rem;
}

/* ── Filter Tabs ── */
.filter-tabs {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.tab-btn {
  font-family: var(--sans);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.tab-btn.active {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
  box-shadow: 0 2px 10px rgba(26, 63, 204, 0.25);
}

/* ── Grid Section ── */
.grid-section {
  padding: 3.5rem 0 5rem;
}
.templates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem 2rem;
}

/* ── Template Card ── */
.template-card {
  cursor: pointer;
}
.card-img-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16/10;
  background: var(--bg);
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  transition: box-shadow 0.3s;
}
.template-card:hover .card-img-wrap {
  box-shadow: var(--shadow-md);
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.template-card:hover .card-img-wrap img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.28s;
}
.template-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  font-family: var(--sans);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.55rem 1.2rem;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  transition: transform 0.15s;
}
.overlay-btn:hover {
  transform: translateY(-2px);
}
.preview-btn {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.preview-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}
.use-btn {
  background: var(--blue);
  color: #fff;
  box-shadow: 0 2px 10px rgba(26, 63, 204, 0.4);
}
.use-btn:hover {
  background: var(--blue-dark);
}

.card-meta {
  padding: 0 0.1rem;
}
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 0.2rem;
}
.card-role {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* Grid transition */
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: all 0.35s ease;
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(18px);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.grid-leave-active {
  position: absolute;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
  grid-column: 1 / -1;
}
.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.4;
}

/* ── CTA ── */
.cta-section {
  background: var(--card-bg);
  padding: 6.5rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
  /* reveal handled by global [data-reveal] in main.css */
}
.cta-inner {
  max-width: 540px;
  margin: 0 auto;
}
.cta-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--blue);
  margin-bottom: 1rem;
  line-height: 1.15;
}
.cta-sub {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.78;
  margin-bottom: 2.5rem;
}
.cta-btn {
  display: inline-block;
  background: var(--blue);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.9rem 2.6rem;
  border-radius: 9px;
  box-shadow: 0 4px 20px rgba(26, 63, 204, 0.3);
  transition:
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;
}
.cta-btn:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(26, 63, 204, 0.4);
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: bdfadeIn 0.2s ease;
}
@keyframes bdfadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  /* ✅ was #fff — white modal stuck in dark mode */
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  max-width: 840px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  box-shadow: var(--shadow-md);
  position: relative;
  animation: modalUp 0.25s ease;
  max-height: 90vh;
  border: 1px solid var(--border);
}
@keyframes modalUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 34px;
  height: 34px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  font-size: 0.85rem;
  cursor: pointer;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sans);
  transition: background 0.2s;
}
.modal-close:hover {
  background: var(--border);
}

.modal-img {
  background: var(--bg);
  overflow: hidden;
}
.modal-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 2.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  background: var(--card-bg);
}
.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--blue);
  letter-spacing: -0.02em;
}
.modal-role {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.modal-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.mtag {
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--blue-light);
  color: var(--blue);
  padding: 0.25rem 0.7rem;
  border-radius: 99px;
}

.modal-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.modal-btn {
  display: block;
  text-align: center;
  background: var(--blue);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  margin-top: auto;
  transition:
    background 0.2s,
    transform 0.15s;
}
.modal-btn:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
}

/* ── Animations ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.fade-up {
  animation: fadeUp 0.65s ease both;
}
.d1 {
  animation-delay: 0.12s;
}
.d2 {
  animation-delay: 0.24s;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .modal {
    grid-template-columns: 1fr;
    max-height: 85vh;
  }
  .modal-img {
    height: 220px;
  }
}
@media (max-width: 560px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
  .tab-btn {
    font-size: 0.8rem;
    padding: 0.42rem 0.85rem;
  }
}
</style>
