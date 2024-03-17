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

        <div class="grid grid-cols-1 gap-1 ">
            <div class="p-5">
                <div
                    class="block h-64 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                    <div class="grid place-content-around ">
                            <PagingForUser :listData="datas" :size="5" @deleteUser="(i) => { $emit('deleteUser', i) }"
                                @editUser="(i) => { $emit('editUser', i) }" :datas="dataFilter">
                            </PagingForUser>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <!--  -->
</template>

<style></style>
