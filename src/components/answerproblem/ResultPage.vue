<script setup>
import buttonvue from '../button/Button.vue'
import { ref, onBeforeMount, computed } from "vue";
const emit = defineEmits(['addstatus'])
const prop = defineProps({
  data: {
    type: Object,
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

</script>
 
<template >
  <div v-if="prop.data.testcaseResults">
    <div>
      exampleResults :
      <div v-for="v in prop.data.exampleResults">
        {{ v.message }}
        <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
          :class="[v.status == 'failed' ? 'bg-[#ff6961]' : 'bg-[#42d6a4]']">{{ v.status }}</div>
      </div>
    </div>
    <div>
      testcaseResults :
      <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800 bg-[#ff6961]">
        Failed </div> {{ countFailedTestCases }}
      <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800 bg-[#42d6a4]">
        Correct </div> {{ countCorrectTestCases }}
      <!-- <div v-for="v in  prop.data.testcaseResults">
      {{ v.message }}
      <div class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
        :class="[v.status == 'failed' ? 'bg-[#ff6961]' : 'bg-[#42d6a4]']">{{ v.status }}</div>
    </div> -->
    </div>
  </div>
</template>
 
<style></style>
