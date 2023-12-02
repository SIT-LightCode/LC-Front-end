<script setup>
import { connectbackend } from "../stores/connectbackend.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learning/Learningcontent.vue";
import Sidebar from "../components/Learning/Sidebar.vue";
import Addcontent from "../components/Learning/Addcontent.vue";


const mybackend = connectbackend();


// let datafromback = ref({})
const currentlesson = ref({})
const isAdd = ref(false)

mybackend.getAllTag()
const conBackend = (type, query) => {

    if (type == "delete") {
        mybackend.deleteContent(query)
    }
    if (type == "add") {
        mybackend.addContent(query)
    }
}

</script>
 
<template>
    <div v-if="isAdd">
        <Addcontent :datas="mybackend.tagList" @addstatus="(e) => isAdd = e" @addfunc="(e, query) => conBackend(e,query )"></Addcontent>
    </div>
    <div v-else>
        <!-- Sidebar/menu -->
        <Sidebar :contents="mybackend.tagList" @selected="(lesson) => currentlesson = lesson" @addstatus="(e) => isAdd = e">
        </Sidebar>

        <!-- context -->
        <learningcontent :contents="currentlesson" @buttonemit="(e) => conBackend(e, currentlesson.id)"></learningcontent>
        <!--  -->
    </div>
</template>
 
<style></style>