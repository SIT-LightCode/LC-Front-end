<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'
import { learningCon } from "../stores/LearningCon.js"
import { problemCon } from "../stores/ProblemCon.js"

import information from "../components/addproblem/input/Information.vue";
import solution from "../components/addproblem/input/Solution.vue";
import parameter from "../components/addproblem/input/Parameter.vue";
import publishing from "../components/addproblem/input/Publishing.vue";
import statusInput from "../components/addproblem/StatusInput.vue"
import buttonvue from '../components/button/Button.vue'

const myRouter = useRouter()
const mylearningCon = learningCon()
const myproblemCon = problemCon()

const inputProblemData = ref({
    name: "", description: "", solution: 'const answer = (input) => {\n \n \n 	//Code Here \n return input;  \n \n \n \n  }', example: [[['']]]
    , totalScore: 0, level: 0, arrayTagId: []
})
const page = ref(1)

const setValueFunc = (input) => {
    for (let i in input) {
        inputProblemData.value[input[i].type] = input[i].val
    }

}
const upSetProblem = () => {
    let exampleParameter = []; // Initialize as an empty object
    let text = ""
    inputProblemData.value.example.forEach(function (value, i) {
        let object = {};
        value.forEach((val, v) => {
            object[v + 1] = val;
            text = text + val
        });
        exampleParameter.push(object);
    });

    console.log(text)
    myproblemCon.AddProblem(
        inputProblemData.value.arrayTagId,
        inputProblemData.value.name.trim(),
        inputProblemData.value.description.trim(),
        inputProblemData.value.solution,
        exampleParameter,
        inputProblemData.value.totalScore,
        inputProblemData.value.level
    ).then(() => {
        page.value = 1
        inputProblemData.value = {
            name: "", description: "", solution: 'const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }', example: [[[undefined]]]
            , totalScore: 0, level: 0, arrayTagId: []
        }
    })
};

const changePage = (e1) => {
    console.log(e1)
    if (e1 > 0) {
        ++page.value
        if (page.value > 4) {
            upSetProblem();
        }
    }
    else --page.value
}

mylearningCon.getAllTag()
</script>

<template >
    <Toaster richColors position="top-right"/>
    <buttonvue class="m-5" @buttonClick="myRouter.push({ name: 'problem' })" :name="'Back'"></buttonvue>
    
    <statusInput class="p-1" :pageAdd="page" />

    <div class="p-5">
        <information v-if="page == 1" :type="'add'" :name="inputProblemData.name.trim()" :description="inputProblemData.description"
            @returnval="(e1) => { setValueFunc(e1); changePage(1); }" />

        <solution v-else-if="page == 2" :solution="inputProblemData.solution" @page="(e1) => { changePage(e1) }"
            @returnval="(e1) => { setValueFunc(e1); }" />

        <parameter v-else-if="page == 3" :example="inputProblemData.example" @returnval="(e1) => { setValueFunc(e1) }"
            @page="(e1) => { changePage(e1) }" />

        <publishing v-else-if="page == 4" :datas="mylearningCon.tagList" :totalScore="inputProblemData.totalScore"
            :level="inputProblemData.level" :arrayTagId="inputProblemData.arrayTagId"
            @returnval="(e1) => { setValueFunc(e1) }" @page="(e1) => { changePage(e1) }" />
    </div>
</template>
 
<style></style>