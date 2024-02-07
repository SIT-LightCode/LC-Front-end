<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue';
const emit = defineEmits(["filterValue"])
const prop = defineProps({
	datas: Object,
})
const filterValue = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })

</script>
 
<template >
        <!-- <div style="overflow-y: auto; max-height: 100vh" class="border-2 rounded-lg p-5 m-5 ">
                <label for="underline_select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">the
                        difficulty level?</label>
                <select id="underline_select"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        v-model="filterValue.level">
                        <option value="0">No select</option>
                        <option value="5">Expert</option>
                        <option value="4">Hard</option>
                        <option value="3">Medium</option>
                        <option value="2">Beginner</option>
                        <option value="1">Easier</option>
                </select>
                <ul class="">
                        <li v-for="(topic, key) in datas.tagList" class=" p-5 flex flex-col w-64 space-y-5 text-ellipsis overflow-hidden">
                                <div class="flex items-center">
                                        <input type="checkbox" v-model="filterValue.tag" :id="key" :value="topic.id">
                                        <label :for="key" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                                                topic.topic }}</label>
                                </div>

                        </li>
                </ul>
                <buttonVue @buttonClick="$emit('filterValue', filterValue);" :name="'filter'"></buttonVue>
        
        </div> -->
</template>
 
<style></style>
