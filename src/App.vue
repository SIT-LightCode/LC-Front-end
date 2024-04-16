<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import Navbar from './components/main/NavBar.vue'
import Sidebar from './components/main/SideBar.vue'
import setting from './components/settingmodal/Setting.vue'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from './stores/CookieData'
import { loginCon } from './stores/LoginCon'

const myRouter = useRouter()
const myLogin = loginCon()

const myCookie = cookieData()
const sidebarIsShow = ref(false)
const showModal = ref(false)
const openCloseSidebar = (isShow) => {

  sidebarIsShow.value = isShow

}

const isNotPretest = computed(() => {
  return myRouter.currentRoute.value.path !== '/pretest' && myRouter.currentRoute.value.path !== '/dopretest'
})

const LogOut = () => {
  myLogin.logout()

  showModal.value = false
}
</script>

<template>
<<<<<<< HEAD
=======
  <div class="text-black text-base min-h-screen bg-white relative  ">
    <Toaster richColors position="top-right" />

    <Navbar v-if="$route.path !== '/login'&&$route.path !== '/pretest'&&$route.path !== '/dopretest'"  class="z-10"/>
    <Sidebar v-if="$route.path !== '/' && $route.path !== '/login'&& $route.name !== 'NotFound'&&$route.path !== '/pretest'&&$route.path !== '/dopretest'" @openCloseSidebarEmit="openCloseSidebar"  @OpenModal="() => {
      showModal = true; 
    }" @LogOut="() => { LogOut() }"/>
    <!-- mainn -->
    <RouterView class="inline-block" :class="isNotPretest? 'pt-24':'' " />
>>>>>>> origin/main

  <div class="text-black text-base  bg-white ">
    <Toaster richColors position="top-right" />
    <div>
      <Navbar v-if="$route.path == '/'" class="" />
    </div>
    <div class="flex  ">
      <div class="flex-none "> 
        <Sidebar v-if="$route.path !== '/' && $route.path !== '/login/signin'&& $route.path !== '/login/signup'" @LogOut="()=>{LogOut()}"></Sidebar>
      </div>
      <div class="grow">
        <RouterView class="p-10"/>

      </div>

    </div>
  </div>
  <div v-if="showModal">
    <setting @CloseModal="(e1) => { showModal = e1 }"></setting>
  </div>
</template>

<style scoped></style>
