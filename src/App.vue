<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import Navbar from './components/main/NavBar.vue'
import Sidebar from './components/main/SideBar.vue'
import { Toaster, toast } from 'vue-sonner'

const links = ref([
  { message: 'Home', path: '/' },
  { message: 'Problem', path: '/problem' },
  { message: 'Learning', path: '/learning' },
  { message: 'Add problem', path: '/add-problem' },
  { message: 'About', path: '/about' },
])

const sidebarIsShow = ref(false)

const openCloseSidebar = (isShow) => {
  console.log('ss')
  sidebarIsShow.value = isShow
}
</script>

<template>
  <div class="text-black text-base min-h-screen bg-white relative">
    <Toaster richColors position="top-right" />

    <Navbar />
    <Sidebar @openCloseSidebarEmit="openCloseSidebar" />
    <!-- mainn -->
    <div class="grid grid-cols-12">
      <div class="col-start-1 px-14col-start-1 col-span-12 px-14 pt-10 tansition-all">
        <RouterView class="" />
      </div>
    </div>
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
