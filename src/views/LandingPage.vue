<script setup>
import { useRouter } from 'vue-router';
import Button from '../components/ButtonIconBasic.vue';
import PlayIcon from '../assets/icons/PlayIcon.png';

// ROUTER NAVIGATION
const router = useRouter();

// Navigate to the GameModes page
const goToModes = () => {
  router.push('/gamemodes'); 
};
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="gamemode-select-page">
        <!-- GAME TITLE -->
        <img src="../assets/icons/AppName.png" alt="Logo" class="w-[50rem]" />

        <!-- LOGO -->
        <img src="../assets/icons/AppLogo.png" alt="Logo" class="w-[30rem] pb-5 animate-tilt" />

        <!-- START BUTTON -->
         <div class="w-60">
            <Button :imgSrc="PlayIcon" @click="goToModes">
                START
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