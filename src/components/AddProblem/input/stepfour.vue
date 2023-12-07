<script setup>
import { ref } from "vue";

const emit = defineEmits(['totalScorelevel',"totalScorechange","levelchange"])
const input = ref({totalScore:0, level:0})
</script>
 
<template>
    <div>
        <h3>Setting Problem * </h3>

        <div>
            totalScore
            <input v-model="input.totalScore" />
            the difficulty level?
            <input v-model="input.level" />
        </div>
        <button @click="$emit('totalScorelevel', input);">Next</button>
    </div>
</template>
 
<style></style>