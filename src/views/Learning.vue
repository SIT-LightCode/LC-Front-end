<script setup>
import { learningCon } from '../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import { account } from '../stores/Account'
import LearningContent from '../components/learning/LearningContent.vue'
import LearningList from '../components/learning/LearningList.vue'
import InputContent from '../components/learning/InputContent.vue'
import InputTag from '../components/learning/InputTag.vue'
import IconHamberger from '../components/icons/IconHamberger.vue'
import Hamberger from '../components/button/Hamburger.vue'

const mylearningCon = learningCon()
const currentlesson = ref({})
const status = ref('list')
const sidebarIsShow = ref(false)

const selectedLesson = ref({})
const myAccount = account()

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
  <div class="px-10">

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
    <div v-if="status == 'edit'" >
      <InputContent
        :datas="currentlesson"
        :type="'Edit'"
        @addstatus="(e) => (status = e)"
        @addfunc="(e, query) => conBackend(e, query)"
      ></InputContent>
    </div>
    <div class="flex lg:space-x-0 space-x-16" v-show="status == 'list'">
      <!-- Sidebar/menu with its own scroll bar -->
      <!-- hanberger on off -->
      <div  class="fixed hover:cursor-pointer border-2 border-solid h-[43px]  px-2 flex items-center justify-center rounded-full lg:invisible transition-all hover:text-blue-400 hover:border-blue-400">
        <Hamberger/>
      </div>
      <!-- lg -->
      <div  class="pl-10 learning-list-container fixed max-h-[90%] overflow-auto invisible lg:visible">
        <LearningList
          class="bg-white"
          :contents="mylearningCon.tagList"
          @selected="selectLesson"
          @addstatus="(e) => (status = e)"
          @deleteTag="(e1)=>{ mylearningCon.deleteTag(e1)}"
        >
        </LearningList>
      </div>
      <!-- small -->
      <div v-show="sidebarIsShow" class="pl-10 learning-list-container fixed max-h-[90%] overflow-auto lg:visible">
        <LearningList
          class="bg-white"
          :contents="mylearningCon.tagList"
          @selected="selectLesson"
          @addstatus="(e) => (status = e)"
          @deleteTag="(e1)=>{ mylearningCon.deleteTag(e1)}"
        >
        </LearningList>
      </div>
      <!-- Content area with its own scroll bar -->
      
      <div class="ml-72" >
        <LearningContent
          class="lg:ml-80"
          :contents="currentSet"
          @buttonemit="(e, e1) => conBackend(e, e1)"
          @addstatus="(e) => (status = e)"
        ></LearningContent>
      </div>
    </div>
  </div>
</template>

<style></style>
