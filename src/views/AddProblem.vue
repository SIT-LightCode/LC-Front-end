<script setup>
import { ref } from "vue";
import stepone from "../components/addproblem/input/StepOne.vue";
import steptwo from "../components/addproblem/input/StepTwo.vue";
import stepthree from "../components/addproblem/input/StepThree.vue";
import stepfour from "../components/addproblem/input/StepFour.vue";


import { learningCon } from "../stores/LearningCon.js"
import { problemCon } from "../stores/ProblemCon.js"

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
            text = text+val
        });
        exampleParameter.push(object);
    });

console.log(text)
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