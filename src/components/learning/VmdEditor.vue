<script setup>
import { ref } from 'vue'
const text = ref('')
</script>
<template>
  <v-md-editor
    right-toolbar="preview toc sync-scroll"
    v-model="text"
    height="300px"
    left-toolbar="undo redo | h bold italic strikethrough quote |ul ol table hr |"
  ></v-md-editor>
</template>
