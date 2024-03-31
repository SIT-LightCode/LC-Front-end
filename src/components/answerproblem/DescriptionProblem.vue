<script setup>
import ResultPage from './ResultPage.vue'
import { StarOutlined } from '@ant-design/icons-vue'
import ContextMenu from 'primevue/contextmenu';
import Card from 'primevue/card';

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
  <Card style=" "  >
    <template #header>
    </template>
    <template #title>{{ prop.data.name }}</template>
    <template #subtitle> <span v-for="level in prop.data.level">
        <StarOutlined />
      </span></template>
    <template #content>
      <p> <span v-for="t in data.tagProblem"
          class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
          :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }}
        </span></p>

      <p class="m-0">
        <v-md-preview :text="prop.data.description"></v-md-preview>
      </p>
    </template>
    <template #footer>
      <div class="grid grid-row">
        <div v-for="(example, index) in  prop.data.example " class="border-2 rounded-lg py-5 items-center mx-1 ">
          <div>
            <span class="m-5">Example {{ index + 1 }} : </span>
          </div>
          <div>
            <span v-for="i, key in JSON.parse(example.input)  " class="p-5">
              parameters {{ key }} : {{ i }} </span>
          </div>
          <div>
            <span class="p-5">Output:</span>
            <span >{{ example.output }}</span>
          </div>

        </div>
      </div>
    </template>
  </Card>
</template>

<style></style>
