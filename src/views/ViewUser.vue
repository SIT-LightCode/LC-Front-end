<script setup>
import { account } from '../stores/Account';
import filterBar from '../components/viewUser/FilterBar.vue'
import ListUser from '../components/viewUser/ListUser.vue'
import { computed, ref, onBeforeMount } from 'vue';

const myAccount = account()
const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const data = ref([])
const dataCurrent = ref([])

const isFilter = ref(false)
const isEdit = ref(false)
// const filterFunc = (dataFilter) => {
//     console.log(dataFilter);

//     // Check if both tag and level filters are empty
//     if (dataFilter.tag.length == 0 && dataFilter.level == 0) {
//         isFilter.value = false;
//         return;
//     }

//     isFilter.value = true;
//     const selectedTags = new Set(dataFilter.tag);

//     const uniqueProblems = myproblemCon.problemList.reduce((acc, problem) => {
//         let tagsInProblem = []
//         let hasCommonTag = false
//         let hasMatchingLevel = false

//         if (dataFilter.tag.length > 0) {
//             tagsInProblem = problem.tagProblem.map(tagObj => tagObj.tag.id);
//             hasCommonTag = tagsInProblem.some(tag => selectedTags.has(tag));
//         }
//         else {
//             hasCommonTag = true
//         }
//         // Check if the level filter matches
//         if (dataFilter.level != 0) {
//             hasMatchingLevel = problem.level == dataFilter.level;
//         } else hasMatchingLevel = true
//         if (hasCommonTag && hasMatchingLevel) {
//             acc.push(problem);
//         }

//         return acc;
//     }, []);

//     data.value = Array.from(new Set(uniqueProblems));
// };
const test = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myAccount.userList
})


// const inputProblemData = ref({
//     name: prop.data.name, description: prop.data.description
//     , totalScore: prop.data.totalScore, level: prop.data.level, arrayTagId: []
// })

// const editUser = (val) => {
//     if (val != '') {
//         myproblemCon.EditProblem(
//             dataCurrent.value.id,
//             val.arrayTagId,
//             val.name,
//             val.description,
//             val.totalScore,
//             val.level,)
//     }
//     page.value = 'isEdit'
// }


onBeforeMount(async () => {
    await myAccount.GetUser()
    await myAccount.GetUserByEmail()
})


</script>
 
<template>
    <div class="px-10">
        <!-- <div class="" v-if= "page=='isEdit'">
            <editPro @addstatus="(e1)=>{page = e1}"  :learning="mylearningCon" :data=dataCurrent
                @isEditProblem="(e1) => { editProblem(e1) }"></editPro>
        </div> -->
    
        <div class="flex">
            <!-- Filter-->
            <filterBar  @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            <!--  -->
            <ListUser @deleteUser="(id)=>{}" :datas="test"></ListUser>
            <!--  -->
        </div>
        

    </div>
</template>
 
<style>

</style>