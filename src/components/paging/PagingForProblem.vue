<script setup>
import { ref, computed, onBeforeMount } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';
import Paginator from 'primevue/paginator';
import { MqResponsive } from "vue3-mq";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Image from 'primevue/image';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { problemCon } from '../../stores/ProblemCon';
import 'primeicons/primeicons.css'
import { useRoute, useRouter } from 'vue-router'


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
const myProblem = problemCon()
const route = useRoute
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

const indexShow = ref(null)
function hoverDetail(index) {
  if (index === indexShow.value) {
    indexShow.value = null
  } else
    indexShow.value = index
}



const user = ref()

const colorTags = ['bg-[#ff6961]', 'bg-[#ffb480]', 'bg-[#f8f38d]', 'bg-[#42d6a4]', 'bg-[#08cad1]', 'bg-[#59adf6]', 'bg-[#9d94ff]', 'bg-[#c780e8]']
const levelArray = [['Easier', 'text-green-400'], ['Beginner', 'text-st-green'], ['Medium', 'text-[#FEC84B]'], ['Hard', 'text-st-red'], ['Expert', 'text-red-400'],]

const returnLevel = (id) => {
  if (levelArray[id - 1] != undefined) {
    return levelArray[id - 1][0]
  }
}

const checkproblem = (id) => {
  for (let i in myProblem.problemResolved) {
    if (myProblem.problemResolved[i].problem.id == id) {
      return true
    }
  }

}

const clickEvent = (i) => {
  let isDen = user.authorities.includes('ADMIN') || user.id == i.user.id
  let isCan = user.authorities.includes('ADMIN') || user.id == i.user.id


  Swal.fire({
    showDenyButton: isDen,
    showCancelButton: isCan,
    confirmButtonText: "Do",
    confirmButtonColor: "#23A203",
    cancelButtonColor: "#A21F03",
    denyButtonColor: '#0357A2',
    denyButtonText: `Delete`,
    cancelButtonText: `Edit`
  }).then((result) => {

    if (result.isConfirmed) {
      emit('doProblem', i)
    } else if (result.isDenied) {
      emit('deleteProblem', i.id)
    } else if (result.dismiss === 'cancel') {
      emit('editProblem', i)
    }
  });
};

const selectedData = ref();
const metaKey = ref(true);
const returnType = (Official, ownid) => {
  if (ownid == user.value.id) {
    return 'Myself'
  } else {
    if(Official) {
      return 'System'
    }
    else return 'Community'
  }
}
onBeforeMount(()=>{
  user.value = JSON.parse(localStorage.getItem('user'))

})

</script>

<template>


  <div class="">

    <!-- <MqResponsive group>

      <template #xs-sm>
        <p class="grid grid-cols-1  ">
        <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
          v-for="(i, index) in paginatedData"
          :class="`hover:cursor-pointer rounded-lg text-black w-72 m-5 p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-200 z-[200000]` : ` bg-white h-[200px]`)">
          <div @click="clickEvent(i)">
            <p class="text-3xl">{{ i.name }}</p>
            <p>Score: {{ i.totalScore }}</p>
            <p>Official: {{ i.totalScore }}</p>
            <p v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]">difficulty: {{ returnLevel(i.level) }}
            </p>
            <div class="line-clamp-4" v-if="index === indexShow">
              <p>
                Tag :
                <span v-for="t in i.tagProblem"
                  class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
                  :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }}
                </span>
              </p>
            </div>
          </div>
        </div>
        </p>

      </template>

<template #md-lg>
        <p class="grid grid-cols-2 ">
        <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
          v-for="(i, index) in paginatedData"
          :class="`hover:cursor-pointer rounded-lg text-black w-72 m-5 p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-200 z-[200000]` : ` bg-white h-[200px]`)">
          <div @click="clickEvent(i)">
            <p class="text-3xl">{{ i.name }}</p>
            <p>Score: {{ i.totalScore }}</p>
            <p>Official: {{ i.isOfficial }}
            </p>
            <p v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]">difficulty: {{ returnLevel(i.level) }}
            </p>
            <div class="line-clamp-4" v-if="index === indexShow">
              <p>
                Tag :
                <span v-for="t in i.tagProblem"
                  class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
                  :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }}
                </span>
              </p>
            </div>
          </div>
        </div>
        </p>
      </template>
