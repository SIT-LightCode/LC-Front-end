<script setup>
import IconArrowSmallRight from '../icons/IconArrowSmallRight.vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from "vue"
const router = useRouter()
const isButtonHover = ref(false)
function hoverButton() {
  isButtonHover.value = !isButtonHover.value
}
</script>

<template>
  <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh;">
    <div class="container relative mx-auto">
      <div class="items-center flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
          <div class="flex flex-col items-center">
            <h1 data-aos="fade-up" data-aos-duration="1000" class="text-[#007AFF] font-semibold text-5xl">
              JavaScript Mastery Platform
            </h1>
            <p data-aos="fade-up" data-aos-duration="1000" class="mt-4 text-lg text-[#000000]">
              Empower yourself with JavaScript expertise. Elevate your coding abilities through our dynamic platform
              offering hands-on learning and practice opportunities.
            </p>
            <div data-aos="fade-up" data-aos-duration="1000" @click="router.push('/login/signin')"
              :onmouseenter="() => { hoverButton() }" :onmouseleave="() => { hoverButton() }"
              class="bg-gray-300 hover:bg-gray-400 flex mt-7 pr-8 relative bg-slate-400 w-36 p-2 content-center justify-center rounded-lg hover:bg-slate-200 hover:cursor-pointer transition-all">
              Get Started
              <IconArrowSmallRight
                :class="`absolute transition-all ` + (isButtonHover ? `ml-2 right-1` : `ml-1 right-2`)" />
            </div>
          </div>
        </div>
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