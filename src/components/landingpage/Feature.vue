<script setup>
const features = [
  {
    topic : "test1",
    description : "test11"
  },{
    topic : "test2",
    description : "test22"
  },{
    topic : "test3",
    description : "test33"
  },
]

</script>
 
<template>
 <section class="pb-20 relative block bg-blue-900">
        <div class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style="height: 80px;">
       
        </div>
        <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div class="flex flex-wrap text-center justify-center ">
            <div class="w-full lg:w-6/12 px-4 " >
              <h2 class="text-4xl font-semibold text-white ">Feature</h2>
              <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-300">
                ..............................
              </p>
            </div>
          </div>
          <div class="flex flex-wrap mt-12 justify-center" >
            <div class="w-full lg:w-3/12 px-4 text-center" v-for="feature in features">
              <div
                class="text-gray-300 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i class="fas fa-medal text-xl"></i>
              </div>
              <h6 class="text-xl mt-5 font-semibold text-white">
                {{feature.topic}}
              </h6>
              <p class="mt-2 mb-4 text-gray-300">
                {{feature.description}}
              </p>
            </div>
          </div>
        </div>
      </section>
</template>
 
<style>

</style>