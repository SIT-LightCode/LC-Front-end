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
    // myconnectBackend.connectBack(querys).then(async (res) => {
    //   if (res.ok) {
    //     await res
    //       .json()
    //       .then((data) => {
    //         //ยังไม่รู้
    //       })
    //       .catch((error) => {
    //         mymodal.modalNormal("Error!", error, "error");
    //         console.error("Error:", error);
    //       });
    //   }
    // });
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


  return { problemList, getAllproblem };
});
