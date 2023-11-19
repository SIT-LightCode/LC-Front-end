<script >
export default {
  props: {
    name: String,
    content: Object,
  }
};
</script>
 
<template>
  
  <div class="w3-container w3-card w3-white w3-margin-bottom">

    <h2 class="w3-text-grey w3-padding-16">
      {{ contentlist.name }}
    </h2>
    <div class="w3-container">
      <p>{{ contentlist.content }}</p>
      <hr>
    </div>

  </div>
</template>
 
<style></style>