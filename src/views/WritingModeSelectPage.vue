<script setup>
import { useRouter } from 'vue-router';
import Button from '../components/ButtonIconBasic.vue';
import PlayIcon from '../assets/icons/PlayIcon.png';
import LockedIcon from '../assets/icons/LockedIcon.png';
import BackButton from '../components/BackButton.vue';

// ROUTER NAVIGATION
const router = useRouter();

// Navigate to the VowelsPage
const goToVowels = () => {
  router.push('/vowels'); 
};

// Navigate to previous page
const goBack = () => {
  router.back();
};
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="gamemode-select-page">
        <!-- BACK BUTTON -->
        <div class="w-full flex justify-start">
            <BackButton @click="goBack"/>
        </div>
        
        <!-- TITLE CAPTION -->
        <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border text-center pb-10" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            Learn to Write!
        </p>

        <!-- LETTERS BUTTON -->
        <div class="flex flex-col gap-8 w-200 items-center">
            <Button :imgSrc="PlayIcon" @click="goToVowels">
                TRACING VOWELS
            </Button>
            <Button :imgSrc="LockedIcon" :disabled="true">
                TRACING CONSONANTS
            </Button>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}

/* TILT ANIMATION */
@keyframes tilt {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(2deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-2deg); }
    100% { transform: rotate(0deg); }
}

.animate-tilt {
    animation: tilt 1.5s infinite ease-in-out;
}

</style>