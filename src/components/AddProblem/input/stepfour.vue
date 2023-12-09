<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

import buttomSubmit from "../../button/ButtonPage.vue"
import { ref, onBeforeMount } from "vue";
const emit = defineEmits(['returnval','page'])
const prop = defineProps({
    solution: {
        type: String,
    }
})

const input = ref({ solution: { type: 'solution', val: prop.solution } })

const checkValue = () => {
    let errorText = ""
    if (input.value.solution.val == "") {
        errorText = errorText + "\n Error solution: Dont has value for solution"
    }
    if (errorText != "") {
        mymodal.modalNormal("Error", errorText, "error")
        return false
    } else return true
}


const valuetoaddpage = async (e1) => {
    if (e1 == 0) {
        if (checkValue()) {
            emit('page', e1);
            emit('returnval', input.value);
        }
    }
    else {
        emit('page', e1);
        emit('returnval', input.value);
    }
}

const highlighter = (code) => {
    return highlight(code, languages.js);
}

</script>

<template>
        <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Solution for the problem * </h3>
        <prism-editor class="my-editor" v-model="input.solution.val" :highlight="highlighter" line-numbers
            :tabSize="5"></prism-editor>
        <buttomSubmit :pages="4" @page="(e1) => { valuetoaddpage(e1) }"></buttomSubmit>
</template>
  
<style>
.my-editor {
    background: #2d2d2d;
    color: #ccc;

    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    height: 450px;

    margin-top: 2rem;
    display: flex;
    position: relative;

}

</style>