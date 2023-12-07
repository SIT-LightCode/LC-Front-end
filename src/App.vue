<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template >
  <div class="text-white min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 relative">
    <!-- header -->
    <div class="absolute top-5 right-5 flex items-center gap-4">
        <img  src='./assets/picture/lclogo.png' alt="logo_my_froup" width="100" height="60">
        <div class="text-3xl font-roboto font-bold">Lightcode</div>
    </div>
    <!--  -->
    
    <!-- Top menu on small screens -->
    <!-- <header class="w3-bar w3-top w3-hide-large w3-white w3-xlarge">
      <img src='./assets/picture/logo_Lightcode_removebg.png' alt="logo_my_froup" width="100" height="60">
      Lightcode
      <a href="javascript:void(0)" class="w3-bar-item w3-button w3-padding-24 w3-right" onclick="w3_open()"><i
          class="fa fa-bars"></i></a>
    </header> -->
    <!--  -->



    <!-- Menu -->
    <nav class="bg-indigo-950 w-1/6 rounded-r-lg flex flex-col items-center absolute top-1/2 left-0 transform -translate-y-1/2 " >

      <div class=" min-w-full flex flex-col items-center ">
        <img src='./assets/picture/proxypic.jpg' class="rounded-lg" alt="proxypic" width="200" height="200">
        <div class="mt-4 mb-4 ">
          <div >Name : Tuslnwza007</div>
          <ul>
            <li>Score : 100</li>
            <li>Ranking : 1</li>
            <li>Passed : 100</li>
          </ul>
        </div>
      </div>

  
      
      <div class="flex flex-col min-w-full text-black gap-1 p-1" >
        <RouterLink to="/" class=" rounded-lg hover:bg-slate-500 text-white transition flex flex-col items-center p-3">
            <a>Home</a>
        </RouterLink>
        <RouterLink to="/Problem" class="rounded-lg hover:bg-slate-500 text-white transition flex flex-col items-center p-3">
          <a href="#">
            Problem
          </a>
        </RouterLink>
        <RouterLink to="/Learning" class="rounded-lg hover:bg-slate-500 text-white transition flex flex-col items-center p-3">
          <a href="#">
            Learning
          </a>
        </RouterLink>
        <RouterLink to="/Addproblem" class=" rounded-lg hover:bg-slate-500 text-white transition flex flex-col items-center p-3">
          <a href="#" >
            Add Problem
          </a>
        </RouterLink>
        <RouterLink to="/About" class=" rounded-lg hover:bg-slate-500 text-white transition flex flex-col items-center p-3">
          <a href="#">
            About
          </a>
        </RouterLink>
      </div>
    </nav>
    <!--  -->


    <!-- main -->
    <div class="grid grid-cols-8">
      <div class="col-start-3 col-span-6" >
            <RouterView class="mt-36 mr-16"/>
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
