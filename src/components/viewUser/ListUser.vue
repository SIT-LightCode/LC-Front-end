<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'
import PagingForUser from "../paging/PagingForUser.vue"

const myRouter = useRouter()
const myAccount = account()
const emit = defineEmits(['deleteUser', 'editUser', 'addUser'])

const prop = defineProps({
    datas: Object,
})


</script>

<template>
    <div class="">
        <!-- First Photo Grid-->
        <PagingForUser :listData="datas" @deleteUser="(i) => { $emit('deleteUser', i) }" 
            @editUser="(i) => { $emit('editUser', i) }" :datas="dataFilter">
        </PagingForUser>

    </div>
    <!--  -->
</template>

<style></style>
