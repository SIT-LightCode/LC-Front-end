<script setup>
import ResultPage from './ResultPage.vue'
import { StarOutlined } from '@ant-design/icons-vue'
import ContextMenu from 'primevue/contextmenu'
import Card from 'primevue/card'

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
const levelArray = [
  ['Beginner', 'text-[#2dc937]'],
  ['Easy', 'text-[#99c140]'],
  ['Medium', 'text-[#e7b416]'],
  ['Hard', 'text-[#db7b2b]'],
  ['Expert', 'text-[#cc3232]'],
]

const returnLevel = (id) => {
  if (levelArray[id - 1] != undefined) {
    return levelArray[id - 1][0]
  }
}
</script>

<template>
  <Card style="">
    <template #header> </template>
    <template #title>
      <span>
        <span
          v-if="prop.data.level > 0 && prop.data.level < 6"
          :class="levelArray[prop.data.level - 1]"
          >{{ returnLevel(prop.data.level) }}
        </span>
        <span class="px-5"> {{ prop.data.name }} </span>
      </span>
    </template>
    <!-- <template #subtitle>
      <p v-if="prop.data.level > 0 && prop.data.level < 6" :class="levelArray[prop.data.level - 1]">
        {{ returnLevel(prop.data.level) }}
      </p>
    </template> -->
    <template #content>
      <p>
        <span
          v-for="t in data.tagProblem"
          class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 text-gray-800"
          :class="colorTags[(t.tag.id - 1) % 8]"
          >{{ t.tag.topic }}
        </span>
      </p>

      <p class="m-0">
        <v-md-preview :text="prop.data.description"></v-md-preview>
      </p>
    </template>
    <template #footer>
      <div class="grid grid-row">
        <div
          v-for="(example, index) in prop.data.example"
          class="border-2 rounded-lg py-5 items-center mx-1 text-xs"
        >
          <div>
            <div class="p-2">
              <b>Example {{ index + 1 }} : </b>
            </div>
          </div>
          <div>
            <div v-for="(i, key) in JSON.parse(example.input)" class="p-2">
              parameters {{ key }} : {{ i }}
            </div>
          </div>
          <div>
            <span class="p-5">Output:</span>
            {{ example.output }}
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style></style>
