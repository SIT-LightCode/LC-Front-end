<script setup>

import filterBar from '../../components/problem/FilterBar.vue';
import listProblem from '../../components/problem/ListProblem.vue';
import editPro from '../../components/addproblem/EditProblem.vue';
import inputAnswer from '../../components/answerproblem/InputAnswer.vue';
import { MqResponsive } from "vue3-mq";
import { learningCon } from '../../stores/LearningCon'
import { problemCon } from '../../stores/ProblemCon';

import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../../stores/Account'
import ResultPage from '../../components/answerproblem/ResultPage.vue';
import Dialog from 'primevue/dialog';
import { useRoute, useRouter } from 'vue-router'
import buttonvue from '../../components/button/Button.vue'
import Menu from 'primevue/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const route = useRoute()
const myRouter = useRouter()
const data = ref([])

const myAccount = account()
const myproblemCon = problemCon()
const mylearningCon = learningCon()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const dataCurrent = ref([])

const isFilter = ref(false)
const visible = ref(false)

const filterFunc = (dataFilter) => {

    // Check if both tag and level filters are empty
    if (dataFilter.tag.keyword == "" && dataFilter.tag.length == 0 && dataFilter.level == 0 && dataFilter.isOfficial == "") {
        isFilter.value = false;
        return;
    }
    let filteredProblem = myproblemCon.problemList
    if (dataFilter.keyword !== "") {
        filteredProblem = filteredProblem.filter(problem => {
            if (problem.name.includes(dataFilter.keyword)) {
                return problem
            }
        });
    }
    isFilter.value = true;
    const uniqueProblems = filteredProblem.reduce((acc, problem) => {
        let tagsInProblem = []
        let hasCommonTag = false
        let hasMatchingLevel = false
        let hasMatchingOffice = false
        if (dataFilter.tag != "") {
            tagsInProblem = problem.tagProblem.map(tagObj => tagObj.tag.id);
            for (let i in tagsInProblem) {
                if (tagsInProblem[i].toString() == dataFilter.tag.toString()) {
                    hasCommonTag = true;
                }
            }
        }
        else {
            hasCommonTag = true
        }
        // Check if the level filter matches
        if (dataFilter.level != 0) {
            hasMatchingLevel = problem.level == dataFilter.level;
        } else { hasMatchingLevel = true }

        if (dataFilter.isOfficial != "") {
            if (problem.isOfficial != null) {
                if (dataFilter.isOfficial == problem.isOfficial.toString()) {
                    hasMatchingOffice = true
                }
            }

        } else { hasMatchingOffice = true }



        if (hasCommonTag && hasMatchingLevel && hasMatchingOffice) {
            acc.push(problem);
        }
        return acc;
    }, []);

    data.value = Array.from(new Set(uniqueProblems));
};
const test = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myproblemCon.problemList
})



const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
    if (levelArray[id - 1] != undefined) {
        return levelArray[id - 1][0]
    }
}
// const modalTwoButton = async (title, text, type) => {
//     let modalStatus = false
//     await Swal.fire({
//         title: title,
//         text: text,
//         icon: 'question',
//         confirmButtonColor: "#93C5FD",
//         cancelButtonColor: "#FCA5A5",
//         showCancelButton: true,
//         confirmButtonText: 'Yes, ' + type.toLowerCase() + ' it!',
//         cancelButtonText: 'No, cancel!',
//         reverseButtons: true,
//     }).then((result) => {
//         modalStatus = result.isConfirmed
//     })
//     return modalStatus
// }

const menu = ref();
const items = ref([
    {
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => { alert("Refresh") }

            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    // if (modalTwoButton('Are you sure?', 'Are you sure to delete','Delete')) {
                    //     // myproblemCon.deleteProblem(e1)
                    //     // alert("Refresh")
                    // }
                    myproblemCon.deleteProblem(dataCurrent.value.id)
                    visible.value = false
                }
            }
        ]
    }
]);
const toggle = (event) => {
    menu.value.toggle(event);
};
onBeforeMount(async () => {
    if (Object.keys(myproblemCon.problemList).length === 0) {
        await myproblemCon.getAllproblem()
    }
    if (Object.keys(mylearningCon.tagList).length === 0) {
        await mylearningCon.getAllTag()
    }
})

</script>
<template>
    <div class="bg-st-grey font-roboto ">

        <div>
            <p id="logo" class="text-xl opacity-50  ">Problem</p>
            <Dialog v-model:visible="visible" class="" header="Problem" :style="{ width: '50rem', height: '25rem' }"
                :position="'center'" :modal="true" :draggable="false">
                <!-- {{ dataCurrent }} -->

                <div class="grid grid-cols-4">
                    <p class="text-2xl text-st-blue  col-span-2">{{ dataCurrent.name }}</p>
                    <div>
                        <p class="  col-span-1" :class="levelArray[dataCurrent.level - 1]">
                            {{ returnLevel(dataCurrent.level) }}
                        </p>
                        <p class="text-sm text-st-blue ">
                            score : {{ dataCurrent.totalScore }}
                        </p>
                    </div>
                    <div>
                        <button class="pi pi-bars" @click="toggle" />
                        <Menu ref="menu" :model="items" :popup="true" />
                    </div>
                </div>
                <div class=" ">
                    <div class=" ">
                        <span v-for="(tag, index) in dataCurrent.tagProblem"
                            class="inline-flex items-center px-1 rounded-full text-xs font-medium leading-4 bg-slate-100 text-white bg-blue-500 truncate ">
                            {{ tag.tag.topic }}
                        </span>
                    </div>
                </div>
                <div class=" ">
                    <v-md-preview :text="dataCurrent.description"></v-md-preview>
                </div>
                <div class="  right-5 bottom-5 absolute">

                    <buttonvue class="bg-gray-300"
                        @buttonClick="myRouter.push({ name: 'isDo', params: { id: dataCurrent.id } });" :status="false"
                        :name="'Start Problem'"></buttonvue>

                </div>

            </Dialog>
            <div class=" flex ">
                <filterBar :datas="mylearningCon" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>

            </div>
            <div class="p-10 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg drop-shadow-2xl">
             

                <listProblem class="" @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
                    @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id } }); dataCurrent = e1; }"
                    @doProblem="(e1) => { dataCurrent = e1; visible = true }" :datas="test"></listProblem>
            </div>
        </div>
    </div>

</template>
<style scoped>
#logo {

    color: #007AFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Rampart One";
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    /* 28.125% */
}
</style>
