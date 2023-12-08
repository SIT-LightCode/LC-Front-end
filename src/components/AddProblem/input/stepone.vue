<script setup>
import vmdeditor from '../../Learning/vmdeditor.vue';;
import { modalSwal } from "../../../stores/modal.js";
import { ref, computed } from "vue";

const emit = defineEmits(['namedescription'])
const mymodal = modalSwal()

// const input = ref({ 
//     name: '', description: '' 
// })
const input = ref({ name: { type: 'name', val: '' }, description: { type: 'description', val: '' } }
)
const checkValue = () => {
    let errorText = ""
    if (input.value.name.val == "" || input.value.name.val > 255) {
        errorText = errorText + "\n Error Content: Dont has value for name"
    }
    if (input.value.description.val == "") {
        errorText = errorText + "\n Error Name: input value description "
    }
    if (errorText != "") {
        mymodal.modalNormal("Error", errorText, "error")
        return false
    } else return true
}


const valuetoaddpage = async () => {
    await mymodal.modalTwoฺButton("Are you sure ?", "Are you sure to continue next page", "continue it").then((result) => {
        if (result) {
            if (checkValue()) {
                emit('namedescription', input.value,1);
            }
        }
    })

}
const classObject = computed(() => {
    return input.value.name.val != '' ? "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
})

</script>
 
<template>
    <div class="mb-6">
        <label for="success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Name of problem want
            to create *</label>


        <input type="text" id="error" v-bind:class="classObject" placeholder="input pls" v-model="input.name.val">

    </div>
    <label for="success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Description for the
        problem * </label>
    <vmdeditor v-model="input.description.val" />
    <button @click="valuetoaddpage()">Next</button>
</template>
 
<style></style>
