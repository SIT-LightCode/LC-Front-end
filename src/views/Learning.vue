<script setup>
import { connectbackend } from "../stores/connectbackend.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learningcontent.vue";


let datafromback = ref({})
const currentlesson = ref([])
const newname = ref('')
const selectedObject = ref('')

const mybackend = connectbackend();
mybackend.getAllTag()
    .then(data => {
        datafromback = data["data"]["getTag"]
    })
    .catch(error => {
        console.error("Error:", error);
    });


</script>
 
<template>
    <!-- Sidebar/menu -->
    <nav class="w3-sidebar w3-bar-block w3-white w3-collapse " style="z-index:3; width:250px; height:500px" id="mySidebar">
        <br>
        <div class="w3-container">
            <h3 class="w3-padding-64"><b>List Topic</b></h3>
        </div>
        <div class="w3-bar-block" v-for="topic in datafromback">
            <div> {{ topic["topic"] }}</div>

            <div class="w3-bar-block" v-for="lesson in topic.lesson">
                <button @click="currentlesson = lesson"> {{ lesson.name }} </button>
            </div>
        </div>


        {{ selectedObject }} {{ newname }}
        <div>
            <label for="objectSelect">Select tag to add:</label>
            <select id="objectSelect" v-model="selectedObject">
                <option :value="null" disabled>Select an object</option>
                <option v-for="object in datafromback" :key="object.id" :value="object.topic">
                    {{ object["topic"] }}
                </option>
            </select>
            <button @click="console.log(newname)"> add </button>
            <input v-model="newname">
        </div>
    </nav>
    <!--  -->

    <!-- context -->
    <div class="w3-main w3-padding-64" style="margin-left:300px">
        <learningcontent :contents="currentlesson"></learningcontent>
    </div>
    <!--  -->
</template>
 
<style></style>