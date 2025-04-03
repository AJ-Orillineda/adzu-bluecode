<script setup>
import { useRouter } from 'vue-router';
import StarScoring from '../components/StarScoring.vue';
import BackButton from '../components/BackButton.vue';
import LevelSelectButton from '@/components/LevelSelectButton.vue';

// ROUTER NAVIGATION
const router = useRouter();

// Navigate to WLetterTestPage
const goToWLetterTest = () => {
  router.push('/writing-test'); 
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
            <BackButton route="/letters"/>
    </div>

    <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
      UNLOCK ALL VOWELS!
    </p>

    <div class="grid grid-cols-3 gap-4 w-7xl mx-auto mb-10">
      <LevelSelectButton title="Aa" :locked="false" route="/letters/vowels/tracing/0" />
      <LevelSelectButton title="Ee" :locked="false" route="/letters/vowels/tracing/1" />
      <LevelSelectButton title="Ii" :locked="false" route="/letters/vowels/tracing/2" />
      <LevelSelectButton title="Oo" :locked="false" route="/letters/vowels/tracing/3" />
      <LevelSelectButton title="Uu" :locked="false" route="/letters/vowels/tracing/4" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}
</style>
