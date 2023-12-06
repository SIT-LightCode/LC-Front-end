<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref} from 'vue'
    const links = ref([
        { message:'Home',path:'/' }, 
        { message:'Problem' ,path:'/Problem'}, 
        { message:'Learning', path:'/Learning'},
        { message:'Addproblem', path:'/Addproblem'},
        { message:'About', path:'/About'},
        { message:'Codeeditor', path:'/Codeeditor'}
])
</script>

<template>
    <div class="flex pb-4 pt-2 border-b-2">
        <RouterLink to="/" class="flex items-center absolute pl-11 pt-3 gap-4">
            <img class="h-12" src='../../assets/picture/lclogo.png' alt="logo_my_froup" >
            <h1 class=" font-roboto font-bold">Lightcode </h1>
        </RouterLink>
        <div class="flex justify-center space-x-10 text-black p-1 w-full">
            <RouterLink :to="link.path" v-for="link in links" :class="($route.path=== link.path ? `border-blue-500` : ``)+  ` max-w-[80px] border-b-4  hover:border-blue-500 hover:text-blue-500 transition flex flex-col items-center p-3`">
                <a>{{ link.message }} </a>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>