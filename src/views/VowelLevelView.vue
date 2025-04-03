<script setup>
import { ref, watch } from 'vue';

import LetterBox from '@/components/LetterBox.vue';
import BackButton from '../components/BackButton.vue';
import SubmitButton from '../components/SubmitButton.vue';
import LetterLevelButton from '@/components/LetterLevelButton.vue';
import restartIcon from '@/assets/icons/RestartIcon.png';

const props = defineProps({
    levelId: { type: Number, required: true },
});

const levels = {
    0: { letter: 'A', },
    1: { letter: 'E', },
    2: { letter: 'I', },
    3: { letter: 'O', },
    4: { letter: 'U', },
}

const currentLevel = levels[props.levelId];
const repetitions = ref(3);
const resetKey = ref(0);

// Handle reset from child
const handleReset = () => {
    resetKey.value++;
};

watch(() => props.levelId, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        handleReset();
    }
});
</script>

<template>
  <LetterBox :key="resetKey" :letter="currentLevel.letter" :repetitions="repetitions" :levelId="props.levelId" />
    <!-- <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center justify-between relative"> 
      <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem]" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        SHOW COMPLETE STROKE
      </p>

      <BackButton class="relative right-[48%] -top-[6rem] transform -translate-y-1/2 z-10"/>
  
      <div class="box-border border-white border-2 rounded-2xl p-2 bg-[var(--color-appleGreen)] relative mb-6 bottom-[0.5rem]">
        <div
          class="stencil-area w-[500px] h-[375px] border-white border-2 flex items-center justify-center text-center"
          :class="{'cursor-pointer': isHovered}" 
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >

        <LetterBox :letter="currentLevel.letter" :repetitions="repetitions" />

        </div>
      </div>
      
    </div> -->
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
  