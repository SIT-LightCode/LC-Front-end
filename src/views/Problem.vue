<script setup>
import filterBar from '../components/problem/FilterBar.vue';
import listProblem from '../components/problem/ListProblem.vue';
import editPro from '../components/addproblem/EditProblem.vue';
import inputAnswer from '../components/answerproblem/InputAnswer.vue';
import resultPage from '../components/answerproblem/ResultPage.vue';

import { learningCon } from '../stores/LearningCon.js'
import { problemCon } from '../stores/ProblemCon';
import { computed, ref, onBeforeMount } from 'vue';
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
    console.log(dataFilter);

    // Check if both tag and level filters are empty
    if (dataFilter.tag.length == 0 && dataFilter.level == 0) {
        isFilter.value = false;
        return;
    }

    isFilter.value = true;
    const selectedTags = new Set(dataFilter.tag);

    const uniqueProblems = myproblemCon.problemList.reduce((acc, problem) => {
        let tagsInProblem = []
        let hasCommonTag = false
        let hasMatchingLevel = false

        if (dataFilter.tag.length > 0) {
            tagsInProblem = problem.tagProblem.map(tagObj => tagObj.tag.id);
            hasCommonTag = tagsInProblem.some(tag => selectedTags.has(tag));
        }
        else {
            hasCommonTag = true
        }
        // Check if the level filter matches
        if (dataFilter.level != 0) {
            hasMatchingLevel = problem.level == dataFilter.level;
        } else hasMatchingLevel = true
        if (hasCommonTag && hasMatchingLevel) {
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
    page.value = 'isEdit'
}

const doSubmit = async (id, answer) => {
  try {
    const data = await myproblemCon.checkAnswer(id, answer);
    console.log(data);
    result.value = data;
    console.log(result.value);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

onBeforeMount(async () => {
    await myproblemCon.getAllproblem()
    await mylearningCon.getAllTag()
})


</script>
<template>
    <div class="w3-center">

        <div class="" v-if="page=='isEdit'">
            <editPro @addstatus="(e1)=>{page = e1}"  :learning="mylearningCon" :data=dataCurrent
                @isEditProblem="(e1) => { editProblem(e1) }"></editPro>
        </div>
        <div class="" v-else-if="page=='isDo'">
            <inputAnswer :result="result" :data=dataCurrent @addstatus="(e1)=>{page = e1 ; result = ''}" @Submit="(e1,e2)=>{doSubmit(e1,e2)}"></inputAnswer>
        </div>
    
        <div class="flex" v-else>
            <!-- Filter-->
            <filterBar :datas="mylearningCon" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            <!--  -->
            <listProblem @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
                @editProblem="(e1) => { page = 'isEdit'; dataCurrent = e1 }" 
                @doProblem="(e1) => { page = 'isDo' ; dataCurrent = e1 }" 
                :datas="test"></listProblem>
            <!--  -->
        </div>
        

    </div>
</template>
 
<style></style>
