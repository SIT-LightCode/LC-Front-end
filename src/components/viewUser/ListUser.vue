<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'

const myRouter = useRouter()
const myAccount = account()
const emit = defineEmits(['deleteUser', 'editUser', 'addUser'])

const prop = defineProps({
    datas: Object,
})


</script>
 
<template>
    <div class="flex-1" style="overflow-y: auto; max-height: 100vh">
        <!-- First Photo Grid-->

        <div class="grid grid-cols-1 gap-1 ">
            <div class="border  rounded-lg border-zinc-950 p-5">
                <div
                    class="block h-64 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                    <div class="grid place-content-around " >
                        <table>
                            <tr class="p-5" >
                                <th> Name </th>
                                <td> Email </td>
                                <td> Authorities </td>
                                <td> Score </td>
                            </tr>
                            <tr v-for="i in datas" class="p-5 m-4 text-base">
                                <th> {{ i.name }} </th>
                                <td> {{ i.email }} </td>
                                <td> {{ i.authorities }} </td>
                                <td> {{ i.score }} </td>
                                <div class="flex justify-end m-5">
                                    <buttonVue @buttonClick="() => $emit('deleteUser', i.id)" :name="'delete'">
                                    </buttonVue>
                                    <buttonVue @buttonClick="() => $emit('editUser', i)" :name="'edit'">
                                    </buttonVue>
                                </div>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <!--  -->
</template>
 
<style></style>
