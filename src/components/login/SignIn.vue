<script setup>
import { ref } from 'vue'
import ButtonPage from '../button/Button.vue';
import { Toaster, toast } from 'vue-sonner'

const emit = defineEmits(['login','status'])

const dataForLogin = ref({
    email: '', password: ''
})


const checkLogin = () =>{
    let errortext = ""
    for (const data in dataForLogin.value){
        if(dataForLogin.value[data]==''){
            // alert('error')
            errortext = errortext + data + ' is null value ,'
        }
    }
    if(errortext == ""){
        emit('login', dataForLogin.value)
    } else {
        toast.error(errortext)
    }
}

const lowCase = () => {
    dataForLogin.value.email = dataForLogin.value.email.toLowerCase()
}
</script>

<template>
    <div class="absolute w-full h-full z-[5]">
        <div class="absolute top-0 w-full h-full bg-center bg-cover"
          style='background-image: url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1267&amp;q=80");'>
          <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
        </div>
        <div class="container mx-auto h-full">
            <div class="flex content-center items-center justify-center h-full">
                
                <div class="w-full lg:w-4/12 px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                        <div class="rounded-t mb-0 px-6 py-6">
                            <div class="text-center mb-3">
                                <h6 class="text-gray-600 text-sm font-bold">
                                    Sign in 
                                </h6>
                            </div>
                            <div class="btn-wrapper text-center">
                                <!-- <button
                                    class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                    type="button" style="transition: all 0.15s ease 0s;">
                                    <img alt="..." class="w-5 mr-1" src="../../assets/picture/github.svg" />Github</button><button
                                    class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                    type="button" style="transition: all 0.15s ease 0s;">
                                    <img alt="..." class="w-5 mr-1" src="../../assets/picture/google.svg" />Google
                                </button> -->
                            </div>
                            <hr class="mt-6 border-b-1 border-gray-400" />
                        </div>
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div class="text-gray-500 text-center mb-3 font-bold">
                                <!-- <small>Or sign in with credentials</small> -->
                            </div>
                            <form>
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Email
                                    </label>
                                    <input type="email"
                                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email" style="transition: all 0.15s ease 0s;" id="email" @change="lowCase()"
                                        v-model="dataForLogin.email" />
                                </div>
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Password
                                    </label>
                                    <input type="password"
                                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Password" style="transition: all 0.15s ease 0s;" id="password"
                                        v-model="dataForLogin.password" />
                                </div>
                            </form>
                            <button @click="$emit('status',true)" class="hover:text-blue-500 transition-all">Create Account</button>
                            <div class="text-center mt-6">
                                <ButtonPage @buttonClick="checkLogin()" :status="false" :name="'Log In'"></ButtonPage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped></style>