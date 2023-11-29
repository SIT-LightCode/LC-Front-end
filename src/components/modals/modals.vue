<script setup>


const normalModal = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
}


const inputModal = async() => {
  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html: `
    <input id="swal-input1" class="swal2-input">
    <input id="swal-input2" class="swal2-input">
  `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value
      ];
    }
  });
  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
  }
}

</script>
 
<template></template>
 
<style></style>