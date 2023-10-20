<script setup>

</script>
 
<template>
    <!-- Sidebar/menu -->
    <nav class="w3-sidebar w3-bar-block w3-white w3-collapse " style="z-index:3; width:250px; height:500px" id="mySidebar">
        <br>
        <a href="javascript:void(0)" onclick="w3_close()" class="w3-button w3-hide-large w3-display-topleft"
            style="width:100%;font-size:22px">Close Menu</a>
        <div class="w3-container">
            <h3 class="w3-padding-64"><b>Company<br>Name</b></h3>
        </div>
        <div class="w3-bar-block">
            <a href="#" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Home</a>
            <a href="#showcase" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Showcase</a>
            <a href="#services" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Services</a>
            <a href="#designers" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Designers</a>
            <a href="#packages" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Packages</a>
            <a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Contact</a>
        </div>
    </nav>
<!--  -->

<!-- context -->
    <div class="w3-main w3-padding-64" style="margin-left:300px">
        <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h2 class="w3-text-grey w3-padding-16"><i
                    class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Work Experience</h2>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Front End Developer / w3schools.com</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Jan 2015 - <span
                        class="w3-tag w3-teal w3-round">Current</span></h6>
                <p>Lorem ipsum dolor sit amet. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit
                    sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
                <hr>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Web Developer / something.com</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Mar 2012 - Dec 2014</h6>
                <p>Consectetur adipisicing elit. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit
                    sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
                <hr>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Graphic Designer / designsomething.com</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Jun 2010 - Mar 2012</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p><br>
            </div>
        </div>

        <div class="w3-container w3-card w3-white">
            <h2 class="w3-text-grey w3-padding-16"><i
                    class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Education</h2>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>W3Schools.com</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Forever</h6>
                <p>Web Development! All I need to know in one place</p>
                <hr>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>London Business School</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>2013 - 2015</h6>
                <p>Master Degree</p>
                <hr>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>School of Coding</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>2010 - 2013</h6>
                <p>Bachelor Degree</p><br>
            </div>
        </div>
    </div>
<!--  -->

</template>
 
<style></style>