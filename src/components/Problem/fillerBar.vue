<script setup>

</script>
 
<template>
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
</template>
 
<style>

</style>