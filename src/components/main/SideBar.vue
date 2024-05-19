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
import Setting from '../settingmodal/Setting.vue'
import Dialog from 'primevue/dialog';

const router = useRouter()
const myAccount = account()
const emit = defineEmits(["openCloseSidebarEmit", "OpenModal", "LogOut"])
const sidebarIsShow = ref(false)
const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })

const visible = ref(false)
const position = ref('center');


const openCloseSideBar = () => {
	sidebarIsShow.value = !sidebarIsShow.value
	emit("openCloseSidebarEmit", sidebarIsShow.value)
}


const setRole = async () => {
	if (user.value.authorities.includes('ADMIN')) {
		user.value.authorities = 'ADMIN'
	} else if (user.value.authorities.includes('USER')) {
		user.value.authorities = 'USER'
	}
}
const itemsforadmin = ref([
	{
		label: 'Admin Menu',
		items: [
			{
				label: 'View User',
				icon: 'pi pi-users',
				command: () => {
					router.push("/view-user/list")
				}
			}
		]
	},
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
					router.push("/problem/list/0")
				}
			},
			{
				label: 'My Problem',
				icon: 'pi pi-search',
				command: () => {
					router.push("/myproblem/list")
				}
			},

		]
	},
	{
		label: 'Profile',
		items: [
		{
				label: 'Settings',
				icon: 'pi pi-cog',
				command: () => {
					visible.value = true
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

const itemsforuser = ref([
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
					router.push("/problem/list")
				}
			},
			{
				label: 'My Problem',
				icon: 'pi pi-search',
				command: () => {
					router.push("/myproblem/list")
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
					visible.value = true
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

onBeforeMount(async () => {
	if (localStorage.getItem('user') !== null) {
		myAccount.user = JSON.parse(localStorage.getItem('user'))
		user.value = JSON.parse(localStorage.getItem('user'))
		await setRole()

	}


})

</script>

<template>
	<div class="">
		<Dialog v-model:visible="visible" header="Setting" :style="{ width: '25rem' }" :position="position"
				:modal="true">
				<Setting @CloseModal="visible = false"></Setting>
		</Dialog>
		<div class="card flex justify-content-center ">
			<!-- <Menu :model="itemsforuser" /> -->
			<!-- <Menu v-if="user.authorities == 'ADMIN'" :model="itemsforadmin" />
			<Menu v-else="user.authorities == 'USER'" :model="itemsforuser" /> -->
			<!-- Menu -->
			<div class="font-roboto text-lg flex flex-col mt-10 justify-center items-center w-44 ">
				<div v-if="user.authorities == 'ADMIN'" class="flex flex-col w-full border-b-2 ">
					<h1 class="opacity-50 text-sm pl-5 mt-4">Admin Menu</h1>
					<div class="flex flex-col">
					<RouterLink to='/view-user/list'
					:class="[$route.path == '/view-user/list'? 'text-st-blue border-l-st-blue':'border-l-white']"
					class="opacity-75 transition-all w-full h-12 flex items-center  border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100">View User</RouterLink>
					</div>
				</div>
				<div class="flex flex-col w-full  border-b-2">
					<h1 class="opacity-50 text-sm pl-5 mt-4">Main Menu</h1>
					<div class="flex flex-col  ">
						<RouterLink to='/lightcode'
						:class="[$route.path == '/lightcode'? 'text-st-blue border-l-st-blue':'border-l-white']"
						class="opacity-75 transition-all w-full h-12 flex items-center  border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100">Home</RouterLink>
						<RouterLink to='/learning/list/0/0' 
						:class="[$route.path.startsWith('/learning/list') ? 'text-st-blue border-l-st-blue':'border-l-white']"
						class="opacity-75 transition-all w-full h-12 flex items-center  border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100">Learning</RouterLink>
						<RouterLink to='/problem/list/0' 
						:class="[$route.path == '/problem/list'? 'text-st-blue border-l-st-blue':'border-l-white']"
						class="opacity-75 transition-all w-full h-12 flex items-center  border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100">Problem</RouterLink>
						<RouterLink to='/myproblem/list/0' 
						:class="[$route.path == '/myproblem/list'? 'text-st-blue border-l-st-blue':'border-l-white']"
						class="opacity-75 transition-all w-full h-12 flex items-center  border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100">My Problem</RouterLink>
					</div>
				</div>
				<div class="flex flex-col w-full ">
					<h1 class="opacity-50 text-sm pl-5 mt-4">Profile</h1>
					<div class="flex flex-col">
						<a @click="visible=true" class="opacity-75 transition-all w-full h-12 flex items-center border-l-white border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100 cursor-pointer">Setting</a>
						<a @click="$emit('logOut')" class="opacity-75 transition-all w-full h-12 flex items-center border-l-white border-l-4 pl-5 hover:border-l-st-blue hover:text-st-blue hover:opacity-100 cursor-pointer">Logout</a>
					</div>
				</div>

			</div>
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
