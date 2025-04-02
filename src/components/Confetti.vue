<template>
    <div class="flex justify-center items-center h-screen">
      <!-- Confetti Button -->
      <button
        class="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        @click="triggerConfetti"
      >
        Submit
      </button>
    </div>
  </template>
  
  <script>
  import confetti from 'canvas-confetti';
  
  export default {
    methods: {
      triggerConfetti() {
        // Trigger confetti animation
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
  /* Additional custom styles */
  button {
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  