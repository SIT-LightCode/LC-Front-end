<script setup>

import inputAnswer from '../../components/answerproblem/InputAnswer.vue';
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
const recommendedProblems = ref()







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
    if (Object.keys(myproblemCon.problemList).length === 0) {
        await myproblemCon.getAllproblem()
    }
    if (Object.keys(mylearningCon.tagList).length === 0) {
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
// onBeforeMount(async () => {
//   const user = JSON.parse(localStorage.getItem('user'))
//   myAccount.user = user;
//   await myProblem.getAllproblem();
//   await myTag.getAllTag();

//   const userSkills = myAccount.user.skills;
//   let problems = myProblem.problemList.filter(problem => problem.isOfficial === true)
//   problems = problems.filter(problem => problem.level === 3)
//   console.log(problems);
//   // const solvedProblems = myAccount.user.solvedProblems;

//   // const sortedProblems = sortProblemsByRelevance(userSkills, problems);

//   // Filter out solved or in-progress problems
//   // no need since if finished then skil will leveled up

//   // recommendedProblems.value = sortedProblems.map(mapProblemToFormat);
//   recommendedProblems.value = problems.map(mapProblemToFormat);

//   console.log(recommendedProblems.value);

// });

const doPretest = (status) => {
    if (status) {

        if (Object.keys(myproblemCon.problemList).length > 0) {
            isModal.value = false
            let problems = myproblemCon.problemList.filter(problem => problem.isOfficial === true)
            problems = problems.filter(problem => problem.level === dataCurrent.value.level + 1)
            // recommendedProblems.value = problems
            if (problems.length > 0) {

                myRouter.push({ name: "dopretest", params: { id: problems[0].id } })
                dataCurrent.value = problems[0]

            } else {
                myRouter.push({ name: "congratulations" })
            }

        }
    } else {
        myRouter.push({ name: "lightcode" })
    }


}
</script>
<template>
    <div class="flex flex-col p-20  max-w-[100%] min-h-screen">

        <div class="">

            <div class="relative  ">
                <div class="card flex justify-content-center">
                    <Dialog v-model:visible="isModal" modal :pt="{
                        root: 'border-none',
                        mask: {
                            style: 'backdrop-filter: blur(2px)'
                        }
                    }" header="Answer" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                        :draggable="false">
                        <ResultPage @addstatus="(e1) => {
                        doPretest(e1)
                    }" :data="result" :status="true"
                    :dataProblem="dataCurrent"
                    >
                        </ResultPage>
                    </Dialog>
                </div>
                <div class="">
                    <inputAnswer :result="result" :data=dataCurrent
                        @addstatus="(e1) => { myRouter.push({ name: 'list', params: { tagid: 0, lessonid: 0 } }); result = ''; }"
                        @Submit="(e1, e2) => { doSubmit(e1, e2) }"></inputAnswer>
                </div>
            </div>

        </div>


    </div>



</template>

<style></style>
