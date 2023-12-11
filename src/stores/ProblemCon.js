import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import { modalSwal } from "./Modal.js";
import { connectBackend } from "./ConnectBackend.js";
import { Toaster, toast } from 'vue-sonner'

import * as gql from "gql-query-builder";

const mymodal = modalSwal();
const myconnectBackend = connectBackend();

export const problemCon = defineStore("problemCon", () => {
  let problemList = ref({});

  const getAllproblem = async () => {
    let querys = gql.query(
      {
        operation: "getProblem",
        fields: [
          "id",
          "name",
          {
            tagProblem: ["id", { tag: ["id", "topic", "description"] }],
          },
          "description",
          "exampleParameter",
          { example: ["id", "input", "output"] },
          "level",
          "totalScore",
        ],
      },
      undefined,
      {
        operationName: "GetProblem",
      }
    );
    myconnectBackend.connectBack(querys).then(async (data) => {
      if (data != "") {
        problemList.value = data["data"]["getProblem"];
      }
    });
  };


  const AddProblem = async (
    tagProblem,
    nameProblem,
    descriptionProblem,
    solutionProblem,
    exampleParameterProblem,
    totalScoreProblem,
    levelProblem
  ) => {
    const query = gql.mutation(
      {
        operation: "upsertProblem",
        variables: {
          id: { type: "Int", value: null },
          arrayTagId: { value: `[${tagProblem}]` },
          name: { value: nameProblem },
          description: { value: descriptionProblem },
          solution: { value: solutionProblem },
          exampleParameter: { value: JSON.stringify(exampleParameterProblem) },
          level: { value: parseInt(levelProblem) },
          totalScore: { value: parseInt(totalScoreProblem) },
        },
        fields: [
          "id",
          "name",
          "description",
          "solution",
          "level",
          "totalScore",
        ],
      },
      undefined,
      {
        operationName: "UpsertProblem ",
      }
    );

    myconnectBackend.connectBack(query).then(async (data) => {
      if (data["data"] != undefined) {
        toast.success('Problem has been created')
        // mymodal.modalNormal(
        //   "Complete!",
        //   "this operation is success.",
        //   "success"
        // );
        getAllproblem();
      }
    });
  };

  const deleteProblem = async(id) => {

      console.log(id)
        let query = gql.mutation(
          {
            operation: 'removeProblem',
            variables: { 
              id:{type:'Int!',value: id},
              
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
  return { problemList, AddProblem, getAllproblem ,deleteProblem};
});
