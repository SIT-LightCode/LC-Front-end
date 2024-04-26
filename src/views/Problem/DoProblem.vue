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

const myAccount = account()
const myproblemCon = problemCon()
const mylearningCon = learningCon()
const myRouter = useRouter()
const route = useRoute()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const data = ref([])
const dataCurrent = ref([])

const isFilter = ref(false)
const isEdit = ref(false)
const isDo = ref(false)
const page = ref('')

const result = ref('')
const isResult = ref(false)








const isModal = ref(false)

const doSubmit = async (id, answer) => {
    try {
        const data = await myproblemCon.checkAnswer(id, answer)
        result.value = data;
        if (result.value == 0) {
        }
        else {
            isModal.value = true
        }
    } catch (error) {
        console.error(error);
    }
};


onBeforeMount(async () => {
    if(Object.keys(myproblemCon.problemList).length === 0){
        await myproblemCon.getAllproblem()
    }
    if(Object.keys(mylearningCon.tagList).length === 0){
        await mylearningCon.getAllTag()
    }
    if (myproblemCon.problemList.length > 0) {
        const problemCurrent = myproblemCon.problemList.filter(problem => problem.id == route.params.id);
        // dataCurrent.value = problemCurrent[0]
        if (problemCurrent.length > 0) {
            dataCurrent.value = problemCurrent[0]
        } else {

            dataCurrent.value = {}
        }
    }
})

</script>
<template>






    
    <div class="relative max-w-[100%] ">
        <div class="card flex justify-content-center">
            <Dialog v-model:visible="isModal" modal :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }" header="Answer" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :draggable="false">
                <ResultPage :data="result">
                </ResultPage>
            </Dialog>
        </div>
        <div class="">
            <inputAnswer :result="result" :data=dataCurrent
                @addstatus="(e1) => { myRouter.push({ name: 'listProblem' }); result = ''; }"
                @Submit="(e1, e2) => { doSubmit(e1, e2) }"></inputAnswer>
        </div>


    </div>
</template>

<style></style>
