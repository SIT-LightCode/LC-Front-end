<script setup>
import { ref } from "vue"
import ButtonVue from "../button/button.vue"
import Addcontent from "./Addcontent.vue"
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
	<div
		class="w3-main w3-padding-64"
		style="margin-left: 300px; margin-right: 100px"
	><button @click="$emit('addstatus', 'list')">Back</button>
		<div v-if="contents.id != null" class="w3-container w3-card w3-white">
			<div>{{contents.lesson.name  }}
				<div class="w3-container" v-if="!isEdit">
					<v-md-preview :text="contents.lesson.content"></v-md-preview>
					<hr />
					<ButtonVue
						@buttonClick="buttonDeleteFunc()"
						:name="'delete'"
					></ButtonVue>
					<button @click="isEdit = !isEdit">Edit</button>
				</div>
				<div class="w3-container" v-else-if="isEdit">
					<Addcontent
						@addstatus="(e) => (isEdit = e)"
						:datas="contents"
						:type="'Edit'"
						@addfunc="
							(e, query) => {
								$emit('buttonemit', e, query)
								isEdit = false
							}
						"
					></Addcontent>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
