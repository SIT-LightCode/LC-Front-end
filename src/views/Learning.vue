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
const conBackend = (type, id, newnamecontent, text) => {

    if (type == "delete") {
        mybackend.deleteContent(id)
    }
    if (type == "add") {
        mybackend.addContent(newnamecontent,id,text)
    }
}

</script>
 
<template>
    <div v-if="isAdd">
        <Addcontent :datas="mybackend.tagList" @addstatus="(e) => isAdd = e" @addfunc="(e, e1, e2,e3) => conBackend(e, e1, e2,e3)"></Addcontent>
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