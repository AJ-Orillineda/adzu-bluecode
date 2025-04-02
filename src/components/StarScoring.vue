<template>
    <div class="flex justify-center items-center">
        <div class="flex space-x-2" style="font-size: 7rem;">
          <span 
            v-for="(star, index) in 3" 
            :key="index" 
            @click="setRating(index + 1)"
            class="cursor-pointer"
            :class="index < rating ? 'text-yellow-500' : 'text-gray-300'"
          >
            ★<!--image-->
          </span>
        </div>
    </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            rating: 0, // Default rating
          };
        },
        methods: {
          setRating(value) {
            this.rating = value;
          },
        },
      };
      </script>
      