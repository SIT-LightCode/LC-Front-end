import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { jwtDecode } from 'jwt-decode'
import AOS from "aos";
import 'aos/dist/aos.css';
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
  if (getCookie('refreshToken') == '') {
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
      beforeEnter: (to, from) => {
        if (getCookie('refreshToken') != '') {
          return { path: '/lightcode' }
        }
      },
      component: () => import('../views/Landing.vue'),
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to, from) => {
        if (getCookie('refreshToken') != '') {
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
      beforeEnter: (to, from )=>{
        if (getCookie('refreshToken') == '') {
          return { path: '/login' }
        }
        let code = jwtDecode(getCookie("TokenLightcode"))        
        if(!(code.role.includes('ADMIN'))){
          return { name: 'NotFound' }
        } 
 
      },
      component: () => import('../views/ViewUser.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  AOS.init(); // Initialize AOS
  next();
});

export default router
