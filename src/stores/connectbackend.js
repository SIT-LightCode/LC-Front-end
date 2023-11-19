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
        await res
          .json()
          .then((data) => {
            tagList.value = data["data"]["getTag"];
          })
          .catch((error) => {
            alert("Error:" + error);
            console.error("Error:", error);
          });

        // return await res.json();
      } else {
        alert(
          "response state : " + res.status + "\n response :" + res.statusText
        );
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      alert("Error:" + error);
      console.error("Error:", error);
    }
  };

  const addContent = async (name, id, content) => {
    let isAdd = confirm("Do you confirm that you will add it?");
    if (isAdd) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation UpsertLesson{\n    upsertLesson(lessonInput: {\n        id: null\n        tagId: ${id}\n        name: \"${name}\"\n        content: \"${content}\"\n    }) {\n        id\n        tag {\n          id\n          topic\n        }\n        name\n        content\n    }\n}`,
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
          alert("Add Successful");
          getAllTag();
          return true;
        } else {
          alert(
            "response state : " + res.status + "\n response :" + res.statusText
          );
          console.error("Error:", res.status, res.statusText);
        }
      } catch (error) {
        alert("Error:" + error);
        console.error("Error:", error);
      }
    }
  };

  const deleteContent = async (selected) => {
    let isDelete = confirm("Do you confirm that you will delete it?");
    if (isDelete) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation RemoveLesson { removeLesson(lessonId: ${selected}) }`,
            operationName: "RemoveLesson",
          }),
        });
        if (res.ok) {
          // ขอทำเเบบนี้ไปก่อนนะ
          alert("delete Successful");
          getAllTag();
          return true;
        } else {
          alert(
            "response state : " + res.status + "\n response :" + res.statusText
          );
          console.error("Error:", res.status, res.statusText);
        }
      } catch (error) {
        alert("Error:" + error);
        console.error("Error:", error);
      }
    }
  };

  return { tagList, getAllTag, addContent, deleteContent };
});
