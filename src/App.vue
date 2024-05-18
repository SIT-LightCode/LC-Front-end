<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Loading from './components/main/Loading.vue'
import Navbar from './components/main/NavBar.vue'
import Sidebar from './components/main/SideBar.vue'
import TopNav from './components/main/TopNav.vue'
import setting from './components/settingmodal/Setting.vue'
import { Toaster, toast } from 'vue-sonner'
import { cookieData } from './stores/CookieData'
import { loginCon } from './stores/LoginCon'

const myRouter = useRouter()
const myLogin = loginCon()
const router = useRoute()
const myCookie = cookieData()
const sidebarIsShow = ref(false)
const showModal = ref(false)
const isLoading = ref(false)
const openCloseSidebar = (isShow) => {

  sidebarIsShow.value = isShow

}

const isNotPretest = computed(() => {
  return myRouter.currentRoute.value.path !== '/pretest' && myRouter.currentRoute.value.path !== '/dopretest'
})

const LogOut = async () => {
  isLoading.value = true
  let res = await myLogin.logout()
  if (res) {
    isLoading.value = false
  }
  showModal.value = false

}
</script>

<template>
  <div>
    <Toaster richColors position="top-right" />
    <div class="text-black text-base min-h-screen"
      :class="[$route.path == '/' || $route.name == 'isDo' ? 'bg-white' : 'bg-st-grey']">
      <div class="w-screen h-screen fixed z-[100000] bg-white top-0 right-0 opacity-50 "
        :class="[isLoading ? 'visible' : 'invisible']">
        <Loading class="fixed right-[50%] top-[50%]  z-[100000]" />
      </div>
      <!-- <div>
      <Navbar v-if="$route.path == '/'" class=" bg-black " />
    </div> -->
      <TopNav class="fixed border-b-2 top-0" />
      <div class="flex "
        v-if="$route.name !== 'congratulations' && $route.name !== 'dopretest' && $route.name !== 'startpretest' && $route.path !== '/' && $route.path !== '/login/signin' && $route.path !== '/login/signup'">
        <div class="flex-none mt-12 fixed z-[100] bg-white h-full">

          <Sidebar @LogOut="() => { LogOut() }"></Sidebar>
        </div>
        <div class="grow   ">
          <RouterView class="p-10"
            :class="[$route.path !== '/' && $route.path !== '/login/signin' && $route.path !== '/login/signup' ? ' pt-28 ml-56' : '']" />
        </div>
      </div>
      <div class="" v-else>
        <RouterView class="" />
      </div>
    </div>
  </div>


</template>

<style>
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
