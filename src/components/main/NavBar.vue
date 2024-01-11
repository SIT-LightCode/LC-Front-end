<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
const links = ref([
    { message: 'Home', path: '/lightcode' },
    { message: 'Problem', path: '/problem' },
    { message: 'Learning', path: '/learning' },
    { message: 'Add problem', path: '/add-problem' },
    { message: 'About', path: '/about' },
])
</script>

<template>
    <div class="flex pb-4 pt-2 border-b-2">
        <div class="flex items-center absolute pl-11 pt-3 gap-4">
            <img class="h-12" src='../../assets/picture/lclogo.png' alt="logo_my_froup">
            <h1 class=" font-roboto font-bold">Lightcode </h1>
        </div>
        <div v-if="$route.path == '/'" class="flex justify-end space-x-10  text-black p-1 w-full ">
            <RouterLink :to="'/login'"
                :class="`max-w-[800px] border-2 rounded-full border-blue-500 text-white bg-blue-500 hover:border-gray-300 hover:text-blue-500 hover:bg-white transitionflex flex-col items-center p-3 `">
                <a> login </a>
            </RouterLink>
        </div>
        <div v-else class="flex justify-center space-x-10 text-black p-1 w-full ">
            <RouterLink v-if="$route.path !== '/login'" :to="link.path" v-for="link in links"
                :class="($route.path === link.path ? `border-blue-500` : ``) + ` max-w-[800px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3 `">
                <a>{{ link.message }} </a>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>