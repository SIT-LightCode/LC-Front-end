import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/About',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    ,
    {
      path: '/Problem',
      name: 'problem',
      component: () => import('../views/Problem.vue')
    },
    {
      path: '/Learning',
      name: 'learning',
      component: () => import('../views/Learning.vue')
    },
    {
      path: '/AddProblem',
      name: 'addProblem',
      component: () => import('../views/AddProblem.vue')
    },
    {
      path: '/Codeeditor',
      name: 'codeeditor',
      component: () => import('../views/CodeEditor.vue')
    }
  ]
})

export default router
