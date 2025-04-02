<script setup>
import BackButton from './BackButton.vue';
import SubmitButton from './SubmitButton.vue';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center justify-between relative"> <!-- Set relative on the parent div -->
      <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem]" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        SHOW COMPLETE STROKE
      </p>

      <BackButton class="relative right-[48%] -top-[6rem] transform -translate-y-1/2 z-10"/> <!--custom position for this component in the screen-->
  
      <!-- Stencil area with conditional cursor class -->
      <div class="box-border border-white border-2 rounded-2xl p-2 bg-[var(--color-appleGreen)] relative mb-6 bottom-[0.5rem]">
        <div
          class="stencil-area w-[500px] h-[375px] border-white border-2 flex items-center justify-center text-center"
          :class="{'cursor-pointer': isHovered}" 
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        > <!--edit this cursor for canvas template-->
        </div>
      </div>
  
      <!-- Button container to align left with relative positioning -->
      <div class="relative right-[12rem] top-[3rem] transform -translate-y-1/2 z-10">
        <button class="text-[var(--color-blueTheme)] text-[2rem] bg-white rounded-full px-6
        border-[var(--color-pink)] border-3 cursor-pointer" 
          style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
          <img src="@/assets/icons/restarticon.png" alt="Button Image" class="custom-restart-icon restart-icon-size" />
          RESET
        </button>
      </div>

      <!--Component for submit button-->
      <SubmitButton/>
  
      
    </div>
  </template>
  
  <style scoped>
  .custom-restart-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.restart-icon-size{
  width: 50px;
  height: 50px;
}
  .cursor-pointer {
    cursor: pointer;
  }
  
  .custom-text-border {
    -webkit-text-stroke: 3px black;
  }
  
  </style>
  