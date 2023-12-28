<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount } from "vue";
const emit = defineEmits(['addstatus', 'Submit'])

const input = ref('const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }')



const highlighter = (code) => {
    return highlight(code, languages.js);
}
</script>
 
<template>
    <div>
        <buttonvue class="" @buttonClick="$emit('addstatus', '')" :name="'Back'"></buttonvue>
        <buttonvue class=""
            @buttonClick="input = 'const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }'"
            :name="'Reset'"></buttonvue>
        <buttonvue class="" @buttonClick="$emit('Submit', input)" :name="'Submit'"></buttonvue>
        
        <div>
            <prism-editor class="my-editor" v-model="input" :highlight="highlighter" line-numbers
                :tabSize="5"></prism-editor>
        </div>
    </div>
</template>
 
<style></style>