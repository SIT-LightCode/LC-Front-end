<script setup>
import { ref } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';
const emit = defineEmits(["CloseModal", "LogOut", "EditUserByUser"])
const myAccount = account()
const editMode = ref(true)
const EditUser = ref({
    id: myAccount.user.id,
    name: myAccount.user.name,
    email: myAccount.user.email,
    authorities: myAccount.user.authorities,
    score: myAccount.user.score

})
const EditByUser = () => {
    myAccount.EditAccount(EditUser.value,myAccount.user).then(() => {
        emit('CloseModal', false);
    })
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
                            <div class="p-5"> name : {{ myAccount.user.name }}
                            </div>
                            <div class="p-5"> email : {{ myAccount.user.email }}
                            </div>
                            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded"
                                @click="editMode = false">Edit</button>
                        </div>
                        <div v-if="!editMode">
                            <div class="p-5">
                                Edit Account
                                <div class="p-5"> name : <input :maxlength="30" type="text" placeholder=""
                                        v-model="EditUser.name">
                                </div>
                                <div class="p-5"> email : <input :maxlength="30" type="text" placeholder=""
                                        v-model="EditUser.email"></div>
                            </div>
                            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded"
                                @click="editMode = true">Close</button>
                            <buttonVue :name="'Edit'" @buttonClick="EditByUser()">Edit
                            </buttonVue>
                        </div>
                    </div>
                </div>
                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded"
                        @click="editMode = true; $emit('CloseModal', false);"> Close</button>
                    <buttonVue :name="'Log Out'" @buttonClick="() => { $emit('LogOut', true); editMode = true }">
                    </buttonVue>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style></style>