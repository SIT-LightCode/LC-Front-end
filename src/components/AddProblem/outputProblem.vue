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
    <div>
        <div>
            Name: {{ prop.datas.name }}
        </div>
        <div>
            Description:
            <v-md-preview :text="prop.datas.description"></v-md-preview>
        </div>
        <div>
            example:
            <div v-for="i in prop.datas.example">
                {{ i }}
            </div>
        </div>
        {{ prop.datas }}
        name: "", description: "", solution: "", example: "", totalScore: 0, level: 0
    </div>
</template>
 
<style></style>