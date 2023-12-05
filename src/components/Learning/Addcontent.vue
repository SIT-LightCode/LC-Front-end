<script setup>
import { ref } from "vue";
import vmdeditor from "./vmdeditor.vue"
import * as gql from 'gql-query-builder'
import buttonvue from "../button/button.vue";
import { modalSwal } from "../../stores/modal.js";
const mymodal = modalSwal();

const emit = defineEmits(['addfunc', 'addstatus'])

const prop = defineProps({
    datas: Object,
    type: String,
    List: Object
})

const selectedObjectNew = ref(0)
const selectedObjectOld = ref(0)

const newnamecontent = ref('')
const text = ref('')

const clearInput = async (value) => {
    if (value) {
        selectedObjectNew.value = ""
        newnamecontent.value = ""
        text.value = ""
    }
}
const checkValue = (selectid) => {
    let errorText = ''
    if (text.value == '') {
        errorText = errorText + '\n Error Content: Dont has value for content'
    }
    if (newnamecontent.value == '' || newnamecontent.value.length > 255) {
        errorText = errorText + '\n Error Name: input value invaild '
    }
    if (selectid == 0) {
        errorText = errorText + '\n Error Tag: you dont select tag'
    }
    if (prop.type == "Edit") {
        if (!(prop.datas.lesson.name != newnamecontent.value || prop.datas.lesson.content != text.value)) {
            errorText = errorText + '\n Error : You insert same value'
        }
    }
    if (errorText != '') {
        mymodal.modalNormal("Error", errorText, "error")
        return false
    } else return true
}


const clickAddEdit = async (value) => {
    if (value) {
        let id = ''
        let selectid = 0
        if (prop.type == "Add") {
            id = null
        } else if (prop.type == "Edit") {
            id = prop.datas.lesson.id
        }

        if (selectedObjectNew.value != 0) {
            selectid = selectedObjectNew.value
        } else selectid = selectedObjectOld.value
        if (checkValue(selectid)) {
            let query = gql.mutation({
                operation: 'upsertLesson',
                variables: {
                    lessonInput: {
                        value: {
                            id: id,
                            tagId: selectid,
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
            emit('addfunc', prop.type, query);
        }
    }
}

if (prop.datas != undefined) {
    selectedObjectOld.value = prop.datas.id
    newnamecontent.value = prop.datas.lesson.name
    text.value = prop.datas.lesson.content
}

</script>
 
<template>
    <!-- contents  -->

    <div class="w3-container w3-card w3-white w3-margin-bottom">
        <hr>
        <div> <button @click="$emit('addstatus', false)">Back</button>
            <div v-if="prop.type == 'Add'" class="w3-text-grey w3-padding-16">
                <label for="objectSelect"> Select tag for content to add: </label>
                <select id="objectSelect" v-model="selectedObjectNew">
                    <option :value="null" disabled>Select an object</option>
                    <option v-for="object in List" :key="object.id" :value="object.id">
                        {{ object["topic"] }}
                    </option>
                </select>
            </div>
            <div class="w3-text-grey w3-padding-16">
                Name: <input v-model="newnamecontent">
            </div>
            <div class="w3-container">
                <vmdeditor v-model="text"></vmdeditor>
                <hr>
                <buttonvue @buttonClick="(value) => clearInput(value)" :name="'clear'" />
                <buttonvue @buttonClick="(value) => clickAddEdit(value)" :name="prop.type" />
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