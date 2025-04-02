<template>
  
  <div class="relative left-[11rem] bottom-[36px] z-10">
    <button
      class="text-[var(--color-blueTheme)] text-[2rem] bg-white rounded-full px-6 border-[var(--color-pink)] border-3 cursor-pointer"
      style="font-family: 'Sigmar One', sans-serif; font-weight: 400;"
      @click="handleSubmit"
    >
    <img src="@/assets/icons/submiticon.png" alt="Button Image" class="custom-submit-icon submit-icon-size" />
      SUBMIT
    </button>
      </div>
      <!-- Modal component -->
      <WModalComponent
        :isVisible="isModalVisible"
        @update:isVisible="isModalVisible = $event"
      />
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
  handleSubmit() { // Corrected syntax: method name directly
    this.openModal(); // Use this.openModal()
    this.triggerConfetti(); // Use this.triggerConfetti()
  },
},
  }
  </script>
  
  <style scoped>

.custom-submit-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.submit-icon-size{
  width: 50px;
  height: 50px;
}

  .cursor-stencil {
    cursor: pointer;
  }
  
  .custom-text-border {
    -webkit-text-stroke: 3px black;
  }
  
  </style>
  