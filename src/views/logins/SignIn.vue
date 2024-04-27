<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { loginCon } from '../../stores/LoginCon.js'
import { ref } from 'vue'
import ButtonPage from '../../components/button/Button.vue'
import { Toaster, toast } from 'vue-sonner'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Loading from '../../components/main/Loading.vue'

const myLogin = loginCon()
const myRouter = useRouter()
const isLoading =ref(false)

const dataForLogin = ref({
    email: '', password: ''
})


const checkLogin = () => {
    let errortext = ""
    isLoading.value = true
    for (const data in dataForLogin.value) {
        if (dataForLogin.value[data] == '') {
            // alert('error')
            errortext = errortext + data + ' is null value ,'
        }
    }
    if (errortext == "") {
        myLogin.SignIn(dataForLogin.value.email, dataForLogin.value.password, false)
    } else {
        toast.error(errortext)
    }

    
}

const lowCase = () => {
    dataForLogin.value.email = dataForLogin.value.email.toLowerCase()
}
</script>

<template>
    
    <div class="flex flex-col gap-12 pt-20 md:flex-row items-center justify-center max-w-[100%] min-h-screen bg-white">
        
        <div class="w-screen h-screen fixed z-[10000] bg-white top-0 right-0 opacity-50 "
            :class="[isLoading? 'visible' : 'invisible']">
            <Loading class="fixed right-[50%] top-[50%]  z-[10000]"/>
        </div>
        <div class="w-50">
            <img class="invisible sm:visible content-center" width="250" src="../../assets/picture/lclogo.png"
                alt="logo_my_froup" />
        </div>
        <div class="relative min-w-0 break-words w-50 mb-6 shadow-lg rounded-lg p-5 bg-white">
            <div class="mb-0 px-6 py-6 ">
                <div class="text-center mb-3 ">
                    <h6 class="" id="topic">
                        Welcome Back!
                    </h6>
                </div>
                <hr class="mt-6 border-b-1 border-gray-400" />
            </div>

            <span>Don’t have an account? <span class="text-st-blue hover:text-blue-800 transition-all cursor-pointer"
                    @click="myRouter.push('/login/signup')">Sign up</span></span>

            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div class="text-gray-500 text-center mb-3 font-bold">
                </div>
                <form>
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email
                        </label>
                        <InputText type="email" @change="lowCase()" v-model="dataForLogin.email" />
                    </div>
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password
                        </label>
                        <Password v-model="dataForLogin.password" :feedback="false" toggleMask />
                    </div>
                </form>
                <div class="text-center mt-6">
                    <ButtonPage class="bg-gray-300 hover:bg-gray-400" @buttonClick="checkLogin()" :status="false"
                        :name="'Log In'"></ButtonPage>
                </div>
            </div>
        </div>
    </div>



</template>

<style scoped>
#topic {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
}

.flex-container {
    display: flex;
    justify-content: center;
    /* จัด div ให้อยู่ตรงกลางตามแนวนอน */
    align-items: center;
    /* จัด div ให้อยู่ตรงกลางตามแนวดิ่ง */
}

/* หรือใช้ Grid Layout */
.grid-container {
    display: grid;
    place-items: center;
    /* จัด div ให้อยู่ตรงกลางทั้งแนวนอนและแนวดิ่ง */
}
</style>