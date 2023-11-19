<script setup>
import { ref } from "vue";

defineEmits(['add', 'name', 'selected', 'content'])

const prop = defineProps({
    datas: Object,
})


const newnamecontent = ref('')
const selectedObject = ref(0)
const content = ref("")

</script>
 
<template>
    <!-- contents  -->
    <div class="w3-container w3-card w3-white w3-margin-bottom">
        <hr>
        <div>
            <label for="objectSelect"> Select tag for content to add: </label>
            <select id="objectSelect" v-model="selectedObject">
                <option :value="null" disabled>Select an object</option>
                <option v-for="object in datas" :key="object.id" :value="object.id">
                    {{ object["topic"] }}
                </option>
            </select>

            <h2 class="w3-text-grey w3-padding-16">
                Name: <input v-model="newnamecontent">
            </h2>
            <div class="w3-container">
                <textarea v-model="content" placeholder="Write Your Content"></textarea>
                <div class="w3-padding-32">
                    <button class="w3-bar-item w3-left w3-button w3-gray w3-padding-16"
                        @click="newnamecontent = ''; selectedObject = ''; content = ''"> Reset </button>
                    <button class="w3-bar-item w3-right w3-button w3-gray w3-padding-16"
                        @click="$emit('add', newnamecontent, selectedObject, content); newnamecontent = ''; selectedObject = ''; content = ''">
                        Add </button>
                </div>
                <hr>


            </div>

        </div>
    </div>
</template>
 
<style>
textarea {
    width: 100%;
    box-sizing: border-box;
    display: block;
    max-width: 100%;
    line-height: 1.5;
    padding: 15px 15px 30px;
    border-radius: 3px;
    transition: box-shadow 0.5s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>