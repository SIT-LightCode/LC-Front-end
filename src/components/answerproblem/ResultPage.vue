<script setup>
import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount } from "vue";
const emit = defineEmits([ 'addstatus' , 'Submit'])
const prop = defineProps({
    data: {
        type: Object,
    }
})
</script>
 
<template>
<buttonvue class="" @buttonClick="$emit('addstatus', '')" :name="'Back'"></buttonvue>


<div>
    <ul>
      <li v-for="(value, key) in prop.data" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>


</template>
 
<style>

</style>
