<script setup>
import { ref } from "vue"
import VmdEditor from "./VmdEditor.vue"
import * as gql from "gql-query-builder"
import buttonvue from "../button/Button.vue"
import { modalSwal } from "../../stores/Modal.js"
import { Toaster, toast } from 'vue-sonner'

const mymodal = modalSwal()

const emit = defineEmits(["addfunc", "addstatus"])

const prop = defineProps({
	datas: Object,
	type: String,
	List: Object,

})

const selectedObjectNew = ref(0)
const selectedObjectOld = ref(0)

const newnamecontent = ref("")
const text = ref("")

const clearInput = async (value) => {
	if (value) {
		selectedObjectNew.value = ""
		newnamecontent.value = ""
		text.value = ""
	}
}
const checkValue = (selectid) => {
	let errorText = ""
	if (text.value.trim() == "") {
		errorText = errorText + "\n Error Content: Dont has value for content"
	}
	if (newnamecontent.value.trim() == "" ) {
		errorText = errorText + "\n Error Name: you dont input value "
	}
	if (newnamecontent.value.length > 30) {
		errorText = errorText + "\n Error Name: you input name more than 30 characters"
	}
	if (selectid == 0) {
		errorText = errorText + "\n Error Tag: you dont select tag"
	}
	if (prop.type == "Edit") {
		if (
			!(
				prop.datas.lesson.name != newnamecontent.value ||
				prop.datas.lesson.content != text.value
			)
		) {
			errorText = errorText + "\n Error : You insert same value"
		}
	}
	if (errorText != "") {
		toast.error('Your input error')
		mymodal.modalNormal("Error", errorText, "error")
		return false
	} else return true
}

const clickAddEdit = async (value) => {
	if (value) {
		let id = ""
		let selectid = 0
		if (prop.type == "Add") {
			id = null
		} else if (prop.type == "Edit") {
			id = prop.datas.lesson.id
		}

		if (selectedObjectNew.value != 0) {
			selectid = selectedObjectNew.value
		} else selectid = selectedObjectOld.value
		if (checkValue(selectid)) {
			let query = gql.mutation(
				{
					operation: "upsertLesson",
					variables: {
						lessonInput: {
							value: {
								id: id,
								tagId: selectid,
								name: newnamecontent.value.trim(),
								content: text.value.trim(),
							},
							type: "LessonInput",
							required: true,
						},
					},
					fields: ["id", { tag: ["id", "topic"] }, "name", "content"],
				},
				undefined,
				{
					operationName: "UpsertLesson",
				}
			)
			console.log(query)
			emit("addfunc", prop.type, query)
		}
	}
}

if (prop.datas != undefined) {
	selectedObjectOld.value = prop.datas.id
	newnamecontent.value = prop.datas.lesson.name
	text.value = prop.datas.lesson.content
}

</script>

<template>
	<!-- contents  -->
	<div class="space-y-5">
		<hr />
		<buttonvue class="" @buttonClick="$emit('addstatus', 'list')" :name="'Back'"></buttonvue>
		<div v-if="prop.type == 'Add'" class="text-gray-900 text-sm">
			<label for="objectSelect"> Select tag for content to add: </label>
			<select id="objectSelect" v-model="selectedObjectNew">
				<option :value="null" disabled>Select an object</option>
				<option v-for="object in List" :key="object.id" :value="object.id">
					{{ object["topic"] }}
				</option>
			</select>
		</div>
		<div class="text-gray-900 text-sm ">
			Name: <input :maxlength="30" v-model="newnamecontent"
				class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>
		<div class="space-y-5">
			<VmdEditor v-model="text"></VmdEditor>
			<hr />
			<buttonvue @buttonClick="(value) => clearInput(value)" :name="'Clear'" />
			<buttonvue @buttonClick="(value) => clickAddEdit(value)" :name="prop.type == 'Edit' ? 'Update' : prop.type" />
			<hr />

		</div>
	</div>
</template>

<style>
textarea {
	width: 100%;
	box-sizing: border-box;
	display: block;
	max-width: 100%;
	line-height: 1.5;
	padding: 15px 15px 30px;
	border-radius: 3px;
	transition: box-shadow 0.5s ease;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
