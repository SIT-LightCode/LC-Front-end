<script setup>
import { ref } from "vue"
import CodeEditor from '../CodeEditor.vue';
const emit = defineEmits(['solution'])
</script>
 
<template>
    <div>
        <h3>Solution for the problem * </h3>
        <CodeEditor @code="(e1) => { $emit('solution', e1); }" />
    </div>
</template>
 
<style></style>