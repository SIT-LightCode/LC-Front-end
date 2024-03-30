<script setup>
import { ref } from 'vue'
import ButtonPage from '../button/Button.vue';
import { Toaster, toast } from 'vue-sonner'
import Password from 'primevue/password';

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
                                    <input type="text"
                                        class="border-0 px-3 py-3 mb-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Name" style="transition: all 0.15s ease 0s;"
                                        v-model="dataForCreate.name" />

                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Email
                                    </label>
                                    <input type="email"
                                        class="border-0 px-3 py-3 mb-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email" style="transition: all 0.15s ease 0s;" @change="lowCase()"
                                        v-model="dataForCreate.email" />


                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Password
                                    </label>
                                    <Password v-model="dataForCreate.password" toggleMask >
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
                                                <li>Minimum 8 characters</li>
                                            </ul>
                                        </template>
                                    </Password>


                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Confirm Password
                                    </label>
                                    <Password v-model="value" :feedback="false" toggleMask />

                                </div>
                                <p class="text-red-400"
                                    v-if="dataForCreate.password.length < 6 || dataForCreate.password.length > 20">*
                                    Password could
                                    more than 6 and could less than 20</p>

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