<script setup>
import { ref } from "vue";

const emit = defineEmits(['example',"examplechange"])

const example = ref([{ id: 1, input: "", output: "" }, { id: 2, input: "", output: "", }, { id: 3, input: "", output: "", }])
const addNewarray = () => {
    example.value.push({ id: example.value.length + 1, input: "", output: "" })
}
const deleteNewarray = () => {
    if (example.value.length > 3) {
        example.value.pop()
    }
}
</script>
 
<template>
    <div>
        <h3 :color="red">Example of Input and Output * </h3>
        <div v-for="i of example">
            <div>
                Example of Input {{ i.id }}
                <textarea v-model="i.input"></textarea>
                Example of Output {{ i.id }}
                <textarea v-model="i.output"></textarea>
            </div>
        </div>
        <button @click="addNewarray()">Add Example</button>
        <button v-if="example.length > 3" @click="deleteNewarray()">delete Example</button>
        <button @click="$emit('example', example);">Next</button>
    </div>
</template>
 
<style></style>