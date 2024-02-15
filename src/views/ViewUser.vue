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
   let keyword = ""
   let type = ""
    if(filter != 'reset'){
        keyword = filter.keyword
        type = filter.type

    }
    if (keyword === "" && type === "") {
        isFilter.value = false;
        return;
    }

    isFilter.value = true;
    let filteredUsers = myAccount.userList
    if (keyword !== "") {
         filteredUsers = filteredUsers.filter(user => {
            if (user.name.includes(keyword)) {
                return user
            }
        });
    }

    if (type !== "") {
        filteredUsers = filteredUsers.filter(user => {
            if (user.authorities.includes(type)) {
                return user
            }
        });
    }

    const uniqueUsers = Array.from(new Set(filteredUsers));

    data.value = uniqueUsers;
};



const dataFilter = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myAccount.userList
})


const deleteUser = (id) => {
    myAccount.DeteleUser(id)
}
const editUser = (dataEdit) => {
    myAccount.EditAccount(dataEdit)
    isEdit.value = false

}
onBeforeMount(async () => {
    await myAccount.GetUser()
})


</script>
 
<template>
    <div class="px-10">
        <div class="flex">
            <!-- Filter-->
            <filterBar @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            <!--  -->
            <ListUser @deleteUser="(id) => { deleteUser(id) }"
                @editUser="(select) => { isEdit = true; selectUser = select; }" :datas="dataFilter">
            </ListUser>
            <!--  -->
        </div>
        <div v-if="isEdit">
            <EditUser @close="(e1) => { isEdit = e1 }" @editUser="(dataEdit) => { editUser(dataEdit) }" :datas="selectUser">
            </EditUser>
        </div>

    </div>
</template>
 
<style></style>