<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import { account } from '../stores/Account'
import { problemCon } from '../stores/ProblemCon'
import { learningCon } from '../stores/LearningCon'
import IconCheck from '../components/icons/IconCheck.vue'
import IconTooling from '../components/icons/IconTooling.vue'
import filterBar from '../components/problem/FilterBar.vue'
import listProblem from '../components/problem/ListProblem.vue'
import { useRoute, useRouter } from 'vue-router'
import Setting from '../components/settingmodal/Setting.vue'
import Dialog from 'primevue/dialog';
import buttonvue from '../components/button/Button.vue'

const route = useRoute()
const myRouter = useRouter()
const myAccount = account()
const myProblem = problemCon()
const myTag = learningCon()
const difficulties = ref(['Expert', 'Hard', 'Medium', 'Beginner', 'Easier'])
const levelArray = [['Easier', 'text-green-400'], ['Beginner', 'text-st-green'], ['Medium', 'text-[#FEC84B]'], ['Hard', 'text-st-red'], ['Expert', 'text-red-400'],]

const selectedDiff = ref('No select')
// const userRank = ref(0)
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

function mapDifficultyToLevel(level) {
  switch (level) {
    case 'Expert':
      return 5
    case 'Hard':
      return 4
    case 'Medium':
      return 3
    case 'Beginner':
      return 2
    case 'Easier':
      return 1
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

const sortedProblemsComputed = computed(() => {
  const userSkills = myAccount.user.skills
  // Assuming `problemList` updates reactively, filter will re-run when it changes.
  const problems = myProblem.problemList.filter((problem) => problem.isOfficial === true)

  const sortedProblems = sortProblemsByRelevance(userSkills, problems)

  // mapProblemToFormat can be adjusted according to your needs
  return sortedProblems.map(mapProblemToFormat)
})

onBeforeMount(async () => {
  if (localStorage.getItem('user') != null) {
    myAccount.user = JSON.parse(localStorage.getItem('user'))
  }

  await myProblem.getAllproblem()
  await myTag.getAllTag()
  await myProblem.getSubmissionByUserId(myAccount.user.id)
  if (Object.keys(myAccount.scoreboard).length === 0) {
    await myAccount.GetBoard()
    if (Object.keys(myAccount.scoreboard).length > 0) {

      userRank.value = myAccount.scoreboard.findIndex(i => i.id == myAccount.user.id);
    } else userRank.value = 0
    // for (let i = 0; i < 3; i++) {
    //   scoreBoard.value.push(myAccount.scoreboard[i]);
    // }


  }

  //data in
  //myProblem.problemResolved
  //data structure is [problem :{id: 123}, problem :{id: 124}]
  recommendedProblems.value = sortedProblemsComputed.value
})

const indexShow = ref(null)
function hoverDetail(index) {
  if (index === indexShow.value) {
    indexShow.value = null
  } else indexShow.value = index
}

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const dataCurrent = ref([])
const data = ref()

const isFilter = ref(false)

const filterFunc = (dataFilter) => {
  // Check if both tag and level filters are empty
  if (
    dataFilter.tag.keyword == '' &&
    dataFilter.tag.length == 0 &&
    dataFilter.level == 0 &&
    dataFilter.isOfficial == ''
  ) {
    isFilter.value = false
    return
  }
  let filteredProblem = myProblem.problemList
  if (dataFilter.keyword !== '') {
    filteredProblem = filteredProblem.filter((problem) => {
      if (problem.name.includes(dataFilter.keyword)) {
        return problem
      }
    })
  }
  isFilter.value = true
  const uniqueProblems = filteredProblem.reduce((acc, problem) => {
    let tagsInProblem = []
    let hasCommonTag = false
    let hasMatchingLevel = false
    let hasMatchingOffice = false
    if (dataFilter.tag != '') {
      tagsInProblem = problem.tagProblem.map((tagObj) => tagObj.tag.id)
      for (let i in tagsInProblem) {
        if (tagsInProblem[i].toString() == dataFilter.tag.toString()) {
          hasCommonTag = true
        }
      }
    } else {
      hasCommonTag = true
    }
    // Check if the level filter matches
    if (dataFilter.level != 0) {
      hasMatchingLevel = problem.level == dataFilter.level
    } else {
      hasMatchingLevel = true
    }

    if (dataFilter.isOfficial != '') {
      if (problem.isOfficial != null) {
        if (dataFilter.isOfficial == problem.isOfficial.toString()) {
          hasMatchingOffice = true
        }
      }
    } else {
      hasMatchingOffice = true
    }

    if (hasCommonTag && hasMatchingLevel && hasMatchingOffice) {
      acc.push(problem)
    }
    return acc
  }, [])

  data.value = Array.from(new Set(uniqueProblems))
}
const test = computed(() => {
  if (isFilter.value) {
    return data.value
  } else return myProblem.problemList
})

const scoreBoard = computed(() => {
  if (Object.keys(myAccount.scoreboard).length > 0) {
    return myAccount.scoreboard.slice(0, 5)
  } else return [{ name: '-', email: '-', score: 0 }]
})

const userRank = computed(() => {

  if (Object.keys(myAccount.scoreboard).length > 0) {
    let index = myAccount.scoreboard.findIndex(i => i.id == myAccount.user.id)
    if (index >= 0) {
      return userRank.value = index + 1
    }
    else return userRank.value = 0

  }


})

const visible = ref(false)
const visibleProblem = ref(false)
const position = ref('center');

const returnLevel = (id) => {
  if (levelArray[id - 1] != undefined) {
    return levelArray[id - 1][0]
  }
}
</script>

<template>
  <div class="bg-st-grey ">
    <Dialog v-model:visible="visible" header="Setting" :style="{ width: '25rem' }" :position="position" :modal="true">
      <Setting @CloseModal="visible = false"></Setting>
    </Dialog>
    <Dialog v-model:visible="visibleProblem" class="" header="Problem" :style="{ width: '50rem', height: '25rem' }"
      :position="'center'" :modal="true" :draggable="false">

      <div class="grid grid-cols-4">
        <p class="text-2xl text-st-blue  col-span-2">{{ dataCurrent.name }}</p>
        <div>
          <p class="  col-span-1" :class="levelArray[mapDifficultyToLevel(dataCurrent.difficulty) - 1]">
            {{ dataCurrent.difficulty }}
          </p>
          <p class="text-sm text-st-blue ">
            score : {{ dataCurrent.score }}
          </p>
        </div>
        <div>
          <!-- <button class="pi pi-bars" @click="toggle" v-if="dataCurrent.user.id == user.id" />
                        <Menu ref="menu" :model="items" :popup="true" /> -->
        </div>
      </div>
      <div class=" ">
        <div class=" ">
          <span v-for="(tag, index) in dataCurrent.tags"
            class="inline-flex items-center px-1 mx-1 rounded-full text-xs font-medium leading-4 bg-slate-100 text-white bg-blue-500 truncate ">
            {{ tag }}
          </span>
        </div>
      </div>
      <div class=" ">
        <v-md-preview :text="dataCurrent.description"></v-md-preview>
      </div>
      <div class="  right-5 bottom-5 absolute">
        <buttonvue class="bg-gray-300" @buttonClick="myRouter.push({ name: 'isDo', params: { id: dataCurrent.id } });"
          :status="false" :name="'Start Problem'"></buttonvue>
      </div>
    </Dialog>





    
    <div class="grid grid-cols-8 gap-5">
      <div class="bg-white flex flex-col justify-center items-center drop-shadow-2xl rounded-3xl p-5 ">
        <div class="text-st-blue  text-3xl h-4/6 flex items-center">
          {{ userRank }}
        </div>
        <div class="text-sm opacity-50 ">Rank#</div>
      </div>
      <div class="col-span-5 bg-white flex flex-col gap-5 p-16 drop-shadow-2xl rounded-3xl">
        <svg class="w-8 h-8 text-gray-300 absolute right-6 top-5 cursor-pointer hover:text-st-blue transition-all"
          @click="visible = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd"
            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clip-rule="evenodd" />
        </svg>
        <h1 class="font-rampart text-st-blue text-6xl truncate">Hi {{ myAccount.user.name }}</h1>
        <div class="text-base opacity-50">Email:{{ myAccount.user.email }}</div>
      </div>
      <div class="col-span-2 bg-white flex flex-col justify-center items-center drop-shadow-2xl rounded-3xl p-5">
        <div class="text-sm opacity-50 ">Score</div>
        <div class="text-st-blue text-3xl h-4/6 flex items-center">{{
      myAccount.user.score }}</div>
        <div class="text-sm opacity-50 ">System Problem Score</div>
        <div class="text-st-blue text-3xl h-4/6 flex items-center">{{
      myAccount.user.scoreUnOfficial }}</div>
        <div class="text-sm opacity-50 ">User Problem Score
        </div>
      </div>


    </div>
    <div>
      <div class="text-xl opacity-50 mt-20"> Score Board
      </div>

      <div class="p-5  rounded-3xl flex flex-col gap-4 text-base	bg-white">
        <div class="grid grid-cols-3 border-b-2 pb-2 text-center">
          <p class="text-st-blue">Rank</p>
          <p class="text-st-blue">Name</p>
          <p class="text-st-blue">Score</p>
        </div>
        <div v-for="(user, key) in scoreBoard" class="grid grid-cols-3 p-1  rounded-lg	text-base	text-center">
          <p class="truncate ">{{ key + 1 }}</p>
          <p class="truncate ">{{ user.name }}</p>
          <p class="truncate ">{{ user.score }}</p>
        </div>


      </div>
    </div>










    <div class="text-xl opacity-50 mt-20">Recommended Problems</div>
    <div class="grid grid-cols-4 gap-5 mt-10">
      <div v-for="(item, index) in computedRecomended"
        class="drop-shadow-2xl bg-white group hover:cursor-pointer hover:bg-gray-200 transition-all rounded-3xl px-4 pt-7 pb-20 flex flex-col gap-10 relative"
        @click="dataCurrent = item; visibleProblem = true">
        <p class="text-2xl text-st-blue truncate">{{ item.name }}</p>
        <p class="text-lg " :class="levelArray[mapDifficultyToLevel(item.difficulty) - 1]">
          <b>{{ item.difficulty }}</b>
        </p>
        <p class="text-sm text-st-blue  truncate">{{ item.description }}</p>
        <div class="truncate">
          <span v-for="(tag, index) in item.tags" class="bg-st-blue p-1 text-sm text-white rounded-full ">
            {{ tag }}
          </span>
        </div>
        <p class="text-sm text-st-blue right-5 bottom-5 absolute ">
          {{ item.score }}
        </p>
      </div>
    </div>
    <!-- <div>
      <p class="text-xl opacity-50 mt-10">All Problems</p>
      <filterBar :datas="myTag" @filterValue="(e1) => {
      filterFunc(e1)
    }
      "></filterBar>
      <div class="p-5 bg-white mt-10 rounded-3xl flex flex-col gap-4 text-lg ">
        <listProblem class="" @deleteProblem="(e1) => {
      myProblem.deleteProblem(e1)
    }
      " @editProblem="(e1) => {
      myRouter.push({ name: 'isEdit', params: { id: e1.id } })
      dataCurrent = e1
    }
      " @doProblem="(e1) => {
      // myRouter.push({ name: 'isDo', params: { id: e1.id } })
      dataCurrent = e1; visibleProblem = true
    }
      " :datas="test"></listProblem>
      </div>


    </div> -->
  </div>
</template>

<style></style>
