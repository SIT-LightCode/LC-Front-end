<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'

const myRouter = useRouter()
const myAccount = account()
const emit = defineEmits(['deleteUser', 'editUser','addUser'])

const prop = defineProps({
    datas: Object,
})


</script>
 
<template>
    <div class="flex-1" style="overflow-y: auto; max-height: 100vh">
        <!-- First Photo Grid-->

        <div class="grid grid-cols-3 gap-3 ">
            <div v-for="i in datas" class="border  rounded-lg border-zinc-950">
                <div
                    class="block h-64 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                    <div class="p-6 ">
                        <h5 class="mb-1 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {{ i.name }}
                        </h5>

                        <p class="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                        <div class="mb-4 text-base">
                            <div> email: {{ i.email }}</div>
                            <div> authorities: {{ i.authorities }}</div>
                            <div> score: {{ i.score }}</div>
                        </div>
                        </p>
                    </div>
                </div>
                <div class="flex justify-end m-5">
                    <buttonVue @buttonClick="() => $emit('deleteUser', i.id)" :name="'delete'">
                    </buttonVue>
                    <buttonVue @buttonClick="() => $emit('editUser', i)" :name="'edit'">
                    </buttonVue>
                </div>
            </div>
        </div>


    </div>
    <!--  -->
</template>
 
<style></style>
