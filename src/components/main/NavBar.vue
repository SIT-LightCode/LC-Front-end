<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { account } from '../../stores/Account'
import { cookieData } from '../../stores/CookieData'

import { ref, onBeforeMount } from 'vue'
const myAccount = account()
const myCookie = cookieData()

const links = ref([
  { message: 'Home', path: '/lightcode' },
  { message: 'Problem', path: '/problem' },
  { message: 'Learning', path: '/learning' },
  { message: 'View User', path: '/view-user' },
])

onBeforeMount(async () => {
  if (myCookie.getCookie('TokenLightcode') != '') {
    await myAccount.GetUserByEmail()
  }
})
</script>

<template>
  <div class="flex pb-4 pt-2 border-b-2 fixed w-full bg-white z-[1]">
    <RouterLink :to="'/lightcode'">
      <div class="flex items-center absolute pl-11 pt-3 gap-4">
        <img
          class="h-12 invisible sm:visible"
          src="../../assets/picture/lclogo.png"
          alt="logo_my_froup"
        />
        <h1 class="font-roboto font-bold invisible md:visible">Lightcode</h1>
      </div></RouterLink
    >
    <div v-if="$route.path == '/'" class="flex justify-end space-x-10 text-black p-1 w-full">
      <RouterLink
        :to="'/login'"
        :class="`max-w-[800px] border-2 rounded-full border-blue-500 text-white bg-blue-500 hover:border-gray-300 hover:text-blue-500 hover:bg-white transitionflex flex-col items-center p-3 `"
      >
        <a> login </a>
      </RouterLink>
    </div>
    <div
      v-else-if="$route.path !== '/login'"
      class="flex justify-center space-x-2 sm:space-x-10 text-black p-1 w-full"
    >
      <RouterLink
        :to="'/lightcode'"
        :class="
          ($route.path === '/lightcode' ? `border-blue-500` : ``) +
          ` max-w-[800px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3 `
        "
      >
        <a> Home </a>
      </RouterLink>
      <RouterLink
        :to="'/problem'"
        :class="
          ($route.path === '/problem' ? `border-blue-500` : ``) +
          ` max-w-[800px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3 `
        "
      >
        <a> Problem </a>
      </RouterLink>
      <RouterLink
        :to="'/learning'"
        :class="
          ($route.path === '/learning' ? `border-blue-500` : ``) +
          ` max-w-[800px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3 `
        "
      >
        <a> Learning </a>
      </RouterLink>
      <RouterLink
        :to="'/view-user'"
        v-if="myAccount.user.authorities != [] && myAccount.user.authorities.includes('ADMIN')"
        :class="
          ($route.path === '/view-user' ? `border-blue-500` : ``) +
          ` max-w-[800px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3 `
        "
      >
        <a> View User </a>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
