<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { Toaster, toast } from 'vue-sonner'


import buttonvue from '../button/Button.vue'
import CodingInput from './CodingInput.vue';
import description from './DescriptionProblem.vue'
import { ref, onBeforeMount } from "vue";
const emit = defineEmits(['addstatus', 'Submit'])
const prop = defineProps({
    data: {
        type: Object,
    },
    result:{
        type: Object,
    }
})

const input = ref('const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }')



const highlighter = (code) => {
    return highlight(code, languages.js);
}

</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <CodingInput @addstatus="$emit('addstatus', '')" @Submit="(e)=>$emit('Submit', prop.data.id, e)"></CodingInput>
        <description :result = "prop.result" :data="prop.data"></description>

    </div>
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