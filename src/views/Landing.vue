<script setup>
import FooterComponent from '../components/landingpage/Footer.vue'
import WhatIsLightCode from '../components/landingpage/WhatIsLightCode.vue'
import Goal from '../components/landingpage/Goal.vue'
import Member from '../components/landingpage/Member.vue'
</script>
<template>
  <div class="w-screen">
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-tr bg-whitep-10">
      <div class="w-max">
        <h1
          class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-gray-600 pr-5 text-8xl text-st-blue font-bold"
        >
          LIGHTCODE
        </h1>
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
  color: #007aff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Rampart One';
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  /* 28.125% */
}
</style>
