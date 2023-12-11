import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'

import * as gql from 'gql-query-builder'

// const mymodal = modalSwal()
const myconnectBackend = connectBackend()

export const learningCon = defineStore('learningCon', () => {
  let tagList = ref({})

  const getAllTag = async () => {
    let querys = gql.query(
      {
        operation: 'getTag',
        fields: ['id', 'topic', 'description', { lesson: ['id', 'name', 'content'] }],
      },
      undefined,
      {
        operationName: 'GetTag',
      },
    )

    await myconnectBackend.connectBack(querys).then(async (data) => {
      if (data != '') {
        tagList.value = data['data']['getTag']
      }
    })
  }

  const addContent = async (querys) => {
    await myconnectBackend.connectBack(querys).then((res) => {
      if (res != '') {
        getAllTag()
        toast.success('Lesson has been created')
        //mymodal.modalNormal('Complete!', 'this operation is success.', 'success')
      }
    })
  }

  const deleteContent = async (querys) => {
    myconnectBackend.connectBack(querys).then((res) => {
      if (res != '') {
        getAllTag()
        toast.success('Lesson has been deleted')
        //mymodal.modalNormal('Deleted!', 'This Content has been deleted.', 'success')
      }
    })
  }

  return { tagList, getAllTag, addContent, deleteContent }
})
