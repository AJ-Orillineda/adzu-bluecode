<script setup>
import BackButton from '@/components/BackButton.vue';
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

onMounted(() => {
    console.log(`levelId: ${levelId.value}`);
});

</script>

<template>
    <div class="w-screen h-screen p-8 flex flex-col justify-center items-center bg-[var(--color-darkmint)] gap-8 text-[6rem] text-[var(--color-yellowTheme)] custom-text-border"
    style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <BackButton route="/numbers/matching" class="absolute top-8 left-8" />
        <h1 class="text-8xl mb-6">Count this!</h1>
        <NumberBox :title="currentLevel.title.toString()" :maxObjects="currentLevel.maxObjects" :randomObjectPerLevel="currentLevel.randomObjectPerLevel" />
    </div>
</template>