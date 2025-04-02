<script setup>
import StarScoring from './StarScoring.vue';
</script>
<template>
  <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center">
    <div class="bg-white bg-opacity-50 p-6 rounded-lg w-[45rem] h-[25rem] relative">
      <h3 class="text-black text-xl text-center font-semibold mb-4">Modal Header</h3>
      <p class="text-gray-700 text-center">This is the modal content</p>

      <StarScoring/>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center">
        <button
          class="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          @click="closeModal"
        >
          Close Modal
        </button>
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
