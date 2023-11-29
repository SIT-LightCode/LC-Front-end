<script setup>
import { ref } from "vue";
import buttonVue from '../button/button.vue';

const emit = defineEmits(['buttonemit','type'])

const prop = defineProps({
    contents: Object
})

const buttonFunc = (e) => {
    if (e == "true") {
        emit('buttonemit','delete')
    }
}


</script>
 
<template>
    <!-- contents  -->
    <div class="w3-main w3-padding-64 " style="margin-left:300px; margin-right:100px; ">

    <div v-if="contents.id != null" class="w3-container w3-card w3-white ">
        <div>
            <h2>
                {{ contents.name }}
                <buttonVue @isClick="(e) => buttonFunc(e)" :name="'delete'"></buttonVue>
                
            </h2>
            <div class="w3-container">
                <v-md-preview :text="contents.content"></v-md-preview>
                <hr>
            </div>
        </div>
</div>
    </div>
</template>
 
<style></style>