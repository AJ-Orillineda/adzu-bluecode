<script setup>
import StarScoring from './StarScoring.vue';
import GoBackToVowelsMenu from './GoBackToVowelsMenu.vue';
import NextButton from './NextButton.vue'
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center">
    <div class="bg-white bg-opacity-50 p-6 rounded-lg w-[45rem] h-[25rem] relative">
      <!--Modal Header-->
      <h3 class="text-black text-xl text-center font-semibold mb-4">Modal Header</h3>

      <!--Modal Content-->
      <p class="text-gray-700 text-center">This is the modal content placeholder</p>

      <StarScoring/>

      <div class="relative top-[4.2rem] left-2/3 transform -translate-x-1/2 flex justify-center"> <!--custom position for nextbutton component-->
        <NextButton/>
      </div>

      <div>
        <GoBackToVowelsMenu/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isVisible", false); // Emit event to close the modal
    },
  },
};
</script>

<style scoped>
/* Modal backdrop styling */
.fixed {
  z-index: 1000;
}
</style>
