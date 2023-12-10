<script setup>
import { ref } from "vue";
import buttonPage from "../../button/ButtonPage.vue"
import { modalSwal } from "../../../stores/Modal.js";

const prop = defineProps({
    datas: {
        type: Object,
        default: {}
    },
    totalScore: {
        type: Number,
    },
    level: {
        type: Number,
    },
    arrayTagId: {
        type: Array,

    }
})
const emit = defineEmits(["returnval", "page"])
const input = ref({ totalScore: { type: 'totalScore', val: prop.totalScore }, level: { type: 'level', val: prop.level }, arrayTagId: { type: 'arrayTagId', val: prop.arrayTagId } })
const mymodal = modalSwal()

const checkValue = () => {
    let errorText = ""
    if (input.value.totalScore.val < 0 || input.value.totalScore.val > 100) {
        errorText = errorText + "\n Error totalScore: Dont has value for totalScore"
    }
    if (input.value.level.val == "") {
        errorText = errorText + "\n Error level: input value level "
    }
    if (input.value.arrayTagId.val.length == 0) {
        errorText = errorText + "\n Error arrayTagId: input value arrayTagId "
    }
    if (errorText != "") {
        mymodal.modalNormal("Error", errorText, "error")
        return false
    } else return true
}

const inputdata = (e1) => {
    if (e1 > 0) {
        if (checkValue()) {
            emit('page', e1)
            emit('returnval', input.value)
        }
    } else {
        emit('page', e1)
        emit('returnval', input.value)
    }

}
const limitVal = () => {
    if (input.value.totalScore.val > 100
    ) {
        input.value.totalScore.val = 100
    }
    else if (input.value.totalScore.val < 1
    ) {
        input.value.totalScore.val = 1
    }
}
</script>
 
<template>
    <div>
        <h3>Setting Problem</h3>
        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> total-Score <div
                    class="text-red-500">** insert value between 0 to 100 **</div>
            </label>
            <input @change="limitVal()" type="Number" min="1" max="100" v-model="input.totalScore.val"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <label for="underline_select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">the difficulty
            level?</label>
        <select id="underline_select"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            v-model="input.level.val">
            <option value='5'>Expert</option>
            <option value='4'>Hard</option>
            <option value='3'>Medium</option>
            <option value='2'>Beginner</option>
            <option value='1'>Easier</option>
        </select>

        <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white py-2.5">Choose tag for:</h3>
        <ul class="grid w-full gap-6 md:grid-cols-3">
            <li v-for="(topic, key ) in datas">
                <input type="checkbox" :id=key class="hidden peer" :value=topic.id v-model="input.arrayTagId.val">
                <label :for=key
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <svg class="mb-2 text-green-400 w-7 h-7" fill="currentColor" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z" />
                        </svg>
                        <div class="w-full text-lg font-semibold">{{ topic.topic }}</div>
                        <div class="w-full text-sm">{{ topic.description }}</div>
                    </div>
                </label>
            </li>
        </ul>
        <buttonPage :pages="3" @page="(e1) => { inputdata(e1) }"></buttonPage>
    </div>
</template>
 
<style></style>
