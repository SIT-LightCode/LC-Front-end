<script setup>
import { account } from '../../stores/Account';
import filterBar from '../../components/viewUser/FilterBar.vue'
import ListUser from '../../components/viewUser/ListUser.vue'
import EditUser from '../../components/viewUser/EditUser.vue';
import { MqResponsive } from "vue3-mq";
import Dialog from 'primevue/dialog';

import { computed, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const myRouter = useRouter()
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
    if (filter != 'reset') {
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
const editUser = (dataEdit, olddata) => {
    myAccount.EditAccount(dataEdit, olddata)
    isEdit.value = false

}
onBeforeMount(async () => {
    if (Object.keys(myAccount.userList).length === 0) {
        await myAccount.GetUser()
        alert(myAccount.userList.length)
        if (myAccount.userList.length > 0) {
        const userCurrent = myAccount.userList.filter(user => user.id == route.params.id);
        // dataCurrent.value = problemCurrent[0]
        if (userCurrent.length > 0) {
            alert(userCurrent)
            selectUser.value = userCurrent[0]
        } else {
            selectUser.value = {}
        }
    }
    }

    if (myAccount.userList.length > 0) {
        const userCurrent = myAccount.userList.filter(user => user.id == route.params.id);
        // dataCurrent.value = problemCurrent[0]
        if (userCurrent.length > 0) {
            alert(userCurrent)
            selectUser.value = userCurrent[0]
        } else {
            selectUser.value = {}
        }
    }
})


</script>

<template>
    {{selectUser }}

    {{selectUser }}
    <div class="grid grid-cols-1 gap-4 place-content-center">
        <div class="">
            <div>
                <EditUser @close="(e1) => { myRouter.push({name:'listUser'}) }"
                    @editUser="(dataEdit, olddata) => { editUser(dataEdit, olddata) }" :datas="selectUser">
                </EditUser>
            </div>
        </div>
    </div>

</template>

<style></style>