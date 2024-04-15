<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { cookieData } from '../../stores/CookieData'
import IconArrowSmallLeft from "../icons/IconArrowSmallLeft.vue"
import IconArrowSmallRight from "../icons/IconArrowSmallRight.vue"
import { ref, onBeforeMount } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from "../../stores/Account.js"
import Menu from 'primevue/menu';
import { PrimeIcons } from 'primevue/api';

const router = useRouter()
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

// const items = ref([
// 	{
// 		label: 'Settings',
// 		icon: 'pi pi-cog',
// 		command: () => {
// 			sidebarIsShow.value = false;
// 			emit('OpenModal', true)
// 		}
// 	},
// 	{
// 		label: 'Logout',
// 		icon: 'pi pi-sign-out',
// 		command: () => {
// 			sidebarIsShow.value = false;
// 			emit('LogOut', true)
// 		}
// 	}
// ])

const items = ref([
	{
		label: 'Main Menu',
		items: [
			{
				label: 'Home',
				icon: 'pi pi-home',
				command: () => {
					router.push("/lightcode")
				}
			},
			{
				label: 'Learning',
				icon: 'pi pi-book',
				command: () => {
					router.push("/learning/list/0/0")
				}
			},
			{
				label: 'Problem',
				icon: 'pi pi-credit-card',
				command: () => {
					router.push("/problem")
				}
			},
			// {
			// 	label: 'My Problem',
			// 	icon: 'pi pi-search',
			// 	command: () => {
			// 		router.push("")
			// 	}
			// },
			{
				label: 'View User',
				icon: 'pi pi-users',
				command: () => {
					router.push("/view-user")
				}
			}
		]
	},
	{
		label: 'Profile',
		items: [
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
					emit('LogOut', true)
				}

			}
		]
	}
]);
</script>

<template>
	<div class="p-5 ">
		<RouterLink :to="'/lightcode'">
			<div class="flex items-center  pl-11 pt-3 gap-4 ">
				<img class="h-12 invisible sm:visible" src='../../assets/picture/lclogo.png' alt="logo_my_froup">
				<h1 class=" font-roboto font-bold invisible md:visible text-[#007AFF]">Lightcode </h1>
			</div>
		</RouterLink>
		<div class="card flex justify-content-center">
			<Menu :model="items" />
		</div>
	</div>
</template>

<style scoped>
#text {
	color: rgba(0, 0, 0, 0.25);
	font-family: Roboto;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	/* 125% */
}
</style>
