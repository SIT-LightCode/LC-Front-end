<script setup>
import { ref } from "vue";
import stepone from "../components/AddProblem/input/stepone.vue";
import steptwo from "../components/AddProblem/input/steptwo.vue";
import stepthree from "../components/AddProblem/input/stepthree.vue";
import stepfour from "../components/AddProblem/input/stepfour.vue";

import outputProblem from '../components/AddProblem/outputProblem.vue';
import statusInput from '../components/AddProblem/statusInput.vue';

import { learningCon } from "../stores/learningCon.js"
import { problemCon } from "../stores/problemCon.js"

const mylearningCon = learningCon()
const myproblemCon = problemCon()

const inputProblemData = ref({
    name: "", description: "", solution: "", example: [[[undefined]]]
    , totalScore: 0, level: 0, arrayTagId: []
})
const page = ref(1)

const setValueFunc = (input) => {
    for (let i in input) {
        inputProblemData.value[input[i].type] = input[i].val
    }

}
// exampleParameter: \"\"\"\n    [{\n    \"1\": [2, 7, 11, 15],\n    \"2\": 9\n    },\n    {\n    \"1\": [3, 1, 2, 7],\n    \"2\": 4\n    }]\n
const upSetProblem = () => {
    let exampleParameter = []; // Initialize as an empty object
    let text = ""
    inputProblemData.value.example.forEach(function (value, i) {
        let object = {};
        value.forEach((val, v) => {
            object[v + 1] = val;
        });
        exampleParameter.push(object);
    });


    myproblemCon.AddProblem(
        inputProblemData.value.arrayTagId,
        inputProblemData.value.name,
        inputProblemData.value.description,
        inputProblemData.value.solution,
        exampleParameter,
        inputProblemData.value.totalScore,
        inputProblemData.value.level
    );
};

const changePage = (e1) => {
    if (e1 > 0) {
        ++page.value
    }
    else --page.value
}

mylearningCon.getAllTag()
</script>

<template>
    <statusInput />
    <stepone v-if="page == 1" :name="inputProblemData.name" :description="inputProblemData.description"
        @returnval="(e1) => { setValueFunc(e1); changePage(1); }" />
    <stepthree v-else-if="page == 2" :example="inputProblemData.example" @returnval="(e1) => { setValueFunc(e1) }"
        @page="(e1) => { changePage(e1) }" />
    <stepfour v-show="page == 3" :datas="mylearningCon.tagList" :totalScore="inputProblemData.totalScore"
        :level="inputProblemData.level" :arrayTagId="inputProblemData.arrayTagId" @returnval="(e1) => { setValueFunc(e1) }"
        @page="(e1) => { changePage(e1) }" />
    <steptwo v-show="page == 4" @returnval="(e1) => { setValueFunc(e1); upSetProblem(); }" />
    <!-- <stepone @returnval="(e1) => { setValueFunc(e1); changePage(1); }" />
    <stepthree @returnval="(e1) => { setValueFunc(e1) }" @page="(e1) => { changePage(e1) }" />
    <stepfour :datas="mylearningCon.tagList" @returnval="(e1) => { setValueFunc(e1) }" @page="(e1) => { changePage(e1) }" />
    <steptwo @returnval="(e1) => { setValueFunc(e1); upSetProblem(); }" /> -->
</template>
 
<style></style>