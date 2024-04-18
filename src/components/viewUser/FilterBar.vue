<script setup>
import { ref } from 'vue'
import buttonVue from '../button/Button.vue';
const emit = defineEmits(["filterValue"])
const prop = defineProps({
        datas: Object,
})
const filterValue = ref({ keyword: "", type: "" })

const resetFilter = () => {
        filterValue.value.keyword = "";
        filterValue.value.type = "";
        emit('filterValue', filterValue.value);
   
}

</script>

<template>
        <div class="grid grid-cols-3 gap-4 border-2 rounded-lg p-5 m-5 ">
                <div>
                        <label for="underline_select" class="block text-sm font-medium text-gray-900 dark:text-white">
                                Search</label>
                        <input type="text" class="w-full" v-model="filterValue.keyword" />
                </div>
                <div>
                        <label for="underline_select" class="block text-sm font-medium text-gray-900 dark:text-white">
                                Authorities</label>

                      
                        <select id="underline_select"
                                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                v-model="filterValue.type">
                                <option value="0">No select</option>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>

                        </select>
                </div>
                <div>
                      
                        <buttonVue class="bg-red-300 hover:bg-red-400" @buttonClick=" resetFilter" :name="'Reset'">
                        </buttonVue>
                        <buttonVue class="bg-blue-300 hover:bg-blue-400" @buttonClick="$emit('filterValue', filterValue);"
                                :status="false" :name="'Filter'">
                        </buttonVue>
                </div>
        </div>
</template>

<style></style>
