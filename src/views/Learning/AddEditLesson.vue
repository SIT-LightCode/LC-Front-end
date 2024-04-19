<script setup>
import { learningCon } from '../../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'
import IconAdd from '../../components/icons/IconAdd.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import InputContent from '../../components/learning/InputContent.vue'
import { account } from '../../stores/Account'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const myRouter = useRouter()
const mylearningCon = learningCon()
const currentlesson = ref({})
const status = ref('list')
const sidebarIsShow = ref(false)

const selectedLesson = ref({})
const myAccount = account()

onBeforeMount(async () => {
if(Object.keys(mylearningCon.tagList ).length === 0){
  await mylearningCon.getAllTag()
}

})


const conBackend = async (query) => {
    await mylearningCon.addContent(query)
    myRouter.push({ name: 'list', params: { tagid: 0, lessonid: 0 } })
    await mylearningCon.getAllTag()
}


const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })

user.value = JSON.parse(localStorage.getItem('user'))
</script>

<template>
  <div class=" px-1 max-w-[90%] bg-st-grey font-roboto">
    <div class="flex justify-content-center align-items-center mb-4 gap-2">
            <div  v-if="$route.name == 'addLesson'" id="logo">ADD LESSON</div>
            <div v-else-if="$route.name == 'editLesson'" id="logo">Edit LESSON</div>

    </div>

    <div v-if="$route.name == 'addLesson'">
      <InputContent :List="mylearningCon.tagList" :type="'Add'"
        @addstatus="(e) => (myRouter.push({ name: e, params: { tagid: 0, lessonid: 0 } }))"
        @addfunc="(e, query) => conBackend(e, query)"></InputContent>
    </div>
    <div v-if="$route.name == 'editLesson'">
      <InputContent :datas="currentlesson" :type="'Edit'"
        @addstatus="(e) => (myRouter.push({ name: e, params: { tagid: 0, lessonid: 0 } }))"
        @addfunc="(e, query) => conBackend(e, query)"></InputContent>
    </div>
  </div>
</template>

<style>
#logo {
    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>
