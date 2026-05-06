import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  { path: "/login", name: "Login", component: () => import("../views/auth/Login.vue") },
  { path: "/signup", name: "Signup", component: () => import("../views/auth/Signup.vue") },
  { path: "/", name: "Home", component: Home },
  { path: "/howitworks", name: "HowItWorks", component: () => import("../views/HowItWorks.vue") },
  { path: "/templates", name: "Templates", component: () => import("../views/Templates.vue") },
  { path: "/pricing", name: "Pricing", component: () => import("../views/Pricing.vue") },
  { path: "/dashboard", name: "Dashboard", component: () => import("../views/dashboard/Dashboard.vue"), meta: { requiresAuth: true } },
  { path: "/dashboard/account", name: "Account", component: () => import("../views/dashboard/Account.vue"), meta: { requiresAuth: true } },
  { path: "/dashboard/builder", name: "Builder", component: () => import("../views/dashboard/Builder.vue"), meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to) => {
  const user = localStorage.getItem("pb_user");
  if (to.meta.requiresAuth && !user) return { name: "Login" };
});

export default router;
