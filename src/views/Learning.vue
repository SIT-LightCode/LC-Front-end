<script setup>
import { learningCon } from "../stores/LearningCon.js"
import { ref, onBeforeMount } from "vue"
import { computed } from "@vue/reactivity"
import LearningContent from "../components/learning/LearningContent.vue"
import LearningList from "../components/learning/LearningList.vue"
import Addcontent from "../components/learning/AddContent.vue"

const mylearningCon = learningCon()

const currentlesson = ref({})
const status = ref("list")

mylearningCon.getAllTag()
const conBackend = (type, query) => {
	console.log(type)
	console.log(query)

	if (type == "Delete") {
		mylearningCon.deleteContent(query)
		status.value = "list"
		currentlesson.value = ""
	}
	if (type == "Add" || type == "Edit") {
		mylearningCon.addContent(query)
		status.value = "list"
		currentlesson.value = ""
	}
}

const selectLesson = (lesson, id) => {
	currentlesson.value = { lesson, id: id }
	status.value = "show"
}
</script>

<template>
	<div class="">
		{{ status }}
		<div v-show="status == 'add'">
			<Addcontent
				:List="mylearningCon.tagList"
				:type="'Add'"
				@addstatus="(e) => (status = e)"
				@addfunc="(e, query) => conBackend(e, query)"
			></Addcontent>
		</div>
		<div v-show="status == 'list'">
			<!-- Sidebar/menu -->
			<LearningList
				:contents="mylearningCon.tagList"
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
