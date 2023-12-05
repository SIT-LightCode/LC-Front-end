<script setup>
import { learningCon } from "../stores/learningCon.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learning/Learningcontent.vue";
import Sidebar from "../components/Learning/Sidebar.vue";
import Addcontent from "../components/Learning/Addcontent.vue";


const mylearningCon = learningCon();


const currentlesson = ref({})
const isAdd = ref(false)

mylearningCon.getAllTag()
const conBackend = (type, query) => {

    if (type == "Delete") {
        mylearningCon.deleteContent(query)
        isAdd.value = false
        currentlesson.value = ''
    }
    if (type == "Add" || type == "Edit") {
        mylearningCon.addContent(query)
        isAdd.value = false
        currentlesson.value = ''
    }


}

</script>
 
<template>
    <div v-if="isAdd">
        <Addcontent :List="mylearningCon.tagList"  :type="'Add'" @addstatus="(e) => isAdd = e" @addfunc="(e, query) => conBackend(e,query )"></Addcontent>
    </div>
    <div v-else>
        <!-- Sidebar/menu -->
        <Sidebar :contents="mylearningCon.tagList" @selected="(lesson,id) => currentlesson = {lesson,'id':id}" @addstatus="(e) => isAdd = e">
        </Sidebar>

        <!-- context -->
        <learningcontent :contents="currentlesson" @buttonemit="(e,e1) => conBackend(e, e1)"  ></learningcontent>
        <!--  -->
    </div>
</template>
 
<style></style>