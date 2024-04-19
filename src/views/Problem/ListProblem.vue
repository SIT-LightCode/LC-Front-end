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
const data = ref([])

const myAccount = account()
const myproblemCon = problemCon()
const mylearningCon = learningCon()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const dataCurrent = ref([])

const isFilter = ref(false)


const filterFunc = (dataFilter) => {

    // Check if both tag and level filters are empty
    if (dataFilter.tag.keyword == "" && dataFilter.tag.length == 0 && dataFilter.level == 0 && dataFilter.isOfficial == "") {
        isFilter.value = false;
        return;
    }
    let filteredProblem = myproblemCon.problemList
    if (dataFilter.keyword !== "") {
        filteredProblem = filteredProblem.filter(problem => {
            if (problem.name.includes(dataFilter.keyword)) {
                return problem
            }
        });
    }
    isFilter.value = true;
    const uniqueProblems = filteredProblem.reduce((acc, problem) => {
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





onBeforeMount(async () => {
    if (Object.keys(myproblemCon.problemList).length === 0) {
        await myproblemCon.getAllproblem()
    }
    if (Object.keys(mylearningCon.tagList).length === 0) {
        await mylearningCon.getAllTag()
    }
})

</script>
<template>
    <div class="bg-st-grey font-roboto ">

        <div>
            <p id="logo" class="text-xl opacity-50  ">Problem</p>
            <div class=" flex ">
                <filterBar :datas="mylearningCon" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            </div>
            <div class="p-10 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg drop-shadow-2xl">
                <listProblem class="" @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
                    @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id } }); dataCurrent = e1; }"
                    @doProblem="(e1) => { myRouter.push({ name: 'isDo', params: { id: e1.id } }); dataCurrent = e1 }"
                    :datas="test"></listProblem>
            </div>
        </div>
    </div>

</template>
<style scoped>
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
