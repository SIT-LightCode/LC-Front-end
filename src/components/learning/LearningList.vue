<script setup>
import { ref, defineProps } from 'vue'
import IconAdd from '../icons/IconAdd.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import buttonVue from '../button/Button.vue';
import { account } from '../../stores/Account.js'

// Capture the emit function
const emit = defineEmits(['selected', 'addstatus','deleteTag'])
const myAccount = account()
const props = defineProps({
  contents: Object,
})
const user = ref({ id: null, name: '', email: '', authorities: ['USER'], score: 0, scoreUnOfficial: 0 })


const selectedLesson = ref(1)

const handleLessonClick = (lesson, topicId) => {
  selectedLesson.value = lesson.id
  emit('selected', lesson, topicId) // Use the emit function directly
}

const showModalToAddContent = async () => {

  await Swal.fire({
    title: 'What do you want to add?',
    showCancelButton: true,
    confirmButtonText: 'Add Lesson',
    cancelButtonText: 'Add Tag',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      emit('addstatus', 'addLesson')
    } else if (result.dismiss === 'cancel') {
      emit('addstatus', 'addTag')
    }
  })
}
user.value = JSON.parse(localStorage.getItem('user'))

</script>

<template>
  <div v-if="contents.length > 0" class="flex">
    <IconAdd @click="showModalToAddContent" v-if="user.authorities.includes('ADMIN')"
      class="fixed transition right-6 bottom-6 w-20 h-20 hover:text-blue-500 hover:cursor-pointer" />
    <div class="flex flex-col space-y-5 pr-6">
      <div v-for="topic in contents" class="flex flex-col content-center text-black bg-white">
        <div>
          <div class="border-2 rounded-lg p-5 flex flex-col w-64 space-y-5 text-ellipsis overflow-hidden">
            <div id="topic-name" class="font-bold text-xl">{{ topic['topic'] }}</div>


            <div v-for="lesson in topic.lesson" @click="handleLessonClick(lesson, topic.id)" :class="lesson.id === selectedLesson
              ? 'transition border-blue-500 border-b-2 text-blue-600 cursor-pointer'
              : 'text-black transition border-b-2 hover:text-blue-400 hover:cursor-pointer'
              ">
              {{ lesson.name }}
            </div>
            <div v-show="topic.lesson == null"><b style="color: red"> No lesson </b></div>
            <div v-if="user.authorities.includes('ADMIN')"> <buttonVue  @buttonClick="$emit('deleteTag', topic.id)" :name="'Delete Tag'"></buttonVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div><b style="color: red"> No Content </b></div>
  </div>

  <!-- </div> -->
</template>

<style></style>
