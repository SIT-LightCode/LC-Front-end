<script setup>
import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../stores/Account'
import { problemCon } from '../stores/ProblemCon'
import { learningCon } from '../stores/LearningCon'
import IconCheck from '../components/icons/IconCheck.vue'
const myAccount = account()
const myProblem = problemCon()
const myTag = learningCon()

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

const recommendedProblems = ref([]);

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

const indexShow = ref(null)
function hoverDetail(index) {
  if (index === indexShow.value) {
    indexShow.value = null
  } else
    indexShow.value = index
}

</script>

<template>
  <div class="flex flex-col items-center px-10 ">
    <!-- Recommended -->
    <h1 class="text-3xl mt-16">Recommended Problems</h1><br>
    <p class="flex justify-center gap-5">
    <div :onmouseenter="() => { hoverDetail(index) }" :onmouseleave="() => { hoverDetail(index) }"
      v-for="(item, index) in recommendedProblems.slice(0, 3)" :key="index"
      :class="`hover:cursor-pointer rounded-lg text-white w-72  p-5 relative hover:scale-110 transition-all ` + (index === indexShow ? `bg-gray-800 z-[200000]` : ` bg-gray-700 h-[200px]`)">
      <IconCheck class="absolute right-5 text-lime-500 top-6" />
      <p class="text-3xl">{{ item.name }}</p>
      <p>score: {{ item.score }}</p>
      <p>difficulty: {{ item.difficulty }}</p>
      <p>by: {{ item.createdBy }}</p>
      tags: <p v-for="tag in item.tags"
        class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 bg-slate-100 text-gray-800 space-">
        {{ tag }}</p>
      <div class="line-clamp-4" v-if="index === indexShow">{{ item.description }}</div>
    </div>
    </p>
  </div>
</template>

<style></style>
