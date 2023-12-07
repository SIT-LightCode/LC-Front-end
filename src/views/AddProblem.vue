<script setup>
import { ref } from "vue";
import stepone from "../components/AddProblem/input/stepone.vue";
import steptwo from "../components/AddProblem/input/steptwo.vue";
import stepthree from "../components/AddProblem/input/stepthree.vue";
import stepfour from "../components/AddProblem/input/stepfour.vue";

import outputProblem from '../components/AddProblem/outputProblem.vue';
import statusInput from '../components/AddProblem/statusInput.vue';

const inputProblemData = ref({ name: "", description: "", solution: "", example: {}, totalScore: 0, level: 0 })


</script>

<template>
    <statusInput />
    <stepone @namedescription="(e1) => { inputProblemData.name = e1.name; inputProblemData.description = e2.description; }"/>
    <steptwo @solution="(e1) => { inputProblemData.solution = e1; }"/>
    <stepthree @example="(e1) => { inputProblemData.example = e1 }"/>
    <stepfour @totalScorelevel="(e1) => { inputProblemData.totalScore = e1.totalScore; inputProblemData.level = e1.level; }"/>
    <outputProblem :datas="inputProblemData" />
</template>
 
<style></style>