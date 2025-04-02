<script setup>
import { ref } from 'vue';
import NumberBox from '@/components/NumberBox.vue';
import LetterBox from '@/components/LetterBox.vue';
import WLetterTestPage from '@/components/WLetterTestPage.vue';
</script>

<template>
    <div class="flex flex-col w-full h-full flex-wrap items-center justify-center gap-6">
        <NumberBox maxObjects="10" objectType="2" randomObjectPerLevel="true" />
        <!-- <LetterBox :repetitions="3" letter="A" /> -->
        
    </div>
</template>