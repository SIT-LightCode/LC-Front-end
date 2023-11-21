<script setup>


const emit = defineEmits(['isClick', 'value'])

const prop = defineProps({
    name: String,
})
// ใช้เป็นอันนี้ไปก่อนนะเดียวหา modal ใส่ให้
const clickFunc = () => {
    if (confirm('Do you confirm to delete it?') == true) {
     emit('isClick',"true");
    }
}


</script>
 
<template>
    <button class="w3-bar-item w3-button w3-gray w3-padding-16" @click="clickFunc()"> {{ name }} </button>
</template>
 
<style></style>