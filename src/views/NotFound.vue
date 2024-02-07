<script setup>
import { useRouter } from 'vue-router'
const myRouter = useRouter()
</script>
 
<template>
  <div class="px-10 ">
    <h1 >Not Found</h1>
    <p>Oops, we couldn't find that page. Try going <b @click="myRouter.push({ name: 'home' })">home</b></p>
  </div>
</template>
 
<style>

</style>