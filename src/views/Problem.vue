<script setup>
import fillerBar from '../components/Problem/fillerBar.vue';
import listProblem from '../components/Problem/listProblem.vue';

</script>
<template>
    <div class="w3-center">
        <div class="flex">
        <!-- Filter-->

        <form action="/action_page.php" target="_blank" class="w3-sidebar w3-bar-block w3-white w3-collapse "
            style="z-index:3; width:250px; height:500px">
            <p><label><i class="fa fa-calendar-check-o"></i> Check In</label></p>
            <input class="w3-input w3-border" type="text" placeholder="DD MM YYYY" name="CheckIn" required>
            <p><label><i class="fa fa-calendar-o"></i> Check Out</label></p>
            <input class="w3-input w3-border" type="text" placeholder="DD MM YYYY" name="CheckOut" required>
            <p><label><i class="fa fa-male"></i> Adults</label></p>
            <input class="w3-input w3-border" type="number" value="1" name="Adults" min="1" max="6">
            <p><label><i class="fa fa-child"></i> Kids</label></p>
            <input class="w3-input w3-border" type="number" value="0" name="Kids" min="0" max="6">
            <p><button class="w3-button w3-block w3-green w3-left-align" type="submit"><i
                        class="fa fa-search w3-margin-right"></i> Search availability</button></p>
        </form>
        <!--  -->



        <div class="w3-main w3-padding-64" >
            <!-- First Photo Grid-->
            <div class="flex" id="food">
                <div class="w3-quarter">
                    <h3>The Perfect Sandwich, A Real NYC Classic</h3>
                    <p>Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.</p>
                </div>
                <div class="w3-quarter">
                    <h3>Let Me Tell You About This Steak</h3>
                    <p>Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum.
                    </p>
                </div>
                <div class="w3-quarter">
                    <h3>Cherries, interrupted</h3>
                    <p>Lorem ipsum text praesent tincidunt ipsum lipsum.</p>
                    <p>What else?</p>
                </div>
                <div class="w3-quarter">
                    <h3>Once Again, Robust Wine and Vegetable Pasta</h3>
                    <p>Lorem ipsum text praesent tincidunt ipsum lipsum.</p>
                </div>
            </div>
            <!--  -->
        </div>

    </div>

    </div>
</template>
 
<style></style>