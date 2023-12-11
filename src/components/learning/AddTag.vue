<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import * as gql from 'gql-query-builder'

const emit = defineEmits(['addfunc'])

const props = defineProps({
  tagData: Object, // Pass existing tag data for editing, if any
  type: String, // 'Add' or 'Edit'
  List: Object,
})

const topic = ref(props.tagData?.topic || '')
const description = ref(props.tagData?.description || '')
const tagId = ref(null)

const submitTag = () => {
  console.log(tagId.value)
  let type = ''
  if (tagId.value > 0) {
    type = 'Edit'
  } else if (tagId.value == null) {
    type = 'Add'
    tagId.value = null
  }

  let query = gql.mutation({
    operation: 'upsertTag',
    variables: {
      tagInput: {
        value: {
          id: Number(tagId.value),
          topic: topic.value,
          description: description.value,
        },
        type: 'TagInput',
        required: true,
      },
    },
    fields: ['id', 'topic', 'description'],
  })

  emit('addfunc', type, query, 'tag')
}
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <label for="id" class="block text-sm font-medium text-gray-700">Id:</label>
      <select id="objectSelect" v-model="tagId">
        <option :value="null" disabled>Select an object</option>
        <option v-for="object in List" :key="object.id" :value="object.id">
          {{ object['topic'] }}
        </option>
      </select>
      <label for="id" class="block text-sm font-medium text-gray-700"
        >Please leave it empty to insert</label
      >
    </div>
    <div class="mb-4">
      <label for="topic" class="block text-sm font-medium text-gray-700">Topic:</label>
      <input
        id="topic"
        v-model="topic"
        type="text"
        placeholder="Enter topic"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Enter description"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      ></textarea>
    </div>
    <button
      @click="submitTag"
      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {{ props.type === 'Edit' ? 'Update' : 'Add' }} Tag
    </button>
  </div>
</template>

<style>
/* No additional styles needed as Tailwind classes are used */
</style>
