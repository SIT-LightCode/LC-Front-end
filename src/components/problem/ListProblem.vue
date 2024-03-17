<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'
import PagingForProblem from '../paging/PagingForProblem.vue'
const myRouter = useRouter()

const myAccount = account()
const emit = defineEmits(['deleteProblem', 'editProblem'])

const prop = defineProps({
    datas: Object,
})

</script>

<template>
    <div class="flex-1" style="overflow-y: auto; max-height: 100vh">
            <PagingForProblem :listData="datas" :size="6" @doProblem="(i) => { $emit('doProblem', i) }"
                @deleteProblem="(i) => { $emit('deleteProblem', i) }" @editProblem="(i) => { $emit('editProblem', i) }"
                :datas="dataFilter" />
        <!-- </div> -->
        <IconAdd @click="myRouter.push({ name: 'addProblem' })"
            class="fixed transition right-6 bottom-6 w-20 h-20 hover:text-blue-500 hover:cursor-pointer" />
        <!--  -->
    </div>
</template>

<style></style>
