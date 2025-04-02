<script setup>
import BackButton from './BackButton.vue';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center justify-between relative"> <!-- Set relative on the parent div -->
      <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem]" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        TRACE THE LETTERS SHOWN
      </p>

      <BackButton class="relative right-[48%] -top-[6rem] transform -translate-y-1/2 z-10"/>
  
      <!-- Stencil area with conditional cursor class -->
      <div class="box-border border-2 p-2 bg-amber-50 relative mb-6">
        <div
          class="stencil-area w-[500px] h-[375px] bg-black/10 border-2 border-black flex items-center justify-center text-center"
          :class="{'cursor-stencil': isHovered}" 
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
          RESET
        </button>
      </div>
  
      <!-- Button to open the modal -->
      <button 
        class="mt-6 bg-green-500 text-white py-2 px-4 rounded"
        @click="openModal"
      >
        Open Modal
      </button>
  
      <!-- Modal component -->
      <WModalComponent
        :isVisible="isModalVisible"
        @update:isVisible="isModalVisible = $event"
      />
  
      <!-- Confetti Button -->
      <div class="mt-6">
        <button
          class="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          @click="triggerConfetti"
        >
          Click Me for Confetti!
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import WModalComponent from '../components/WModalComponent.vue';
  import confetti from 'canvas-confetti';
  
  export default {
    components: {
      WModalComponent,
    },
    data() {
      return {
        isHovered: false,
        isModalVisible: false,
      };
    },
    methods: {
      openModal() {
        this.isModalVisible = true;
      },
      triggerConfetti() {
        confetti({
          particleCount: 100,
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff0', '#ff6347', '#32cd32', '#1e90ff'],
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .cursor-stencil {
    cursor: pointer;
  }
  
  .custom-text-border {
    -webkit-text-stroke: 3px black;
  }
  
  </style>
  