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
  
    <div class="p-5 bg-white rounded-3xl flex flex-col gap-4 text-lg drop-shadow-2xl">
      <div class="grid grid-cols-6 border-b-2 pb-2">
        <p class="text-st-blue">Name</p>
        <p class="text-st-blue">Email</p>
        <p class="text-st-blue">Authorities</p>
        <p class="text-st-blue">Score</p>
        <p class="text-st-blue"></p>
        <p class="text-st-blue"></p>
      </div>
      <div v-for="user in paginatedData" class="grid grid-cols-6 pl-1" @click="$emit('doProblem', user)">
        <p class="truncate ">{{ user.name }}</p>
        <p class="truncate ">{{ user.email }}</p>
        <p class="truncate ">{{ user.authorities }}</p>
        <p class="truncate ">{{ user.score }}</p>
        <p>
          <buttonVue class="bg-red-300 hover:bg-red-400" @buttonClick="$emit('deleteUser', user.id)" :name="'Delete'">
          </buttonVue>
        </p>
        <p>
          <buttonVue class="bg-blue-300 hover:bg-blue-400" @buttonClick="$emit('editUser', user);" :status="false"
            :name="'Edit'">
          </buttonVue>
        </p>
      </div>

      <Paginator v-model:first="pageNumber" rows="1" :totalRecords="pageCount" v-if="pageCount !== 0" :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
    }">
      </Paginator>
    </div>

  </div>

</template>

<style scoped></style>