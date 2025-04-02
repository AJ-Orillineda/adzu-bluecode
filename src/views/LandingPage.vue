<script setup>
import Button from '../components/ButtonIconBasic.vue';
import PlayIcon from '../assets/icons/PlayIcon.png';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="gamemode-select-page">
        <!-- TITLE CAPTION -->
        <p class="text-[6rem] text-[var(--color-yellowTheme)] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            [GAME TITLE]
        </p>

        <!-- LOGO -->
        <img src="../assets/icons/AppLogo.png" alt="Logo" class="w-[30rem] pb-10 animate-tilt" />

        <!-- START BUTTON -->
         <div class="w-60">
            <Button :imgSrc="PlayIcon">
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