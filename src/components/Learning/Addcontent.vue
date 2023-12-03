<script setup>
import { ref } from "vue";
import vmdeditor from "./vmdeditor.vue"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import * as gql from 'gql-query-builder'

const emit = defineEmits(['addfunc', 'addstatus'])

const prop = defineProps({
    datas: Object,
    type: String,
    List: Object
})

const selectedObject = ref(0)
const newnamecontent = ref('')
const text = ref('')

const clearInput = () => {
    selectedObject.value = ""
    newnamecontent.value = ""
    text.value = ""
}


const clickFunc = () => {
    let id = ''
    if (prop.type == "Add") {
        id = null
    } else if (prop.type == "Edit") {
        id = prop.datas.lesson.id

    }
    let query = gql.mutation({
        operation: 'upsertLesson',
        variables: {
            lessonInput: {
                value: {
                    id: id,
                    tagId: selectedObject.value,
                    name: newnamecontent.value,
                    content: text.value
                },
                type: "LessonInput",
                required: true
            }
        },
        fields: ['id', { tag: ['id', 'topic'] }
            , 'name', 'content']
    }, undefined, {
        operationName: 'UpsertLesson'
    })
    console.log(query)
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
        if (result.isConfirmed) {

            emit('addfunc', prop.type, query);
        }

    });
}
if (prop.datas != undefined) {
    selectedObject.value = prop.datas.id
    newnamecontent.value = prop.datas.lesson.name
    text.value = prop.datas.lesson.content
}

</script>
 
<template>
    <!-- contents  -->

    <div class="w3-container w3-card w3-white w3-margin-bottom">
        <hr>
        <div> <button @click="$emit('addstatus', false)">Back</button>
            <div v-if="prop.type == 'Add'">
                <label for="objectSelect"> Select tag for content to add: </label>
                <select id="objectSelect" v-model="selectedObject">
                    <option :value="null" disabled>Select an object</option>
                    <option v-for="object in List" :key="object.id" :value="object.id">
                        {{ object["topic"] }}
                    </option>
                </select>
            </div>
            <h2 class="w3-text-grey w3-padding-16">
                Name: <input v-model="newnamecontent">
            </h2>
            <div class="w3-container">
                <vmdeditor v-model="text"></vmdeditor>
                <hr>
                <button @click="clearInput()">Clear</button>
                <button @click="clickFunc()">{{ prop.type }}</button>
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