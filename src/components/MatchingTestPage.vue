<script setup>
import BackButton from './BackButton.vue';
import NumberBox from './NumberBox.vue';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center justify-between relative"> <!-- Set relative on the parent div -->
      <!--Title-->
        <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem]" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        COUNT THIS!
      </p>

      <!--Back Button-->
        <BackButton class="relative right-[48%] -top-[6rem] transform -translate-y-1/2 z-10"/> <!--custom position for this component-->
      
        
      <!-- Container for NumberBox-->
        <div class="flex flex-row w-full h-full flex-wrap items-center justify-center">
            <NumberBox maxObjects="10" objectType="2" randomObjectPerLevel="true" />
        </div>
      
  
     
    </div>
  </template>
  
  
  <style scoped>
  .cursor-stencil {
    cursor: pointer;
  }
  
  .custom-text-border {
    -webkit-text-stroke: 3px black;
  }

  .container-objects {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust as needed */
}

.container-objects img {
  max-width: 150px; /* Adjust as needed */
  height: auto;
}
  
  </style>
  