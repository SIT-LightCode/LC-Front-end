<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

import Navbar from "./components/main/Navber.vue";
import Sidebar from "./components/main/Sidebar.vue";

const links = ref([
  { message: "Home", path: "/" },
  { message: "Problem", path: "/problem" },
  { message: "Learning", path: "/learning" },
  { message: "Add problem", path: "/add-problem" },
  { message: "About", path: "/about" },
]);

const sidebarIsShow = ref(false);

const openCloseSidebar = (isShow) => {
  console.log("ss");
  sidebarIsShow.value = isShow;
};
</script>

<template>
  <div class="text-black text-base min-h-screen bg-white relative">
    <Navbar />
    <Sidebar @openCloseSidebarEmit="openCloseSidebar" />
    <!-- main -->
    <div class="grid grid-cols-12">
      <div
        class="col-start-1 px-14col-start-1 col-span-12 px-14 pt-16 tansition-all"
      >
        <RouterView class="" />
      </div>
    </div>
  </div>

  <!--  -->

  <!-- footer -->
  <!-- <footer class="w3-container w3-padding-32 w3-light-grey w3-center " id="footer" style="margin-left:300px">
    <div class="w3-row-padding">
      <div class="w3-col s4">
        <h4>Contact</h4>
      </div>

      <div class="w3-col s4">
        <h4>About</h4>
      </div>

      <div class="w3-col s4 ">
        <h4>Store</h4>
      </div>
    </div>
  </footer> -->
  <!--  -->
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
