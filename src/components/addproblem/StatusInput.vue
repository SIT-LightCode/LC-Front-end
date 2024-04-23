<script setup>
import { reactive } from "vue"
const emit = defineEmits(['addfunc', 'addstatus'])

const prop = defineProps({
    pageAdd: Number
})
const descriptionOfStep = ['General information','Solution for problem','Sample parameter','Publishing']
</script>
 
<template>
    <div class="flex rounded-1 py-5">
        <div v-for="n in 4" class="flex-auto w-10 p-1 mx-1 flex justify-center rounded-lg "
            :class="[n <= prop.pageAdd ? 'bg-blue-500' : 'bg-gray-300']">

            <div class="flex flex-col text-sm font-medium text-gray-900 dark:text-white" :class="[n <= prop.pageAdd ? 'text-white' : 'text-gray-500']">
                <div class="place-self-center"> <p> Step {{ n }}</p></div>
                <div class="place-self-center">{{ descriptionOfStep[n-1] }}</div>
            </div>
        </div>

    </div>
</template>
<style></style>
