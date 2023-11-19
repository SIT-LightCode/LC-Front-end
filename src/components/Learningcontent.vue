<script setup>
import { ref } from "vue";

defineEmits(['delete', 'selected'])

const prop = defineProps({
    contents: Object,
})




</script>
 
<template>
    <!-- contents  -->
    <div class="w3-container w3-card w3-white w3-margin-bottom">
        <div>
            <button class="w3-bar-item w3-right w3-button w3-gray w3-padding-16"
                @click="$emit('delete', contents.id);">
                Delete {{ contents.id }}</button>
            <h2 class="w3-text-grey w3-padding-16">
                {{ contents.name }}
            </h2>
            <div class="w3-container">
                <p>{{ contents.content }}</p>
                <hr>
            </div>
        </div>
    </div>
</template>
 
<style></style>