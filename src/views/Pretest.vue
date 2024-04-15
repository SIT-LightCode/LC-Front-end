<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
const myRouter = useRouter()
</script>
 
<template>
    
<div class="bg-st-grey w-screen h-screen fixed flex items-center justify-center">
    <div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
    <div class="flex flex-col items-center">
        <!-- <h1 class="font-rampart font-normal text-[64px] text-st-blue mb-20">Pretest</h1> -->
        <div class=" text-white">
            <h1 class="font-roboto font-normal text-[24px]">Have you ever write javascript?</h1>
            <div class="flex justify-around mt-14">
                <button @click="myRouter.push({ name: 'home' })" class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-red-600">No</button>
                <button @click="myRouter.push({ name: 'dopretest' })" class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-green-500">Yes</button>
            </div>
            
        </div>
        <div></div>
    </div>
</div>
</template>
 
<style scoped>

</style>