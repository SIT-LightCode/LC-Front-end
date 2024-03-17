<script setup>
import { ref, computed } from "vue"
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account';

const emit = defineEmits(['doProblem', 'deleteProblem','editProblem'])
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



const nextPage = () => {
  pageNumber.value++;
}

const prevPage = () => {
  pageNumber.value--;
}

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
    <div class="grid grid-cols-3 gap-3 ">

    <div v-for="i in paginatedData" class="border  rounded-lg border-zinc-950">
      <div
        class="block h-64 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
        <div class="p-6 ">
          <h5 class="mb-1 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {{ i.name }}
          </h5>

          <p class="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
          <div class="mb-4 text-base">
            <div> Scroce: {{ i.totalScore }}</div>
            <div v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]"> Difficulty: {{
      returnLevel(i.level) }}
            </div>
            <div> Official Problem: {{ i.isOfficial }}</div>
            <div> Problem Create: {{ i.user.name }}</div>

          </div>
          </p>
          <span v-for="t in i.tagProblem"
            class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4  text-gray-800"
            :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }} </span>
        </div>
      </div>
      <div class="flex justify-end m-5">
        <buttonVue @buttonClick="() => $emit('doProblem', i)" :name="'do'">
        </buttonVue>
        <buttonVue v-if="myAccount.user.authorities.includes('ADMIN') || myAccount.user.id == i.user.id"
          @buttonClick="() => $emit('deleteProblem', i.id)" :name="'delete'">
        </buttonVue>
        <buttonVue v-if="myAccount.user.authorities.includes('ADMIN') || myAccount.user.id == i.user.id"
          @buttonClick="() => $emit('editProblem', i)" :name="'edit'">
        </buttonVue>
      </div>
    </div>
</div>
    <buttonVue v-show="!(pageNumber === 0)" @buttonClick="prevPage" :status="false" :name="'Previous'">

    </buttonVue>
    <buttonVue v-show="!(pageNumber === pageCount - 1 || pageCount === 0)" @buttonClick="nextPage" :status="false"
      :name="'Next'">

    </buttonVue>
  </div>
</template>

<style scoped></style>