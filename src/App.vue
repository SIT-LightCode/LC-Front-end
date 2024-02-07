<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
import Navbar from './components/main/NavBar.vue'
import Sidebar from './components/main/SideBar.vue'
import setting from './components/setting/Setting.vue'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from './stores/CookieData'

const myRouter = useRouter()
const myCookie = cookieData()
const sidebarIsShow = ref(false)
const showModal = ref(false)
const openCloseSidebar = (isShow) => {

  sidebarIsShow.value = isShow

}

const LogOut = () => {
  myCookie.setCookie('TokenLightcode', '')
  myRouter.push({ name: 'home' })
  showModal.value = false
}

// const openmodal = () =>{
//   console.log(sidebarIsShow.value)
//   sidebarIsShow.value = false ;
//   console.log(sidebarIsShow.value)

// }
</script>

<template>
  <div class="text-black text-base min-h-screen bg-white relative">
    <Toaster richColors position="top-right" />

    <Navbar />
    <Sidebar v-if="$route.path !== '/' && $route.path !== '/login'&& $route.name !== 'NotFound'" @openCloseSidebarEmit="openCloseSidebar" @OpenModal="() => {
      showModal = true;
    }" />
    <!-- mainn -->
    <div class="grid grid-cols-12">
      <div class="col-start-1 px-14col-start-1 col-span-12 pt-10 tansition-all">
        <RouterView class="" />
      </div>
    </div>
  </div>
  <div v-if="showModal">
    <setting @CloseModal="(e1) => { showModal = e1 }" @LogOut="() => { LogOut() }" ></setting>
  </div>
</template>

<style scoped>
ul li {
  list-style: none;
}

.line {
  width: 100%;
  border-top: 2px black solid;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}
</style>
