<script setup>
import { account } from '../stores/Account';
import filterBar from '../components/viewUser/FilterBar.vue'
import ListUser from '../components/viewUser/ListUser.vue'
import EditUser from '../components/viewUser/EditUser.vue';
import { computed, ref, onBeforeMount } from 'vue';

const myAccount = account()
const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const data = ref([])
const dataCurrent = ref([])
const selectUser = ref([])
const isFilter = ref(false)
const isEdit = ref(false)

const filterFunc = (filter) => {
if (filter.keyword == "" && filter.type == "") {
    isFilter.value = false;
    return;
}

isFilter.value = true;
const uniqueUser = myAccount.GetUser.reduce((acc, user) => {

    return acc;
}, []);

data.value = Array.from(new Set(uniqueUser));
};



const dataFilter = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myAccount.userList
})


const deleteUser = (id) =>{
    myAccount.DeteleUser(id)
}
const editUser = (dataEdit) =>{
    myAccount.EditAccount(dataEdit)
}
onBeforeMount(async () => {
    await myAccount.GetUser()
    await myAccount.GetUserByEmail()
})


</script>
 
<template>
    <div class="px-10">
        <div class="flex">
            <!-- Filter-->
            <filterBar @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            <!--  -->
            <ListUser @deleteUser="(id) => { deleteUser(id) }" @editUser="(select) => { isEdit = true; selectUser = select; }" :datas="dataFilter">
            </ListUser>
            <!--  -->
        </div>
        <div v-if="isEdit">
            <EditUser @close="(e1)=>{isEdit=e1}" @editUser="(dataEdit)=>{editUser(dataEdit)}" :datas="selectUser"></EditUser>
        </div>

    </div>
</template>
 
<style></style>