<script setup>
import { ref } from 'vue'
import ButtonPage from '../button/Button.vue';
import { Toaster, toast } from 'vue-sonner'
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';

const emit = defineEmits(['create', 'status'])

const dataForCreate = ref({
    name: '', email: '', password: '', passwordConfirm: ''
})

const checkCreate = () => {
    let errortext = ""
    // for (const data in dataForCreate.value){
    //     if(dataForCreate.value[data]==''){
    //         // alert('error')
    //         errortext = errortext + data + ' is null value ,'
    //     }
    // }
    if (dataForCreate.value.password != "" && dataForCreate.value.passwordConfirm != "" && dataForCreate.value.password !== dataForCreate.value.passwordConfirm) {
        // alert('password and passwordConfirm dont same value')
        errortext = errortext + ' password and passwordConfirm dont same value ,'
    }
    if (errortext == "") {
        emit('create', dataForCreate.value)
    } else {
        toast.error(errortext)
    }
}

const lowCase = () => {
    dataForCreate.value.email = dataForCreate.value.email.toLowerCase()
}

// .trim(" ")
const maxPassword = () =>{    
    dataForCreate.value.password = dataForCreate.value.password.substring(0, 20).trim(" ")

}
const maxConPassword = () =>{    
    dataForCreate.value.passwordConfirm = dataForCreate.value.passwordConfirm.substring(0, 20).trim(" ")

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
                                    Create a new account
                                </h6>
                            </div>
                        </div>
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Name
                                    </label>
                                    <InputText type="email" @change="lowCase()" v-model="dataForCreate.name" />

                                    

                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Email
                                    </label>
                                    <InputText type="email" @change="lowCase()" v-model="dataForCreate.email" />

                                   
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Password
                                    </label>
                                    <Password v-model="dataForCreate.password" toggleMask  @change="maxPassword">
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


                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Confirm Password
                                    </label>
                                    <Password v-model="dataForCreate.passwordConfirm" :feedback="false" toggleMask @change="maxConPassword"/>

                                </div>

                            </form>
                            <div class="text-center mt-6">
                                <ButtonPage @buttonClick="$emit('status', true)" :name="'Back'" :status="false">
                                </ButtonPage>
                                <ButtonPage @buttonClick="checkCreate()" :name="'Create Account'"></ButtonPage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>