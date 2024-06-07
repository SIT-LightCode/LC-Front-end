<script setup>
import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount, computed } from "vue";
const emit = defineEmits(['addstatus','hint'])
const prop = defineProps({
  data: {
    type: Object,
  },
  status:{
    type: Boolean,
    default:false
  },
  dataProblem:{
    type: Object
  }
})

const countFailedTestCases = computed(() => {
  if (prop.data.testcaseResults) {
    return prop.data.testcaseResults.reduce((count, testCase) => {
      return count + (testCase.status === 'failed' ? 1 : 0);
    }, 0);
  }
  else return null
})

const countCorrectTestCases = computed(() => {
  if (prop.data.testcaseResults) {
    return prop.data.testcaseResults.reduce((count, testCase) => {
      return count + (testCase.status !== 'failed' ? 1 : 0);
    }, 0);
  }
  else return null
})

const colorTags = [
  'bg-[#ff6961]',
  'bg-[#ffb480]',
  'bg-[#f8f38d]',
  'bg-[#42d6a4]',
  'bg-[#08cad1]',
  'bg-[#59adf6]',
  'bg-[#9d94ff]',
  'bg-[#c780e8]',
]

</script>

<template>
  <div v-if="prop.data.testcaseResults">
    <p class="mb-5">
    <h3 class="text-3xl font-semibold">
      <div v-for="(v, key) in prop.data.exampleResults">
        <span class="text-xl font-semibold"> Testcase {{ key + 1 }} : {{ v.message }}
          <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
            :class="[v.status == 'failed' ? 'bg-[#ff6961]' : 'bg-[#42d6a4]']">{{ v.status }}</div>
        </span>
      </div>
    </h3>
    </p>
    <p class="mb-5">
    <div class="text-xl font-semibold">
      Number of testcases passed :
      <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800 bg-[#ff6961]">
        Failed </div> {{ countFailedTestCases }}
      <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800 bg-[#42d6a4]">
        Correct </div> {{ countCorrectTestCases }}
    </div>
    </p>
    <div v-if="prop.status && prop.data.testcaseResults.length == countCorrectTestCases">
      You want to continue problem in high level?
      <buttonvue v-if ="prop.dataProblem.level < 5" class="bg-gray-300" @buttonClick="$emit('addstatus', false)" :status="false" :name="'Exit'"></buttonvue>
      <buttonvue v-if ="prop.dataProblem.level == 5" class="bg-blue-300" @buttonClick="$emit('addstatus', true)" :status="false" :name="'End Pretest'"></buttonvue>
      <buttonvue v-else class="bg-blue-300" @buttonClick="$emit('addstatus', true)" :status="false" :name="'Continue'"></buttonvue>
    </div>
    <!-- Hint: 
      <div v-for="t in prop.dataProblem.tagProblem" @click="$emit('hint', t.tag.id)"
          class="inline-flex items-center px-3 rounded-full m-2 text-xs font-medium leading-4 text-gray-800"
          :class="colorTags[(t.tag.id - 1) % 8]">
        {{ t.tag.topic  }}
      </div> -->
    <!-- <div v-if="prop.data.testcaseResults.length > countCorrectTestCases">
      Hint:
      <div v-for="i in prop.dataProblem.tag">{{ i  }}</div>
    </div> -->

  </div>
</template>

<style></style>
