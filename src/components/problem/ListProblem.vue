<script setup>
import buttonVue from '../button/Button.vue';
import { useRouter } from 'vue-router'
import { account } from '../../stores/Account';
import IconAdd from '../icons/IconAdd.vue'

const myRouter = useRouter()
const myAccount = account()
const emit = defineEmits(['deleteProblem', 'editProblem'])

const prop = defineProps({
    datas: Object,
})
const colorTags = ['bg-[#ff6961]', 'bg-[#ffb480]', 'bg-[#f8f38d]', 'bg-[#42d6a4]', 'bg-[#08cad1]', 'bg-[#59adf6]', 'bg-[#9d94ff]', 'bg-[#c780e8]']
const levelArray = [['Easier', 'text-[#2dc937]'], ['Beginner', 'text-[#99c140]'], ['Medium', 'text-[#e7b416]'], ['Hard', 'text-[#db7b2b]'], ['Expert', 'text-[#cc3232]'],]

const returnLevel = (id) => {
    if (levelArray[id - 1] != undefined) {
        return levelArray[id - 1][0]
    }
}
</script>
 
<template>
    <div class="flex-1" style="overflow-y: auto; max-height: 100vh">
        <!-- First Photo Grid-->

        <div class="grid grid-cols-3 gap-3 ">
            <div v-for="i in datas" class="border  rounded-lg border-zinc-950">
                <div
                    class="block h-64 rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                    <div class="p-6 ">
                        <h5 class="mb-1 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {{ i.name }}
                        </h5>

                        <p class="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                        <div class="mb-4 text-base">
                            <div> Scroce: {{ i.totalScore }}</div>
                            <div v-if="i.level > 0 && i.level < 6" :class="levelArray[i.level - 1]"> Difficulty: {{
                                returnLevel(i.level) }}
                            </div>
                            <div> Official Problem: {{ i.isOfficial }}</div>

                        </div>
                        </p>
                        <span v-for="t in i.tagProblem"
                            class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4  text-gray-800"
                            :class="colorTags[(t.tag.id - 1) % 8]">{{ t.tag.topic }} </span>
                    </div>
                </div>
                <div class="flex justify-end m-5">
                    <buttonVue @buttonClick="() => $emit('doProblem', i)" :name="'do'">
                    </buttonVue>
                    <buttonVue v-if="myAccount.user.authorities.includes('ADMIN')"
                        @buttonClick="() => $emit('deleteProblem', i.id)" :name="'delete'">
                    </buttonVue>
                    <buttonVue v-if="myAccount.user.authorities.includes('ADMIN')"
                        @buttonClick="() => $emit('editProblem', i)" :name="'edit'">
                    </buttonVue>
                </div>
            </div>

            <IconAdd @click="myRouter.push({ name: 'addProblem' })"
                class="fixed transition right-6 bottom-6 w-20 h-20 hover:text-blue-500 hover:cursor-pointer" />

        </div>
        <!--  -->
    </div>
</template>
 
<style></style>
