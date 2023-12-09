<script setup>
import { ref, onBeforeMount } from "vue"
import IconAdd from "../icons/IconAdd.vue"
defineEmits(["selected", "topic", "id", "addstatus"])

const prop = defineProps({
	contents: Object,
})
</script>

<template>
	
	<div v-if="contents.length > 0" class="flex ">
		
		<IconAdd @click="$emit('addstatus', 'add')" class="fixed transition right-6 bottom-6 w-20 h-20 hover:text-blue-500 hover:cursor-pointer"/>
		<div class="flex flex-col space-y-5">

			<b class="text-black">List Topic</b>
			<div
				v-for="topic in contents"
				class="flex flex-col content-center text-black "
			>
				<div>
					{{ topic["topic"] }}
					<div
						class="border-2  rounded-lg min-w-max p-5 flex flex-col space-y-5 "
					>
						<div
							v-if="topic.lesson.length > 0"
							v-for="lesson in topic.lesson"
							@click="$emit('selected', lesson, topic.id)"
							class="text-black transition hover:border-blue-500 border-b-2 hover:text-blue-500 hover:cursor-pointer"
						>
							{{ lesson.name }}
						</div>
						<div v-else>
							<div><b style="color: red"> No lesson </b></div>
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
