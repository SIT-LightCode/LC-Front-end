import { defineStore, acceptHMRUpdate } from "pinia";
import { modalSwal } from "../stores/modal.js";

const mymodal = modalSwal();

export const connectBackend = defineStore("connectBackend", () => {
  const connectBack = async (querys) => {
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



  

  return { connectBack };
});
