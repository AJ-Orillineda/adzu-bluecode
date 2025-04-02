<script setup>
import { useRouter } from 'vue-router';
import StarScoring from '../components/StarScoring.vue';
import BackButton from '../components/BackButton.vue';

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
            <BackButton @click="goBack"/>
        </div>

    <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
      UNLOCK ALL VOWELS!
    </p>

    <div class="grid grid-cols-3 gap-4 w-full max-w-3xl mx-auto mb-10">
      <button id="a" class="w-full bg-white text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer" 
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;" @click="goToWLetterTest">
        <p class="mb-0 block leading-none">Aa</p>
        <!--Star-->
        <StarScoring />
      </button>

      <button id="e" class="w-full bg-[var(--color-lockedTheme)] text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <p class="mb-0 block leading-none">Ee</p>
        <!--Star-->
        <StarScoring />
      </button>

      <button id="i" class="w-full bg-[var(--color-lockedTheme)] text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <p class="mb-0 block leading-none">Ii</p>
        <!--Star-->
        <StarScoring />
      </button>
      </div>


      <div class="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
      <button id="o" class="w-full col-span-1 md:col-span-1 md:col-start-1 bg-[var(--color-lockedTheme)] text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <p class="mb-0 block leading-none">Oo</p>
        <!--Star-->
        <StarScoring />
      </button>

      <button id="u" class="w-full col-span-1 md:col-span-1 md:col-start-2 bg-[var(--color-lockedTheme)] text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <p class="mb-0 block leading-none">Uu</p>
        <!--Star-->
        <StarScoring />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}
</style>