<template #xl-xxl>
        <p class="flex flex-wrap">
        <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
          v-for="(i, index) in paginatedData"
          :class="`hover:cursor-pointer rounded-lg text-black w-72 m-5 p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-200 z-[200000]` : ` bg-white h-[200px]`)">
          <div @click="$emit('doProblem', i)">
            <p class="text-2xl truncate ">{{ i.name }}</p>
            <p>Score: {{ i.totalScore }}</p>
            <p>Official: {{ i.isOfficial }}
            </p>
            <p v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]">difficulty: {{ returnLevel(i.level) }}
            </p>
            <p class=" ">create by: {{ i.user.name }}</p>
            <div class="line-clamp-4" v-if="index === indexShow">
              <p>
                Tag :
                <span v-for="t in i.tagProblem"
                  class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
                  :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }}
                </span>
              </p>

            </div>
          </div>

          <div class="flex gap-3 mt-1">
            <buttonVue @buttonClick="() => $emit('doProblem', i)" :status="false" :name="'do'">
            </buttonVue>
            <buttonVue v-if="user.authorities.includes('ADMIN') || user.id == i.user.id"
              @buttonClick="() => $emit('deleteProblem', i.id)" :name="'delete'">
            </buttonVue>
            <buttonVue v-if="user.authorities.includes('ADMIN') || user.id == i.user.id"
              @buttonClick="() => $emit('editProblem', i)" :status="false" :name="'edit'">
            </buttonVue>
          </div>
        </div>
        </p>


      </template>
</MqResponsive> -->

    <div class="p-5 rounded-3xl flex flex-col gap-4 text-base	">
      <div class="grid grid-cols-5 border-b-2 pb-2 text-center">
        <p class="text-st-blue">Name</p>
        <p class="text-st-blue">Created by</p>
        <p class="text-st-blue">Score</p>
        <p class="text-st-blue">Difficulty</p>
        <p class="text-st-blue">Submitted</p>
      </div>
      <button v-for="problem in paginatedData"
        class="grid grid-cols-5 p-1  rounded-lg	hover:bg-gray-100 text-base	text-center"
        @click="$emit('doProblem', problem)">
        <p class="truncate ">{{ problem.name }}</p>
        <p class="truncate ">{{ returnType(problem.isOfficial, problem.user.id) }}</p>
        <p class="truncate ">{{ problem.totalScore }}</p>
        <p class="truncate " :class="levelArray[problem.level - 1]">{{ returnLevel(problem.level) }}</p>
        <p class="truncate pi pi-check 	 " v-if="checkproblem(problem.id)"> </p>
      </button>

      <Paginator v-model:first="pageNumber" rows="1" :totalRecords="pageCount" v-if="pageCount !== 0" :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
    }">
      </Paginator>
    </div>

    <!-- <div class="card">

      <DataTable v-model:selection="selectedData" @row-dblclick="$emit('doProblem', selectedData)"
        :value="paginatedData" selectionMode="single" paginator :rows="10" tableStyle="min-width: 50rem;"
        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
        currentPageReportTemplate="{first} to {last} of {totalRecords}" :metaKeySelection="metaKey" dataKey="id">
        <Column field="name" header="Name"></Column>
        <Column field="isOfficial" header="Offcial Problem"></Column>
        <Column field="totalScore" header="Score"></Column>
        <Column field="level" header="Difficulty">
          <template #body="slotProps">
            <p v-if="slotProps.data.level > 0 && slotProps.data.level < 6"
              :class="levelArray[slotProps.data.level - 1]">{{ returnLevel(slotProps.data.level) }}
            </p>
          </template>
        </Column>
      </DataTable>
    </div> -->


  </div>

</template>

<style scoped>
#logo {
  color: #007AFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Rampart One";
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  /* 28.125% */
}
</style>