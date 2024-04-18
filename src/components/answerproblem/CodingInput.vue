<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount, computed } from "vue";
const emit = defineEmits(['addstatus', 'Submit'])

const input = ref('const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }')

const prop = defineProps({

    result: {
        type: Object,
    }
})

const highlighter = (code) => {
    return highlight(code, languages.js);
}
const countFailedTestCases = computed(() => {
    if (prop.result.testcaseResults) {
        return prop.result.testcaseResults.reduce((count, testCase) => {
            return count + (testCase.status === 'failed' ? 1 : 0);
        }, 0);
    }
    else return null
})

</script>

<template>
    <div>
        <div class="flex justify-content-center align-items-center mb-4 gap-2">
            <div id="logo">CODING</div>

    </div>

        <div class="max-w-[80%]">
            <prism-editor class="my-editor " v-model="input" :highlight="highlighter" line-numbers
                :tabSize="5"></prism-editor>
        </div>
        <div class="p-3">
            <buttonvue class="bg-gray-300 hover:bg-gray-400" @buttonClick="$emit('addstatus', '')" :name="'Back'">
            </buttonvue>
            <buttonvue class="bg-red-300 hover:bg-red-400"
                @buttonClick="input = 'const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }'"
                :name="'Reset'"></buttonvue>
            <buttonvue class="bg-blue-300 hover:bg-blue-400" @buttonClick="$emit('Submit', input)" :name="'Submit'">
            </buttonvue>
        </div>

    </div>
</template>

<style>
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}</style>