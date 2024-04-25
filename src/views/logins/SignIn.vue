<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { loginCon } from '../../stores/LoginCon.js'
import { ref } from 'vue'
import ButtonPage from '../../components/button/Button.vue'
import { Toaster, toast } from 'vue-sonner'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';

const myLogin = loginCon()
const myRouter = useRouter()


const dataForLogin = ref({
    email: '', password: ''
})


const checkLogin = () => {
    let errortext = ""
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
    
    <div class="flex flex-col gap-12 pt-20 md:flex-row items-center justify-center max-w-[100%] mt-16">
        <div class="w-50">
            <img class="invisible sm:visible content-center" width="250" src="../../assets/picture/lclogo.png"
                alt="logo_my_froup" />
        </div>
        <div class="relative min-w-0 break-words w-50 mb-6 shadow-lg rounded-lg p-5">
            <div class="mb-0 px-6 py-6 ">
                <div class="text-center mb-3 ">
                    <h6 class="" id="topic">
                        Welcome Back!
                    </h6>
                </div>
                <hr class="mt-6 border-b-1 border-gray-400" />
            </div>

            <span>Don’t have an account? <span class="hover:text-blue-500 transition-all"
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