
<script setup>
import { ref } from 'vue';
const text = ref('');

</script>
<template>
    <v-md-editor v-model="text" height="300px" ></v-md-editor>
</template>
  