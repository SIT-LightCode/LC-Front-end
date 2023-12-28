<script setup>
import ResultPage from './ResultPage.vue';
const prop = defineProps({
    data: {
        type: Object,
    },
    result: {
        type: Object,
    }
})
const colorTags = ['bg-[#ff6961]', 'bg-[#ffb480]', 'bg-[#f8f38d]', 'bg-[#42d6a4]', 'bg-[#08cad1]', 'bg-[#59adf6]', 'bg-[#9d94ff]', 'bg-[#c780e8]']

</script>
 
<template>
    <div>
        <div>
            <h1>Name : {{ prop.data.name }}</h1>
            <h2>Level : <span v-for="level in prop.data.level">*</span></h2>
            <h2>Tag : <span v-for="t in data.tagProblem"
                    class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4  text-gray-800"
                    :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }} </span></h2>
        </div>
        <div>
            <h1>Description</h1>
            <v-md-preview :text="prop.data.description"></v-md-preview>
        </div>
        <div>
            <h1>Example</h1>
            <table  class="items-center m-5 ">
                <tr>
                    <th>Input</th>
                    <th>Output</th>
                </tr>
                <tr v-for="example in  prop.data.example" class="font-medium leading-4 text-gray-800">
                    <td>{{ example.input }}</td>
                    <td>{{ example.output }}</td>
                </tr>
            </table>
        </div>
        <ResultPage :data="prop.result"></ResultPage>
    </div>
</template>
 
<style></style>