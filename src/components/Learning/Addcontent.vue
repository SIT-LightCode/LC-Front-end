<script setup>
import { ref } from "vue";
import vmdeditor from "./vmdeditor.vue"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const emit = defineEmits(['addfunc','addstatus'])

const prop = defineProps({
    datas: Object,
})

const selectedObject = ref("")
const newnamecontent = ref("")
const text = ref("")

const clearInput = () => {
    selectedObject.value = ""
    newnamecontent.value = ""
    text.value = ""
}


const clickFunc = () => {
    let errortext = ""

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!"
    }).then((result) => {
        console.log("test")
        if (result.isConfirmed ) {
            console.log("test")
            emit('addfunc','add', selectedObject.value,newnamecontent.value,text.value);
        } else {
            Swal.fire({
        title: "Error",
        text: errortext,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "i understand"
    })}
        
    //     for (let data in prop.datas) {

    //         if (selectedObject.value != data["topic"])
    //             return errortext + "No topic to add"
    //     }
    //     if (newnamecontent.value != "") {
    //         for (let data in prop.datas) {
    //             if (data["topic"] == selectedObject.value) {
    //                 for (let lesson in topic.lesson) {
    //                     if (newnamecontent.value != lesson.name)
    //                         return errortext + "Can't add because name could unique"
    //                 }
    //             }
    //         }
    //     } else if (newnamecontent.value == "") {
    //         return errortext + "Name is not null"
    //     }
    //     if (text.value == "") {
    //         return errortext + "Description is not null"
    //     }

    //     if (result.isConfirmed && errortext == "") {
    //         console.log("test")
    //         emit('isClick', "true");
    //     } else {
    //         Swal.fire({
    //     title: "Error",
    //     text: errortext,
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     confirmButtonText: "i understand"
    // })
    //     }
    });
}

</script>
 
<template>
    <!-- contents  -->
    <div class="w3-container w3-card w3-white w3-margin-bottom">
        <hr>
        <div> <button @click="$emit('addstatus', false)">Back</button>

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
                <vmdeditor  v-model="text"></vmdeditor>
                <hr>
                {{ text }}
                <button @click="clearInput()">Clear</button>
                <button @click="clickFunc()">Add</button>
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