import { defineStore, acceptHMRUpdate } from "pinia";
import { modalSwal } from "./Modal.js";
import { ref, computed, h } from "vue";

import { useLoading } from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
// Init plugin

const mymodal = modalSwal();

export const connectBackend = defineStore("connectBackend", () => {

  const connectBack = async (querys) => {
    let loader = useLoading();
    loader.show({
      // Optional parameters
      container: null ,
      canCancel: true,
    });
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
        loader.hide();
        return res;
      } else {
        loader.hide();
        mymodal.modalNormal(
          "Error!",
          "response state : " + res.status + "\n response :" + res.statusText,
          "error"
        );
        return false;
      }
    } catch (error) {
      loader.hide();
      mymodal.modalNormal("Error!", "Error:" + error, "error");
      console.error("Error:", error);
      return false;
    }
  };
  return { connectBack };
});
