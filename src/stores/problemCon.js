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
  //   let querys = gql.query({
  //     operation: 'getTag',
  //     fields: ['id', 'topic', 'description', 'description', { lesson: ['id', 'name', 'content'] }]
  //     ,
  // }, undefined, {
  //     operationName: 'GetTag'
  // })
    let querys = gql.query(
      {
        operation: "getProblem",
        fields: [
          "id",
          "name",
          {
            tagProblem: [
              "id",
              { tag: 
                  ["id", 
                  "topic", 
                  "description"
                  ] 
              },
            ],
          },
          "description",
          "exampleParameter",
          { example: [
              "id", 
              "input", 
              "output"] 
          },
          "level",
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
            problemList.value = data["data"]["getProblem"];
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

    console.log(query);
    myconnectBackend.connectBack(query).then(async (res) => {
      if (res.ok) {
        await res.json().then(async (data) => {
          // mymodal.modalNormal("Error!", data["errors"]["message"], "error");
          // problemList.value = data["data"]["getTag"];
        });

        mymodal.modalNormal(
          "Complete!",
          "this operation is success.",
          "success"
        );
      }
    });
  };

  return { problemList, AddProblem, getAllproblem };
});
