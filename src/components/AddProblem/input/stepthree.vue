<script setup>
import { ref } from "vue";

const emit = defineEmits(['example', "examplechange"])

const example = ref({
    example:
    {
        type: "example", val: [
            { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } },
            { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } },
            { input: { type: 'input', val: '' }, output: { type: 'output', val: '' } }]
    }
}
)

const addNewarray = () => {
    example.value.push({ input: { type: 'input', val: '' }, output: { type: 'output', val: '' } })
}
const deleteNewarray = () => {
    if (example.value.length > 3) {
        example.value.pop()
    }
}
</script>
 
<template>
    <div>
        <h3>Example of Input and Output * </h3>
        <div v-for="(i, key) of example.example.val">
            <div>
                Example of Input {{ key }}
                <textarea v-model="i.input.val" @change="$emit('example',example)"></textarea>
                Example of Output {{ key }}
                <textarea v-model="i.output.val" @change="$emit('example',example)"></textarea>
            </div>
        </div>
        <button @click="addNewarray()">Add Example</button>
        <button v-if="example.length > 3" @click="deleteNewarray()">delete Example</button>
        <button @click="$emit('example', example, -1);">Previous</button>
        <button @click="$emit('example', example, 1);">Next</button>
    </div>
</template>
 
<style></style>