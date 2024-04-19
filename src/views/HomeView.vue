<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import { account } from '../stores/Account'
import { problemCon } from '../stores/ProblemCon'
import { learningCon } from '../stores/LearningCon'
import IconCheck from '../components/icons/IconCheck.vue'
import IconTooling from '../components/icons/IconTooling.vue'
import filterBar from '../components/problem/FilterBar.vue';
import listProblem from '../components/problem/ListProblem.vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const myRouter = useRouter()
const myAccount = account()
const myProblem = problemCon()
const myTag = learningCon()
const difficulties = ref(['Expert', 'Hard', 'Medium', 'Beginner', 'Easier'])
const levelArray = [['Easier', 'text-st-green'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-st-red'],]
const selectedDiff = ref('No select')

const computedRecomended = computed(() => {
  return recommendedProblems.value.slice(0, 4)
})

function mapLevelToDifficulty(level) {
  switch (level) {
    case 5:
      return 'Expert'
    case 4:
      return 'Hard'
    case 3:
      return 'Medium'
    case 2:
      return 'Beginner'
    case 1:
      return 'Easier'
    default:
      return 'Unknown' // Handle unknown levels if necessary
  }
}

function mapTagIdsToNames(tagIds) {
  return tagIds
    .map((tagId) => {
      const tag = myTag.tagList.find((tag) => tag.id === tagId)
      return tag ? tag.topic : null // Return tag name if found, null otherwise
    })
    .filter((tagName) => tagName !== null) // Filter out null values
}

function mapProblemToFormat(problem) {
  const tags = mapTagIdsToNames(problem.arrayTagId)
  return {
    id: problem.id,
    name: problem.name,
    score: problem.totalScore,
    difficulty: mapLevelToDifficulty(problem.level),
    official: problem.isOfficial,
    tags,
    createdBy: problem.user.name,
    description: problem.description,
  }
}

function calculateRelevance(userSkills, problemTags) {
  let relevance = 0
  problemTags.forEach((problemTag) => {
    userSkills.forEach((userSkill) => {
      if (userSkill.tag.id === problemTag) {
        relevance += userSkill.level
      }
    })
  })
  return relevance
}

// Sort problems by their relevance scores
function sortProblemsByRelevance(userSkills, problems) {
  return problems.sort((a, b) => {
    const relevanceA = calculateRelevance(userSkills, a.arrayTagId)
    const relevanceB = calculateRelevance(userSkills, b.arrayTagId)
    return relevanceA - relevanceB // Sort in asc order
  })
}

const recommendedProblems = ref([])

onBeforeMount(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  myAccount.user = user
  await myProblem.getAllproblem()
  await myTag.getAllTag()

  const userSkills = myAccount.user.skills
  const problems = myProblem.problemList.filter((problem) => problem.isOfficial === true)
  console.log(problems)
  // const solvedProblems = myAccount.user.solvedProblems;

  const sortedProblems = sortProblemsByRelevance(userSkills, problems)

  // Filter out solved or in-progress problems
  // no need since if finished then skil will leveled up

  recommendedProblems.value = sortedProblems.map(mapProblemToFormat)

  console.log(recommendedProblems.value)
})

const indexShow = ref(null)
function hoverDetail(index) {
  if (index === indexShow.value) {
    indexShow.value = null
  } else indexShow.value = index
}

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const dataCurrent = ref([])

const isFilter = ref(false)


const filterFunc = (dataFilter) => {

    // Check if both tag and level filters are empty
    if (dataFilter.tag.keyword == "" && dataFilter.tag.length == 0 && dataFilter.level == 0 && dataFilter.isOfficial == "") {
        isFilter.value = false;
        return;
    }
    let filteredProblem = myProblem.problemList
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
    else return myProblem.problemList
})

</script>

