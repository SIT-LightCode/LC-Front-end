<script setup>
import { ref, onBeforeMount } from 'vue'
import VmdEditor from './VmdEditor.vue'
import * as gql from 'gql-query-builder'
import buttonvue from '../button/Button.vue'
import { modalSwal } from '../../stores/Modal.js'
import { Toaster, toast } from 'vue-sonner'
import { useRoute, useRouter } from 'vue-router'
import { learningCon } from '../../stores/LearningCon'

const mylearningCon = learningCon()
const mymodal = modalSwal()
const route = useRoute()

const selectedObjectNew = ref(0)
const selectedObjectOld = ref(0)
const contentid = ref(0)

const oldnamecontent = ref('')
const newnamecontent = ref('')

const oldtext = ref('')
const newtext = ref('')
const emit = defineEmits(['addfunc'])

const test = ref()
const clearInput = async (value) => {
  if (value) {
    selectedObjectNew.value = ''
    newnamecontent.value = ''
    text.value = ''
  }
}
const checkValue = (selectid) => {
  let errorText = ''
  if (newtext.value.trim() == '') {
    errorText = errorText + '\n Error Content: Dont has value for content'
  }
  if (newnamecontent.value.trim() == '') {
    errorText = errorText + '\n Error Name: you dont input value '
  }
  if (newnamecontent.value.length > 30) {
    errorText = errorText + '\n Error Name: you input name more than 30 characters'
  }
  if (selectid == 0) {
    errorText = errorText + '\n Error Tag: you dont select tag'
  }
  if (route.name == 'editLesson') {
    if (
      !(newnamecontent.value != oldnamecontent.value || newtext.value != oldtext.value|| selectedObjectNew.value != selectedObjectOld.value)
    ) {
      errorText = errorText + '\n Error : You insert same value'
    }
  }
  if (errorText != '') {
    toast.error(errorText)
    // mymodal.modalNormal("Error", errorText, "error")
    return false
  } else return true
}

const clickAddEdit = async (value) => {
  if (value) {
    let id = ''
    let selectid = 0
    if (route.name == 'AddLesson') {
      id = null
    } else if (route.name == 'editLesson') {
      id = contentid.value
    }

    if (selectedObjectNew.value != 0) {
      selectid = selectedObjectNew.value
    } else selectid = selectedObjectOld.value
    if (checkValue(selectid)) {
      let query = gql.mutation(
        {
          operation: 'upsertLesson',
          variables: {
            lessonInput: {
              value: {
                id: id,
                tagId: selectid,
                name: newnamecontent.value.trim(),
                content: newtext.value.trim(),
              },
              type: 'LessonInput',
              required: true,
            },
          },
          fields: ['id', { tag: ['id', 'topic'] }, 'name', 'content'],
        },
        undefined,
        {
          operationName: 'UpsertLesson',
        },
      )
      console.log(query)
      emit('addfunc', query)
    }
  }
}



onBeforeMount(async () => {
  if (route.name == 'editLesson') {
    if(Object.keys(mylearningCon.tagList ).length === 0){
  await mylearningCon.getAllTag()
}
    if (mylearningCon.tagList.length > 0) {
      const tagCurrent = mylearningCon.tagList.filter(tag => tag.id == route.params.tagid);
      if (tagCurrent.length > 0) {
        const lessonCurrent = tagCurrent[0].lesson.filter(lesson => lesson.id == route.params.lessonid);
        newnamecontent.value = lessonCurrent[0].name
        oldnamecontent.value = lessonCurrent[0].name
        selectedObjectNew.value = tagCurrent[0].id
        selectedObjectOld.value = tagCurrent[0].id
        newtext.value = lessonCurrent[0].content
        oldtext.value = lessonCurrent[0].content
        contentid.value = lessonCurrent[0].id
      }
    }
  }
})

</script>

<template>
  <!-- contents  -->
  <div class="space-y-5">
    <hr />
    <buttonvue class="" @buttonClick="$emit('addstatus', 'list')" :name="'Back'"></buttonvue>
    <div class="text-gray-900 text-sm">
      <label for="objectSelect"> Tag for content </label>
      <select id="objectSelect" v-model="selectedObjectNew">
        <option :value="null" disabled>Select an object</option>
        <option v-for="object in mylearningCon.tagList" :key="object.id" :value="object.id">
          {{ object['topic'] }}
        </option>
      </select>
    </div>
    <div class="text-gray-900 text-sm">
      Name:
      <input :maxlength="30" v-model="newnamecontent"
        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div class="space-y-5">
      <VmdEditor v-model="newtext"></VmdEditor>
      <hr />
      <buttonvue @buttonClick="(value) => clearInput(value)" :name="'Clear'" />
      <buttonvue @buttonClick="(value) => clickAddEdit(value)" :name="$route.name == 'addLesson' ? 'Add' : 'Update'" />
      <hr />
    </div>
  </div>
</template>

<style>
textarea {
  width: 100%;
  box-sizing: border-box;
  display: block;
  max-width: 100%;
  line-height: 1.5;
  padding: 15px 15px 30px;
  border-radius: 3px;
  transition: box-shadow 0.5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
