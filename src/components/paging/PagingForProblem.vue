<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';
import Paginator from 'primevue/paginator';
import Menu from 'primevue/menu';
import { MqResponsive } from "vue3-mq";
import Card from 'primevue/card';

const emit = defineEmits(['doProblem', 'deleteProblem', 'editProblem'])
const props = defineProps({
  listData: {
    type: Object,
    required: true,
    default: {}
  },
  size: {
    type: Number,
    required: false,
    default: 5
  }
})
const myAccount = account()

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


const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Export',
        icon: 'pi pi-upload'
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const user = JSON.parse(localStorage.getItem('user'))

const colorTags = ['bg-[#ff6961]', 'bg-[#ffb480]', 'bg-[#f8f38d]', 'bg-[#42d6a4]', 'bg-[#08cad1]', 'bg-[#59adf6]', 'bg-[#9d94ff]', 'bg-[#c780e8]']
const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
  if (levelArray[id - 1] != undefined) {
    return levelArray[id - 1][0]
  }
}
</script>

<template>



  <div>
    <div class="grid grid-cols-3 ">
      <Card  v-for="i in paginatedData" class="p-2"
        v-if="pageCount != 0">
        <template #title> {{ i.name }}</template>
        <template #subtitle>
          <div v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]"> Difficulty: {{
          returnLevel(i.level) }}
          </div>
        </template>
        <template #content>
          <p class="m-0">
            <div> Scroce: {{ i.totalScore }}</div>
            <MqResponsive group>
              <template #lg-xxl>
                <div> Official Problem: {{ i.isOfficial }}</div>
                <div> Problem Create: {{ i.user.name }}</div>
               
              </template>
            </MqResponsive>
          </p>
        </template>
        <template #footer>
          <div class="flex gap-3 mt-1">

            <buttonVue @buttonClick="() => $emit('doProblem', i)" :name="'do'">
            </buttonVue>
            <buttonVue v-if="user.authorities.includes('ADMIN') || user.id == i.user.id"
              @buttonClick="() => $emit('deleteProblem', i.id)" :name="'delete'">
            </buttonVue>
            <buttonVue v-if="user.authorities.includes('ADMIN') || user.id == i.user.id"
              @buttonClick="() => $emit('editProblem', i)" :name="'edit'">
            </buttonVue>
          </div>
        </template>
      </Card>

      <div v-else-if="pageCount == 0">
        <span class="inline-block align-top ..."> Dont have any problems </span>
      </div>
    </div>
   <div class="card">
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