<script setup>
import IconArrowSmallLeft from "../icons/IconArrowSmallLeft.vue"
import IconArrowSmallRight from "../icons/IconArrowSmallRight.vue"
import { ref,onBeforeMount } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from "../../stores/Account.js"
const myAccount = account()
const emit = defineEmits(["openCloseSidebarEmit","OpenModal","LogOut"])
const sidebarIsShow = ref(false)

const openCloseSideBar = () => {
	sidebarIsShow.value = !sidebarIsShow.value
	emit("openCloseSidebarEmit", sidebarIsShow.value)
}

</script>

<template>
	<div class="">
		
		<div
			:class="
				(sidebarIsShow ? `w-1/6` : `w-44 h-10`) +
				` z-[10000] max-w-fit bg-gray-800 transition-all text-white fixed  rounded-r-lg  top-1/2 left-0 transform -translate-y-1/2`
			"
		>
			<div v-show="sidebarIsShow" class="flex ">
				<div class="flex flex-col items-center p-4 ">
					<div class="relative w-full pb-3">
						<div class="flex justify-center">
							<div>{{ myAccount.user.name }}</div>
						</div>
						<!-- <IconArrowSmallLeft @click="openCloseSideBar" class="absolute top-0 right-0 border-b-2 hover:cursor-pointer border-gray-800  hover:border-blue-500 hover:text-blue-500"/> -->
					</div>
					<img
						src="../../assets/picture/user_icon_01.jpg"
						class="rounded-lg"
						alt="user_icon"
						width="200"
						height="200"
					/>
					<div class="mt-2">
						<ul v-for="(user,key) in myAccount.user">
							<li>{{key}} : {{ user }}</li>
						</ul>
					</div>
					<buttonVue @click="()=>{ sidebarIsShow = false; $emit('OpenModal',true) }" :name="'Setting'" :status="false"/>
					<buttonVue @click="()=>{ $emit('LogOut',true) }" :name="'Log Out'"  />
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
