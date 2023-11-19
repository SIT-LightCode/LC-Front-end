<script setup>
import { connectbackend } from "../stores/connectbackend.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learningcontent.vue";
import Addcontent from "../components/Addcontent.vue";

const mybackend = connectbackend();


// let datafromback = ref({})
const currentlesson = ref([])
const addfunc = ref(true)




// const addContent = (e, e1, e2) => {
//     mybackend.addConnent(e, e1, e2).catch(error => {
//         console.error("Error:", error);
//     });
// }


mybackend.getAllTag()


</script>
 
<template>
    <!-- Sidebar/menu -->
    <nav class="w3-sidebar w3-bar-block w3-white w3-collapse " style="z-index:3; width:250px; height:500px" id="mySidebar">
        <br>
        <div v-if="mybackend.tagList.length > 0">
            <div  class="w3-container">
                <h3 class="w3-padding-32"><b>List Topic</b></h3>
            </div>
            <div class="w3-bar-block" v-for="topic in mybackend.tagList">
                <div> {{ topic["topic"] }} </div>

                <div class="w3-bar-block" v-for="lesson in topic.lesson">
                    <button class="w3-bar-item w3-center w3-button" @click="currentlesson = lesson; addfunc = true"> {{
                        lesson.name }} </button>
                </div>
            </div>
        </div>
        <div v-else class="w3-bar-block">
            <div> No Topic Data </div>
        </div>


        <br>
        <!-- Add  -->
        <button @click="addfunc = !addfunc" class="w3-bar-item w3-center w3-button w3-gray">
            <p v-if="addfunc"> add new content
            </p>
            <p v-else-if="!addfunc"> back
            </p>

        </button>

    </nav>


    <!--  -->

    <!--  -->



    <!-- context -->
    <div class="w3-main w3-padding-64" style="margin-left:300px">
        <div v-if="addfunc">
            <learningcontent :contents="currentlesson" @delete="(e) => mybackend.deleteContent(e)"></learningcontent>
        </div>
        <div v-else-if="!addfunc">
            <Addcontent :datas="mybackend.tagList" @add="(e, e1, e2) =>  mybackend.addContent(e, e1, e2)"></Addcontent>
        </div>
    </div>
    <!--  -->
</template>
 
<style></style>