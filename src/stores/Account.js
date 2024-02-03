import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
export const account = defineStore('account', () => {
    const user = ref({name:'AAAAA',email:'',authorities:['USER'],Score : 100 ,Ranking : 1 , Passed : 100})
    // const user = ref({name:'',role:'User'})

    return { user }
})

