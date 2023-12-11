<script setup>
import filterBar from '../components/problem/FilterBar.vue';
import listProblem from '../components/problem/ListProblem.vue';
import { problemCon } from '../stores/ProblemCon';
import { computed, ref, onBeforeMount } from 'vue';
const myproblemCon = problemCon()

const filter = ref({ tag: [], level: 0, ScroceMax: 0, ScroceMin: 0 })
const data = ref([])
const isFilter = ref(false)



const filterFunc = (dataFilter) => {
    let uniq = []
    if (dataFilter.tag.length > 0) {
        isFilter.value = true
        console.log(dataFilter.tag)
        for (let i in myproblemCon.problemList) {
            for (let k in myproblemCon.problemList[i].tagProblem) {
                for (let j in dataFilter.tag) {
                    if (myproblemCon.problemList[i].tagProblem[k].tag.id == dataFilter.tag[j]) {
                        uniq.push(myproblemCon.problemList[i])
                    }
                }
            }
        }
        data.value = uniq.filter(function (item, pos) {
            return uniq.indexOf(item) == pos;
        })
    } else isFilter.value = false

}


const test = computed(() => {
    if (isFilter.value) {
        return data.value
    }
    else return myproblemCon.problemList
})

onBeforeMount(async () => {
    await myproblemCon.getAllproblem()
})


</script>
<template>
    <div class="w3-center">
        <div class="flex">
            <!-- Filter-->
            <filterBar @filterValue="(e1) => { filterFunc(e1); }"></filterBar>
            <!--  -->

            <listProblem :datas="test"></listProblem>
            <!--  -->

        </div>

    </div>
</template>
 
<style></style>
