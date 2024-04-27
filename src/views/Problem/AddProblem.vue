<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'
import { learningCon } from "../../stores/LearningCon.js"
import { problemCon } from "../../stores/ProblemCon.js"
import { account } from "../../stores/Account";

import information from "../../components/addproblem/input/Information.vue";
import solution from "../../components/addproblem/input/Solution.vue";
import parameter from "../../components/addproblem/input/Parameter.vue";
import publishing from "../../components/addproblem/input/Publishing.vue";
import statusInput from "../../components/addproblem/StatusInput.vue"
import buttonvue from '../../components/button/Button.vue'

const myRouter = useRouter()
const route = useRoute()

const mylearningCon = learningCon()
const myproblemCon = problemCon()
const myAccount = account()
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
            try {
                const parsedVal = JSON.parse(val);
                object[v + 1] = parsedVal;
            } catch (error) {
                object[v + 1] = val;
                text = text + val;

            }
        });
        exampleParameter.push(object);
    });
    myproblemCon.AddProblem(
        inputProblemData.value.arrayTagId,
        inputProblemData.value.name.trim(),
        inputProblemData.value.description.trim(),
        inputProblemData.value.solution,
        exampleParameter,
        inputProblemData.value.totalScore,
        inputProblemData.value.level
    ).then(() => {
        myRouter.push({ name: 'listproblem' })
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
const items = ref([
    {
        label: 'Personal Info'
    },
    {
        label: 'Reservation'
    },
    {
        label: 'Review'
    }
]);
onBeforeMount(async () => {
    await mylearningCon.getAllTag()
})
</script>

<template>

    <div class="relative bg-st-grey max-w-[100%] ">

        <!-- <span
            style=" color: #007AFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); font-family: Rampart One; font-size: 64px; font-style: normal; line-height: 36px;"
            class="text-xl opacity-50  ">Add Problem</span> -->

        <div class="text-xl opacity-50">
            <button @click="myRouter.push({ name: 'listmyproblem' })"> My Problem </button> > <span
                class="text-st-blue">{{ route.name }}</span>
        </div>
        <Toaster richColors position="top-right" />

        <statusInput class="p-1" :pageAdd="page" />
        <div class="p-1">
            <information v-if="page == 1" :type="'add'" :name="inputProblemData.name.trim()"
                :description="inputProblemData.description" @returnval="(e1) => { setValueFunc(e1); changePage(1); }" />

            <solution v-else-if="page == 2" :solution="inputProblemData.solution" @page="(e1) => { changePage(e1) }"
                @returnval="(e1) => { setValueFunc(e1); }" />

            <parameter v-else-if="page == 3" :example="inputProblemData.example"
                @returnval="(e1) => { setValueFunc(e1) }" @page="(e1) => { changePage(e1) }" />

            <publishing v-else-if="page == 4" :datas="mylearningCon.tagList" :totalScore="inputProblemData.totalScore"
                :level="inputProblemData.level" :arrayTagId="inputProblemData.arrayTagId"
                @returnval="(e1) => { setValueFunc(e1) }" @page="(e1) => { changePage(e1) }" />
        </div>
    </div>


</template>

<style scoped>
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 128px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>