<script setup>

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

const route = useRoute()
const myRouter = useRouter()

const myAccount = account()
const myproblemCon = problemCon()
const mylearningCon = learningCon()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const listProb = ref({})

const isFilter = ref(false)
const isEdit = ref(false)
const isDo = ref(false)
const page = ref('')
const visible = ref(false)
const dataCurrent = ref()
const result = ref('')
const isResult = ref(false)

const editProblem = (val) => {
    if (val != '') {
        myproblemCon.EditProblem(
            dataCurrent.value.id,
            val.arrayTagId,
            val.name,
            val.description,
            val.totalScore,
            val.level,)
    }
    page.value = ''
}

const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
    if (levelArray[id - 1] != undefined) {
        return levelArray[id - 1][0]
    }
}
const menu = ref();
const items = ref([
    {
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    myRouter.push({ name: 'editproblem', params: { id: dataCurrent.value.id } })
                }

            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    myproblemCon.deleteProblem(dataCurrent.value.id)
                    visible.value = false
                    findProblem()
                }
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const findProblem = () => {
    const myprob = myproblemCon.problemList.filter(problem => problem.user.id == myAccount.user.id);
    if (myprob[0] != null) {
        listProb.value = myprob
    } else listProb.value = {}
}

onBeforeMount(async () => {

    if (Object.keys(myproblemCon.problemList).length === 0) {
        await myproblemCon.getAllproblem()
    }
    if (Object.keys(mylearningCon.tagList).length === 0) {
        await mylearningCon.getAllTag()
    }
    if (localStorage.getItem('user') !== '') {
        const user = JSON.parse(localStorage.getItem('user'))
        myAccount.user = user
        await myproblemCon.getSubmissionByUserId(myAccount.user.id)
    }
    findProblem()

})

</script>
<template>
    <div class="max-w-[100%]">
        <div>
            <div class="text-xl opacity-50">
                <button @click="myRouter.push({ name: 'listmyproblem' })"> My Problem </button> > <span
                    class="text-st-blue">{{ route.name
                    }}</span>
            </div>
            <!-- <span style=" color: #007AFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); font-family: Rampart One; font-size: 64px; font-style: normal; line-height: 36px;" class="text-xl opacity-50  ">My Problem</span> -->

            <Dialog v-model:visible="visible" class="" header="Problem" :style="{ width: '50rem', height: '25rem' }"
                :position="'center'" :modal="true" :draggable="false">

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
                        <button class="pi pi-bars" @click="toggle" v-if="dataCurrent.user.id == myAccount.user.id" />
                        <Menu ref="menu" :model="items" :popup="true" />
                    </div>
                </div>
                <div class=" ">
                    <div class=" ">
                        <span v-for="(tag, index) in dataCurrent.tagProblem"
                            class="inline-flex items-center px-1 mx-1 rounded-full text-xs font-medium leading-4 bg-slate-100 text-white bg-blue-500 truncate ">
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

            <div class="p-5 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg ">
                <buttonvue class="bg-gray-300 hover:bg-gray-400" @buttonClick="myRouter.push({ name: 'addproblem' });"
                    :status="false" :name="'Add Problem'"></buttonvue>
                <listProblem class="" @deleteProblem="(e1) => { myproblemCon.deleteProblem(e1) }"
                    @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id } }); dataCurrent = e1; }"
                    @doProblem="(e1) => { dataCurrent = e1; visible = true }" :datas="listProb"></listProblem>
            </div>
        </div>
    </div>
</template>

<style></style>
