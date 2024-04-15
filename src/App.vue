<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
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

const LogOut = () => {
  myLogin.logout()

  showModal.value = false
}
</script>

<template>
  <div class="text-black text-base  bg-white ">
    <Toaster richColors position="top-right" />
    <div>
      <Navbar v-if="$route.path == '/'" class="" />
    </div>
    <div class="flex fixed ">
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
