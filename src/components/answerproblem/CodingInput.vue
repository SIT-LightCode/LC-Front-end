<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

import buttonvue from '../button/Button.vue'

import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from 'vue-router'


const emit = defineEmits(['addstatus', 'Submit'])

const input = ref('const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }')
const route = useRoute()
const myRouter = useRouter()

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
        <div class="flex justify-content-center align-items-center gap-2">
        
            <div class="text-xl opacity-50">
            <button @click="myRouter.push({ name: 'listProblem' })"> Problem </button> > <span
                class="text-st-blue">{{ route.name }}</span>
        </div>
            <!-- <span style=" color: #007AFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); font-family: Rampart One; font-size: 64px; font-style: normal; line-height: 36px;" class="text-xl opacity-50  ">Coding..</span> -->
            <div class="ml-5">
                <buttonvue class="bg-gray-300 hover:bg-gray-400" @buttonClick="$emit('addstatus', '')" :name="'Back'">
                </buttonvue>
                <buttonvue class="bg-red-300 hover:bg-red-400"
                    @buttonClick="input = 'const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }'"
                    :name="'Reset'"></buttonvue>
                <buttonvue class="bg-blue-300 hover:bg-blue-400" @buttonClick="$emit('Submit', input)" :name="'Submit'">
                </buttonvue>
            </div>
        </div>

        <div class="max-w-[80%] ">
            <prism-editor class="my-editor " v-model="input" :highlight="highlighter" line-numbers
                :tabSize="5"></prism-editor>
        </div>


    </div>
</template>

<style>
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 40px;
    font-style: normal;
    font-weight: 300;
    line-height: 28px;
    /* 28.125% */
}
</style>