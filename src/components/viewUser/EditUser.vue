<script setup>
import { ref } from "vue"
import buttonVue from '../button/Button.vue';
const editUser = ref({name:'',email:'',authorities:[],})


</script>
 
<template>
    Edit User :
    name : <input :maxlength="30" type="text" placeholder="" v-model="editUser.name">
    Email : <input :maxlength="30" type="text" placeholder="" v-model="editUser.email">
    Authorities:
    <div>Checked names: {{ editUser.authorities }}</div>

    <input type="checkbox" id="USER" value="USER" v-model="editUser.authorities">
    <label for="USER">USER</label>
    <input type="checkbox" id="ADMIN" value="ADMIN" v-model="editUser.authorities">
    <label for="ADMIN">ADMIN</label>

</template>
 
<style></style>