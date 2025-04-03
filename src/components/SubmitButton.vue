<script setup>
import WModalComponent from '../components/WModalComponent.vue';
import confetti from 'canvas-confetti';
import { ref } from 'vue';
import LetterLevelButton from './LetterLevelButton.vue';
import submitIcon from '@/assets/icons/SubmitIcon.png';

const isModalVisible = ref(false);
const isHovered = ref(false);

const openModal = () => {
    isModalVisible.value = true;
}

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    angle: 90,
    spread: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff0', '#ff6347', '#32cd32', '#1e90ff'],
  });
}

const handleSubmit = () => {
    openModal(); // Use this.openModal()
    triggerConfetti(); // Use this.triggerConfetti()
}

defineExpose({
  openModal,
  triggerConfetti,
  handleSubmit
});
</script>


<template>
  <LetterLevelButton text="Submit" :iconPath="submitIcon" @click="handleSubmit"/>
  <!-- Modal component -->
  <WModalComponent
    :isVisible="isModalVisible"
    @update:isVisible="isModalVisible = $event"
  />
</template>

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
  