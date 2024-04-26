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
const position = ref('center');
const visible = ref(false);

const filterFunc = (filter) => {
    let keyword = ""
    let type = ""
    console.log(filter)
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
    }

})

</script>

<template>


    <!--  -->
    <div class="bg-st-grey max-w-[100%] ">
        <div class="text-xl opacity-50"> 
                My Problem > <span>{{ route.name }}</span>
            </div>
        <div>
            <span style=" color: #007AFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); font-family: Rampart One; font-size: 64px; font-style: normal; line-height: 36px;" class="text-xl opacity-50  ">All User</span>
            <Dialog v-model:visible="visible" header="Edit Profile" :style="{ width: '25rem' }" :position="position"
                :modal="true">
                <EditUser @close="(e1) => { visible = false }"
                    @editUser="(dataEdit, olddata) => { editUser(dataEdit, olddata); visible = false }"
                    :datas="selectUser"></EditUser>
            </Dialog>
            <div class=" flex">
                <filterBar class="invisible lg:visible" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            </div>
            <div class="p-5 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg ">
                <ListUser @deleteUser="(id) => { deleteUser(id) }"
                    @editUser="(select) => { selectUser = select; visible = true }" :datas="dataFilter">
                </ListUser>
            </div>
        </div>
    </div>




</template>

<style>
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>