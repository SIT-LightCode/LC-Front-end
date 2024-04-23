<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed, ref, onBeforeMount } from 'vue';
import { problemCon } from '../stores/ProblemCon'
import { account } from '../stores/Account'
import { learningCon } from '../stores/LearningCon'
const myAccount = account()
const myProblem = problemCon()
const myRouter = useRouter()
const myTag = learningCon()
const recommendedProblems = ref([]);

onBeforeMount(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  myAccount.user = user;
  await myProblem.getAllproblem();
  await myTag.getAllTag();

//   const userSkills = myAccount.user.skills;
//   const problems = myProblem.problemList.filter(problem => problem.isOfficial === true)
//   console.log(problems);
//   // const solvedProblems = myAccount.user.solvedProblems;

//   const sortedProblems = sortProblemsByRelevance(userSkills, problems);

//   // Filter out solved or in-progress problems
//   // no need since if finished then skil will leveled up

//   recommendedProblems.value = sortedProblems.map(mapProblemToFormat);

//   console.log(recommendedProblems.value);

});

const doPretest = () => {
  if (Object.keys(myProblem.problemList).length > 0) {
    let randonId = Math.ceil(Math.random() * Object.keys(myProblem.problemList).length)

    myRouter.push('/problem/do-problem/'+myProblem.problemList[randonId].id)
  }
}
</script>
 
<template>
    
<div class="bg-st-grey w-screen h-screen fixed flex items-center justify-center">
    <div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
    <div class="flex flex-col items-center">
        <!-- <h1 class="font-rampart font-normal text-[64px] text-st-blue mb-20">Pretest</h1> -->
        <div class=" text-white">
            <h1 class="font-roboto font-normal text-[24px]">Have you ever write javascript?</h1>
            <div class="flex justify-around mt-14">
                <button @click="myRouter.push({ name: 'home' })" class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-red-600">No</button>
                <button @click="doPretest()" class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-green-500">Yes</button>
            </div>
            
        </div>
        <div></div>
    </div>
</div>
</template>
 
<style scoped>

</style>