<script setup>
const emit = defineEmits(['addfunc', 'addstatus'])

const prop = defineProps({
    datas: {
        type: Object,
        default: {}
    },
})
</script>
 
<template>
    <div>{{ prop.datas }}
        Name: {{ prop.datas.name }}
        Description:
        <v-md-preview v-model="prop.datas.description"></v-md-preview>
        name: "", description: "", solution: "", example: "", totalScore: 0, level: 0
    </div>
</template>
 
<style></style>