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
    <div class="space-y-5">
        <hr />
        <div v-if="editMode">
            Account
            <div class="p-5"> name : {{ user.name }}
            </div>
            <div class="p-5"> email : {{ user.email }}
            </div>
            <buttonVue :name="'Edit'" class="bg-blue-300 hover:bg-blue-400"
                @click="editMode = false" :status="false" ></buttonVue>
        </div>
        <div v-if="!editMode">
            <div class="">
                Edit Account
                <div class="card flex justify-content-center m-5">
                    <FloatLabel>
                        <InputText class="mx-5 p-3" id="username" v-model="EditUser.name" />
                        <label for="username">Username</label>
                    </FloatLabel>
                </div>

                <div class="card flex justify-content-center m-5">
                    <FloatLabel>
                        <InputText class="mx-5 p-3" id="email" @change="lowCase()" v-model="EditUser.email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                </div>
            </div>
            <buttonVue @buttonClick="editMode = true" :name="'Close Edit'" :status="false" class="bg-gray-300 hover:bg-gray-400"></buttonVue>
            <buttonVue :name="'Edit'" :status="false" class="bg-blue-300 hover:bg-blue-400" @buttonClick="EditByUser()">
            </buttonVue>
        </div>

 

    </div>

</template>

<style></style>