<script setup>
import { connectbackend } from "../stores/connectbackend.js"
import { ref, onBeforeMount } from "vue"
import { computed } from "@vue/reactivity"
import LearningContent from "../components/Learning/Learningcontent.vue"
import LearningList from "../components/Learning/LearningList.vue"
import Addcontent from "../components/Learning/Addcontent.vue"

const mybackend = connectbackend()

// let datafromback = ref({})
const currentlesson = ref({})
const status = ref("list")

mybackend.getAllTag()
const conBackend = (type, query) => {
	console.log(type)
	console.log(query)

	if (type == "Delete") {
		mybackend.deleteContent(query)
		status.value = "list"
		currentlesson.value = ""
	}
	if (type == "Add" || type == "Edit") {
		mybackend.addContent(query)
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
