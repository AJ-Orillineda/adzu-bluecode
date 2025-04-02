<script setup>
import { useRouter } from 'vue-router';
import LevelSelectButton from '@/components/LevelSelectButton.vue';
import BackButton from '../components/BackButton.vue';

// ROUTER NAVIGATION
const router = useRouter();

// Navigate to NumberLevelView
const goToNumbersMatching = (level) => {
  router.push(`/numbers/matching/${level}`);
};

// Navigate to previous page
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="vowels-page">
    <!-- BACK BUTTON -->
    <div class="w-full flex justify-start">
      <BackButton @click="goBack"/> 
    </div>
    
    <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
      UNLOCK ALL LEVELS!
    </p>

    <div class="grid grid-cols-3 gap-4 w-full max-w-7xl mx-auto mb-10">
      <LevelSelectButton :id="0" title="Easy" :stars="1" :locked="false" route="/numbers/matching/0" />
      <LevelSelectButton :id="1" title="Medium" :stars="2" :locked="false" route="/numbers/matching/1" />
      <LevelSelectButton :id="2" title="Hard" :stars="3" :locked="false" route="/numbers/matching/2" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}
</style>