<template>
  <div class="bg-st-grey font-roboto">
    <div class="grid grid-cols-8 gap-5">
      <div class="col-span-6 bg-white flex flex-col gap-5 p-16 drop-shadow-2xl rounded-3xl">
        <svg
          class="w-8 h-8 text-gray-300 absolute right-6 top-5 cursor-pointer hover:text-st-blue transition-all"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <h1 class="font-rampart text-st-blue text-6xl">Hi {{ myAccount.user.name }}</h1>
        <div class="text-base opacity-50">Email:{{ myAccount.user.email }}</div>
      </div>
      <div class="bg-white flex flex-col justify-center items-center drop-shadow-2xl rounded-3xl">
        <div class="text-st-blue text-6xl h-4/6 flex items-center">{{ myAccount.user.score }}</div>
        <div class="text-base opacity-50">Total Score</div>
      </div>
      <div class="bg-white flex flex-col justify-center items-center drop-shadow-2xl rounded-3xl">
        <div class="text-st-blue text-6xl h-4/6 flex items-center">
          {{ myAccount.user.scoreUnOfficial }}
        </div>
        <div class="text-base opacity-50">UnOfficial Score</div>
      </div>
    </div>
    <div class="text-xl opacity-50 mt-20">Recommended Problems</div>
    <div class="grid grid-cols-4 gap-5 mt-10">
      <div
        v-for="(item, index) in computedRecomended"
        class="drop-shadow-2xl bg-white group hover:cursor-pointer hover:bg-st-blue transition-all rounded-3xl px-4 pt-7 pb-20 flex flex-col gap-10 relative"
      >
        <p class="text-2xl text-st-blue group-hover:text-white">{{ item.name }}</p>
        <p class="text-lg text-st-green">{{ item.difficulty }}</p>
        <p class="text-sm text-st-blue group-hover:text-white">{{ item.description }}</p>
        <div>
          <span
            v-for="(tag, index) in item.tags"
            class="bg-st-blue p-1 px-5 text-sm text-white rounded-full group-hover:text-st-blue group-hover:bg-white"
          >
            {{ tag }}
          </span>
        </div>
        <p class="text-sm text-st-blue right-5 bottom-5 absolute group-hover:text-white">
          {{ item.score }}
        </p>
      </div>
    </div>
    <div>
      <p class="text-xl opacity-50 mt-20">All Problems</p>
      <div class=" flex ">
                <filterBar :datas="myTag" @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            </div>
            <div class="p-10 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg drop-shadow-2xl">
                <listProblem class="" @deleteProblem="(e1) => { myProblem.deleteProblem(e1) }"
                    @editProblem="(e1) => { myRouter.push({ name: 'isEdit', params: { id: e1.id } }); dataCurrent = e1; }"
                    @doProblem="(e1) => { myRouter.push({ name: 'isDo', params: { id: e1.id } }); dataCurrent = e1 }"
                    :datas="test"></listProblem>
            </div>
      <!-- <div class="mt-10 flex">
        <div class="relative flex w-72">
          <input placeholder="Problem Search" class="rounded-3xl px-4 py-1 w-full text-lg" />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-[24px] h-[24px] absolute right-3 top-1 opacity-50 text-lg"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div class="flex items-center gap-2 ml-5">
          <p class="text-lg text-st-blue">Difficulty Level:</p>
          <select v-model="selectedDiff" class="border-none rounded-3xl px-4 py-1 w-36 text-lg">
            <option disabled value="No select" class="">No select</option>
            <option v-for="difficulty in difficulties" class="">{{ difficulty }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2 ml-5">
          <p class="text-lg text-st-blue">Official Problem:</p>
          <select v-model="selectedDiff" class="border-none rounded-3xl px-4 py-1 w-36 text-lg">
            <option disabled value="No select" class="">No select</option>
            <option v-for="difficulty in difficulties" class="">{{ difficulty }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2 ml-5">
          <p class="text-lg text-st-blue">Select tag:</p>
          <select v-model="selectedDiff" class="border-none rounded-3xl px-4 py-1 w-36 text-lg">
            <option disabled value="No select" class="">No select</option>
            <option v-for="difficulty in difficulties" class="">{{ difficulty }}</option>
          </select>
        </div>
      </div>
      <div class="p-10 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg drop-shadow-2xl">
        <div class="grid grid-cols-4 border-b-2 pb-2">
          <p class="text-st-blue">Name</p>
          <p class="text-st-blue">Official Problem</p>
          <p class="text-st-blue">Score</p>
          <p class="text-st-blue">Difficulty</p>
        </div>
        <div v-for="problem in myProblem.problemList" class="grid grid-cols-4">
          <p class="">{{ problem.name }}</p>
          <p class="">{{ problem.isOfficial }}</p>
          <p class="">{{ problem.totalScore }}</p>
          <p class="" :class="levelArray[problem.level - 1]">{{ mapLevelToDifficulty(problem.level)}}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style></style>
