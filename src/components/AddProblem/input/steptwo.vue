<script setup>
import { ref } from "vue";
import { modalSwal } from "../../../stores/Modal.js";

import buttonPage from "../../button/ButtonPage.vue"

const emit = defineEmits(['returnval', 'page'])
const prop = defineProps({
    example: {
        type: Array,
    }
})
const mymodal = modalSwal()
const example = ref({
    example:
    {
        type: "example", val: prop.example

    }
}
)

const checkValue = () => {
    let errorText = false
    example.value.example.val.forEach((data,key1) => {
        data.forEach((da,key2) => {
            if(da.trim() === ""){
                errorText = true
            }
            if (example.value.example.val[key1][key2] == '' ) {
                errorText = true
            } else {
            example.value.example.val[key1][key2] = da.trim()
            }
        })
    })

    if (errorText) {
        mymodal.modalNormal("Error", "\n Error example: you are not have example", "error")
        return false
    } else return true
}

const inputExam = (e1) => {
    
    if (e1 > 0) {
        if (checkValue()) {
            emit('page', e1)
            emit('returnval', example)
        }
    } else {
        emit('page', e1)
        emit('returnval', example)
    }

}

const csstextarea = "p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

const addDeleteExample = (type, id) => {
    if (type == "add") {
        if (id != undefined) {
            example.value.example.val[id].push([''])
        }
        else example.value.example.val.push([''])
    }
    if (type == "delete") {
        if (id != undefined) {
            if (example.value.example.val[id].length > 1) {
                example.value.example.val[id].pop()
            }
        }
        else {
            if (example.value.example.val.length > 1) {
                example.value.example.val.pop()
            }
        }
    }
}
const text = 
'# Example parameter for your problem\n'+
' ## example : \n '+ 
' 1 ; if parameters is text or Number \n '+ 
'1,2,3,4,5,6 ; if parameters is array \n '+ 
'** You can insert up to 4 parameters. and add  up to 4 examples**'
</script>
 
<template>
    <div class=" mb-2 text-sm font-medium text-gray-900 dark:text-white ">
        <div class="p-3 mx-5">
            <v-md-preview :text="text"></v-md-preview>
        </div>
        <div v-for="( i, key1 ) of example.example.val" class="py-5 ">
            <h3>Example [{{ key1 + 1 }}]</h3>
            <div class="flex flex-row">
                <div v-for="( j, key2) of i" class="flex flex-row py-3 ">
                    <h3 class="place-self-center px-5">Parameters [{{ key2 + 1 }}]</h3>
                    <input rows="4" v-bind:class="csstextarea" v-model="example.example.val[key1][key2]" />
                </div>
                <div class="flex flex-col ">
                    <button :disabled="example.example.val[key1].length > 3"
                        class=" text-gray-900 dark:text-white rounded-full flex-auto w-25 p-3 mx-5 my-1"
                        :class="[example.example.val[key1].length > 3 ? 'bg-gray-300 ' : 'bg-blue-400 hover:bg-blue-500']"
                        @click="addDeleteExample('add', key1)">
                        Add parameter
                    </button>
                    <button :disabled="example.example.val[key1].length <= 1"
                        class="text-gray-900 dark:text-white rounded-full flex-auto w-25 p-3 mx-5 my-1"
                        :class="[example.example.val[key1].length <= 1 ? 'bg-gray-300 ' : 'bg-blue-400 hover:bg-blue-500']"
                        @click="addDeleteExample('delete', key1)">
                        Delete parameter
                    </button>


                </div>

            </div>



        </div>
        <button :disabled="example.example.val.length > 3" 
            class=" text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-full"
            :class="[example.example.val.length > 3 ? 'bg-gray-300 ' : 'bg-blue-400 hover:bg-blue-500']"
            @click="addDeleteExample('add')">
            Add Example parameter
        </button>
        <button :disabled="example.example.val.length <= 1"
            class=" text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-full"
            :class="[example.example.val.length <= 1 ? 'bg-gray-300 ' : 'bg-blue-400 hover:bg-blue-500']"
            @click="addDeleteExample('delete')">
            Delete Example parameter
        </button>
    </div>
    <buttonPage :pages="2" @page="(e1) => { inputExam(e1) }"></buttonPage>
</template>
 
<style></style>