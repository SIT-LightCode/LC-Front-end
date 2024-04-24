<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { account } from '../../stores/Account'
import { cookieData } from '../../stores/CookieData'

import { ref, onBeforeMount } from 'vue'
const myAccount = account()
const myCookie = cookieData()
const router = useRouter()
const links = ref([
    { message: 'Home', path: '/lightcode' },
    { message: 'Problem', path: '/problem' },
    { message: 'Learning', path: '/learning' },
    { message: 'View User', path: '/view-user' },
])

const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })


user.value = JSON.parse(localStorage.getItem('user'))

</script>

<template>
    <div class="flex pb-4 pt-2  fixed w-full bg-white "
        v-if="$route.path != '/login/signin' && $route.path != '/login/signup'">
        <RouterLink :to="'/lightcode'">
            <div class="flex items-center absolute pl-11 pt-3 gap-4 ">
                <img class="h-12 invisible sm:visible" src='../../assets/picture/lclogo.png' alt="logo_my_froup">
                <h1 class=" font-roboto font-bold invisible md:visible text-[#007AFF]">Lightcode </h1>
            </div>
        </RouterLink>
        <div v-if="$route.path == '/'" class="flex justify-end space-x-10 px-5 py-2 w-full ">

            <RouterLink id="joinButton" :to="'/login/signin'" :class="`text-gray-800  p-4 m-1 
    inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-gray-300 hover:bg-gray-400`">
                <a> log in </a>
            </RouterLink>

            <RouterLink id="joinButton" :to="'/login/signup'" :class="` text-gray-800  p-4 m-1 
    inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-blue-300 hover:bg-blue-400 `">
                <a> join </a>
            </RouterLink>

        </div>
    </div>
</template>

<style scoped></style>