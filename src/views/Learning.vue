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
console.log(type)
console.log(query)

    if (type == "Delete") {
        mybackend.deleteContent(query)
    }
    if (type == "Add" || type == "Edit") {
        mybackend.addContent(query)
    }


}

</script>
 
<template>
    <div v-if="isAdd">
        <Addcontent :List="mybackend.tagList"  :type="'Add'" @addstatus="(e) => isAdd = e" @addfunc="(e, query) => conBackend(e,query )"></Addcontent>
    </div>
    <div v-else>
        <!-- Sidebar/menu -->
        <Sidebar :contents="mybackend.tagList" @selected="(lesson,id) => currentlesson = {lesson,'id':id}" @addstatus="(e) => isAdd = e">
        </Sidebar>

        <!-- context -->
        <learningcontent :contents="currentlesson" @buttonemit="(e,e1) => conBackend(e, e1)"  ></learningcontent>
        <!--  -->
    </div>
</template>
 
<style></style>