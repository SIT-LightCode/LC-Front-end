<script setup>
import { ref, defineProps, defineEmits, computed, onBeforeMount } from 'vue'
import * as gql from 'gql-query-builder'
import buttonvue from '../button/Button.vue'
import { Toaster, toast } from 'vue-sonner'
import { validateInput } from '../../stores/ValidateInput';
import { useRoute, useRouter } from 'vue-router'
import { learningCon } from '../../stores/LearningCon'

const mylearningCon = learningCon()
const route = useRoute()
const emit = defineEmits(['addfunc'])
const myVaildate = validateInput()
const props = defineProps({
  datas: Object,
  type: String,
  List: {
    type: Object, default: {}
  }
})

const topic = ref('')
const description = ref('')
const tagId = ref(null)
const tag = ref(undefined)
const Istype = ref('Add')

const submitTag = () => {
  console.log(tagId.value)
  let type = ''
  if (route.name == 'editTag') {
    type = 'Edit'
  } else if (route.name == 'addTag') {
    type = 'Add'
    tagId.value = null
  }


  let errorValidate =
    myVaildate.validateNameNull(topic.value, 'topic')
  if (errorValidate != '') {
    toast.error(errorValidate)
    return "error"
  } else {

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
}

const changeId = (e1) => {
  console.log(e1)
  if (e1 == null) {
    topic.value = ''
    description.value = ''
    tagId.value = null
    Istype.value = 'Add'
  } else {
    topic.value = e1.topic
    description.value = e1.description
    tagId.value = e1.id
    Istype.value = 'Edit'
  }

}
onBeforeMount(async () => {
  if (route.name == 'editTag') {
    if (Object.keys(mylearningCon.tagList).length === 0) {
      await mylearningCon.getAllTag()
    } if (mylearningCon.tagList.length > 0) {
      const tagCurrent = mylearningCon.tagList.filter(tag => tag.id == route.params.tagid);
      if (tagCurrent.length > 0) {

        topic.value = tagCurrent[0].topic
        description.value = tagCurrent[0].description
        tagId.value = tagCurrent[0].id

      }
    }
  }
})

</script>

<template>
  <div class="space-y-5">
    <hr />
    <buttonvue class="" @buttonClick="$emit('addstatus', 'list')" :name="'Back'"></buttonvue>

    <div class="space-y-5">
      <div class="mb-4">
        <label for="topic" class="block text-sm font-medium text-gray-700">Topic:</label>
        <input id="topic" v-model="topic" type="text" placeholder="Enter topic"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" v-model="description" placeholder="Enter description"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>
      <button @click="submitTag"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {{ $route.name === 'editTag' ? 'Update' : 'Add' }} Tag
      </button>
    </div>
  </div>
</template>

<style></style>
