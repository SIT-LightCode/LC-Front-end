<script setup>
import { ref } from 'vue'
import ButtonVue from '../button/Button.vue'
import * as gql from 'gql-query-builder'
import { account } from '../../stores/Account.js'
const emit = defineEmits(['buttonemit', 'type', 'addstatus'])
const myAccount = account()
const prop = defineProps({
  contents: Object,
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
</script>

<template>
  <!-- contents  -->
  <div class="pl-12 pr-12 ">
    <div v-if="contents !== undefined && contents.id != null" class="border-2 rounded-lg p-5 min-h-max">
      <div>
        <div class="" v-if="!isEdit">
          <div class="flex justify-end mt-5 mr-5">
            <ButtonVue v-if="user.authorities.includes('ADMIN')" class="bg-red-300 hover:bg-red-400"
              @buttonClick="buttonDeleteFunc()" :name="'Delete'">
            </ButtonVue>
            <ButtonVue v-if="user.authorities.includes('ADMIN')" class="bg-sky-300 hover:bg-sky-400"
              @buttonClick="$emit('addstatus', 'edit')" :name="'Edit'"></ButtonVue>
          </div>
          <v-md-preview :text="contents.lesson.content"></v-md-preview>

        </div>
      </div>
    </div>
    <div v-else>
      <div><b style="color: red"> No Content </b></div>
    </div>
  </div>
</template>

<style></style>
