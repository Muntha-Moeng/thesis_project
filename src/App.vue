<template>
  <div id="app-root">
    <AppNav v-if="showNav" />
    <router-view />
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";
import { isDark } from "./stores/app.js";

const route = useRoute();
const authPages = ["/login", "/signup"];
const dashboardPages = ["/dashboard", "/dashboard/account", "/dashboard/builder"];

const isAuthPage = computed(() => authPages.includes(route.path));
const isDashboardPage = computed(() => dashboardPages.includes(route.path));
const showNav = computed(() => !isAuthPage.value && !isDashboardPage.value);
const showFooter = computed(() => !isAuthPage.value && !isDashboardPage.value);

watch(
  isDark,
  (val) => {
    document.documentElement.setAttribute("data-theme", val ? "dark" : "light");
  },
  { immediate: true }
);
</script>

<style scoped>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
