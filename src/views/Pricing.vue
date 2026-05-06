<template>
  <main class="page">
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
  </main>
</template>

<script setup>
import { t } from "../stores/app.js";

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
</script>

<style scoped>
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
</style>
