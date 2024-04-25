<script setup>
import FooterComponent from "../components/landingpage/Footer.vue";
import WhatIsLightCode from "../components/landingpage/WhatIsLightCode.vue";
import Goal from "../components/landingpage/Goal.vue"
import Member from "../components/landingpage/Member.vue"

</script>
<template>
  <div>
    <div class="h-screen flex items-center justify-center">
      <h1 class="font-rampart text-8xl text-st-blue drop-shadow-lg">LIGHTCODE</h1>
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
