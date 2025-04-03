<script setup>
import { ref, computed, watch } from 'vue';
import Canvas from './Canvas.vue';
import LetterLevelButton from './LetterLevelButton.vue';
import confetti from 'canvas-confetti';

import restartIcon from '@/assets/icons/RestartIcon.png';
import submitIcon from '@/assets/icons/SubmitIcon.png';
import SubmitButton from './SubmitButton.vue';
import WModalComponent from './WModalComponent.vue';
import BackButton from './BackButton.vue';

const props = defineProps({
    levelId: { type: Number, required: true, default: 0 },
    letter: {type: String, required: true, default: 'A' },
    repetitions: {type: Number, required: true, default: 3}, // repetitions per uppercase/lowercase letter
});

const uppercaseLetter = props.letter.toString().toUpperCase();
const lowercaseLetter = props.letter.toString().toLowerCase();

const finishModalVisibility = ref(false);

console.log('Uppercase:', uppercaseLetter);
console.log('Lowercase:', lowercaseLetter);




const currentLetter = ref(props.letter.toUpperCase());

// update progressArray to use currentLetter
const progressArray = computed(() => {
    const array = [];
    const arraySize = props.repetitions * 2;

    for (let i = 0; i < arraySize; i++) {
        array.push(i < props.repetitions ? currentLetter.value : currentLetter.value.toLowerCase());
    }

    return array;
});




const progress = ref(0);
const maxRounds = computed(() => progressArray.value.length);


// store scores for each round
const scoreHistory = ref([]);
// current score from Canvas
const currentScore = ref(0);

// Calculate average score
const averageScore = computed(() => {
  if (scoreHistory.value.length === 0) return 0;
  
  const sum = scoreHistory.value.reduce((total, score) => total + score, 0);
  return sum / scoreHistory.value.length;
});

// handle score changes from canvas
const handleScoreChange = (newScore) => {
  currentScore.value = newScore;
};

// calculate number of stars earned based from average score
const calculateStars = () => {
    if (averageScore.value >= 90) {
        return 3;
    } else if (averageScore.value >= 60) {
        return 2;
    } else {
        return 1;
    }
}

const triggerConfetti = () => {
    confetti({
        particleCount: 100,
        angle: 90,
        spread: 45,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff0', '#ff6347', '#32cd32', '#1e90ff'],
    });

    const confettiCanvas = document.querySelector('canvas[class^="confetti"]');
    if (confettiCanvas) {
        confettiCanvas.style.zIndex = '100'; // Set your desired z-index
        confettiCanvas.style.position = 'fixed'; // Ensure positioning works
    }
}

// handle case when level is finished
const finishLevel = () => {
    triggerConfetti();
    finishModalVisibility.value = true;
}

// handle submission of letter
const submitLetter = () => {
    scoreHistory.value.push(currentScore.value);

    if (progress.value < maxRounds.value - 1) {
        progress.value++;
    } else {
        finishLevel();
        progress.value = 0;
        // scoreHistory.value = [];
    }

    console.log('Current round:', progress.value);
    console.log('Score:', currentScore.value);
    console.log('Average score:', averageScore.value);
}

// canvas ref stuff
const canvasRef = ref(null);
const clearCanvas = () => {
  if (canvasRef.value) {
    canvasRef.value.eraseCanvas();
  }
};

defineExpose({
    clearCanvas,
    submitLetter,
    finishLevel,
    handleScoreChange
});

const emit = defineEmits(['reset']);

const resetAll = () => {
    finishModalVisibility.value = false;
    progress.value = 0;
    scoreHistory.value = [];
    currentScore.value = 0;
    if (canvasRef.value) {
        canvasRef.value.eraseCanvas();
    }
};

// update when props.letter changes
watch(() => props.levelId, (newLevelId) => {
    // Reset all state when level changes
    resetAll();
    
    // Update to the new level's letter
    const levels = {
        0: 'A', 1: 'E', 2: 'I', 3: 'O', 4: 'U'
    };
    currentLetter.value = levels[newLevelId] || 'A';
}, { immediate: true });


</script>

<template>
    <WModalComponent class="w-screen h-screen absolute" :isVisible="finishModalVisibility" :stars="calculateStars()" :levelId="props.levelId" />

    <div class="flex flex-col gap-6 h-screen w-screen items-center justify-center bg-[var(--color-darkmint)]">
        <p class="mx-12 text-[var(--color-yellowTheme)] custom-text-border text-[4rem] relative top-[1rem] custom-text-border" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            SHOW COMPLETE STROKE
        </p>

        <BackButton class="absolute top-8 left-8" route="/letters/vowels" /> <!--custom position for this component in the screen-->

        <Canvas
        ref="canvasRef"
        :letter="progressArray[progress]"
        :canvasWidth="500"
        :canvasHeight="400"
        :progression="progress"
        @score-change="handleScoreChange"
        class="rounded-xl" />

        <div class="flex flex-col gap-1 items-center justify-center" style="font-family: 'Sigmar One', sans-serif; font-weight: 400; -webkit-text-stroke: 1px black;">
            <h1 class="text-white text-3xl">Score:</h1>
            <h1 id="score-text" class="text-white text-6xl">{{ currentScore.toFixed(0) }}</h1>
        </div>

        <div class="flex flex-row gap-4 items-center justify-center">
            <!-- Button container to align left with relative positioning -->
            <LetterLevelButton text="Reset" :iconPath="restartIcon" @click="clearCanvas" />

            <!--Component for submit button-->
            <LetterLevelButton text="Submit" :iconPath="submitIcon" @click="submitLetter()" />
        </div>

        <!-- <h1 v-for="i in (props.repetitions * 2)" :key="i" class="text-white">{{ progressArray[i-1] }}</h1> -->
    </div>
</template>

<style scoped>
.custom-text-border {
    -webkit-text-stroke: 3px black;
}
</style>