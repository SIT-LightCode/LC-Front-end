<script setup>
import { ref } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

const emit = defineEmits(["CloseModal", "EditUserByUser"])
const myAccount = account()
const editMode = ref(true)
const user = ref('')
user.value = JSON.parse(localStorage.getItem('user'))
const EditUser = ref({
    id: user.value.id,
    name: user.value.name,
    email: user.value.email,
    authorities: user.value.authorities,
    score: user.value.score

})
const EditByUser = () => {
    myAccount.EditAccount(EditUser.value, myAccount.user).then(() => {
        emit('CloseModal', false);
    })
}
const lowCase = () => {
    EditUser.value.email = EditUser.value.email.toLowerCase()
}
</script>

<template>
    <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
            <!--content-->
            <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 class="text-3xl font-semibold">
                        Setting
                    </h3>
                    <button
                        class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        v-on:click="toggleModal()">
                        <span
                            class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>
                <!--body-->
                <div class="relative p-6 flex ">
                    <div style="width: 50vh; height: 50vh" class="border-2 rounded-lg p-5 m-5 ">

                        <div v-if="editMode">
                            Account
                            <div class="p-5"> name : {{ user.name }}
                            </div>
                            <div class="p-5"> email : {{ user.email }}
                            </div>
                            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded"
                                @click="editMode = false">Edit</button>
                        </div>
                        <div v-if="!editMode">
                            <div class="p-5">
                                Edit Account
                                <div class="card flex justify-content-center m-5">
                                    <FloatLabel>
                                        <InputText class="mx-5 p-3" id="username" v-model="EditUser.name" />
                                        <label for="username">Username</label>
                                    </FloatLabel>
                                </div>

                                <div class="card flex justify-content-center m-5">
                                    <FloatLabel>
                                        <InputText class="mx-5 p-3" id="email" @change="lowCase()"
                                            v-model="EditUser.email" />
                                        <label for="email">Email</label>
                                    </FloatLabel>
                                </div>
                            </div>
                            <buttonVue
                                @buttonClick="editMode = true" :name="'Close Edit'" :status="false"></buttonVue>
                            <buttonVue :name="'Edit'" @buttonClick="EditByUser()">
                            </buttonVue>
                        </div>
                    </div>
                </div>
                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <buttonVue :name="'Close'" @buttonClick="editMode = true; $emit('CloseModal', false);" :status="false">
                    </buttonVue>
                    

                </div>
            </div>
        </div>
    </div>
</template>

<style></style>