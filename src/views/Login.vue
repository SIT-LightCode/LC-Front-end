<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'
import { loginCon } from '../stores/LoginCon.js'
import { account } from '../stores/Account'
import { ref } from 'vue'
import signin from '../components/login/SignIn.vue';
import signup from '../components/login/SignUp.vue';

const myLogin = loginCon()
const myAccount = account()
const myRouter = useRouter()
const page = ref('signin')

const createAccount = (e1) => {
    myAccount.AddAccount(e1.name, e1.email, e1.password).then((status)=>{
        if(status != "error"){
            page.value = 'signin'
        }
    })
}
const loginAccount = (e1) => {
    myLogin.SignIn(e1.email, e1.password)
}
</script>
 
<template>
        <Toaster richColors position="top-right" />
        <signin v-if="page == 'signin'" @status="page = 'signup'" @login="(e1)=>{loginAccount(e1)}"></signin>
        <signup v-else-if="page == 'signup'" @status="page = 'signin'" @create="(e1) => { createAccount(e1) }"></signup>
</template>
 
<style></style>