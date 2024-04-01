<script setup>
import IconArrowSmallLeft from "../icons/IconArrowSmallLeft.vue"
import IconArrowSmallRight from "../icons/IconArrowSmallRight.vue"
import { ref, onBeforeMount } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from "../../stores/Account.js"
import Menu from 'primevue/menu';
import { PrimeIcons } from 'primevue/api';

const myAccount = account()
const emit = defineEmits(["openCloseSidebarEmit", "OpenModal", "LogOut"])
const sidebarIsShow = ref(false)
const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })


const openCloseSideBar = () => {
	sidebarIsShow.value = !sidebarIsShow.value
	emit("openCloseSidebarEmit", sidebarIsShow.value)
}


user.value = JSON.parse(localStorage.getItem('user'))
const setRole = () => {
	if (user.value.authorities.includes('ADMIN')) {
		user.value.authorities = 'ADMIN'
	} else if (user.value.authorities.includes('USER')) {
		user.value.authorities = 'USER'
	}
}
setRole()

const items =  ref([

	{
		label: 'Settings',
		icon: 'pi pi-cog',
		command: () => {
			sidebarIsShow.value = false; 
			emit('OpenModal', true)
		}
	},
	{
		label: 'Logout',
		icon: 'pi pi-sign-out',
		command: () => {


			sidebarIsShow.value = false; 
			emit('LogOut', true)
		}
	}
])


</script>

<template>
	<div class="">
		<div :class="(sidebarIsShow ? `w-full` : `w-44 h-10`) +
			` z-[10000] max-w-fit bg-gray-800 transition-all text-white fixed  rounded-r-lg  top-1/2 left-0 transform -translate-y-1/2`
			">
			<div v-show="sidebarIsShow" class="flex ">
				<div class="flex flex-col items-center p-4 ">
					<div class="relative w-full pb-3">
						<div class="flex justify-center font-bold">
							<div >{{ user.name }}</div>
						</div>
					</div>
					
					<div class="">
						<ul v-for="(user, key) in user">
							<li v-if="key !== 'skills' && key !== 'id'">{{ key }} : {{ user }}</li>
						</ul>
					</div>
					<div class="flex justify-content-center py-2">
						<Menu :model="items" />
					</div>
				</div>

				<div @click="openCloseSideBar"
					class=" flex items-center rounded-r-lg   hover:cursor-pointer transition hover:bg-blue-500 ">
					<IconArrowSmallLeft />

				</div>
			</div>
			<div @click="openCloseSideBar" v-show="sidebarIsShow == false"
				class="h-10 w-10 hover:cursor-pointer transition hover:bg-blue-500 rounded-r-lg flex justify-center items-center">
				<IconArrowSmallRight />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
