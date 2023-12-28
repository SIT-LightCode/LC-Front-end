<script setup>
import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount } from "vue";
const emit = defineEmits(['addstatus'])
const prop = defineProps({
  data: {
    type: Object,
  }
})


</script>
 
<template>
  <div>
    <ul>
      <li v-for="(value, key) in prop.data" :key="key">
        {{ key }}:
        <div v-for="v in value">
          {{ v.message }}
         <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
         :class="[v.status=='failed'?'bg-[#ff6961]': 'bg-[#42d6a4]' ]">{{ v.status }}</div> 
        </div>

      </li>
    </ul>
  </div>
</template>
 
<style></style>