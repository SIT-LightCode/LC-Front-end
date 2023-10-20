<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template class="w3-content" style="max-width:1200px">
  <div>
    <!-- header -->
    <div class="w3-top w3-white ">
      <div class="w3-bar-item w3-right w3-xlarge " style="margin:10px" >
        <img src='./assets/picture/logo_Lightcode_removebg.png' alt="logo_my_froup" width="100" height="60">
        Lightcode
      </div>
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
    <nav class="w3-sidebar w3-bar-block w3-white w3-collapse " style="z-index:3; width:250px" id="mySidebar">

      <div class="w3-container w3-display-container w3-padding-16 w3-center">
        <img src='./assets/picture/proxypic.jpg' alt="proxypic" width="200" height="200">
        <div >
          <div >Name : Tuslnwza007</div>
          <ul>
            <li>Score : 100</li>
            <li>Ranking : 1</li>
            <li>Passed : 100</li>
          </ul>
        </div>
      </div>

      <div class="line"></div>
      
      <div class="w3-large w3-text-grey " style="font-weight:bold">
        <RouterLink to="/">
          <a href="#" class="w3-bar-item w3-center w3-button">
            Home
          </a>
        </RouterLink>
        <RouterLink to="/Problem">
          <a href="#" class="w3-bar-item w3-center w3-button">
            Problem
          </a>
        </RouterLink>
        <RouterLink to="/Learning">
          <a href="#" class="w3-bar-item w3-center w3-button">
            Learning
          </a>
        </RouterLink>
        <RouterLink to="/Addproblem">
          <a href="#" class="w3-bar-item w3-center w3-button">
            Add Problem
          </a>
        </RouterLink>
        <RouterLink to="/About">
          <a href="#" class="w3-bar-item w3-center w3-button">
            About
          </a>
        </RouterLink>
        <RouterLink to="/Codeeditor">
          <a href="#" class="w3-bar-item w3-center w3-button">
            CodeEditor
          </a>
        </RouterLink>
      </div>
    </nav>
    <!--  -->


    <!-- main -->
    <div class="w3-main w3-padding-64" style="margin-left:300px">
      <div class="w3-hide-large" style="margin-top:83px"></div>
      <div class="w3-row ">
        <RouterView />
      </div>
    </div>
  </div>
    <!--  -->

  <!-- footer -->
  <footer class="w3-container w3-padding-32 w3-light-grey w3-center " id="footer" style="margin-left:300px">
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
  </footer>
      <!--  -->

</template>

<style scoped>
.w3-sidebar a {
  font-family: "Roboto", sans-serif
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
.w3-wide {
  font-family: "Montserrat", sans-serif;
}

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
