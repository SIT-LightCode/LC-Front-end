<script setup>
import { ref } from "vue";
import { modalSwal } from "../../../stores/Modal.js";
import { Toaster, toast } from 'vue-sonner'

import buttonPage from "../../button/ButtonPage.vue";

const emit = defineEmits(["returnval", "page"]);
const prop = defineProps({
  example: {
    type: Array,
  },
});
const mymodal = modalSwal();
const example = ref({
  example: {
    type: "example",
    val: prop.example,
  },
});

const checkValue = () => {
  let errorText = false;
  example.value.example.val.forEach((data, key1) => {
    data.forEach((da, key2) => {
      if (example.value.example.val[key1][key2] == "") {
        errorText = true;
      } else if (da.trim() === "") {
        errorText = true;
      } else {
        example.value.example.val[key1][key2] = da.trim();
      }
    });
  });

  if (errorText) {
    toast.error('Error example: you have not example')
    // mymodal.modalNormal(
    //   "Error",
    //   "\n Error example: you have not example",
    //   "error"
    // );
    return false;
  } else return true;
};

const inputExam = (e1) => {
  if (e1 > 0) {
    if (checkValue()) {
      emit("page", e1);
      emit("returnval", example);
    }
  } else {
    emit("page", e1);
    emit("returnval", example);
  }
};

const csstextarea =
  "p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const addDeleteExample = (type, id) => {
  if (type === "add") {
    if (id === 'para') {
      example.value.example.val.forEach((exa) => {
        exa.push([""]);
      });
    } else {
      // Create a new example with the same number of parameters as the existing ones
      const newExample = Array.from({ length: example.value.example.val[0].length }, () => [""]);
      example.value.example.val.push(newExample);
    }
  }

  if (type == "delete") {
    if (id == 'para') {
      for (let exa in example.value.example.val) {
        example.value.example.val[exa].pop();
      }
    } else {
      if (example.value.example.val.length > 1) {
        example.value.example.val.pop();
      }
    }
  }
};
const text =
  "**For a single parameter:**\n" +
  " - Use a single text or number. \n " + '\n' +
  "**For multiple parameters in an array:**\n" +
  " - Separate each value with commas. \n " + '\n' +
  "**For multiple parameters in an array:**\n" +
  " - Single parameter: text or 123 \n " +
  " - Array parameters: 1, 2, 3, 4, 5, 6 \n " + '\n' +
  "**You can provide up to 4 parameters and include up to 4 examples.**";
</script>

<template>
  <div class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
    <div class="p-3 mx-5 bg-white rounded-lg">
      <div style="color: #404040;font-size: 20px;font-style: normal;font-weight: 700;line-height: 36px;"> Guidline : Add
        Parameters</div>
      <v-md-preview :text="text"></v-md-preview>
    </div>
    <div v-for="(i, key1) of example.example.val" class="p-3 my-3 bg-white rounded-lg">
      <h3>Example [{{ key1 + 1 }}]
        <button :disabled="(example.example.val[0].length > 3)"
          class=" text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-full" :class="[
        example.example.val[0].length > 3
          ? 'bg-gray-300 '
          : 'bg-blue-400 hover:bg-blue-500',
      ]" @click="addDeleteExample('add', 'para')"> Add New Parametes
        </button>
        <button :disabled="(example.example.val[0].length <= 1)"
          class="text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-full" :class="[
        example.example.val[0].length <= 1
          ? 'bg-gray-300 '
          : 'bg-red-400 hover:bg-red-500',
      ]" @click="addDeleteExample('delete', 'para')"> Delete Parametes
        </button>
      </h3>
      <div class="grid grid-cols-2">
        <div v-for="(j, key2) of i" class="flex flex-row py-3">
          <h3 class="place-self-center px-5">Parameters [{{ key2 + 1 }}]</h3>
          <input rows="4" v-bind:class="csstextarea" v-model="example.example.val[key1][key2]" />

        </div>
        <div class="flex flex-row">

        </div>
      </div>
    </div>
    <button :disabled="(example.example.val.length > 3)"
      class="text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-full" :class="[
        example.example.val.length > 3
          ? 'bg-gray-300 '
          : 'bg-blue-400 hover:bg-blue-500',
      ]" @click="addDeleteExample('add')">
      Add Example parameter
    </button>
    <button :disabled="(example.example.val.length <= 1)"
      class="text-gray-900 dark:text-white font-bold m-2 py-2 px-4 rounded-lg" :class="[
        example.example.val.length <= 1
          ? 'bg-gray-300 '
          : 'bg-red-400 hover:bg-red-500',
      ]" @click="addDeleteExample('delete')">
      Delete Example parameter
    </button>
    <buttonPage :pages="3" @page="(e1) => {
        inputExam(e1);
      }
        "></buttonPage>
  </div>

</template>

<style></style>
