<script setup>
import { ref } from "vue";

const prop = defineProps({
    contents: Array,
})

const currentid = ref(0)



</script>
 
<template>

<!-- contents  -->
    <div  class="w3-container w3-card w3-white w3-margin-bottom">
        <div>
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