import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/lightcode',
      name: 'lightcode',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: HomeView,
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Landing.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/problem',
      name: 'problem',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: () => import('../views/Problem.vue'),
    },
    {
      path: '/learning',
      name: 'learning',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: () => import('../views/Learning.vue'),
    },
    {
      path: '/add-problem',
      name: 'addProblem',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: () => import('../views/AddProblem.vue'),
    },
    {
      path: '/view-user',
      name: 'viewuser',
      beforeEnter: (to, from) => {
        if(document.cookie.split(';') == ''){
          return { path: '/login' }
        }
      },
      component: () => import('../Views/viewUser.vue'),
    },
    { path: '/:pathMatch(.*)*', component: () => import('../Views/NotFound.vue') },
  ],
})

export default router
