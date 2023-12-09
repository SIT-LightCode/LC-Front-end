<!-- <script setup>
import { ref } from "vue"
import CodeEditor from '../CodeEditor.vue';

const emit = defineEmits(['returnval'])
const input = ref({ solution: { type: 'solution', val: '' } })

const setValue = (value) => {
    input.value.solution.val = value
    emit('returnval', input.value);
}
</script>
 

 
<style></style> -->


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


const input = ref({ solution: { type: 'solution', val: 'const answer = (input) => {\n \n \n 	//Code Here \n console.log(input)   \n \n \n \n  }' } })

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
            emit('returnval', input.value);
        }
    }
    else {
        emit('page', e1);
    }
}

const highlighter = (code) => {
    return highlight(code, languages.js);
}

</script>

<template>
    <div class="">
        <h3>Solution for the problem * </h3>
        <prism-editor class="my-editor" v-model="input.solution.val" :highlight="highlighter" line-numbers
            :tabSize="5"></prism-editor>
        <buttomSubmit :pages="4" @page="(e1) => { valuetoaddpage(e1) }"></buttomSubmit>
    </div>
</template>
  
<style>
/* required class */
.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    height: 450px;

    /*  */
    margin-top: 2rem;
    display: flex;
    position: relative;

}

/* optional class for removing the outline */
/* .prism-editor__textarea:focus {
  outline: none;
} */</style>