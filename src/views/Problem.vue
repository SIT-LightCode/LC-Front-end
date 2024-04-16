<script setup>

import filterBar from '../components/problem/FilterBar.vue';
import listProblem from '../components/problem/ListProblem.vue';
import editPro from '../components/addproblem/EditProblem.vue';
import inputAnswer from '../components/answerproblem/InputAnswer.vue';
import { MqResponsive } from "vue3-mq";
import { learningCon } from '../stores/LearningCon'
import { problemCon } from '../stores/ProblemCon';
import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../stores/Account'
import ResultPage from '../components/answerproblem/ResultPage.vue';
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

const filterFunc = (dataFilter) => {

    // Check if both tag and level filters are empty
    if (dataFilter.tag.length == 0 && dataFilter.level == 0 && dataFilter.isOfficial == "") {
        isFilter.value = false;
        return;
    }

    isFilter.value = true;
    const uniqueProblems = myproblemCon.problemList.reduce((acc, problem) => {
        let tagsInProblem = []
        let hasCommonTag = false
        let hasMatchingLevel = false
        let hasMatchingOffice = false
        if (dataFilter.tag != "") {
            tagsInProblem = problem.tagProblem.map(tagObj => tagObj.tag.id);
            for (let i in tagsInProblem) {
                if (tagsInProblem[i].toString() == dataFilter.tag.toString()) {
                    hasCommonTag = true;
                }
            }
        }
        else {
            hasCommonTag = true
        }
        // Check if the level filter matches
        if (dataFilter.level != 0) {
            hasMatchingLevel = problem.level == dataFilter.level;
        } else { hasMatchingLevel = true }

        if (dataFilter.isOfficial != "") {
            if (problem.isOfficial != null) {
                if (dataFilter.isOfficial == problem.isOfficial.toString()) {
                    hasMatchingOffice = true
                }
            }

        } else { hasMatchingOffice = true }


        if (hasCommonTag && hasMatchingLevel && hasMatchingOffice) {
            acc.push(problem);
        }
        return acc;
    }, []);

    data.value = Array.from(new Set(uniqueProblems));
};
const test = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myproblemCon.problemList
})


// const inputProblemData = ref({
//     name: prop.data.name, description: prop.data.description
//     , totalScore: prop.data.totalScore, level: prop.data.level, arrayTagId: []
// })

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


const countFailedTestCases = (data) => {
    if (data.testcaseResults) {
        return data.testcaseResults.reduce((count, testCase) => {
            return count + (testCase.status === 'failed' ? 1 : 0);
        }, 0);
    }
    else return null
}

const isModal = ref(false)

const doSubmit = async (id, answer) => {
    try {
        const data = await myproblemCon.checkAnswer(id, answer)

        result.value = data;
        if (result.value == 0) {
        }
        else {
            isModal.value = true
        }
    } catch (error) {
        console.error(error);
    }
};

onBeforeMount(async () => {
    await myproblemCon.getAllproblem()
    await mylearningCon.getAllTag()
})

</script>
<template>
    <div class="relative  ">
        <div class="card flex justify-content-center">

            <Dialog v-model:visible="isModal" modal :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }" header="Answer" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <ResultPage :data="result">
                </ResultPage>
            </Dialog>
        </div>

        <div class="grid grid-cols-1 gap-4 fixed max-h-[90%] w-[100%] overflow-y-scroll" v-if="$route.name == 'isEdit'">
            <editPro @addstatus="(e1) => { myRouter.push({ name: 'problem' }); }" :learning="mylearningCon" :data=dataCurrent
                @isEditProblem="(e1) => { editProblem(e1) }"></editPro>
        </div>
        <div class="" v-else-if="$route.name == 'isDo'">
            <inputAnswer :result="result" :data=dataCurrent @addstatus="(e1) => { myRouter.push({ name: 'problem' }); result = '' }"
                @Submit="(e1, e2) => { doSubmit(e1, e2) }"></inputAnswer>
        </div>


        <div class="grid grid-cols-[20%_minmax(50%,_1fr)] gap-4 fixed max-h-[90%] w-[100%] overflow-y-scroll " v-else>

            <MqResponsive group>
                <template #lg-xxl>
                    <div>
                        <filterBar :datas="mylearningCon" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
                    </div>
                </template>
            </MqResponsive>


            <!-- Filter-->
            <div class="overflow-auto ">
                <listProblem class="" @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
                    @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id} }); dataCurrent = e1 ;  }"
                    @doProblem="(e1) => { myRouter.push({ name: 'isDo', params: { id: e1.id} }); dataCurrent = e1 }" :datas="test"></listProblem>
            </div>

        </div>


    </div>
</template>

<style></style>
