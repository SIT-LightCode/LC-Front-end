<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
</script>
 
<template>
    <div class="py-2 border-b-2 z-[5000] bg-white w-full">
        
		<RouterLink :to="'/lightcode'">
			<div class="flex items-center  pl-11 pt-3 gap-4 ">
				<img class="h-12 invisible sm:visible" src='../../assets/picture/lclogo.png' alt="logo_my_froup">
				<h1 class=" font-roboto text-2xl invisible md:visible text-st-blue">Lightcode </h1>
			</div>
		</RouterLink>
    </div>
</template>
 
<style scoped>

</style>