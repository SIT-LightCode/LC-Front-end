import { defineStore } from "pinia";
import { modalSwal } from "./Modal.js";
import { useLoading } from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

const mymodal = modalSwal();

export const connectBackend = defineStore("connectBackend", () => {
  const connectBack = async (querys) => {
    let loader = useLoading();

    try {
      loader.show({
        container: null,
        canCancel: true,
        color: "#000000",
        loader: "spinner",
        width: 64,
        height: 64,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999,
      });

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
              errortext = errortext + data[e][err].message + "\n";
            }
          }
        }

        if (errortext == "") {
          return data;
        } else {
          mymodal.modalNormal("Error!", "response : " + errortext, "error");
          return "";
        }
      }
    } catch (error) {
      mymodal.modalNormal("Error!", "Error:" + error, "error");
      console.error("Error:", error);
      return "";
    } finally {
      if (loader) {
        loader.hide();
      }
    }
  };

  return { connectBack };
});