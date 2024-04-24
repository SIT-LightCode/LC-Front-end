<script setup>
import FooterComponent from "../components/landingpage/Footer.vue";
import WhatIsLightCode from "../components/landingpage/WhatIsLightCode.vue";
import Goal from "../components/landingpage/Goal.vue"
import Member from "../components/landingpage/Member.vue"

</script>
<template>
  <div>
    <div class=" flex items-center justify-center"
      style="min-height: 75vh;">
      <div class="container relative mx-auto">
        <div class="items-center flex ">
          <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div class="flex flex-col items-center">
              <div class="top-auto bottom-0 left-0 right-0 w-full absolute" style="height: 70px;">
                <div id="logo">
                  LIGHTCODE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WhatIsLightCode></WhatIsLightCode>
    <Goal></Goal>
    <Member></Member>
    <FooterComponent></FooterComponent>

  </div>
</template>

<style scoped>
#logo {

    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>
