<script setup>
import { ref } from "vue"
const text = ref("")
</script>
 
<template>
	<div>
		<v-md-editor v-model="text" height="400px"></v-md-editor>
		output {{ text }}
	</div>
</template>
