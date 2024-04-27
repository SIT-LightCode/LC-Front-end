<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue';
const emit = defineEmits(["filterValue"])
const prop = defineProps({
        datas: Object,
})
const filterValue = ref({ keyword: "", tag: "", level: 0, isOfficial: "" })
const resetFilter = () => {
        emit('filterValue', { keyword: "", tag: "", level: 0, isOfficial: "" });
        filterValue.value.keyword = "";
        filterValue.value.tag = "";
        filterValue.value.level = 0;
        filterValue.value.isOfficial = "";

}
</script>

<template>
        <div class="mt-10 flex gap-2 ">
                <div class="relative flex w-72">
                        <input @change="$emit('filterValue', filterValue);" v-model="filterValue.keyword"
                                placeholder="Problem Search" class="rounded-3xl px-4 py-1 w-full text-sm	" />
                        <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="w-[24px] h-[24px] absolute right-3 top-2 opacity-50 text-sm">
                                        <path fill-rule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clip-rule="evenodd" />
                                </svg>
                        </span>
                </div>
                <div class="flex items-center gap-1">
                        <p class="text-sm	 text-st-blue">Difficulty Level:</p>
                        <select @change="$emit('filterValue', filterValue);" v-model="filterValue.level"
                                class="border-none rounded-3xl px-4 py-1 w-36 text-sm	">
                                <option value="0">No select</option>
                                <option value="5">Expert</option>
                                <option value="4">Hard</option>
                                <option value="3">Medium</option>
                                <option value="2">Beginner</option>
                                <option value="1">Easier</option>
                        </select>
                </div>
                <div class="flex items-center gap-1">
                        <p class="text-sm text-st-blue">Created by:</p>
                        <select @change="$emit('filterValue', filterValue);" v-model="filterValue.isOfficial"
                                class="border-none rounded-3xl px-4 py-1 w-36 text-sm	">
                                <option value="">No select</option>
                                <option value="true">System</option>
                                <option value="false">Community</option>
                        </select>
                </div>
                <div class="flex items-center gap-1">
                        <p class="text-sm text-st-blue">Select tag:</p>
                        <select @change="$emit('filterValue', filterValue);" v-model="filterValue.tag"
                                class="border-none rounded-3xl px-4 py-1 w-36 text-sm	">
                                <option value="">No select</option>
                                <option v-for="(topic, key) in datas.tagList" :value="topic.id">{{ topic.topic }}
                                </option>
                        </select>
                </div>
                <buttonVue class="ml-5 bg-gray-300 hover:bg-gray-400" :status="false" @buttonClick="resetFilter"
                        :name="'Reset'"> </buttonVue>

        </div>


</template>

<style></style>
