<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { Toaster, toast } from 'vue-sonner'

import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount } from "vue";
const emit = defineEmits([ 'addstatus' , 'Submit'])
const prop = defineProps({
    data: {
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
        <div>
            <buttonvue class="" @buttonClick="$emit('addstatus', '')" :name="'Back'"></buttonvue>
            <buttonvue class="" @buttonClick="input = 'const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }'" :name="'Reset'"></buttonvue>
            <buttonvue class="" @buttonClick="$emit('Submit', prop.data.id , input)" :name="'Submit'"></buttonvue>
            <div >
                <prism-editor class="my-editor" v-model="input" :highlight="highlighter" line-numbers
                    :tabSize="5"></prism-editor>
            </div>
        </div>
        <div>
            <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ prop.data }}</h3>
            <v-md-preview  :text="prop.data.description"></v-md-preview>
        </div>

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