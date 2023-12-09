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
      container: null,
      canCancel: true,
      color: '#000000',
      loader: 'spinner',
      width: 64,
      height: 64,
      backgroundColor: '#ffffff',
      opacity: 0.5,
      zIndex: 999,
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
      let data = await res.json();
      if (res.ok) {
        let errortext = "";
        for (let e in data) {
          if (e == "errors") {
            for (let err in data[e]) {
              errortext = errortext + data[e][err].message +"\n"
            }
          }
        }
        if (errortext == "") {
          loader.hide();
          return data;
        } else {
          loader.hide();
          mymodal.modalNormal("Error!", "response : " + errortext, "error");
          return '';
        }
      }
    } catch (error) {
      loader.hide();
      mymodal.modalNormal("Error!", "Error:" + error, "error");
      console.error("Error:", error);
      return '';
    }
  };

  return { connectBack };
});
