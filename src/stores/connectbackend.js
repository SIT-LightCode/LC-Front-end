import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";

const tagList = ref({});


export const connectbackend = defineStore("connectBackend", () => {
  const getAllTag = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "query":
          "query GetTag { getTag { id\n    topic\n    description\n    lesson {\n      id\n      name\n      content\n    }\n  }\n}",
        "operationName": "GetTag",
      }),
    });
    console.log(res.status);
    if (res.status === 200) {
        return await res.json();
    } else {
      console.log("error, cannot get data");
    }
  };

  return { getAllTag };
});
