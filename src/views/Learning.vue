<script setup>
import { connectbackend } from "../stores/connectbackend.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learning/Learningcontent.vue";
import Sidebar from "../components/Learning/Sidebar.vue";
const mybackend = connectbackend();


// let datafromback = ref({})
const currentlesson = ref({})

mybackend.getAllTag()

const conBackend = (type,id) => {

if(type == "delete"){}
mybackend.deleteContent(id)
}


</script>
 
<template>
    <!-- Sidebar/menu -->
    <Sidebar :contents="mybackend.tagList" @selected="(lesson) => currentlesson = lesson"></Sidebar>

    <!-- context -->
    <learningcontent :contents="currentlesson"  @buttonemit="(e) => conBackend(e,currentlesson.id)"></learningcontent>
    <!--  -->
</template>
 
<style></style>