<script setup>
import { ref } from "vue";
import buttonVue from '../button/button.vue';
import Addcontent from "./Addcontent.vue";
import * as gql from 'gql-query-builder'

const emit = defineEmits(['buttonemit', 'type'])

const prop = defineProps({
    contents: Object
})

const isEdit = ref(false)
const buttonFunc = (e) => {
    if (e == "true") {

        let query = gql.mutation({
            operation: 'removeLesson',
            variables: {
                lessonId: {
                    value: prop.contents.lesson.id,
                },
            }
            ,
        }, undefined, {
            operationName: 'RemoveLesson'
        })
        emit('buttonemit', 'Delete', query)

    }
}


</script>
 
<template>
    <!-- contents  -->
    <div class="w3-main w3-padding-64 " style="margin-left:300px; margin-right:100px; ">
        <div v-if="contents.id != null" class="w3-container w3-card w3-white ">
            <div>

                <div class="w3-container" v-if="!isEdit">
                    <v-md-preview :text="contents.lesson.content"></v-md-preview>
                    <hr>
                    <buttonVue @isClick="(e) => buttonFunc(e)" :name="'delete'"></buttonVue>
                    <button @click="isEdit = !isEdit">Edit</button>
                </div>
                <div class="w3-container" v-else-if="isEdit">
                    <Addcontent @addstatus="(e) => isEdit = e" :datas="contents" :type="'Edit'"
                        @addfunc="(e, query) => $emit('buttonemit', e, query)"></Addcontent>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style></style>