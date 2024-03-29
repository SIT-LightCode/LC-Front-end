<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue';
const emit = defineEmits(["filterValue"])
const prop = defineProps({
        datas: Object,
})
const filterValue = ref({ tag: "", level: 0, isOfficial: "" })

</script>

<template>
        <div style=" width: 100%" class="border-2 rounded-lg p-5 m-5 ">
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
                <label for="underline_select" class="block mb-2 py-2 text-sm font-medium text-gray-900 dark:text-white">
                        Official Problem?</label>
                <select id="underline_select"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        v-model="filterValue.isOfficial">
                        <option value="">No select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>

                </select>
                <label for="underline_select" class="block mb-2 py-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select tag ?</label>
                <select v-model="filterValue.tag"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value="">No select</option>
                        <option v-for="(topic, key) in datas.tagList" :value="topic.id">{{ topic.topic }}</option>
                </select>
                <buttonVue @buttonClick="$emit('filterValue', filterValue);" :name="'filter'"></buttonVue>

        </div>
</template>

<style></style>
