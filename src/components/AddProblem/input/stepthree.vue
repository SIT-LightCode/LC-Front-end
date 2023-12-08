<script setup>
import { ref } from "vue";
import { modalSwal } from "../../../stores/modal.js";

import buttonPage from "../../button/buttonpage.vue"

const emit = defineEmits(['returnval', 'page'])
const prop = defineProps({
    example: {
        type: Array,
    }
})
const mymodal = modalSwal()
const example = ref({
    example:
    {
        type: "example", val: prop.example

    }
}
)

const checkValue = () => {
    let errorText = ""
    example.value.example.val.forEach((data) => {
        data.forEach((da) => {
            console.log(da)
            if (da == '') {
                errorText = errorText + "\n Error example: you are not have example"
            }
        })
    })

    if (errorText != "") {
        mymodal.modalNormal("Error", errorText, "error")
        return false
    } else return true
}

const inputExam = (e1) => {
    if(checkValue()){
        emit('page', e1)
    }
}

const csstextarea = "p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

const addDeleteExample = (type, id) => {
    if (type == "add") {
        if (id != undefined) {
            example.value.example.val[id].push([undefined])
        }
        else example.value.example.val.push([undefined])
    }
    if (type == "delete") {
        if (id != undefined) {
            if (example.value.example.val[id].length > 1) {
                example.value.example.val[id].pop()
            }
        }
        else {
            if (example.value.example.val.length > 1) {
                example.value.example.val.pop()
            }
        }
    }
}

</script>
 
<template>
    <div class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <h3>Example parameters for problem</h3>
        <div>
            <h2>example :</h2>
            <p>1 -- if parameters is text or Number</p>
            <p>1,2,3,4,5,6 -- if parameters is array </p>
        </div>
        <div v-for="( i, key1 ) of example.example.val">
            <h3>Example [{{ key1 + 1 }}]</h3>
            <div v-for="( j, key2) of i">
                <h3>Parameters [{{ key2 + 1 }}]</h3>
                <input rows="4" v-bind:class="csstextarea" v-model="example.example.val[key1][key2]"
                    @change="$emit('returnval', example)" />
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                @click="addDeleteExample('add', key1)">
                Add parameter
            </button>
            <button v-show="example.example.val[key1].length > 1"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                @click="addDeleteExample('delete', key1)">
                Delete parameter
            </button>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="addDeleteExample('add')">
            Add Example parameter
        </button>
        <button v-show="example.example.val.length > 1"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="addDeleteExample('delete')">
            Delete Example parameter
        </button>
    </div>
    <!-- <buttonPage @page="(e1) => { $emit('page', e1) }"></buttonPage> -->
    <buttonPage @page="(e1) => { inputExam(e1) }"></buttonPage>
</template>
 
<style></style>