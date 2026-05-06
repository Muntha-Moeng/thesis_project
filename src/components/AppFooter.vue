<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="brand-name"><span class="logo-icon">⬡</span> Portfolio Builder</div>
        <p class="brand-desc">Elevating creative professionals through intentional design and effortless technology.</p>
      </div>
      <div class="footer-col" v-for="col in cols" :key="col.title">
        <h4 class="col-title">{{ col.title }}</h4>
        <ul>
          <li v-for="item in col.items" :key="item.label">
            <router-link :to="item.to">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Portfolio Builder. All rights reserved.</span>
      <div class="footer-socials">
        <a href="#" v-for="s in socials" :key="s">{{ s }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const cols = [
  { title: 'Platform', items: [{ label: 'Home', to: '/' }, { label: 'Templates', to: '/templates' }, { label: 'Pricing', to: '/pricing' }] },
  { title: 'Company',  items: [{ label: 'Privacy', to: '/' }, { label: 'Terms', to: '/' }, { label: 'Contact', to: '/' }] },
]
const socials = ['𝕏', '⬡', '◎']
</script>

<style scoped>
.footer { background: var(--card-bg); border-top: 1px solid var(--border); transition: background 0.3s; }
.footer-top { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; padding: 3.5rem 2rem 2.5rem; }
.brand-name { font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.75rem; color: var(--text); }
.logo-icon { color: var(--blue); }
.brand-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; max-width: 260px; }
.col-title { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
ul a { font-size: 0.82rem; color: var(--text-muted); transition: color 0.2s; }
ul a:hover { color: var(--blue); }
.footer-bottom { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; border-top: 1px solid var(--border); font-size: 0.78rem; color: var(--text-muted); }
.footer-socials { display: flex; gap: 1rem; }
.footer-socials a { color: var(--text-muted); font-size: 1rem; transition: color 0.2s; }
.footer-socials a:hover { color: var(--blue); }
</style>
