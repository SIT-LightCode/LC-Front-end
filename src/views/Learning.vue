<script setup>
import { learningCon } from '../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import LearningContent from '../components/learning/LearningContent.vue'
import LearningList from '../components/learning/LearningList.vue'
import InputContent from '../components/learning/InputContent.vue'
import InputTag from '../components/learning/InputTag.vue'
const mylearningCon = learningCon()

const currentlesson = ref({})
const status = ref('list')
const selectedLesson = ref({})

onBeforeMount(async () => {
  await mylearningCon.getAllTag()

  if (mylearningCon.tagList.length > 0) {
    selectLesson(mylearningCon.tagList[0].lesson[0], mylearningCon.tagList[0].id)
  } else {
    setDefaultLesson()
  }
})

const setDefaultLesson = () => {
  if (mylearningCon.tagList[0]) {
    currentlesson.value = {
      lesson: mylearningCon.tagList[0].lesson[0],
      id: mylearningCon.tagList[0].id,
    }
  }
}

const conBackend = async (type, query, name) => {
  if (type == 'Delete') {
    mylearningCon.deleteContent(query)
    status.value = 'list'
    currentlesson.value = ''
  }
  if (type == 'Add' || type == 'Edit') {
    if (name === 'tag') {
      await mylearningCon.addTag(query, type)
    } else {
      await mylearningCon.addContent(query)
    }
    status.value = 'list'
    await mylearningCon.getAllTag()

    const tagListIdx = mylearningCon.tagList.findIndex((o) => o.id == selectedLesson.value.id)
    currentlesson.value = {
      lesson:
        mylearningCon.tagList[tagListIdx].lesson[
          mylearningCon.tagList[tagListIdx].lesson.findIndex(
            (o) => o.id == selectedLesson.value.lesson.id,
          )
        ],
      id: mylearningCon.tagList[tagListIdx].id,
    }
  }
}

const selectLesson = (lesson, id) => {
  currentlesson.value = { lesson, id: id }
  selectedLesson.value = currentlesson.value
}

const currentSet = computed(() => {
  if (Object.keys(currentlesson.value).length === 0) {
    if (mylearningCon.tagList[0] !== undefined) {
      return {
        lesson: mylearningCon.tagList[0].lesson[0],
        id: mylearningCon.tagList[0].id,
      }
    }
  } else {
    return currentlesson.value
  }
})
</script>

<template>
  <div class="">
    <div v-if="status == 'addTag'">
      <InputTag
        :List="mylearningCon.tagList"
        :type="'Add'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query, name) => conBackend(e, query, name)"
      ></InputTag>
    </div>
    <div v-if="status == 'addLesson'">
      <InputContent
        :List="mylearningCon.tagList"
        :type="'Add'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query) => conBackend(e, query)"
      ></InputContent>
    </div>
    <div v-if="status == 'edit'">
      <InputContent
        :datas="currentlesson"
        :type="'Edit'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query) => conBackend(e, query)"
      ></InputContent>
    </div>
    <div class="flex space-x-16" v-show="status == 'list'">
      <!-- Sidebar/menu with its own scroll bar -->
      <div class="learning-list-container" style="overflow-y: auto; max-height: 100vh">
        <LearningList
          class=""
          :contents="mylearningCon.tagList"
          @selected="selectLesson"
          @addstatus="(e) => (status = e)"
          @deleteTag="(e1)=>{ mylearningCon.deleteTag(e1)}"
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
