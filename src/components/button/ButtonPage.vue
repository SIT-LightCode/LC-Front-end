<script setup>

const emit = defineEmits(['page'])
const prop = defineProps({
    pages: Number,
    type:String
})
const buttoncss = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold m-3 py-3 px-5 rounded-l "

</script>
 
<template>
        <div class="flex justify-end">
            <button v-show="prop.pages != 1" @click="$emit('page', -1);" :class=buttoncss>
                Prev
            </button>
            <button v-show="prop.pages != 4 && prop.type!='edit'" @click="$emit('page', 1);"  :class=buttoncss>
                Next
            </button>
            <button v-show="prop.pages == 4 || prop.type=='edit'" @click="$emit('page', 1);"  :class=buttoncss>
                Submit
            </button>
        </div>
</template>
 
<style></style>
