<script setup>
import BackButton from '@/components/BackButton.vue';
import LevelCompleted from '@/components/LevelCompleted.vue';
import NumberBox from '@/components/NumberBox.vue';
import { ref, onMounted } from 'vue';
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

</script>

<template>
    <div class="w-screen h-screen overflow-hidden">
        <LevelCompleted class="absolute z-50" :stars="starCount" :nextLevelRoute="nextLevelRoute()"
        :class="[(levelFinished) ? '' : 'hidden']" />

        <div class="w-screen h-screen p-8 flex flex-col justify-center items-center bg-[var(--color-darkmint)] gap-8 text-[6rem] text-[var(--color-yellowTheme)] custom-text-border transition-all duration-1000 ease-in-out"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            <BackButton route="/numbers/matching" class="absolute top-8 left-8" />
            <h1 class="text-8xl mb-6">Count this!</h1>
            
            <NumberBox :title="currentLevel.title" :maxObjects="currentLevel.maxObjects" :randomObjectPerLevel="currentLevel.randomObjectPerLevel" @score-update="handleScoreUpdate" />
        </div>
    </div>
</template>