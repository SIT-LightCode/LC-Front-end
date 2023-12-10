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
	<div>
		<div v-if="contents.id != null" class="border-2 rounded-lg p-5 min-h-max">
			<div>
				<div class="" v-if="!isEdit">
					<v-md-preview :text="contents.lesson.content"></v-md-preview>
					<hr />
					<div class="flex justify-end mt-5 mr-5">
						<ButtonVue @buttonClick="buttonDeleteFunc()" :name="'Delete'"></ButtonVue>
						<ButtonVue @buttonClick=" $emit('addstatus', 'edit')" :name="'Edit'"></ButtonVue>
					</div>


				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
