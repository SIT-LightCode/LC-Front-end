<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed, ref, onBeforeMount } from 'vue';
import { problemCon } from '../../stores/ProblemCon'
import { account } from '../../stores/Account'
import { learningCon } from '../../stores/LearningCon'
import Loading from '../../components/main/Loading.vue'

const myAccount = account()
const myProblem = problemCon()
const myRouter = useRouter()
const myTag = learningCon()
const recommendedProblems = ref([]);
const isLoading = ref(false)

// function mapLevelToDifficulty(level) {
//   switch (level) {
//     case 5:
//       return 'Expert';
//     case 4:
//       return 'Hard';
//     case 3:
//       return 'Medium';
//     case 2:
//       return 'Beginner';
//     case 1:
//       return 'Easier';
//     default:
//       return 'Unknown'; // Handle unknown levels if necessary
//   }
// }

// function mapTagIdsToNames(tagIds) {
//   return tagIds.map(tagId => {
//     const tag = myTag.tagList.find(tag => tag.id === tagId);
//     return tag ? tag.topic : null; // Return tag name if found, null otherwise
//   }).filter(tagName => tagName !== null); // Filter out null values
// }

// function mapProblemToFormat(problem) {
//   const tags = mapTagIdsToNames(problem.arrayTagId);
//   return {
//     id: problem.id,
//     name: problem.name,
//     score: problem.totalScore,
//     difficulty: mapLevelToDifficulty(problem.level),
//     official: problem.isOfficial,
//     tags,
//     createdBy: problem.user.name,
//     description: problem.description
//   };
// }

// function calculateRelevance(userSkills, problemTags) {
//   let relevance = 0
//   problemTags.forEach((problemTag) => {
//     userSkills.forEach((userSkill) => {
//       if (userSkill.tag.id === problemTag) {
//         relevance += userSkill.level
//       }
//     })
//   })
//   return relevance
// }

// // Sort problems by their relevance scores
// function sortProblemsByRelevance(userSkills, problems) {
//   let result = problems.sort((a, b) => {
//     const relevanceA = calculateRelevance(userSkills, a.arrayTagId)
//     const relevanceB = calculateRelevance(userSkills, b.arrayTagId)
//     if (relevanceA === relevanceB) {
//       // When userSkills is empty or relevance scores are the same, sort by number of tags (ascending)
//       return a.arrayTagId.length - b.arrayTagId.length;
//     }
//     return relevanceA - relevanceB // Sort in asc order
//   })
//   console.log("result", result);
//   return result
// }


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

// const doPretest = () => {
//   isLoading.value = true
//   console.log(Object.keys(myProblem.problemList).length > 0 && recommendedProblems.value.length > 0)

//   if (Object.keys(myProblem.problemList).length > 0 && recommendedProblems.value.length > 0) {
//     isLoading.value = false
//     myRouter.push({ name: "dopretest" ,params:{id:recommendedProblems.value[0].id}})

//   } else {
//     isLoading.value = false
//     myRouter.push({ name: "lightcode" })
//   }

// }
// const isQuestion = ref(false)
</script>

<template>

  <div class="bg-st-grey w-screen h-screen fixed flex items-center justify-center">
    <div class="w-screen h-screen fixed z-[100000] bg-white top-0 right-0 opacity-50 "
      :class="[isLoading ? 'visible' : 'invisible']">
      <Loading class="fixed right-[50%] top-[50%]  z-[100000]" />
    </div>
    <div class="area ">
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
        <h1 class="font-roboto font-normal text-[24px]">Congratulation!! you can clear all pretest problem ?</h1>
        <div class="flex justify-around mt-14">
          <button @click="myRouter.push({ name: 'home' })"
            class="font-roboto font-normal text-[24px] hover:text-[30px] duration-1000 transition-all hover:animate-wiggle hover:text-red-600">Go to home page</button>
          <button  @click="myRouter.push('/learning/list/' + 0 + '/' + 0)"
            class="font-roboto font-normal text-[24px] hover:text-[30px] duration-1000 transition-all hover:animate-wiggle hover:text-green-500">Go to learning page</button>
        </div>
      </div>
      
    </div>

  </div>
</template>

<style scoped></style>