<script setup>
import IconArrowSmallRight from '../icons/IconArrowSmallRight.vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from "vue"
const router = useRouter()
const isButtonHover = ref(false)
function hoverButton () {
  isButtonHover.value = !isButtonHover.value
}
</script>

<template>
      <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh;">
        <div class="absolute top-0 w-full h-full bg-center bg-cover">
          <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="flex flex-col items-center">
                <h1 data-aos="fade-up" data-aos-duration="1000" class="text-white font-semibold text-5xl">
                  JavaScript Mastery Platform
                </h1>
                <p data-aos="fade-up" data-aos-duration="1000" class="mt-4 text-lg text-gray-300">
                  Empower yourself with JavaScript expertise. Elevate your coding abilities through our dynamic platform offering hands-on learning and practice opportunities.
                </p>
                <div data-aos="fade-up" data-aos-duration="1000"  @click="router.push('/lightcode')" :onmouseenter="()=>{hoverButton()}" :onmouseleave="()=>{hoverButton()}" class="flex mt-7 pr-8 relative bg-white w-32 p-2 content-center justify-center rounded-lg hover:bg-slate-200 hover:cursor-pointer transition-all">
                  Get Started
                  <IconArrowSmallRight :class="`absolute transition-all `+(isButtonHover ? `ml-2 right-1` : `ml-1 right-2`)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px;">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
</template>

<style>
</style>