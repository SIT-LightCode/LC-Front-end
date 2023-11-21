<script setup>


defineEmits(['selected','topic', 'id'])

const prop = defineProps({
    contents: Object,
})

</script>
 
<template>
    <nav class="w3-sidebar w3-bar-block w3-white w3-collapse " style="z-index:3; width:15%; height:80%" id="mySidebar">
        <br>
        <div v-if="contents.length > 0">
            <div class="w3-container">
                <h3 class="w3-padding-32"><b style="color:rgb(7, 93, 253)">List Topic</b></h3>
            </div>
            <div class="w3-bar-block" v-for="topic in contents">
                <div style="color:cornflowerblue"> {{ topic["topic"] }} </div>
                <div v-if="topic.lesson.length > 0" class="w3-bar-block" v-for="lesson in topic.lesson">
                    <button class="w3-bar-item w3-center w3-button"
                        @click="$emit('selected',lesson)"> {{
                            lesson.name }} </button>
                </div>
                <div v-else class="w3-bar-item w3-center">
                    <div><b style="color:red"> No lesson </b></div>
                </div>
            </div>    
        </div>
        <div v-else class="w3-bar-block">
            <div><b style="color:red"> No Content </b> </div>
        </div>
        <br>


    </nav>
</template>
 
<style>

</style>