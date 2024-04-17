<script setup>
import { learningCon } from '../../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import IconAdd from '../../components/icons/IconAdd.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { account } from '../../stores/Account'
import InputTag from '../../components/learning/InputTag.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const myRouter = useRouter()
const mylearningCon = learningCon()
const currentlesson = ref({})
const selectedLesson = ref({})
const myAccount = account()

const conBackend = async (type, query, name) => {
  if (type == 'Delete') {
    mylearningCon.deleteContent(query)
    myRouter.push({ name: 'list', params: { tagid: 0, lessonid: 0 } })
    currentlesson.value = ''
  }
  if (type == 'Add' || type == 'Edit') {
    if (name === 'tag') {
      await mylearningCon.addTag(query, type)
    } else {
      await mylearningCon.addContent(query)
    }
    myRouter.push({ name: 'list', params: { tagid: 0, lessonid: 0 } })
    await mylearningCon.getAllTag()
  }
}

</script>
 
<template>
<div class=" px-1">
<div v-if="$route.name == 'addTag'">
  <InputTag :List="mylearningCon.tagList" :type="'Add'"
    @addstatus="(e) => (myRouter.push({ name: e, params: { tagid: 0, lessonid: 0 } }))"
    @addfunc="(e, query, name) => conBackend(e, query, name)"></InputTag>
</div>
<div v-if="$route.name == 'editTag'">
  <InputTag :List="mylearningCon.tagList" :type="'Edit'" 
    @addstatus="(e) => (myRouter.push({ name: e, params: { tagid: 0, lessonid: 0 } }))"
    @addfunc="(e, query, name) => conBackend(e, query, name)"></InputTag>
</div>

</div>

</template>
 
<style>

</style>