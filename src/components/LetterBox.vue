<script setup>
import { ref, computed } from 'vue';
import Canvas from './Canvas.vue';

const props = defineProps({
    // level: {type: Number, required: true, default: 0 },
    letter: {type: String, required: true, default: 'A' },
    repetitions: {type: Number, required: true, default: 3}, // repetitions per uppercase/lowercase letter
});

const uppercaseLetter = props.letter.toString().toUpperCase();
const lowercaseLetter = props.letter.toString().toLowerCase();

console.log('Uppercase:', uppercaseLetter); // For debugging
console.log('Lowercase:', lowercaseLetter); // For debugging

const progressArray = computed(() => {
    const array = [];
    const arraySize = props.repetitions * 2;

    for (let i = 0; i < arraySize; i++) {
        array.push(i < props.repetitions ? uppercaseLetter : lowercaseLetter)
        console.log(array[i]);
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

// handle case when level is finished
const finishLevel = () => {
    alert(`Congratulations! Your average score is ${ averageScore.value }. You earned ${ calculateStars() } stars`);
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
</script>



<template>
    <div class="flex flex-col gap-2">
        <Canvas
        ref="canvasRef"
        :letter="progressArray[progress].toString()"
        :canvasWidth="500"
        :canvasHeight="400"
        :progression="progress"
        @score-change="handleScoreChange" />

        <button type="button" class="bg-gray-100 p-2 text-black" @click="clearCanvas">Clear</button>
        <button class="bg-orange-800 text-2xl font-bold p-2" @click="submitLetter()">Submit</button>
        <h1 class="text-white text-3xl">Score:</h1>
        <h1 id="score-text" class="text-white text-2xl">{{ currentScore.toFixed(0) }}</h1>

        <!-- <h1 v-for="i in (props.repetitions * 2)" :key="i" class="text-white">{{ progressArray[i-1] }}</h1> -->
    </div>
</template>