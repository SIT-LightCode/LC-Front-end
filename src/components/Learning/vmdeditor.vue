
<script setup>
import { ref } from 'vue';
import buttonVue from '../components/button/button.vue';
const text = ref('');

</script>
<template>
    <v-md-editor v-model="text" height="300px" ></v-md-editor>
    <buttonVue></buttonVue>
</template>
  