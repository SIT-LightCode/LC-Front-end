<script setup>

import vmdeditor from '../../components/learning/VmdEditor.vue';
import filterBar from '../../components/problem/FilterBar.vue';
import listProblem from '../../components/problem/ListProblem.vue';
import editPro from '../../components/addproblem/EditProblem.vue';
import inputAnswer from '../../components/answerproblem/InputAnswer.vue';
import { MqResponsive } from "vue3-mq";
import { learningCon } from '../../stores/LearningCon'
import { problemCon } from '../../stores/ProblemCon';
import { Toaster, toast } from 'vue-sonner'
import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../../stores/Account'
import ResultPage from '../../components/answerproblem/ResultPage.vue';
import Dialog from 'primevue/dialog';
import { useRoute, useRouter } from 'vue-router'
import buttonvue from '../../components/button/Button.vue'
import Menu from 'primevue/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const emit = defineEmits(['returnval'])

const myproblemCon = problemCon()
const mylearningCon = learningCon()
const route = useRoute()
const myRouter = useRouter()

const problemEdit = ref({name:'',description:'',totalScore:0,arrayTagId:[],level:0})
const problemOldEdit = ref({name:'',description:'',totalScore:0,arrayTagId:[],level:0})


const editProblem = (val) => {
    if (val != '') {
        myproblemCon.EditProblem(
            parseInt(route.params.id),
            val.arrayTagId,
            val.name,
            val.description,
            val.totalScore,
            val.level,)
    }
   
}


const checkValue = () => {
    let errorText = ""
    if (problemEdit.value.name > 30) {
        errorText = errorText + "\n Error name: name is more than 30 characters"
    }
    if (problemEdit.value.name.trim() == "") {
        errorText = errorText + "\n Error name: you do not insert name"
    }
    if (problemEdit.value.description.trim() == "") {
        errorText = errorText + "\n Error description: you do not insert value for description "
    }
    if (problemEdit.value.totalScore > 100) {
        errorText = errorText + '\n Error totalScore: value is more over 100'
    }
    if (problemEdit.value.totalScore < 1) {
        errorText = errorText + '\n Error totalScore: value is lower than 1'
    }
    if (problemEdit.value.level == '') {
        errorText = errorText + '\n Error level: you do not input value for level '
    }
    if (problemEdit.value.arrayTagId.length == 0) {
        errorText = errorText + '\n Error tag: you do not select tag'
    }
    if (isEqual(problemEdit.value,problemOldEdit.value) ) {
        errorText = errorText + '\n Error value: you edit problem is same value'
    }
    if (errorText != "") {
        toast.error(errorText)
        return false
    } else {
        return true
    }
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
function isEqual(obj1, obj2) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length != props2.length) {
        return false;
    }
    for (var i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2);
        if (isObjects && !isEqual(val1, val2) || !isObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}

const valuetoaddpage = async () => {
    if (checkValue()) {
        // emit('returnval', problemEdit.value);
        editProblem(problemEdit.value)
    }
}

const clearInput = () => {
    problemEdit.value =  problemOldEdit.value
    // problemEdit.value.name = problemOldEdit.value.name
    // problemEdit.value.description = problemOldEdit.value.description
    // problemEdit.value.totalScore = problemOldEdit.value.totalScore
    // problemEdit.value.arrayTagId = problemOldEdit.value.arrayTagId
    // problemEdit.value.level = problemOldEdit.value.level

}

onBeforeMount(async () => {
    if (Object.keys(myproblemCon.problemList).length === 0) {
        await myproblemCon.getAllproblem()
    }
    if (Object.keys(mylearningCon.tagList).length === 0) {
        await mylearningCon.getAllTag()
    }
    console.log(myproblemCon.problemList)
    if (myproblemCon.problemList.length > 0) {
        const problemCurrent = myproblemCon.problemList.filter(problem => problem.id == route.params.id);
        // dataCurrent.value = problemCurrent[0]
        if (problemCurrent.length > 0) {
            problemEdit.value = problemCurrent[0]
            problemOldEdit.value = Object.assign({}, problemCurrent[0]);
        } else {
            problemEdit.value = {}
        }
    }


})


</script>
<template>
    <div class="relative  bg-st-grey max-w-[100%] ">
        <span style=" color: #007AFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); font-family: Rampart One; font-size: 64px; font-style: normal; line-height: 36px;" class="text-xl opacity-50  ">Edit Problem</span>
        <div class="text-gray-900 text-sm ">
            <!-- {{  problemEdit.name }} -->

            <div class="py-5 ">Name of the problem :
                <input :maxlength="30" v-model="problemEdit.name"
                    class="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div class="py-5 "> Description for the problem :
                <vmdeditor v-model="problemEdit.description"></vmdeditor>
            </div>

            <div class="py-5 "> Total-Score :
                <div class="text-red-500">** insert value between 0 to 100 **</div>
                <input @change="limitVal()" type="Number" min="1" max="100" v-model="problemEdit.totalScore"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div class="py-5 "> The difficulty level :
                <select id="underline_select"
                    class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    v-model="problemEdit.level">
                    <option value="5">Expert</option>
                    <option value="4">Hard</option>
                    <option value="3">Medium</option>
                    <option value="2">Beginner</option>
                    <option value="1">Easier</option>
                </select>
            </div>

            <div class="py-5 "> Choose tag for:
                <ul class="grid w-full gap-6 md:grid-cols-3">
                    <li v-for="(topic, key) in mylearningCon.tagList">
                        <input type="checkbox" :id="key" class="hidden peer" :value="topic.id"
                            v-model="problemEdit.arrayTagId" />
                        <label :for="key"
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
            </div>
        </div>


        <div class="space-y-5">
            <buttonvue class="bg-gray-300 hover:bg-gray-400" @buttonClick="myRouter.push('/problem/list')"
                :name="'Back'">
            </buttonvue>
            <buttonvue class="bg-red-300 hover:bg-red-400" @buttonClick="clearInput" :name="'Clear'" />
            <buttonvue class="bg-blue-300 hover:bg-blue-400" @buttonClick="(value) => valuetoaddpage(value)"
                :name="'Update'" />
            <hr />
        </div>

    </div>
</template>

<style>
#logo {

    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
}
</style>
