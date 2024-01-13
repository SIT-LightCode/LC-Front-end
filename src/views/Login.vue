<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'

import { ref } from 'vue'
import signin from '../components/login/SignIn.vue';
import signup from '../components/login/SignUp.vue';
const myRouter = useRouter()
const page = ref('signin')
</script>
 
<template>
<Toaster richColors position="top-right"/>
<signin v-if="page=='signin'" @status="page = 'signup'" @login="myRouter.push({ name: 'lightcode' })"></signin>
<signup v-else-if="page=='signup'"  @status="page = 'signin'"  @create="page = 'signin'"></signup>

</template>
 
<style>

</style>