<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import Navbar from './components/main/NavBar.vue'
import Sidebar from './components/main/SideBar.vue'
import TopNav from './components/main/TopNav.vue'
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

  <div class="text-black text-base  bg-white ">
    <Toaster richColors position="top-right" />

    <div>
      <Navbar v-if="$route.path == '/'" class=" bg-black " />
    </div>
    <TopNav class="fixed border-b-2 "/>
    <div class="flex " v-if="$route.path !== '/pretest'">
      
      <div class="flex-none mt-16 fixed z-[100] bg-white h-full" > 
        <Sidebar v-if="$route.path !== '/' && $route.path !== '/login/signin'&& $route.path !== '/login/signup' " @LogOut="()=>{LogOut()}"></Sidebar>
      </div>
      <div class="grow   ">
        <RouterView class="p-10 mt-16 ml-56"/>
      </div>
    </div>
    <div class="flex " v-else>
        <RouterView class=""/>
    </div>
  </div>

  <div v-if="showModal">
    <setting @CloseModal="(e1) => { showModal = e1 }"></setting>
  </div>
</template>

<style >
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 128px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>
