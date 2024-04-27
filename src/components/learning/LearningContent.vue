<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import ButtonVue from '../button/Button.vue'
import * as gql from 'gql-query-builder'
import { account } from '../../stores/Account.js'
import { useRoute, useRouter } from 'vue-router'
import { learningCon } from '../../stores/LearningCon'

const mylearningCon = learningCon()
const route = useRoute()
const emit = defineEmits(['buttonemit', 'type', 'addstatus'])
const myAccount = account()
const prop = defineProps({
  contents: {
    type: Object,
  },
})
const isEdit = ref(false)

const buttonDeleteFunc = () => {
  let query = gql.mutation(
    {
      operation: 'removeLesson',
      variables: {
        lessonId: {
          value: prop.contents.lesson.id,
        },
      },
    },
    undefined,
    {
      operationName: 'RemoveLesson',
    },
  )
  isEdit.value = false
  emit('buttonemit', 'Delete', query)
}

const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })

user.value = JSON.parse(localStorage.getItem('user'))

const currentLesson = computed(() => {
  if (mylearningCon.tagList[0] !== undefined) {
    const tagCurrent = mylearningCon.tagList.filter(tag => tag.id == route.params.tagid);
    if (tagCurrent.length > 0) {
      const lessonCurrent = tagCurrent[0].lesson.filter(lesson => lesson.id == route.params.lessonid);
      if (lessonCurrent.length > 0) {
        return lessonCurrent[0].content
      }
    }
  }
})
</script>

<template>
  <!-- contents  -->
  <div class=" mr-12  w-[50%] h-full ">
    <div v-if="currentLesson !== undefined" class="border-2 rounded-lg p-5 min-h-max bg-white h-full">
      <div>
        <div class="" v-if="!isEdit">
          <div class="flex justify-end mt-5 mr-5">
            <ButtonVue v-if="user.authorities.includes('ADMIN')" class="bg-red-300 hover:bg-red-400"
              @buttonClick="buttonDeleteFunc()" :name="'Delete'">
            </ButtonVue>
            <ButtonVue v-if="user.authorities.includes('ADMIN')" class="bg-blue-300 hover:bg-blue-400"
              @buttonClick="$emit('addstatus', 'editLesson')" :name="'Edit'"></ButtonVue>
          </div>
          <v-md-preview class="" :text="currentLesson"></v-md-preview>
        </div>
      </div>
    </div>
    <div v-else>
      <div><b style="color: red"> No Content </b></div>
    </div>
  </div>
</template>

<style></style>
