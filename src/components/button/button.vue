<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import vmdeditor from "../Learning/vmdeditor.vue"

const emit = defineEmits(['isClick', 'value'])

const prop = defineProps({
    name: String,
})
// ใช้เป็นอันนี้ไปก่อนนะเดียวหา modal ใส่ให้
const clickFunc = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            emit('isClick', "true");
        }
    });
}

</script>
 
<template>
    <button class="w3-bar-item w3-button w3-gray w3-padding-16" @click="clickFunc()"> {{ name }} </button>
</template>
 
<style></style>