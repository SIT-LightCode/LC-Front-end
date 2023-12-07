<script setup>

import { learningCon } from "../stores/learningCon.js";
import { ref, onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import learningcontent from "../components/Learning/Learningcontent.vue";
import Sidebar from "../components/Learning/Sidebar.vue";
import Addcontent from "../components/Learning/Addcontent.vue";


const mylearningCon = learningCon();


const currentlesson = ref({})
const status = ref("list")

mylearningCon.getAllTag()
const conBackend = (type, query) => {
	console.log(type)
	console.log(query)

    if (type == "Delete") {
        mylearningCon.deleteContent(query)
        isAdd.value = false
        currentlesson.value = ''
    }
    if (type == "Add" || type == "Edit") {
        mylearningCon.addContent(query)
        isAdd.value = false
        currentlesson.value = ''
    }

}

const selectLesson = (lesson, id) => {
	currentlesson.value = { lesson, id: id }
	status.value = "show"
}
</script>

 
<template>


<template>
	<div class="">
		{{ status }}
		<div v-show="status == 'add'">
			<Addcontent
				:List="mybackend.tagList"
				:type="'Add'"
				@addstatus="(e) => (status = e)"
				@addfunc="(e, query) => conBackend(e, query)"
			></Addcontent>
		</div>
		<div v-show="status == 'list'">
			<!-- Sidebar/menu -->
			<LearningList
				:contents="mybackend.tagList"
				@selected="selectLesson"
				@addstatus="(e) => (status = e)"
			>
			</LearningList>
		</div>
		<div v-show="status == 'show'">
			<!-- context -->
			<LearningContent
				:contents="currentlesson"
				@buttonemit="(e, e1) => conBackend(e, e1)"
				@addstatus="(e) => (status = e)"
			></LearningContent>
			<!--  -->
		</div>
	</div>
</template>

<style></style>
