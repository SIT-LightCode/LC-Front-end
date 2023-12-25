<script setup>
import information from "./input/Information.vue"
import publishing from "./input/Publishing.vue"
import buttonvue from "../button/Button.vue"



import { modalSwal } from "../../stores/Modal";
import { ref, onBeforeMount } from "vue";
const mymodal = modalSwal()

const emit = defineEmits(['addfunc', 'addstatus', 'isEditProblem'])
const prop = defineProps({
    data: Object,
    learning: Object
})
const oldArray = ref([])
const inputProblemData = ref({
    name: prop.data.name, description: prop.data.description
    , totalScore: prop.data.totalScore, level: prop.data.level, arrayTagId: []
})

const setValueFunc = (input) => {
    for (let i in input) {
        inputProblemData.value[input[i].type] = input[i].val
    }

}
const page = ref(1)

const changePage = (e1) => {
    if (e1 > 0) {
        ++page.value
        if (page.value > 2) {
            upSetProblem();
        }
    }
    else --page.value
}
const upSetProblem = () => {

    if (prop.data.name == inputProblemData.value.name
        && prop.data.description == inputProblemData.value.description
        && prop.data.totalScore == inputProblemData.value.totalScore
        && prop.data.level == inputProblemData.value.level
        && JSON.stringify(prop.data.arrayTagId) == JSON.stringify(inputProblemData.value.arrayTagId.sort())) {
        mymodal.modalNormal(
          "Error!",
          "edit is same value.",
          "error"
        );
        emit('isEditProblem','')
    } else emit('isEditProblem', inputProblemData.value)
}


onBeforeMount(async () => {
    prop.data.tagProblem.forEach((e1) => {
        oldArray.value.push(e1.tag.id)
        inputProblemData.value.arrayTagId.push(e1.tag.id)
    })
})


</script>
 
<template>
    <!-- contents  -->
    <div class="space-y-5">
        <hr />
        <buttonvue class="" @buttonClick="$emit('addstatus', '')" :name="'Back'"></buttonvue>

        <div class="text-gray-900 text-sm">
            <information v-if="page == 1" :name="inputProblemData.name" :description="inputProblemData.description"
                :type="'edit'" @returnval="(e1) => { setValueFunc(e1); changePage(1); }"></information>
        </div>
        <div class="text-gray-900 text-sm">
            <publishing v-if="page == 2" :datas="prop.learning.tagList" :totalScore="inputProblemData.totalScore"
                :level="inputProblemData.level" :arrayTagId="inputProblemData.arrayTagId" :type="'edit'"
                @page="(e1) => { changePage(e1) }" @returnval="(e1) => { setValueFunc(e1) }"></publishing>
            <hr />
        </div>
    </div>
</template>
 
<style></style>