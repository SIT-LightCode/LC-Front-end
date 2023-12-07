<script setup>
import vmdeditor from '../../learning/vmdeditor.vue';
import { ref } from "vue";

const emit = defineEmits(['namedescription'])


const input = ref({ name: '', description: '' })
</script>
 
<template>
    <div>
        <h3 :color="red">Name you want to create *</h3>
        <input v-model="input.name" />
        <h3 :color="red">Description for the problem * </h3>
        <vmdeditor v-model="input.description" />
        <button @click="$emit('namedescription', input);">Next</button>

    </div>
</template>
 
<style></style>