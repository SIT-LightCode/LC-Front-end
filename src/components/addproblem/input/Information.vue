<script setup>
import vmdeditor from '../../learning/VmdEditor.vue';
import { modalSwal } from "../../../stores/Modal.js";
import buttonPage from "../../button/ButtonPage.vue"
import { Toaster, toast } from 'vue-sonner'

import { ref, computed } from "vue";

const emit = defineEmits(['returnval'])
const mymodal = modalSwal()
const prop = defineProps({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    type: {
        type: String,
    }
})

const input = ref({ name: { type: 'name', val: prop.name }, description: { type: 'description', val: prop.description } }
)
const checkValue = () => {
    let errorText = ""
    if (input.value.name.val.length > 30) {
        errorText = errorText + "\n name is more than 30 characters"
    }
    if (input.value.name.val.trim() == "") {
        errorText = errorText + "\n you do not insert name"
    }
    if (input.value.description.val.trim() == "") {
        errorText = errorText + "\n you do not insert value for description "
    }
    if (errorText != "") {
        toast.error('Error : '+ errorText)
        // mymodal.modalNormal("Error", errorText, "error")
        return false
    } else {
        return true
    }
}


const valuetoaddpage = async () => {

    if (checkValue()) {
        emit('returnval', input.value);
    }
}
const classObject = computed(() => {
    return input.value.name.val != '' ? "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-green-500"
        : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
})

</script>

<template>
    <div class="mb-6">
        <span class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Name of problem want to add <span
                class="text-red-500">*</span>
            <input :maxlength="30" type="text" v-bind:class="classObject" placeholder=""
                v-model="input.name.val"></span>



    </div>
    <label for="success" class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Description for the
        problem <span class="text-red-500">*</span></label>
    <vmdeditor v-model="input.description.val" />

    <buttonPage class="" :pages="1" @page="(e1) => { valuetoaddpage(e1) }"></buttonPage>
</template>

<style></style>
