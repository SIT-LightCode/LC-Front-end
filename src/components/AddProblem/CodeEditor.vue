<script setup>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import buttomSubmit from "../button/button.vue"
import { ref, onBeforeMount } from "vue";
const emit = defineEmits(['code'])

const code = ref('const answer = (input) => {\n \n \n 	//Code Here \n console.log(input)   \n \n \n \n  }')

const highlighter = (code) => {
  return highlight(code, languages.js); // languages.<insert language> to return html with markup
}

</script>

<template>
  <div class="">
    <prism-editor class="my-editor" v-model="code" :highlight="highlighter"   line-numbers :tabSize="5"></prism-editor>
    <buttomSubmit :name="'submit'" @buttonClick="$emit('code', code);"></buttomSubmit>
  </div>
</template>
  
<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 450px  ;

  /*  */
  margin-top: 2rem;
  display: flex;
  position: relative;

}

/* optional class for removing the outline */
/* .prism-editor__textarea:focus {
  outline: none;
} */
</style>