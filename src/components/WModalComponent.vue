<script setup>
import StarScoring from './StarScoring.vue';
import GoBackToVowelsMenu from './GoBackToVowelsMenu.vue';
import NextButton from './NextButton.vue'
import LetterLevelButton from './LetterLevelButton.vue';

import playIcon from '@/assets/icons/PlayIcon.png'
import homeIcon from '@/assets/icons/HomeIcon.png'

const props = defineProps({
    levelId: { type: Number, required: true, default: 0 },
    isVisible: { type: Boolean, default: false },
    stars: { type: Number, required: true, default: 0 },
});

const nextLevelRoute = () => {
    const nextLevelId = parseInt(props.levelId) + 1;

    if (nextLevelId >= 5) {
        return '/letters/vowels'
    }
    else {
        return `/letters/vowels/tracing/${nextLevelId}`
    }
}

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

</script>

<template>
  <div v-if="isVisible" class="z-50 inset-0 flex justify-center items-center bg-[#02020290]">
    <div class="bg-white bg-opacity-50 p-6 rounded-lg w-[45rem] h-[25rem] relative flex flex-col justify-center items-center gap-8 border-4 border-gray-800">
      <!--Modal Header-->
      <h3 class="text-center mb-4" style="color: black; font-size: 4rem; font-weight: 800;">
        Level Done!
      </h3>

      <StarScoring :starCount="props.stars" />

      <div class="flex flex-row gap-3 mt-6"> <!--custom position for nextbutton component-->
          <LetterLevelButton text="Return" :iconPath="homeIcon" route="/letters/vowels" />
          <LetterLevelButton text="Next" :iconPath="playIcon" :route="nextLevelRoute()" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
