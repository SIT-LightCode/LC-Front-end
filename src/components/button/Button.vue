<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { modalSwal } from '../../stores/Modal.js'
import Button from 'primevue/button';

const mymodal = modalSwal()

const emit = defineEmits(['buttonClick'])

const prop = defineProps({
  name: String,
  status: { type: Boolean, default: true }
})
// ใช้เป็นอันนี้ไปก่อนนะเดียวหา modal ใส่ให้
const clickFunc = async () => {
  if(prop.status){
    await mymodal
    .modalTwoButton('Are you sure?', 'Are you sure to ' + prop.name, prop.name)
    .then((result) => {
      if (result) {
        emit('buttonClick', true)
      }
    })  
  }else {
    emit('buttonClick', true)
  }
  
}
</script>

<template>
  <button 
    class="text-sm/[10px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 m-1 rounded-full"
    @click="clickFunc()"
  >
{{ name }}
  </button>
</template>

<style></style>
