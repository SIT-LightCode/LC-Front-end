<script setup>
import { reactive } from "vue"
const emit = defineEmits(['addfunc', 'addstatus'])

const prop = defineProps({
    pageAdd: Number
})
const descriptionOfStep = ['General information','Sample Parameter','Information for publishing','Solution for problem']
</script>
 
<template>
    <div class="flex rounded-1">
        <div v-for="n in 4" class="flex-auto w-32 p-3 mx-5 flex justify-center "
            :class="[n == prop.pageAdd ? 'bg-blue-300' : 'bg-gray-300']">

            <div class="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <div class="place-self-center"> <p> Step {{ n }}</p></div>
                <div class="place-self-center">{{ descriptionOfStep[n-1] }}</div>
            </div>
        </div>

    </div>
</template>
<style></style>
