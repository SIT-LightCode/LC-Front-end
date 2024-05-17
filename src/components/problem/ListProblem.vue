<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'
import PagingForProblem from '../paging/PagingForProblem.vue'

const myRouter = useRouter()
import { MqResponsive } from "vue3-mq";

const myAccount = account()
const emit = defineEmits(['deleteProblem', 'editProblem'])

const prop = defineProps({
    datas: Object,
})



</script>

<template>
    <div>


        <PagingForProblem :listData="datas" :size="5"
                    @doProblem="(i) => { $emit('doProblem', i) }" @deleteProblem="(i) => { $emit('deleteProblem', i) }"
                    @editProblem="(i) => { $emit('editProblem', i) }"  />
        <!-- </div> -->
        <!-- <IconAdd @click="myRouter.push({ name: 'addProblem' })"
            class="fixed  transition right-6 bottom-6 w-20 h-20 hover:text-blue-500 hover:cursor-pointer" /> -->
        <!--  -->
    </div>
</template>

<style></style>
