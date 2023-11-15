import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";

const tagList = ref({});


export const connectbackend = defineStore("connectBackend", () => {
  const getAllTag = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query GetTag { getTag { id\n    topic\n    description\n    lesson {\n      id\n      name\n      content\n    }\n  }\n}",
          "operationName": "GetTag",
        }),
      });

      if (res.ok) {

        return await res.json()
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  const addConnent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query GetTag { getTag { id\n    topic\n    description\n    lesson {\n      id\n      name\n      content\n    }\n  }\n}",
          "operationName": "GetTag",
        }),
      });

      if (res.ok) {

        return await res.json()
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };


  
  return { getAllTag , addConnent };
});
