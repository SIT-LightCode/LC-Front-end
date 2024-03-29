<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import Paginator from 'primevue/paginator';

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



const nextPage = () => {
  pageNumber.value++;
}

const prevPage = () => {
  pageNumber.value--;
}
const user = JSON.parse(localStorage.getItem('user'))


</script>

<template>
  <div>

    <table>
      <tr class="p-5">
        <th> Name </th>
        <td> Email </td>
        <td> Authorities </td>
        <td> Score </td>
      </tr>
      <tr v-for="i in paginatedData" class="p-5 m-4 text-base">
        <th> {{ i.name }} </th>
        <td> {{ i.email }} </td>
        <td> {{ i.authorities }} </td>
        <td> {{ i.score }} </td>
        <div class="flex justify-end m-5">
          <buttonVue @buttonClick="() => $emit('deleteUser', i.id)" :name="'delete'">
          </buttonVue>
          <buttonVue @buttonClick="() => $emit('editUser', i)" :name="'edit'">
          </buttonVue>
        </div>
      </tr>
    </table>

    <Paginator v-model:first="pageNumber" rows="1" :totalRecords="pageCount" :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
    }">
      </Paginator>


  </div>
</template>

<style scoped></style>