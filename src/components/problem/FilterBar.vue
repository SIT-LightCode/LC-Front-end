<script setup>
import { ref } from 'vue'
import { learningCon } from '../../stores/LearningCon.js'
import buttonVue from '../button/Button.vue';
const mylearningCon = learningCon()
const emit = defineEmits(["filterValue"])

const filterValue = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
mylearningCon.getAllTag()

</script>
 
<template >
        <div style="overflow-y: auto; max-height: 100vh">
                <ul class="border-2 rounded-lg p-5 m-5 flex flex-col w-64 space-y-5 text-ellipsis overflow-hidden">
                        <li v-for="(topic, key) in mylearningCon.tagList" class="">
                                <div class="flex items-center">
                                        <input type="checkbox" v-model="filterValue.tag" :id="key" :value="topic.id">
                                        <label :for="key" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                                                topic.topic }}</label>
                                </div>

                        </li>
                </ul>
                <buttonVue @buttonClick="$emit('filterValue', filterValue);" :name="'filter'"></buttonVue>
                <!-- <div>
                        <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min-max
                                range</label>
                        <input id="minmax-range" type="range" min="0" max="10" value="5"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                </div> -->
        </div>
</template>
 
<style></style>
