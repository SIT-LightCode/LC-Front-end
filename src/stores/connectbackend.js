import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import { modalSwal } from "../stores/modal.js";
import * as gql from 'gql-query-builder'

const mymodal = modalSwal();

export const connectbackend = defineStore("connectBackend", () => {
  let tagList = ref({});
  const content = async (querys) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: querys.query,
          variables: querys.variables,
        }),
      });
      if (res.ok) {
        getAllTag();
        return res;
      } else {
        mymodal.modalNormal(
          "Error!",
          "response state : " + res.status + "\n response :" + res.statusText,
          "error"
        );
        return false;
      }
    } catch (error) {
      mymodal.modalNormal("Error!", "Error:" + error, "error");
      console.error("Error:", error);
      return false;
    }
  };
  const getAllTag = async () => {
    let querys = gql.query({
      operation: 'getTag',
      fields: ['id', 'topic', 'description', 'description', { lesson: ['id', 'name', 'content'] }]
      ,
  }, undefined, {
      operationName: 'GetTag'
  })
    content(querys).then(async(res) => {
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
    content(querys).then((res) => {
      if (res.ok) {
          mymodal.modalNormal(
            "Complete!",
            "this operation is success.",
            "success"
          );
      }
    });
     
  };

  const deleteContent = async (querys) => {
    content(querys).then((res) => {
      if (res.ok) {
        mymodal.modalNormal(
          "Deleted!",
          "This Content has been deleted.",
          "success"
        );
      }
    });
  };

  return { tagList, getAllTag, addContent, deleteContent };
});
