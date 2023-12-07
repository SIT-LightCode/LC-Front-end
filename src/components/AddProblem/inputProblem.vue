<script setup>

import { ref } from "vue";

const emit = defineEmits(['namechange', 'descriptionchange', 'solutionchange', 'examplechange', 'totalScorechange', 'levelchange'])

const prop = defineProps({
    datas: Object,
    type: String,
    List: Object
})

const example = ref([{ id: 1, input: "A", output: "" }, { id: 2, input: "B", output: "", }, { id: 3, input: "V", output: "", }])
const name = ref('')
const description = ref('')
const solution = ref('')
const totalScore = ref(0)
const level = ref(0)

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

        


    </div>
</template>
 
<style></style>