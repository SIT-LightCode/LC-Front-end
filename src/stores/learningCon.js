import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import { modalSwal } from "../stores/modal.js";
import { connectBackend } from "./connectbackend.js";

import * as gql from 'gql-query-builder'

const mymodal = modalSwal();
const myconnectBackend = connectBackend();

export const learningCon = defineStore("learningCon", () => {
  let tagList = ref({});

  const getAllTag = async () => {
    let querys = gql.query({
      operation: 'getTag',
      fields: ['id', 'topic', 'description', 'description', { lesson: ['id', 'name', 'content'] }]
      ,
  }, undefined, {
      operationName: 'GetTag'
  })
  myconnectBackend.connectBack(querys).then(async(res) => {
      if (res.ok) {
        await res
        .json()
        .then((data) => {
          tagList.value = data["data"]["getTag"];
        })
        .catch((error) => {
          mymodal.modalNormal("Error!", error, "error");
          console.error("Error:", error);
        });
      }
    });
      };


  const addContent = async (querys) => {
    myconnectBackend.connectBack(querys).then((res) => {
      if (res.ok) {
          mymodal.modalNormal(
            "Complete!",
            "this operation is success.",
            "success"
          );
          getAllTag();
      }
    });
     
  };

  const deleteContent = async (querys) => {
    myconnectBackend.connectBack(querys).then((res) => {
      if (res.ok) {
        mymodal.modalNormal(
          "Deleted!",
          "This Content has been deleted.",
          "success"
        );
        getAllTag();
      }
    });
  };

  return { tagList, getAllTag, addContent, deleteContent };
});
