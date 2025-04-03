<script setup>
import BackButton from '@/components/BackButton.vue';
import LevelCompleted from '@/components/LevelCompleted.vue';
import NumberBox from '@/components/NumberBox.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    levelId: { type: Number, required: true },
});

const levels = {
    0: { title: 'easy', maxObjects: '5', randomObjectPerLevel: false },
    1: { title: 'medium', maxObjects: '7', randomObjectPerLevel: true },
    2: { title: 'hard', maxObjects: '10', randomObjectPerLevel: true },
}

const currentLevel = ref(levels[props.levelId]);
const starCount = ref(0);
const levelFinished = ref(false);

const handleScoreUpdate = (scoreData) => {
    starCount.value = scoreData.stars;
    levelFinished.value = scoreData.levelFinished;
    console.log('Stars received:', scoreData.stars);

    // - Save to localStorage
    // - Update your state management (Pinia/Vuex)
    // - Send to backend
    // - Update parent component state
};

const nextLevelRoute = () => {
    const nextLevelId = parseInt(props.levelId) + 1;

    if (nextLevelId >= 3) {
        return '/numbers/matching'
    }
    else {
        return `/numbers/matching/${nextLevelId}`
    }
}


onMounted(() => {
    levelFinished.value = false;
    starCount.value = 0;
});

const numberBoxRef = ref(null);

watch(() => props.levelId, (newLevelId) => {
  levelFinished.value = false;
  starCount.value = 0;
  currentLevel.value = levels[newLevelId];

  if (numberBoxRef.value) {
    numberBoxRef.value.reset();
  }
}, { immediate: true });

</script>

<template>
    <div class="w-screen h-screen overflow-hidden">
        <LevelCompleted class="absolute z-50" :stars="starCount" :nextLevelRoute="nextLevelRoute()"
        :class="[(levelFinished) ? '' : 'hidden']" />

        <div class="w-screen h-screen p-8 flex flex-col justify-center items-center bg-[var(--color-darkmint)] gap-8 text-[6rem] text-[var(--color-yellowTheme)] custom-text-border transition-all duration-1000 ease-in-out"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400; -webkit-text-stroke-width: 3px; -webkit-text-stroke-color: black;">
            <div class="flex flex-row w-fit gap-6 absolute top-8 left-8 justify-center items-center">
                <BackButton route="/numbers/matching" class="relative w-24" />
                <h1 class="text-3xl" style="-webkit-text-stroke-width: 1px;">Difficulty: {{ currentLevel.title }}</h1>
            </div>
            <h1 class="text-8xl mb-6">Count this!</h1>
            
            <NumberBox
                ref="numberBoxRef"
                :key="props.levelId"
                :title="currentLevel.title"
                :maxObjects="currentLevel.maxObjects"
                :randomObjectPerLevel="currentLevel.randomObjectPerLevel"
                @score-update="handleScoreUpdate" />
        </div>
    </div>
</template>