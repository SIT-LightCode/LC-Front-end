<script setup>
import { problemCon } from '../../stores/problemCon';
const myproblemCon = problemCon()
myproblemCon.getAllproblem()
</script>
 
<template>
    <div class="w3-main w3-padding-64" style="margin-left:300px">
        <!-- First Photo Grid-->
        <div class="w3-row-padding w3-padding-16" >

            <div class="w3-quarter" v-for="i in myproblemCon.problemList">
                <h3>{{ i.name }}</h3>
                <p>{{ i.description }}</p>
            --------------------------------------
            </div>

        </div>
        <!--  -->
    </div>
</template>
 
<style></style>