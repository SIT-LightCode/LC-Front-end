<script setup>
import { ref } from "vue"
import ButtonVue from "../button/Button.vue"
import * as gql from "gql-query-builder"

const emit = defineEmits(["buttonemit", "type", "addstatus"])

const prop = defineProps({
	contents: Object,
})
const isEdit = ref(false)

const buttonDeleteFunc = () => {
	let query = gql.mutation(
		{
			operation: "removeLesson",
			variables: {
				lessonId: {
					value: prop.contents.lesson.id,
				},
			},
		},
		undefined,
		{
			operationName: "RemoveLesson",
		}
	)
	isEdit.value = false
	emit("buttonemit", "Delete", query)
}
</script>

<template>
	<!-- contents  -->
	<div class="flex" style="margin-left: 100px; margin-right: 100px;">
		<div v-if="contents.id != null" class="border-2 rounded-lg p-5 ">
			<div>
				<div class="max-w-screen-md break-all">{{ contents.lesson.name }}</div>
				<div class="max-w-screen-md" v-if="!isEdit">
					<v-md-preview :text="contents.lesson.content"></v-md-preview>
					<hr />
					<div class="m-3">
						<ButtonVue @buttonClick="buttonDeleteFunc()" :name="'delete'"></ButtonVue>
						<ButtonVue @buttonClick=" $emit('addstatus', 'edit')" :name="'change to edit'"></ButtonVue>
					</div>


				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
