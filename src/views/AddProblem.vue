<script setup>
import { ref } from "vue";
import stepone from "../components/AddProblem/input/stepone.vue";
import steptwo from "../components/AddProblem/input/steptwo.vue";
import stepthree from "../components/AddProblem/input/stepthree.vue";
import stepfour from "../components/AddProblem/input/stepfour.vue";

import outputProblem from '../components/AddProblem/outputProblem.vue';
import statusInput from '../components/AddProblem/statusInput.vue';

const inputProblemData = ref({
    name: "", description: "", solution: "", example: [
        { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } },
        { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } },
        { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } }]
    , totalScore: 0, level: 0
})
const page = ref(2)
const setValue = (key, val) => {
    inputProblemData.value[key] = val
}

const pageFunc = (input, actionpage) => {
    for (let i in input) {
        console.log(input[i])
        setValue(input[i].type, input[i].val);
    }

    if (actionpage == 1) {
        ++page.value
    }
    else if (actionpage == -1) {
        --page.value
    }
}

// const arrayFunc = (input) =>{
//     for (let i in input) {
//         console.log(input[i])
//         pageFunc(input[i])
//     }
//}
</script>

<template>
    <statusInput />
    <stepone v-if="page == 1" @namedescription="(e1, e2) => { pageFunc(e1, e2) }" />
    <!-- <steptwo v-else-if="page == 2" @solution="(e1) => { inputProblemData.solution = e1; }" /> -->
    <stepthree v-else-if="page == 2" @example="(e1,e2) => { pageFunc(e1,e2) }" @page="(e1) => { page + e1 }" />
    <stepfour
        @totalScorelevel="(e1) => { inputProblemData.totalScore = e1.totalScore; inputProblemData.level = e1.level; }" />

    <!-- @examplechange="(e1) => { setValue() }" /> -->
    <outputProblem :datas="inputProblemData" />
</template>
 
<style></style>