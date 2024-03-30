<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';
import Paginator from 'primevue/paginator';
import { MqResponsive } from "vue3-mq";
import Swal from 'sweetalert2/dist/sweetalert2.js'
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

const indexShow = ref(null)
function hoverDetail(index) {
  if (index === indexShow.value) {
    indexShow.value = null
  } else
    indexShow.value = index
}



const user = JSON.parse(localStorage.getItem('user'))

const colorTags = ['bg-[#ff6961]', 'bg-[#ffb480]', 'bg-[#f8f38d]', 'bg-[#42d6a4]', 'bg-[#08cad1]', 'bg-[#59adf6]', 'bg-[#9d94ff]', 'bg-[#c780e8]']
const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
  if (levelArray[id - 1] != undefined) {
    return levelArray[id - 1][0]
  }
}


const clickEvent = (i) => {
  let isDen = user.authorities.includes('ADMIN') || user.id == i.user.id
  let isCan = user.authorities.includes('ADMIN') || user.id == i.user.id


  Swal.fire({
    title: "Do you want to?",
    showDenyButton: isDen,
    showCancelButton: isCan,
    confirmButtonText: "Do",
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

</script>

<template>


  <div>

    <MqResponsive group>

      <template #xs>
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
            <p class=" invisible lg:visible">create by: {{ i.user.name }}</p>
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

      <template #sm>
        <p class="grid grid-cols-2  ">
        <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
          v-for="(i, index) in paginatedData"
          :class="`hover:cursor-pointer rounded-lg text-black w-72 m-5 p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-200 z-[200000]` : ` bg-white h-[200px]`)">
          <div @click="clickEvent(i)">
            <p class="text-3xl">{{ i.name }}</p>
            <p>Score: {{ i.totalScore }}</p>
            <p>Official: {{ i.totalScore }}</p>
            <p v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]">difficulty: {{ returnLevel(i.level) }}
            </p>
            <p class=" invisible lg:visible">create by: {{ i.user.name }}</p>
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
      <template #md-xxl>
        <p class="grid grid-cols-3 ">
        <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
          v-for="(i, index) in paginatedData"
          :class="`hover:cursor-pointer rounded-lg text-black w-72 m-5 p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-200 z-[200000]` : ` bg-white h-[200px]`)">
          <p class="text-2xl">{{ i.name }}</p>
          <p>Score: {{ i.totalScore }}</p>
          <p>Official: {{ i.totalScore }}</p>
          <p v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]">difficulty: {{ returnLevel(i.level) }}
          </p>
          <p class=" invisible lg:visible">create by: {{ i.user.name }}</p>
          <div class="line-clamp-4" v-if="index === indexShow">
            <p>
              Tag :
              <span v-for="t in i.tagProblem"
                class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
                :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }}
              </span>
            </p>

          </div>
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
        </div>
        </p>


      </template>
    </MqResponsive>

  </div>


  <div class="p-5">


    <Paginator v-model:first="pageNumber" rows="1" :totalRecords="pageCount" v-if="pageCount !== 0" :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown '
          }">
    </Paginator>
  </div>

</template>

<style scoped></style>