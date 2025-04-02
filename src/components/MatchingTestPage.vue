<script setup>
import BackButton from './BackButton.vue';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center justify-between relative"> <!-- Set relative on the parent div -->
      <!--Title-->
        <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem]" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        COUNT THIS!
      </p>

      <!--Back Button-->
        <BackButton class="relative right-[48%] -top-[6rem] transform -translate-y-1/2 z-10"/>
      
        <button @click="randomizeImages">Show Random Images</button>
      <!-- Container for objects/images-->
        <div id="container-objects">
            <img v-for="(image, index) in displayedImages" :key="index" :src="image" alt="Apple" />
        </div>

        <!--Buttons for answer choices-->
        <div id="choice-answer" class="flex">
            but
        </div>

      
  
     
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import backIcon from '@/assets/icons/backicon.png'; // Import the image

const imageUrls = ref([
    backIcon,
    backIcon,
    backIcon,
    backIcon,
    backIcon,
  // Add your image URLs here
]);

const displayedImages = ref([]);
const previousCount = ref(null); // Store the previous count

function randomizeImages() {
  let newCount;
  do {
    newCount = Math.floor(Math.random() * imageUrls.value.length) + 1;
  } while (newCount === previousCount.value); // Keep generating until different

  previousCount.value = newCount; // Update the previous count
  displayedImages.value = imageUrls.value.slice(0, newCount);
}
  </script>
  
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
  