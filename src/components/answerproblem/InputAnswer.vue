<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';


import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { Toaster, toast } from 'vue-sonner'
import Dialog from 'primevue/dialog';
import { MqResponsive } from "vue3-mq";
import buttonvue from '../button/Button.vue'
import CodingInput from './CodingInput.vue';
import description from './DescriptionProblem.vue'
import { ref, onBeforeMount } from "vue";
import IconHamberger from '../icons/IconHamberger.vue'
const emit = defineEmits(['addstatus', 'Submit'])
const prop = defineProps({
    data: {
        type: Object,
    },
    result: {
        type: Object,
    },

})

const input = ref('const answer = (input) => {\n \n \n 	//Code Here \n return input;   \n \n \n \n  }')
const isModal = ref(false)

const highlighter = (code) => {
    return highlight(code, languages.js);
}

</script>

<template>

    <div class=" relative  ">

        <div class="grid grid-cols-3 gap-4 fixed h-[90%] w-[90%] " v-if="Object.keys(data).length > 0">
            <div class="grid grid-cols-subgrid gap-4 col-span-1 overflow-y-scroll p-5">
                <!-- <MqResponsive group>
                    <template #xs-lg>
                        <div
                            class="fixed hover:cursor-pointer border-2 border-solid h-[43px] px-2 flex items-center justify-center rounded-lg lg:invisible transition-all hover:text-blue-400 hover:border-blue-400">
                            <button class="  font-bold   rounded" @click="isModal = true">
                                <IconHamberger />
                            </button>
                        </div>

                        <Dialog v-model:visible="isModal" modal header="Description" :style="{ width: '50rem' }"
                            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                            <description :result="prop.result" :data="prop.data"></description>
                        </Dialog>
                    </template>
                    <template #lg-xxl>
                        <description :result="prop.result" :data="prop.data"></description>
                    </template>
                </MqResponsive> -->
                <description :result="prop.result" :data="prop.data"></description>
            </div>


            <!-- Filter-->
            <div class="grid grid-cols-subgrid gap-4 col-span-2 p-5">
                <CodingInput :result="prop.result" @addstatus="$emit('addstatus', '')"
                    @Submit="(e) => { $emit('Submit', prop.data.id, e); }"></CodingInput>
            </div>

        </div>
        <div class="grid grid-cols-5 gap-4 fixed h-[90%] w-[90%] " v-else>
            <!-- Filter-->
            <div class="">
                <buttonvue class="bg-gray-300" @buttonClick="$emit('addstatus', '')" :name="'Back'"></buttonvue>
                <div class="p-10"><b style="color: red"> No problem </b></div>
            </div>
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