<script setup>

const emit = defineEmits(['page'])
const prop = defineProps({
    pages: Number,
    type:String
})
const buttoncss = "text-sm/[10px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-4 m-1 w-32 rounded-lg"

</script>
 
<template>
        <div class="flex justify-end">
            <button class="bg-white text-blue-500 hover:bg-blue-300 hover:text-black" v-show="prop.pages != 1" @click="$emit('page', -1);" :class=buttoncss>
                Prev
            </button>
            <button class="bg-st-blue text-white hover:bg-blue-300 hover:text-black" v-show="prop.pages != 4 && prop.type!='edit'" @click="$emit('page', 1);"  :class=buttoncss>
                Next
            </button>
            <button class="bg-st-blue text-white hover:bg-blue-300 hover:text-black" v-show="prop.pages == 4 || prop.type=='edit'" @click="$emit('page', 1);"  :class=buttoncss>
                Submit
            </button>
        </div>
</template>
 
<style></style>
