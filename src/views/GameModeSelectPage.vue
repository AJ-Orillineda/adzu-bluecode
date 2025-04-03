<script setup>
import { useRouter } from 'vue-router';
import Button from '../components/ButtonsModeSelect.vue';
import LogoPencil from '../assets/icons/WritingIcon.png';
import LogoNumbers from '../assets/icons/MathIcon.png';
import BackButton from '../components/BackButton.vue';

// ROUTER NAVIGATION
const router = useRouter();

// Navigate to the WritingModeSelectPage
const goToWriting = () => {
  router.push('/letters'); 
};

// Navigate to the NumbersModeSelectPage
const goToNumbers = () => {
  router.push('/numbers'); 
};

// Navigate to previous page
const goBack = () => {
  router.back();
};
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] text-white p-4 py-10 px-10 mx-0 flex flex-col items-center" id="gamemode-select-page">
        <!-- BACK BUTTON -->
        <div class="w-full flex justify-start pb-5">
            <BackButton route="/" />
        </div>
        
        <!-- TITLE CAPTION -->
        <p class="text-[6rem] text-[var(--color-yellowTheme)] pb-5 custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            PLEASE PICK A GAME MODE
        </p>

        <!-- BUTTON CONTAINER -->
         <div class="grid grid-cols-2 gap-7 w-full">
            <!-- WRITING OPTTION -->
            <Button :imgSrc="LogoPencil" @click="goToWriting">
                Writing
            </Button>

            <!-- NUMBERS OPTION -->
            <Button :imgSrc="LogoNumbers" @click="goToNumbers">
                Numbers
            </Button>
         </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}
</style>