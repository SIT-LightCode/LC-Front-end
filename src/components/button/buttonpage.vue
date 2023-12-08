<script setup>
const emit = defineEmits(['page'])
const buttoncss = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"

</script>
 
<template>
    <div class="inline-flex">
        <button @click="$emit('page', -1);" v-bind:class=buttoncss>
            Prev
        </button>
        <button @click="$emit('page', 1);" v-bind:class=buttoncss>
            Next
        </button>
    </div>
</template>
 
<style></style>