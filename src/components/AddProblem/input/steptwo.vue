<script setup>
import { ref } from "vue"
import CodeEditor from '../CodeEditor.vue';

const emit = defineEmits(['returnval'])
const input = ref({ solution: { type: 'solution', val: '' } })

const setValue = (value) => {
    input.value.solution.val = value
    emit('returnval', input.value);
}
</script>
 
<template>
    <div>
        <h3>Solution for the problem * </h3>
        <CodeEditor @code="(e1) => {setValue(e1) }" />
    </div>
</template>
 
<style></style>