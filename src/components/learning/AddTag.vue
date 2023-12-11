<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import * as gql from 'gql-query-builder'
import buttonvue from "../button/Button.vue"
const emit = defineEmits(['addfunc'])

const props = defineProps({
  tagData: Object, // Pass existing tag data for editing, if any
  type: String, // 'Add' or 'Edit'
})

const topic = ref(props.tagData?.topic || '')
const description = ref(props.tagData?.description || '')

const submitTag = () => {
  const id = props.type === 'Edit' ? props.tagData.id : null

  let query = gql.mutation({
    operation: 'upsertTag',
    variables: {
      tagInput: {
        value: {
          id: id,
          topic: topic.value,
          description: description.value,
        },
        type: 'TagInput',
        required: true,
      },
    },
    fields: ['id', 'topic', 'description'],
  })

  emit('addfunc', props.type, query, 'tag')
}
</script>

<template>
  <div class="p-4">
    <buttonvue class="m-5" @buttonClick="$emit('addstatus', 'list')" :name="'Back'"></buttonvue>
    <div class="mb-4 ">
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
