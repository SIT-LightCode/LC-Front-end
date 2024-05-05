<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed, ref, onBeforeMount } from 'vue';
import { problemCon } from '../stores/ProblemCon'
import { account } from '../stores/Account'
import { learningCon } from '../stores/LearningCon'
import Loading from '../components/main/Loading.vue'

const myAccount = account()
const myProblem = problemCon()
const myRouter = useRouter()
const myTag = learningCon()
const recommendedProblems = ref([]);
const isLoading = ref(false)

function mapLevelToDifficulty(level) {
  switch (level) {
    case 5:
      return 'Expert';
    case 4:
      return 'Hard';
    case 3:
      return 'Medium';
    case 2:
      return 'Beginner';
    case 1:
      return 'Easier';
    default:
      return 'Unknown'; // Handle unknown levels if necessary
  }
}

function mapTagIdsToNames(tagIds) {
  return tagIds.map(tagId => {
    const tag = myTag.tagList.find(tag => tag.id === tagId);
    return tag ? tag.topic : null; // Return tag name if found, null otherwise
  }).filter(tagName => tagName !== null); // Filter out null values
}

function mapProblemToFormat(problem) {
  const tags = mapTagIdsToNames(problem.arrayTagId);
  return {
    id: problem.id,
    name: problem.name,
    score: problem.totalScore,
    difficulty: mapLevelToDifficulty(problem.level),
    official: problem.isOfficial,
    tags,
    createdBy: problem.user.name,
    description: problem.description
  };
}

function calculateRelevance(userSkills, problemTags) {
  let relevance = 0;
  problemTags.forEach(problemTag => {
    userSkills.forEach(userSkill => {
      if (userSkill.tag.id === problemTag) {
        relevance += userSkill.level;
      }
    });
  });
  return relevance;
}

// Sort problems by their relevance scores
function sortProblemsByRelevance(userSkills, problems) {
  return problems.sort((a, b) => {
    const relevanceA = calculateRelevance(userSkills, a.arrayTagId);
    const relevanceB = calculateRelevance(userSkills, b.arrayTagId);
    return relevanceA - relevanceB; // Sort in asc order
  });
}



onBeforeMount(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  myAccount.user = user;
  await myProblem.getAllproblem();
  await myTag.getAllTag();

  const userSkills = myAccount.user.skills;
  const problems = myProblem.problemList.filter(problem => problem.isOfficial === true)
  console.log(problems);
  // const solvedProblems = myAccount.user.solvedProblems;

  const sortedProblems = sortProblemsByRelevance(userSkills, problems);

  // Filter out solved or in-progress problems
  // no need since if finished then skil will leveled up

  recommendedProblems.value = sortedProblems.map(mapProblemToFormat);

  console.log(recommendedProblems.value);

});

const doPretest = () => {
  isLoading.value = true
  if (Object.keys(myProblem.problemList).length > 0 && recommendedProblems.value.length > 0) {
    console.log(recommendedProblems.value)
    let randonId = Math.ceil(Math.random() * recommendedProblems.value.length)
    isLoading.value = false
    myRouter.push('/problem/do-problem/' + recommendedProblems.value[randonId].id)
  } else {
    isLoading.value = false
    myRouter.push({ name: "lightcode" })
  }

}
const isQuestion = ref(false)
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
      <div class=" text-white" v-if="!isQuestion">
        <h1 class="font-roboto font-normal text-[24px]">Have you ever write javascript?</h1>
        <div class="flex justify-around mt-14">
          <button @click="myRouter.push({ name: 'home' })"
            class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-red-600">No</button>
          <button @click="isQuestion = true"
            class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-green-500">Yes</button>
        </div>
      </div>
      <div class=" text-white" v-else>
        <h1 class="font-roboto font-normal text-[24px]">Let's do some recommended problem?</h1>
        <div class="flex justify-around mt-14">
          <button @click="myRouter.push({ name: 'home' })"
            class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-red-600">No</button>
          <button @click="doPretest()"
            class="font-roboto font-normal text-[24px] hover:text-[100px] duration-1000 transition-all hover:animate-wiggle hover:text-green-500">Yes</button>
        </div>
      </div>
      <div></div>
    </div>

  </div>
</template>

<style scoped></style>