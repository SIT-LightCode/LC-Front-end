<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import Paginator from 'primevue/paginator';
import { MqResponsive } from "vue3-mq";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


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
const clickEvent = (data) => {


  Swal.fire({
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Edit",
    confirmButtonColor: "#23A203",
    cancelButtonColor: "#A21F03",
    denyButtonColor: '#0357A2',
    denyButtonText: `Delete`,
    cancelButtonText: `Cancel`
  }).then((result) => {
    if (result.isConfirmed) {
      emit('editUser', data)
    } else if (result.isDenied) {
      emit('deleteUser', data.id)
    }
  });
};


</script>

<template>
  <div class="">
    <DataTable v-model:selectionKeys="selectedKey" :value="props.listData" paginator :rows="10"
      tableStyle="min-width: 50rem;"
      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <Column field="name" header="Name" ></Column>
      <Column field="email" header="Email" ></Column>
      <Column field="authorities" header="Authorities" ></Column>
      <Column field="score" header="Score" ></Column>
      <Column >
        <template #body={data}>
          <buttonVue class="bg-red-300 hover:bg-red-400" @buttonClick="$emit('deleteUser', data.id)" :name="'Delete'">
          </buttonVue>
        </template>
      </Column>
      <Column>
        <template #body={data}>
          <buttonVue class="bg-blue-300 hover:bg-blue-400" @buttonClick="$emit('editUser', data);"
            :status="false" :name="'Edit'">
          </buttonVue>
        </template>
      </Column>
    </DataTable>
  </div>

</template>

<style scoped></style>