<script setup>
const targetGoal = [ "Learn" , "Practice" ,"Track Your Progress", "Enjoy the Journey"]
</script>
 
<template>
    <section class="relative ">
        
        <div class="container mx-auto px-4">
            <div class="items-center flex flex-wrap">
                <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
                    <div class="flex">
                            <img data-aos="fade-up" data-aos-duration="1000" class="invisible sm:visible content-center" src="../../assets/picture/lclogo.png" alt="logo_my_froup"/>
                    </div>
                </div>
                <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
                    <div data-aos="fade-up" data-aos-duration="1000" class="md:pr-12" >
                        <h3 class="text-3xl font-semibold text-[#007AFF]">What Lightcode do</h3>
                        <p class="mt-4 text-lg leading-relaxed text-gray-600">
                        </p>
                        <ul class="list-none mt-6">
                            <li class="py-2" v-for="goal in targetGoal">
                                <div class="flex items-center">
                                    <div>
                                        <span
                                            class="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-black bg-[#6CE9A6] mr-3">
                                            <i class="fas fa-fingerprint">
                                            </i>
                                        </span>
                                    </div>
                                    <div>
                                        <h4 class="text-gray-600">
                                            {{goal}}
                                        </h4>
                                    </div>
                                </div>
                            </li>
    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
 
<style></style>