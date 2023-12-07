<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { modalSwal } from "../../stores/modal.js";
const mymodal = modalSwal();

const emit = defineEmits(['buttonClick'])

const prop = defineProps({
    name: String,
})
// ใช้เป็นอันนี้ไปก่อนนะเดียวหา modal ใส่ให้
const clickFunc = async () => {
    await mymodal.modalTwoฺButton("Are you sure?", "Are you sure to " + prop.name, prop.name).then((result) => { 
        if (result) {
            emit('buttonClick', true);
        }
    })
}

</script>
 
<template>
    <button class="border-5" @click="clickFunc()"> {{ name }} </button>
</template>
 
<style></style>