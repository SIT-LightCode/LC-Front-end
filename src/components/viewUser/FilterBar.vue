<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue';
const emit = defineEmits(["filterValue"])
const prop = defineProps({
	datas: Object,
})
const filterValue = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })

</script>
 
<template >
        <div style="overflow-y: auto; max-height: 100vh" class="border-2 rounded-lg p-5 m-5 ">
                
                <input type="text" />
                
                <label for="underline_select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Authorities
                </label>
                <select id="underline_select"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        v-model="filterValue.level">
                        <option value="0">No select</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>

                </select>
                <ul class="p-5">
                        
                </ul>
                <buttonVue @buttonClick="$emit('filterValue', filterValue);" :name="'filter'"></buttonVue>
        
        </div>
</template>
 
<style></style>
