<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
</script>

<template>
	<div class="py-2 border-b-2 z-[5000] bg-white w-full flex">
		<RouterLink :to="'/lightcode'">
			<div class="flex items-center pl-11 pt-3 gap-4 ">
				<img class="h-12 invisible sm:visible" src='../../assets/picture/lclogo.png' alt="logo_my_froup">
				<h1 class=" font-roboto text-2xl invisible md:visible text-st-blue">Lightcode </h1>
			</div>
		</RouterLink>
		<div v-if="$route.path == '/'" class=" flex justify-end space-x-10 px-5 py-2 w-full ">
			<RouterLink id="joinButton" :to="'/login/signin'"
				:class="`text-gray-800  p-4 m-1 
    inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-gray-300 hover:bg-gray-400`">
				<a> log in </a>
			</RouterLink>
			<RouterLink id="joinButton" :to="'/login/signup'"
				:class="` text-gray-800  p-4 m-1 
    inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-blue-300 hover:bg-blue-400 `">
				<a> join </a>
			</RouterLink>

		</div>
	</div>
</template>

<style scoped></style>