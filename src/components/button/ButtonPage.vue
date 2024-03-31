<script setup>

const emit = defineEmits(['page'])
const prop = defineProps({
    pages: Number,
    type:String
})
const buttoncss = "text-sm/[10px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-4 m-1 rounded-full"

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
