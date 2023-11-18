import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";

export const connectbackend = defineStore("connectBackend", () => {
  let tagList = ref({});

  const getAllTag = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "query GetTag { getTag { id\n    topic\n    description\n    lesson {\n      id\n      name\n      content\n    }\n  }\n}",
          operationName: "GetTag",
        }),
      });

      if (res.ok) {
        await res.json().then((data) => {
          tagList.value = data["data"]["getTag"];
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // return await res.json();
      } else {
        console.error("Error:", res.status, res.statusText);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addContent = async (name, selected, content) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation UpsertLesson{\n    upsertLesson(lessonInput: {\n        id: null\n        tagId: ${selected}\n        name: \"${name}\"\n        content: \"${content}\"\n    }) {\n        id\n        tag {\n          id\n          topic\n        }\n        name\n        content\n    }\n}`,
          operationName: "UpsertLesson",
        }),
      });
      if (res.ok) {
        // await res.json().then((data) => {
        //   tagList.value = data["data"]["getTag"];
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
        // ขอทำเเบบนี้ไปก่อนนะ
        getAllTag()
        return true;
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteContent = async (selected) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "query": `mutation RemoveLesson { removeLesson(lessonId: ${selected}) }`,
          "operationName": "RemoveLesson"
        }),
      });
      if (res.ok) {
        // ขอทำเเบบนี้ไปก่อนนะ
        getAllTag()
        return true;
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { tagList, getAllTag, addContent , deleteContent};
});

