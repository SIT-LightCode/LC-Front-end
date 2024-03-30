<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import Paginator from 'primevue/paginator';
import { MqResponsive } from "vue3-mq";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const emit = defineEmits(['deleteUser', 'editUser'])
const props = defineProps({
  listData: {
    type: Array,
    required: true,
    default: []
  },
  size: {
    type: Number,
    required: false,
    default: 5
  }
})
const pageNumber = ref(0)
const pageCount = computed(() => {
  let l = props.listData.length,
    s = props.size;
  return Math.ceil(l / s);
})
const paginatedData = computed(() => {
  if (props.listData.length > 0) {
    const start = pageNumber.value * props.size,
      end = start + props.size;
    return props.listData.slice(start, end);
  }
  return 0

})

const selectedUser = ref();


</script>

<template>
<MqResponsive group>

<template #xs>
 

</template>

<template #sm>
 
</template>
<template #md-xxl>
  <div>
    <DataTable v-model:selectionKeys="selectedKey" :value="props.listData" paginator :rows="10"
      tableStyle="min-width: 50rem;"
      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <Column field="name" header="Name" sortable style="width: 25%"></Column>
      <Column field="email" header="Email" sortable style="width: 25%"></Column>
      <Column field="authorities" header="Authorities" sortable style="width: 25%"></Column>
      <Column field="score" header="Score" sortable style="width: 25%"></Column>
      <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center;">
        <template #body={data}>
          <buttonVue @buttonClick="() => $emit('deleteUser', data.id)" :name="'delete'">
          </buttonVue>
        </template>
      </Column>
      <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; ">
        <template #body={data}>
          <buttonVue @buttonClick="() =>  $emit('editUser', data)" :name="'edit'">
          </buttonVue>
        </template>
      </Column>
    </DataTable>

  </div>


</template>
</MqResponsive>








  
</template>

<style scoped></style>