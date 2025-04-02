<script setup>
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
    <div class="w-screen h-screen flex flex-col justify-center items-center">
        <h1>{{ currentLevel.title.toString() }}</h1>
        <NumberBox :title="currentLevel.title.toString()" :maxObjects="currentLevel.maxObjects" :randomObjectPerLevel="currentLevel.randomObjectPerLevel" />
    </div>
</template>