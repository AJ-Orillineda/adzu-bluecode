<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
// import apple from '/dev/img/apple.png';
// import cat from '/dev/img/cat.png';
// import dog from '/dev/img/dog.png';
// import water from '/dev/img/water.png';
// import pencil from '/dev/img/pencil.png';

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


// function to move to the next round
const nextRound = () => {
    if (props.randomObjectPerLevel) {
        objectImage;
    }

    if (currentRound.value < maxRounds.value - 1) {
        currentRound.value++;
    } else {
        finishLevel(); // Call finishLevel when all rounds are done
        currentRound.value = 0; // Reset round for potential replay
        score.value = 0; // Reset score for potential replay
    }
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

const checkAnswer = (index) => {
    index--;

    console.log(`currentRoundChoices: ${currentRoundChoices.value[index]}   currentRoundObjectCount: ${currentRoundObjectCount.value} index: ${index}`);

    if (currentRoundChoices.value[index] === currentRoundObjectCount.value) {
        score.value += scorePerCorrectAnswer.value;
        alert('Correct!');
    } else {
        alert('Incorrect! The correct answer is ' + currentRoundObjectCount.value + ' index = ' + index);
    }

    if (currentRound.value + 1 <= maxRounds.value - 1) {
        nextRound();
    }
    else {
        finishLevel();
    }
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

const finishLevel = () => {
    const finalScore = calculateStars();
    alert(`Congrats! You earned ${finalScore} stars!`);

    // Make API call to update backend with score and increment level
    fetch(`/api/players/${props.playerId}/numbersLevel/${props.levelId}/score`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: finalScore }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Player data updated:', data);
        emit('level-completed', props.levelId); // Emit an event with the completed level ID
    })
    .catch(error => {
        console.error('Error updating player data:', error);
        alert('Failed to save score. Please try again later.'); // Basic error feedback
        // Optionally, emit an error event to the parent to handle the failure
    });
};

</script>

<template>
<div class="flex flex-col w-fit h-fit items-center justify-center gap-2">
    <button class="bg-orange-700 mb-4 p-2 font-bold" @click="nextRound">next round</button>
    <h1 class="text-3xl font-bold mb-4">Round {{ displayRound }} of {{ displayMaxRounds }}</h1>

    <div class="bg-slate-800 w-[50rem] h-[36rem] flex flex-row items-center justify-center flex-wrap gap-6">
        <img :src="objectImage"
        v-for="n in currentRoundObjectCount"
        :key="n"
        alt="Image"
        class="w-32 h-32" />
    </div>

    <div class="grid grid-cols-2 w-full h-full flex-wrap gap-4">
        <button v-for="n in 4" :key="n" @click="checkAnswer(n)" class="bg-white text-black text-2xl p-4">{{ currentRoundChoices[n - 1] }}</button>
    </div>
</div>
</template>