<script setup>
import { learningCon } from '../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import LearningContent from '../components/learning/LearningContent.vue'
import LearningList from '../components/learning/LearningList.vue'
import Addcontent from '../components/learning/AddContent.vue'

const mylearningCon = learningCon()

const currentlesson = ref({})
const status = ref('list')

mylearningCon.getAllTag()
const conBackend = (type, query) => {
  if (type == 'Delete') {
    mylearningCon.deleteContent(query)
    status.value = 'list'
    currentlesson.value = ''
  }
  if (type == 'Add' || type == 'Edit') {
    mylearningCon.addContent(query)
    status.value = 'list'
    currentlesson.value = ''
  }
}

const selectLesson = (lesson, id) => {
  currentlesson.value = { lesson, id: id }
}

if (mylearningCon.tagList.length > 0) {
  selectLesson(mylearningCon.tagList[0].lesson[0], mylearningCon.tagList[0].id)
}

const currentSet = computed(() => {
  if (currentlesson.value == {}) {
    return {
      lesson: mylearningCon.tagList[0].lesson[0],
      id: mylearningCon.tagList[0].id,
    }
  } else return currentlesson.value
})
</script>

<template>
  <div class="">
    <div v-if="status == 'add'">
      <Addcontent
        :List="mylearningCon.tagList"
        :type="'Add'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query) => conBackend(e, query)"
      ></Addcontent>
    </div>
    <div v-if="status == 'edit'">
      <Addcontent
        :datas="currentlesson"
        :type="'Edit'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query) => conBackend(e, query)"
      ></Addcontent>
    </div>
    <div class="flex space-x-20" v-show="status == 'list'">
      <!-- Sidebar/menu with its own scroll bar -->
      <div class="learning-list-container" style="overflow-y: auto; max-height: 100vh">
        <LearningList
          class=""
          :contents="mylearningCon.tagList"
          @selected="selectLesson"
          @addstatus="(e) => (status = e)"
        >
        </LearningList>
      </div>

      <!-- Content area with its own scroll bar -->
      <div class="flex-1" style="overflow-y: auto; max-height: 100vh">
        <LearningContent
          class="w-full"
          :contents="currentSet"
          @buttonemit="(e, e1) => conBackend(e, e1)"
          @addstatus="(e) => (status = e)"
        ></LearningContent>
      </div>
    </div>
  </div>
</template>

<style></style>
