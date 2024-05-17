<script setup>
import { ref, defineProps } from 'vue'
import IconAdd from '../icons/IconAdd.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account.js'
import { useRouter,useRoute } from 'vue-router'

const myRouter = useRouter()
const route = useRoute()

// Capture the emit function
const emit = defineEmits(['selected', 'addstatus', 'deleteTag'])
const myAccount = account()
const props = defineProps({
  contents: Object,
})
const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })


const selectedLesson = ref(1)

const handleLessonClick = (lesson, topicId) => {
  selectedLesson.value = lesson.id
  myRouter.push({ name: 'list', params: { tagid: topicId, lessonid: lesson.id } })
  emit('selected', lesson, topicId) // Use the emit function directly
}



user.value = JSON.parse(localStorage.getItem('user'))

</script>

<template>
  <div class="bg-st-grey p-5">
    <div v-if="user.authorities.includes('ADMIN')">
      <buttonVue @buttonClick="$emit('addstatus', 'addTag')" :name="'Add Tag'" class="bg-gray-300 hover:bg-gray-400">
      </buttonVue>
      <buttonVue @buttonClick="$emit('addstatus', 'addLesson')" :name="'Add Lesson'"
        class="bg-gray-300 hover:bg-gray-400">
      </buttonVue>

    </div>
    <div v-if="contents.length > 0" class="flex py-5">

      <div class="flex flex-col space-y-5  ">

        <div v-for="topic in contents" class="flex flex-col content-center text-black bg-white">
          <div>
            <div class="border-2 rounded-lg p-5 flex flex-col w-64 space-y-5 text-ellipsis overflow-hidden">
              <div id="topic-name" class="font-bold text-base	">{{ topic['topic'] }}</div>

      <div v-for="lesson in topic.lesson" @click="handleLessonClick(lesson, topic.id)" :class="lesson.id == route.params.lessonid
      ? 'transition border-blue-500 border-b-2 text-blue-600 cursor-pointer'
      : 'text-black transition border-b-2 hover:text-blue-400 hover:cursor-pointer'
      ">
                {{ lesson.name }}
              </div>
              <div v-show="topic.lesson == null"><b style="color: red"> No lesson </b></div>
              <div v-if="user.authorities.includes('ADMIN')">
                <buttonVue @buttonClick="$emit('deleteTag', topic.id)" :name="'Delete Tag'"
                  class="bg-red-300 hover:bg-red-400"></buttonVue>
                <buttonVue @buttonClick="$emit('addstatus', 'editTag')" :name="'Edit Tag'"
                  class="bg-blue-300 hover:bg-blue-400"></buttonVue>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div><b style="color: red"> No Content </b></div>
    </div>
  </div>


  <!-- </div> -->
</template>

<style></style>
