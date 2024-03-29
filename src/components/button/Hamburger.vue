<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { modalSwal } from '../../stores/Modal.js'
import IconHamberger from '../icons/IconHamberger.vue'
const mymodal = modalSwal()

const emit = defineEmits(['buttonClick'])


// ใช้เป็นอันนี้ไปก่อนนะเดียวหา modal ใส่ให้
const clickFunc = async () => {
  await Swal.fire({
    title: 'Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋Left sidebar 👋',
    position: 'top-start',
    showClass: {
      popup: `
      animate__animated
      animate__fadeInLeft
      animate__faster
    `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutLeft
      animate__faster
    `,
    },
    grow: 'column',
    width: 300,
    showConfirmButton: false,
    showCloseButton: true,
  })

  
}
</script>

<template>
  
  <button
    class="  font-bold   rounded"
    @click="clickFunc()"
  >
    <IconHamberger/>
  </button>
</template>

<style></style>
