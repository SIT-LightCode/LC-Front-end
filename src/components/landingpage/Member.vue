<script setup>
import amon from "../../assets/picture/amon.jpg"
import tus from "../../assets/picture/tus.jpg"
import mark from "../../assets/picture/mark.jpg"

const member = {
  amon: {
    name: "Amornpong Duangchawee",
    img : amon,
    studentID: "",
    position: "Backend Database",
  },
  tus: {
    name: "Rapeepat Klamjeen",
    img : tus,
    studentID: "",
    position: "Infrastructure",
  },
  mark: {
    name: "Aritach Krudminburee",
    img : mark,
    studentID: "63130500133",
    position: "Frontend",
  }
}
</script>
 
<template>
  <section class="pt-20 pb-48">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center text-center mb-24 ">
        <div class="w-full lg:w-6/12 px-4">
          <h2 data-aos="zoom-in" data-aos-duration="1000" class="text-4xl font-semibold text-[#007AFF]">Member for LightCode Team</h2>
          <p data-aos="zoom-in" data-aos-duration="1000" class="text-lg leading-relaxed m-4 text-gray-600">
            Students of King Mongkut's University of Technology Thonburi,
            Faculty of Information Technology, Department of Information Technology

          </p>
        </div>
      </div>
      <div class="flex flex-wrap justify-center text-center">
        <div v-for="name in member" class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
          <div class="px-6">
            <img data-aos="flip-left" data-aos-duration="1000" alt="..." :src= "name.img" class="shadow-lg rounded-full max-w-full mx-auto" style="max-width: 120px;" />
            <div data-aos="zoom-in" data-aos-duration="1000" class="pt-6 text-center">
              <h5 class="text-xl font-bold">{{ name.name }}</h5>
              <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                {{ name.position }}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
 
<style></style>