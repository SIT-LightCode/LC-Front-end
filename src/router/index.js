import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { jwtDecode } from 'jwt-decode'
import AOS from 'aos'
import 'aos/dist/aos.css'
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
  if (getCookie('refreshToken') == '' ) {
    return { path: '/login/signin' }
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
      children: [
        { path: 'signup', component: () => import('../views/logins/SignUp.vue') },
        { path: 'signin', component: () => import('../views/logins/SignIn.vue') },
      ],
    },
    {
      path: '/problem',
      beforeEnter: checkLogin,
      children: [
        {
          path: 'list',
          name: 'listProblem',
          component: () => import('../views/Problem/ListProblem.vue'),
        },
        {
          path: 'edit-problem/:id',
          name: 'editProblem',
          component: () => import('../views/Problem/DoProblem.vue'),
        },
        {
          path: 'do-problem/:id',
          name: 'doProblem',
          component: () => import('../views/Problem/DoProblem.vue'),
        },
      ],
    },
    {
      path: '/myproblem',
      name: 'myproblem',
      beforeEnter: checkLogin,
      children: [
        {
          path: 'list',
          name: 'listmyproblem',
          component: () => import('../views/Problem/MyProblem.vue'),
        },
        {
          path: 'add',
          name: 'addproblem',
          component: () => import('../views/Problem/AddProblem.vue'),
        },
        {
          path: 'edit-problem/:id',
          name: 'editproblem',
          component: () => import('../views/Problem/EditProblem.vue'),
        }
      ],
    },
    {
      path: '/learning',
      name: 'learning',
      children: [
        {
          path: 'list/:tagid/:lessonid',
          name: 'list',
          component: () => import('../views/Learning/ListLearning.vue'),
        },
        {
          path: 'addTag',
          name: 'addTag',
          component: () => import('../views/Learning/AddEditTag.vue'),
          beforeEnter: (to, from) => {
            if (getCookie('refreshToken') == '') {
              return { path: '/login/signin' }
            }
            if (localStorage.getItem('user') !== '') {
              const user = JSON.parse(localStorage.getItem('user'))
              console.log(user)
              if (!user.authorities.includes('ADMIN')) {
                return { name: 'NotFound' }
              }
            } else return { path: '/login/signin' }
          },
        },
        {
          path: 'addLesson',
          name: 'addLesson',
          component: () => import('../views/Learning/AddEditLesson.vue'),
          beforeEnter: (to, from) => {
            if (getCookie('refreshToken') == '') {
              return { path: '/login/signin' }
            }
            if (localStorage.getItem('user') !== '') {
              const user = JSON.parse(localStorage.getItem('user'))
              console.log(user)
              if (!user.authorities.includes('ADMIN')) {
                return { name: 'NotFound' }
              }
            } else return { path: '/login/signin' }
          },
        },
        {
          path: 'editTag/:tagid',
          name: 'editTag',
          component: () => import('../views/Learning/AddEditTag.vue'),
          beforeEnter: (to, from) => {
            if (getCookie('refreshToken') == '') {
              return { path: '/login/signin' }
            }
            if (localStorage.getItem('user') !== '') {
              const user = JSON.parse(localStorage.getItem('user'))
              console.log(user)
              if (!user.authorities.includes('ADMIN')) {
                return { name: 'NotFound' }
              }
            } else return { path: '/login/signin' }
          },
        },
        {
          path: 'editLesson/:tagid/:lessonid',
          name: 'editLesson',
          component: () => import('../views/Learning/AddEditLesson.vue'),
          beforeEnter: (to, from) => {
            if (getCookie('refreshToken') == '') {
              return { path: '/login/signin' }
            }
            if (localStorage.getItem('user') !== '') {
              const user = JSON.parse(localStorage.getItem('user'))
              console.log(user)
              if (!user.authorities.includes('ADMIN')) {
                return { name: 'NotFound' }
              }
            } else return { path: '/login/signin' }
          },
        },
      ],
    },

    {
      path: '/pretest',
      name: 'pretest',
      component: () => import('../views/Pretest.vue'),
    },
    {
      path: '/dopretest',
      name: 'dopretest',
      component: () => import('../views/DoPretest.vue'),
    },
    {
      path: '/view-user',
      name: 'viewuser',
      beforeEnter: (to, from) => {
        if (getCookie('refreshToken') == '') {
          return { path: '/login/signin' }
        }
        if (localStorage.getItem('user') !== '') {
          const user = JSON.parse(localStorage.getItem('user'))
          console.log(user)
          if (!user.authorities.includes('ADMIN')) {
            return { name: 'NotFound' }
          }
        } else return { path: '/login/signin' }
      },
      children: [
        {
          path: 'list',
          name: 'listUser',
          component: () => import('../views/User/ListUser.vue'),
        },
       
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  AOS.init() // Initialize AOS
  next()
})

export default router
