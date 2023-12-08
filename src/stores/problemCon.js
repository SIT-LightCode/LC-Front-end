import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import { modalSwal } from "../stores/modal.js";
import { connectBackend } from "../stores/connectbackend.js";

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
            tagProblem: [
              "id",
              { tag: ["id", "topic"] },
              { problem: ["id", "name"] },
            ],
          },
          "description",
          "solution",
          "typeParameter",
          { example: ["id", "input", "output"] },
          { testcase: ["id", "input", "output"] },
          "totalScore",
        ],
      },
      undefined,
      {
        operationName: "GetProblem",
      }
    );
    myconnectBackend.connectBack(querys).then(async (res) => {
      if (res.ok) {
        await res
          .json()
          .then((data) => {
            console.log(data);
            // problemList.value = data["data"]["getTag"];
          })
          .catch((error) => {
            mymodal.modalNormal("Error!", error, "error");
            console.error("Error:", error);
          });
      }
    });
  };

  const getTagProblem = async () => {
    let querys = gql.query(
      {
        operation: "getTagProblem",
        fields: ["id", { tag: ["id", "topic"] }, { problem: ["id", "name"] }],
      },
      undefined,
      {
        operationName: "getTagProblem",
      }
    );
  };

  // ยังไม่เสด
  const getTagProblemByTagId = async () => {
    let querys = gql.query(
      {
        operation: "getTagProblemByTagId",
        fields: ["id", { tag: ["id", "topic"] }, { problem: ["id", "name"] }],
      },
      undefined,
      {
        operationName: "getTagProblemByTagId",
      }
    );
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
console.log(exampleParameterProblem.toString())
console.log(tagProblem.toString())

    const query = gql.mutation(
      {
        operation: "upsertProblem",
        variables: {
          id: { value: Number(null)          },
          arrayTagId: { value: [tagProblem.toString()] },
          name: { value: nameProblem },
          description: { value: descriptionProblem },
          solution: { value: solutionProblem },
          exampleParameter: { type: 'String' , value: exampleParameterProblem },
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
    // const query = {
    //   query: `mutation UpsertProblem {\n  upsertProblem(\n    
    //     id: ${null}\n    
    //     arrayTagId: \"[${tagProblem}]\"\n    
    //     name: \"${nameProblem}\"\n    
    //     description: \"${descriptionProblem}\"\n    
    //     solution: \"\"\"\n    
    //           ${solutionProblem}
    //           \"\"\"\n    
    //     exampleParameter: 
    //     \"\"\"\n    
    //                 ${exampleParameterProblem}
    //                 \"\"\"\n    
    //     level:${totalScoreProblem}
    //     \n    
    //     totalScore: ${levelProblem}
    //     \n  ) {\n    
    //       id\n    
    //       name\n    
    //       description\n    
    //       solution\n    
    //       level\n    
    //       totalScore\n  
    //     }\n}`,
    //   operationName: "UpsertProblem",
    // };
    console.log(query);
    // myconnectBackend.connectBack(query).then(async (res) => {
    //   if (res.ok) {
    //     await res.json().then((data) => {
    //       mymodal.modalNormal("Error!", data["errors"]["message"], "error");
    //       // problemList.value = data["data"]["getTag"];
    //     });

    // mymodal.modalNormal(
    //   "Complete!",
    //   "this operation is success.",
    //   "success"
    //     // );
    //   }
    // });
  };

  return { problemList, AddProblem };
});
