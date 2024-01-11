import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/lightcode",
      name: "lightcode",
      component: HomeView,
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/Landing.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/problem",
      name: "problem",
      component: () => import("../views/Problem.vue"),
    },
    {
      path: "/learning",
      name: "learning",
      component: () => import("../views/Learning.vue"),
    },
    {
      path: "/add-problem",
      name: "addProblem",
      component: () => import("../views/AddProblem.vue"),
    },
  ],
});

export default router;
