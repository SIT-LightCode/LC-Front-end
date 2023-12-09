<script setup>

const emit = defineEmits(['page'])
const prop = defineProps({
    pages: Number,
})
const buttoncss = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"

</script>
 
<template>
    <div class="inline-flex">
        <button v-show="prop.pages!=1" @click="$emit('page', -1);" v-bind:class=buttoncss>
            Prev
        </button>
        <button v-show="prop.pages!=4" @click="$emit('page', 1);" v-bind:class=buttoncss>
            Next
        </button>
        <button v-show="prop.pages==4" @click="$emit('page', 0);" v-bind:class=buttoncss>
            Submit
        </button>
    </div>
</template>
 
<style></style>