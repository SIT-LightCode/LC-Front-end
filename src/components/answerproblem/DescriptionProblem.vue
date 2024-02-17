<script setup>
import ResultPage from './ResultPage.vue'
import { StarOutlined } from '@ant-design/icons-vue'

const prop = defineProps({
  data: {
    type: Object,
  },
  result: {
    type: Object,
  },
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
  <div class="border-2 rounded-lg p-5 m-5">
    <div>
      <h1>Name : {{ prop.data.name }}</h1>
      <h2>
        Level :
        <span v-for="level in prop.data.level">
          <StarOutlined />
        </span>
      </h2>
      <h2>
        Tag :
        <span
          v-for="t in data.tagProblem"
          class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
          :class="colorTags[(t.tag.id - 1) % 8]"
          >{{ t.tag.topic }}
        </span>
      </h2>
    </div>
    <div>
      <h1>Description</h1>
      <v-md-preview :text="prop.data.description"></v-md-preview>
    </div>
    <div>
      <div
        v-for="(example, index) in prop.data.example"
        class="border-2 rounded-lg p-5 items-center m-5"
      >
        <div>
          <span class="m-5">Example: {{ index + 1 }}</span>
        </div>
        <div>
          <span class="p-5 m-5">Input:</span> <span class="p-5">{{ example.input }}</span>
        </div>
        <div>
          <span class="p-5 m-5">Output:</span>
          <span class="p-5" v-html="example.output.replace(/\n/g, '<br />')"></span>
        </div>
      </div>
    </div>
    <ResultPage
      v-if="prop.result != {}"
      :data="prop.result"
      class="border-2 rounded-lg p-5 m-5"
    ></ResultPage>
  </div>
</template>

<style></style>
