<script setup>
import IconArrowSmallLeft from "../icons/IconArrowSmallLeft.vue"
import IconArrowSmallRight from "../icons/IconArrowSmallRight.vue"
import { ref,onBeforeMount } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from "../../stores/Account.js"
const myAccount = account()
const emit = defineEmits(["openCloseSidebarEmit","OpenModal","LogOut"])
const sidebarIsShow = ref(false)
const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 }) 
const openCloseSideBar = () => {
	sidebarIsShow.value = !sidebarIsShow.value
	emit("openCloseSidebarEmit", sidebarIsShow.value)
}


user.value = JSON.parse(localStorage.getItem('user'))


</script>

<template>
	<div class="">
		<div
			:class="
				(sidebarIsShow ? `w-full` : `w-44 h-10`) +
				` z-[10000] max-w-fit bg-gray-800 transition-all text-white fixed  rounded-r-lg  top-1/2 left-0 transform -translate-y-1/2`
			"
		>
			<div v-show="sidebarIsShow" class="flex ">
				<div class="flex flex-col items-center p-4 ">
					<div class="relative w-full pb-3">
						<div class="flex justify-center">
							<div>{{ user.name }}</div>
						</div>
					</div>
					<img
						src="../../assets/picture/user_icon_01.jpg"
						class="rounded-lg"
						alt="user_icon"
						width="200"
						height="200"
					/>
					<div class="mt-2">
						<ul v-for="(user,key) in user">
							<li v-if="key !== 'skills'">{{key}} : {{ user }}</li>
						</ul>
					</div>
					<buttonVue @buttonClick="()=>{ sidebarIsShow = false; $emit('OpenModal',true) }" :name="'Setting'" :status="false"/>
					<buttonVue @buttonClick="()=>{ $emit('LogOut',true) }" :name="'Log Out'"  />
				</div>
				<div
					@click="openCloseSideBar"
					class=" flex items-center rounded-r-lg   hover:cursor-pointer transition hover:bg-blue-500 "
				>
					<IconArrowSmallLeft  />
                    
				</div>
			</div>
			<div
                @click="openCloseSideBar"
				v-show="sidebarIsShow == false"
				class="h-10 w-10 hover:cursor-pointer transition hover:bg-blue-500 rounded-r-lg flex justify-center items-center"
			>
				<IconArrowSmallRight/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
