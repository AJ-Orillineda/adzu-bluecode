<script setup>
import LevelSelectButton from '@/components/LevelSelectButton.vue';
import StarScoring from '@/components/StarScoring.vue';


</script>

<template>
  <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="vowels-page">
    <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
      UNLOCK ALL LEVELS!
    </p>

    <div class="grid grid-cols-3 gap-4 w-full max-w-7xl mx-auto mb-10">
      <LevelSelectButton title="Easy" :stars="1" :locked="false" route="/dev" />
      <LevelSelectButton title="Medium" :stars="2" :locked="true" route="/dev" />
      <LevelSelectButton title="Hard" :stars="3" :locked="true" route="/dev" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}
</style>
