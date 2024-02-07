import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
function getCookie(cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function checkLogin(to, from) {
  if (getCookie('TokenLightcode') == '') {
    return { path: '/login' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/lightcode',
      name: 'lightcode',
      beforeEnter: checkLogin,
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
      beforeEnter: (to, from) => {
        if (getCookie('TokenLightcode') != '') {
          return { path: '/lightcode' }
        } 
      },
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/problem',
      name: 'problem',
      beforeEnter: checkLogin,
      component: () => import('../views/Problem.vue'),
    },
    {
      path: '/learning',
      name: 'learning',
      beforeEnter: checkLogin,
      component: () => import('../views/Learning.vue'),
    },
    {
      path: '/add-problem',
      name: 'addProblem',
      beforeEnter: checkLogin,
      component: () => import('../views/AddProblem.vue'),
    },
    {
      path: '/view-user',
      name: 'viewuser',
      beforeEnter: checkLogin,
      component: () => import('../Views/viewUser.vue'),
    },
    { path: '/:pathMatch(.*)*', component: () => import('../Views/NotFound.vue') },
  ],
})

export default router
