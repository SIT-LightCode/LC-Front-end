import { defineStore, acceptHMRUpdate } from "pinia";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const modalSwal = defineStore("modalSwal", () => {
  const modalTwoฺButton = async(title, text, type) => {
   let modalStatus = false
    await Swal.fire({
      title: title,
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, " + type.toLowerCase() + " it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      modalStatus = result.isConfirmed
    });
    return modalStatus
  };

  const modalNormal = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  };

  const modalTime = () => {
    let timerInterval;
    Swal.fire({
      title: "Loading!",
      html: "please wait a moment",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  return { modalTwoฺButton, modalNormal ,modalTime };
});
