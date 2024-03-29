<script setup>
const targetGoal = [ "Learn" , "Practice" ,"Track Your Progress", "Enjoy the Journey"]
</script>
 
<template>
    <section class="relative py-20">
        <div class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style="height: 80px;">
            <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon class="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
        </div>
        <div class="container mx-auto px-4">
            <div class="items-center flex flex-wrap">
                <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
                    <div class="flex">
                            <img data-aos="fade-up" data-aos-duration="1000" class="invisible sm:visible content-center" src="../../assets/picture/lclogo.png" alt="logo_my_froup"/>
                    </div>
                </div>
                <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
                    <div data-aos="fade-up" data-aos-duration="1000" class="md:pr-12" >
                        <h3 class="text-3xl font-semibold">What Lightcode do</h3>
                        <p class="mt-4 text-lg leading-relaxed text-gray-600">
                        </p>
                        <ul class="list-none mt-6">
                            <li class="py-2" v-for="goal in targetGoal">
                                <div class="flex items-center">
                                    <div>
                                        <span
                                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-800 bg-blue-400 mr-3">
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