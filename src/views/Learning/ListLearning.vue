<script setup>
import { learningCon } from '../../stores/LearningCon.js'
import { ref, onBeforeMount } from 'vue'
import { computed } from '@vue/reactivity'


import { account } from '../../stores/Account'
import LearningContent from '../../components/learning/LearningContent.vue'
import LearningList from '../../components/learning/LearningList.vue'
import IconHamberger from '../../components/icons/IconHamberger.vue'
import Hamberger from '../../components/button/Hamburger.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const myRouter = useRouter()
const mylearningCon = learningCon()
const currentlesson = ref({})
const status = ref('list')
const sidebarIsShow = ref(false)

const selectedLesson = ref({})
const myAccount = account()
const conBackend = async (query) => {
    mylearningCon.deleteContent(query)
    myRouter.push({ name: 'list', params: { tagid: 0, lessonid: 0 } })
    currentlesson.value = ''
}

onBeforeMount(async () => {
    if (Object.keys(mylearningCon.tagList).length === 0) {
        await mylearningCon.getAllTag()
    }
    const tagCurrent = mylearningCon.tagList.filter(tag => tag.id == route.params.tagid);
    if (tagCurrent.length > 0) {
        const lessonCurrent = tagCurrent[0].lesson.filter(lesson => lesson.id == route.params.lessonid);
        selectLesson(lessonCurrent[0], route.params.tagid)
    }

})

const selectLesson = (lesson, id) => {
    currentlesson.value = { lesson, id: id }
    selectedLesson.value = currentlesson.value
}

const currentSet = computed(() => {
    if (route.params.tagid == 0 && route.params.lessonid == 0) {
        if (Object.keys(mylearningCon.tagList[0]).length > 0) {
            myRouter.push({
                name: 'list',
                params: {
                    tagid: mylearningCon.tagList[0].id,
                    lessonid: mylearningCon.tagList[0].lesson[0].id
                }
            });
            selectLesson(mylearningCon.tagList[0].lesson[0], mylearningCon.tagList[0].id)
            return {
                lesson: mylearningCon.tagList[0].lesson[0],
                id: mylearningCon.tagList[0].id,
            }
        }

    }

    if (Object.keys(currentlesson.value).length === 0) {
        if (mylearningCon.tagList[0] !== undefined) {
            const tagCurrent = mylearningCon.tagList.filter(tag => tag.id == route.params.tagid);
            if (tagCurrent.length > 0) {
                const lessonCurrent = tagCurrent[0].lesson.filter(lesson => lesson.id == route.params.lessonid);
                return {
                    lesson: lessonCurrent[0],
                    id: route.params.tagid,
                }
            }
        }
    } else {
        return currentlesson.value
    }
})

const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })
user.value = JSON.parse(localStorage.getItem('user'))

</script>

<template>
    <div class=" px-1 max-w-[100%]">
        <div class="flex lg:space-x-0 space-x-0 md:space-x-16">
            <!-- Sidebar/menu with its own scroll bar -->
            <!-- hanberger on off -->
            <div
                class="fixed hover:cursor-pointer border-2 border-solid h-[43px]  px-2 flex items-center justify-center rounded-lg lg:invisible transition-all hover:text-blue-400 hover:border-blue-400">
                <Hamberger :contents="mylearningCon.tagList" @selected="selectLesson"
                    @addstatus="(e) => (myRouter.push({ name: e, params: { status: e } }))"
                    @deleteTag="(e1) => { mylearningCon.deleteTag(e1) }" />
            </div>
            <!-- lg -->
            <div class="pl-10 learning-list-container fixed max-h-[90%] overflow-auto invisible lg:visible">

                <LearningList class="bg-white" :contents="mylearningCon.tagList" @selected="selectLesson"
                    @addstatus="(e) => (myRouter.push({ name: e, params: { status: e } }))"
                    @deleteTag="(e1) => { mylearningCon.deleteTag(e1) }">
                </LearningList>
            </div>
            <!-- small -->
            <div v-show="sidebarIsShow"
                class="pl-10 learning-list-container fixed max-h-[90%] overflow-auto lg:visible">

                <LearningList class="bg-white" :contents="mylearningCon.tagList" @selected="selectLesson"
                    @addstatus="(e) => (myRouter.push({ name: e, params: { status: e } }))"
                    @deleteTag="(e1) => { mylearningCon.deleteTag(e1) }">
                </LearningList>
            </div>
            <!-- Content area with its own scroll bar -->
            <div class="ml-72">
                <LearningContent class="lg:ml-80 fixed max-h-[90%] overflow-auto " :contents="currentSet"
                    @buttonemit="(e, e1) => conBackend(e1)"
                    @addstatus="(e) => (myRouter.push({ name: e, params: { lessonid: currentlesson.lesson.id, tagid: currentlesson.id } }))">
                </LearningContent>
            </div>
        </div>
    </div>
</template>

<style></style>