<script setup>
import { ref } from 'vue'
import ButtonPage from '../../components/button/Button.vue'
import { Toaster, toast } from 'vue-sonner'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { RouterLink, RouterView ,useRouter } from 'vue-router'
import { loginCon } from '../../stores/LoginCon.js'
import { account } from '../../stores/Account'


const myLogin = loginCon()
const myAccount = account()
const myRouter = useRouter()
const page = ref('signin')

const emit = defineEmits(['create', 'status'])

const dataForCreate = ref({
    name: '', email: '', password: '', passwordConfirm: ''
})

const checkCreate = () => {
    let errortext = ""
    if (dataForCreate.value.password != "" && dataForCreate.value.passwordConfirm != "" && dataForCreate.value.password !== dataForCreate.value.passwordConfirm) {
        // alert('password and passwordConfirm dont same value')
        errortext = errortext + ' password and passwordConfirm dont same value ,'
    }
    if (errortext == "") {
        createAccount()
    } else {
        toast.error(errortext)
    }
}

const createAccount = () => {
    myAccount.AddAccount(dataForCreate.value.name, dataForCreate.value.email, dataForCreate.value.password).then((status)=>{
    })
}

const lowCase = () => {
    dataForCreate.value.email = dataForCreate.value.email.toLowerCase()
}

// .trim(" ")
const maxPassword = () => {
    dataForCreate.value.password = dataForCreate.value.password.substring(0, 20).trim(" ")

}
const maxConPassword = () => {
    dataForCreate.value.passwordConfirm = dataForCreate.value.passwordConfirm.substring(0, 20).trim(" ")

}
</script>

<template>
<div class="flex flex-col md:flex-row items-center justify-center max-w-[100%] mt-16 ">
    <div class="relative min-w-0 break-words w-50 mb-6 shadow-lg rounded-lg p-5">
            <div class="mb-0 px-6 py-6 ">
                <div class="text-center mb-3 ">
                    <h6 class="" id="topic">
                        Get Started!
                    </h6>
                </div>
                <hr class="mt-6 border-b-1 border-gray-400" />
            </div>
            <span>Already have an account? <span class="hover:text-blue-500 transition-all"
                    @click="myRouter.push('/login/signin')">Sign in</span></span>
            <form>
                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2 p-2" for="grid-password">Name
                    </label>
                    <InputText type="email" @change="lowCase()" v-model="dataForCreate.name" />
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2 p-2" for="grid-password">Email
                    </label>
                    <InputText type="email" @change="lowCase()" v-model="dataForCreate.email" />
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2 p-2" for="grid-password">Password
                    </label>
                    <Password v-model="dataForCreate.password" toggleMask @change="maxPassword">
                        <template #header>
                            <h6>Pick a password</h6>
                        </template>
                        <template #footer>
                            <Divider />
                            <p class="mt-2">Suggestions</p>
                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                <li>At least one lowercase</li>
                                <li>At least one uppercase</li>
                                <li>At least one numeric</li>
                                <li>Minimum 6 characters</li>
                                <li>Maximum 20 characters</li>
                            </ul>
                        </template>
                    </Password>
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2 p-2" for="grid-password">Confirm
                        Password
                    </label>
                    <Password v-model="dataForCreate.passwordConfirm" :feedback="false" toggleMask
                        @change="maxConPassword" />

                </div>
            </form>
            <div class="text-center mt-6">
                <ButtonPage class="bg-gray-300 hover:bg-gray-400" @buttonClick="checkCreate()" :name="'Create Account'"></ButtonPage>
            </div>
        </div>
        <div class="w-50"> 
            <img class="invisible sm:visible content-center" width="250" src="../../assets/picture/lclogo.png"
                alt="logo_my_froup" />
        </div>

    </div>
</template>

<style>
#topic {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
}
</style>