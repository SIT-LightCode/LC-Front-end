import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { modalSwal } from './Modal.js'
import { connectBackend } from './ConnectBackend.js'
import { Toaster, toast } from 'vue-sonner'
import { account } from './Account.js'
import { useRoute, useRouter } from 'vue-router'

import * as gql from 'gql-query-builder'

export const problemCon = defineStore('problemCon', () => {
  let problemList = ref([])
  let problemResolved = ref([])
  const myAccount = account()
  const myRouter = useRouter()
  const mymodal = modalSwal()
  const myconnectBackend = connectBackend()

  const getAllproblem = async () => {
    let querys = gql.query(
      {
        operation: 'getProblem',
        fields: [
          'id',
          'name',
          {
            tagProblem: ['id', { tag: ['id', 'topic', 'description'] }],
          },
          'description',
          'exampleParameter',
          { example: ['id', 'input', 'output'] },
          'level',
          'totalScore',
          'isOfficial',
          { user: ['id', 'name', 'email'] },
        ],
      },
      undefined,
      {
        operationName: 'GetProblem',
      },
    )
    myconnectBackend.connectBack(querys).then(async (data) => {
      if (data != '') {
        problemList.value = data['data']['getProblem']
        data['data']['getProblem'].forEach(async (dataTag, id) => {
          let arrayTagId = []
          dataTag.tagProblem.forEach((dataTagListc, idlist) => {
            arrayTagId.push(dataTagListc.tag.id)
          })
          problemList.value[id].arrayTagId = arrayTagId
        })
      }
    })
  }

  const AddProblem = async (
    tagProblem,
    nameProblem,
    descriptionProblem,
    solutionProblem,
    exampleParameterProblem,
    totalScoreProblem,
    levelProblem,
  ) => {
    let isOfficial = myAccount.user.authorities.includes('ADMIN')
    console.log(myAccount.user.authorities.includes('ADMIN'))
    const query = gql.mutation(
      {
        operation: 'upsertProblem',
        variables: {
          id: { type: 'Int', value: null },
          arrayTagId: { value: `[${tagProblem.sort()}]` },
          name: { value: nameProblem },
          description: { value: descriptionProblem },
          solution: { value: solutionProblem },
          exampleParameter: { value: JSON.stringify(exampleParameterProblem) },
          level: { value: parseInt(levelProblem) },
          totalScore: { value: parseInt(totalScoreProblem) },
          isOfficial: { type: 'Boolean', value: isOfficial },
        },
        fields: ['id', 'name', 'description', 'solution', 'level', 'totalScore', 'isOfficial'],
      },
      undefined,
      {
        operationName: 'UpsertProblem ',
      },
    )

    toast.info('Creating problem...')
    myconnectBackend.connectBack(query).then(async (data) => {
      if (data['data'] != undefined) {
        toast.success('Problem has been created')
        // mymodal.modalNormal(
        //   "Complete!",
        //   "this operation is success.",
        //   "success"
        // );
        getAllproblem()
      } else {
        toast.error('There was an issue creating the problem.')
      }
    })
  }

  const deleteProblem = async (id) => {
    console.log(id)
    let query = gql.mutation(
      {
        operation: 'removeProblem',
        variables: {
          id: { type: 'Int!', value: id },
        },
      },
      undefined,
      {
        operationName: 'RemoveProblem',
      },
    )
    myconnectBackend.connectBack(query).then((res) => {
      if (res != '') {
        getAllproblem()
        toast.success('Problem has been deleted')
        //mymodal.modalNormal('Deleted!', 'This Content has been deleted.', 'success')
      }
    })
  }

  const EditProblem = async (
    tagId,
    tagProblem,
    nameProblem,
    descriptionProblem,
    totalScoreProblem,
    levelProblem,
  ) => {
    console.log(tagId)
    const query = gql.mutation(
      {
        operation: 'upsertProblem',
        variables: {
          id: { type: 'Int', value: tagId },
          arrayTagId: { value: `[${tagProblem.sort()}]` },
          name: { value: nameProblem },
          description: { value: descriptionProblem },
          level: { value: parseInt(levelProblem) },
          totalScore: { value: parseInt(totalScoreProblem) },
        },
        fields: ['id', 'name', 'description', 'solution', 'level', 'totalScore'],
      },
      undefined,
      {
        operationName: 'UpsertProblem ',
      },
    )
    myconnectBackend.connectBack(query).then(async (data) => {
      if (data['data'] != undefined) {
        toast.success('Problem has been edit')
        // mymodal.modalNormal(
        //   "Complete!",
        //   "this operation is success.",
        //   "success"
        // );
        getAllproblem()
        myRouter.push('/problem/list')
      }
    })
  }
  // mutation CheckAnswer {
  //   checkAnswer(
  //     problemId : 16
  //     solution : """
  //     const answer = (arr, targetSum) => {
  //       for (let i = 0; i < arr.length; i++) {
  //         for (let j = i + 1; j < arr.length; j++) {
  //           if (arr[i] + arr[j] === targetSum) {
  //                   console.log([i, j])
  //             return "dog"
  //           }
  //         }
  //       }
  //     }
  //     """
  //   )
  //   {
  //     exampleResults {
  //       id
  //       status
  //       message
  //     }
  //     testcaseResults {
  //       id
  //       status
  //       message
  //     }
  //   }
  // }

  const checkAnswer = async (problemId, solution) => {
    try {
      const query = gql.mutation(
        {
          operation: 'checkAnswer',
          variables: {
            problemId: { type: 'Int!', value: problemId },
            solution: { type: 'String!', value: solution },
          },
          fields: [
            { exampleResults: ['id', 'status', 'message'] },
            { testcaseResults: ['id', 'status', 'message'] },
          ],
        },
        undefined,
        {
          operationName: 'CheckAnswer ',
        },
      )
      const data = await myconnectBackend.connectBack(query)
      if (data['data'] !== undefined) {
        let res = data['data']['checkAnswer']
        myAccount.GetUserByEmail()
        return res
      } else return 0
    } catch (error) {
      console.error(error)
      // Handle the error appropriately
      return 0 // Return 0 or some other value to indicate failure
    }
  }

  const getSubmissionByUserId = async (userId) => {
    let querys = gql.query(
      {
        operation: 'getSubmissionByUserId',
        variables: {
          userId: { type: 'ID!', value: userId },
        },
        fields: [{ problem: ['id'] }],
      },
      undefined,
      {
        operationName: 'getSubmissionByUserId',
      },
    )
    myconnectBackend.connectBack(querys).then(async (data) => {
      if (data != '') {
        problemResolved.value = data['data']['getSubmissionByUserId']
      }
    })
  }

  return {
    problemList,
    AddProblem,
    getAllproblem,
    deleteProblem,
    EditProblem,
    checkAnswer,
    problemResolved,
    getSubmissionByUserId,
  }
})
