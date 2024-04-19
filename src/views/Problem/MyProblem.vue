<script setup>

import filterBar from '../../components/problem/FilterBar.vue';
import listProblem from '../../components/problem/ListProblem.vue';
import editPro from '../../components/addproblem/EditProblem.vue';
import inputAnswer from '../../components/answerproblem/InputAnswer.vue';
import { MqResponsive } from "vue3-mq";
import { learningCon } from '../../stores/LearningCon'
import { problemCon } from '../../stores/ProblemCon';
import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../../stores/Account'
import ResultPage from '../../components/answerproblem/ResultPage.vue';
import Dialog from 'primevue/dialog';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const myRouter = useRouter()

const myAccount = account()
const myproblemCon = problemCon()
const mylearningCon = learningCon()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const data = ref([])
const dataCurrent = ref([])

const isFilter = ref(false)
const isEdit = ref(false)
const isDo = ref(false)
const page = ref('')

const result = ref('')
const isResult = ref(false)

const editProblem = (val) => {
    if (val != '') {
        myproblemCon.EditProblem(
            dataCurrent.value.id,
            val.arrayTagId,
            val.name,
            val.description,
            val.totalScore,
            val.level,)
    }
    page.value = ''
}

const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
    if (levelArray[id - 1] != undefined) {
        return levelArray[id - 1][0]
    }
}

onBeforeMount(async () => {
    await myproblemCon.getAllproblem()
    await mylearningCon.getAllTag()
})

</script>
<template>
    <div class="relative bg-st-grey font-roboto ">

        <!-- <div class="grid grid-cols-[20%_minmax(50%,_1fr)] gap-4 fixed max-h-[90%] w-[100%] overflow-y-scroll " >

            <MqResponsive group>
                <template #lg-xxl>
                    <div>
                        <filterBar :datas="mylearningCon" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
                    </div>
                </template>
</MqResponsive>


<div class="overflow-auto ">
    <listProblem class="" @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
        @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id} }); dataCurrent = e1 ;  }"
        @doProblem="(e1) => { myRouter.push({ name: 'isDo', params: { id: e1.id} }); dataCurrent = e1 }" :datas="test">
    </listProblem>
</div>

</div> -->

     
        <div class="grid grid-cols-4 gap-5  ">
            <div v-for="(problem, index) in myproblemCon.problemList"
                class="drop-shadow-2xl bg-white group rounded-3xl px-2 pt-1 pb-20 flex flex-col gap-10 relative">
                <div class="grid grid-cols-3">
                    <div class="truncate col-span-2">
                        <span v-for="(tag, index) in problem.tagProblem"
                            class="inline-flex items-center px-1 rounded-full text-xs font-medium leading-4 bg-slate-100 text-white bg-blue-500 truncate ">
                            {{ tag.tag.topic }}
                        </span>
                    </div>
                    <button>...</button>
                </div>
                <div class="grid grid-cols-3">
                    <p class="text-2xl text-st-blue truncate col-span-2">{{ problem.name }}</p>
                    <p class="truncate  col-span-1" :class="levelArray[problem.level - 1]">{{ returnLevel(problem.level)
                        }}</p>
                </div>
                <div class="truncate hover:text-clip">
                    {{ problem.description }}
                </div>

                <p class="text-sm text-st-blue right-5 bottom-5 absolute">
                    {{ problem.totalScore }}
                </p>
            </div>
        </div>

    </div>
</template>

<style></style>
