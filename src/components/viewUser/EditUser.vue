<script setup>
import { ref } from "vue"
import buttonVue from '../button/Button.vue';
const prop = defineProps({
    datas: Object,
})
const emit = defineEmits(["close","editUser"])

const editUser = ref({ id:  prop.datas.id,name: prop.datas.name, email: prop.datas.email, authorities: prop.datas.authorities, })
const oldUser = { id:  prop.datas.id,name: prop.datas.name, email: prop.datas.email, authorities: prop.datas.authorities, }
const lowCase = () => {
    editUser.value.email = editUser.value.email.toLowerCase()
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
                        Edit User :
                    </h3>
                </div>
                <!--body-->
                <div class="relative p-6 flex ">
                    <div style="width: 50vh; height: 50vh" class="border-2 rounded-lg p-5 m-5 ">
                        <div>name : <input :maxlength="30" type="text" placeholder="" v-model="editUser.name"></div>
                        <div>Email : <input :maxlength="30" type="text" placeholder="" v-model="editUser.email" @change="lowCase()"></div>
                        <div>
                            Authorities:
                            <div>Checked names: {{ editUser.authorities }}</div>
                            <input type="checkbox" id="USER" value="USER" v-model="editUser.authorities">
                            <label for="USER">USER</label>
                            <input type="checkbox" id="ADMIN" value="ADMIN" v-model="editUser.authorities">
                            <label for="ADMIN">ADMIN</label>
                        </div>
                    </div>
                </div>
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-sky-300">
                <buttonVue :name="'Close'" @buttonClick="() => { $emit('close', false);}">
                </buttonVue>
                <buttonVue :name="'Edit'" @buttonClick="() => { $emit('editUser', editUser,oldUser); }">
                </buttonVue>
            </div>
        </div>
    </div>
</template>
 
<style></style>