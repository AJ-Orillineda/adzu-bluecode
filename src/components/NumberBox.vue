<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

// import apple from '/dev/img/apple.png';
// import cat from '/dev/img/cat.png';
// import dog from '/dev/img/dog.png';
// import water from '/dev/img/water.png';
// import pencil from '/dev/img/pencil.png';

const containerStyle = ref({}); // Reactive ref for background color

const images = [
    { path: '/dev/img/apple.png', name: 'apple' },
    { path: '/dev/img/cat.png', name: 'cat' },
    { path: '/dev/img/dog.png', name: 'dog' },
    { path: '/dev/img/water.png', name: 'water' },
    { path: '/dev/img/pencil.png', name: 'pencil' },
];

const objectTypes = ref(images);

const props = defineProps({
    maxObjects: { type: Number, required: true, default: 10 },
    objectType: { type: Number, default: 0 },
    randomObjectPerLevel: {type: Boolean, default: false },
    levelId: { type: [String, Number], required: true }, // ADDED: levelId prop
    playerId: { type: [String, Number], required: true }, // ADDED: playerId prop
});

const emit = defineEmits(['level-completed']); // ADDED: defineEmits

const randomImages = computed(() => {
    return Array(maxRounds.value).fill(0).map(() => {
        const randomIndex = generateRandomNumber(0, objectTypes.value.length - 1);
        return objectTypes.value[randomIndex].path;
    });
});

// update objectImage to use the current round's image
const objectImage = computed(() => {
    if (props.randomObjectPerLevel) {
        return randomImages.value[currentRound.value];
    }
    return objectTypes.value[props.objectType].path;
});


// maximum number of rounds
const maxRounds = ref(5);
// maximum number of objects per round
const maxObjects = ref(props.maxObjects);
// current score
const score = ref(0);
// score per correct answer
const scorePerCorrectAnswer = ref(1);

const selectedChoiceIndex = ref(null);
const isFeedbackActive = ref(false);
const feedbackColor = ref('');

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// object counts per round
const objectCountArray = computed(() => {
    const array = [];
    let previousNumber = null;

    for (let i = 0; i < maxRounds.value; i++) {
        let newNumber;
        do {
            newNumber = generateRandomNumber(1, maxObjects.value);
        } while (newNumber === previousNumber);

        array.push(newNumber);
        previousNumber = newNumber;
    }

    return array;
});

// current round
const currentRound = ref(0);

// current round object count
const currentRoundObjectCount = computed(() => objectCountArray.value[currentRound.value]);
const isTransitioning = ref(false);

const nextRound = () => {
    currentRound.value++;  // Move to next round
}

// helper function to display current round
const displayRound = computed(() => {
    return (currentRound.value + 1).toString();
});


// helper function to display maximum rounds
const displayMaxRounds = computed(() => {
    return maxRounds.value.toString();
});


// helper function to shuffle an input array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// generate choices for the current round
const currentRoundChoices = computed(() => {
    const array = [];
    let previousNumber = null;

    // push correct answer first
    array.push(currentRoundObjectCount.value);

    for (let i = 0; i < 3; i++) {
        let newNumber;
        do {
            newNumber = generateRandomNumber(1, maxObjects.value);
        } while (newNumber === previousNumber || array.includes(newNumber));

        array.push(newNumber);
        previousNumber = newNumber;
    }

    return shuffleArray([...array]);
});

// Modified checkAnswer function
const checkAnswer = (index) => {
    if (isTransitioning.value) return;
    index--; // Convert to 0-based index
    
    // Store selected choice and set feedback state
    selectedChoiceIndex.value = index;
    isFeedbackActive.value = true;
    
    if (currentRoundChoices.value[index] === currentRoundObjectCount.value) {
        // Correct answer
        feedbackColor.value = 'green';
        score.value += scorePerCorrectAnswer.value;
    } else {
        // Incorrect answer
        feedbackColor.value = 'red';
    }

    // Wait 2 seconds before proceeding
    setTimeout(() => {
        isFeedbackActive.value = false;
        selectedChoiceIndex.value = null;
        isTransitioning.value = true;
        
        // Simply proceed to next round or finish
        if (currentRound.value < maxRounds.value - 1) {
            nextRound();
        } else {
            finishLevel();
        }

        // Exit transition phase after the round is updated
        setTimeout(() => {
            isTransitioning.value = false;
        }, 50); // Small delay to ensure rendering is updated
    }, 2000);
};


const calculateStars = () => {
    if (score.value === maxRounds.value) {
        return 3;
    } else if (score.value >= maxRounds.value / 2) {
        return 2;
    } else {
        return 1;
    }
}

const levelFinished = ref(false);
const emit = defineEmits(['scoreUpdate']);

const finishLevel = () => {
    const starsEarned = calculateStars();
    
    axios.put(`/api/players/${props.playerId}/numbersLevel/${props.levelId}/score`, { score: finalScore })
        .then(response => {
            console.log('Player data updated:', response.data);
            emit('level-completed', props.levelId);
        })
        .catch(error => {
            console.error('Error updating player data:', error);
            alert('Failed to save score. Please try again later.');
    });
    emit('scoreUpdate', { 
        score: score.value, 
        stars: calculateStars(),
        levelFinished: true,
    });
    
    
    // alert(`Congrats! You earned ${ calculateStars().toString() } stars!`);
}

const reset = () => {
    currentRound.value = 0;
    score.value = 0;
    levelFinished.value = false;
}

defineExpose({ reset });


</script>

<template>
<div class="flex flex-col w-fit h-fit items-center justify-center gap-8">
    <!-- <button class="bg-orange-700 mb-4 p-2 font-bold" @click="nextRound">next round</button> -->
    <h1 class="text-4xl font-bold mb-4" style="-webkit-text-stroke-width: 2px;">Round {{ displayRound }} of {{ displayMaxRounds }}</h1>


    <!--Progress bar on top of container for objects-->

    <!--Container for objects-->
    <div class="bg-white w-[42rem] h-[24rem] flex flex-row items-center justify-center flex-wrap gap-6
    rounded-2xl border-4 border-[var(--color-pink)]"
    :style="containerStyle">
        <img :src="objectImage"
        v-for="n in currentRoundObjectCount"
        :key="n"
        alt="Image"
        class="w-28 h-28" />
    </div>

    <!--Answer choices-->
    <div class="grid grid-cols-4 w-full h-[5rem] flex-wrap gap-4">
        <button 
            v-for="n in 4" 
            :key="n" 
            @click="checkAnswer(n)" 
            class="text-[var(--color-blueTheme)] text-5xl p-2 rounded-2xl border-3 border-[var(--color-pink)] transition-all duration-100"
            style="font-family: 'Sigmar One', sans-serif; font-weight: 200; -webkit-text-stroke-width: 0px;"
            :class="{
                'bg-white': !(isFeedbackActive && (n-1) === selectedChoiceIndex),
                'bg-green-500': isFeedbackActive && (n-1) === selectedChoiceIndex && feedbackColor === 'green',
                'bg-red-500': isFeedbackActive && (n-1) === selectedChoiceIndex && feedbackColor === 'red'
            }">
            {{ currentRoundChoices[n - 1] }}
        </button>
    </div>
</div>

</template>

<style scoped>

</style>
