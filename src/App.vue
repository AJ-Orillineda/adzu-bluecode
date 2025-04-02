<script setup>
import { RouterLink, RouterView } from 'vue-router'
import WLetterTestPage from './components/WLetterTestPage.vue';
import VowelsPage from './components/VowelsPage.vue';
import MatchingTestPage from './components/MatchingTestPage.vue';
</script>

<template>
  <RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

.custom-text-border {
  -webkit-text-stroke: 3px black;
}

.font{
  font-family: 'Sigmar One', sans-serif; font-weight: 400;
}

.custom-play-icon{
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 60px solid var(--color-pink);
}


  @media (max-width: 360px) {
    .mobile-title {
      width: 32rem;
      margin-top: -25px;
    }
    .mobile-logo {
      width: 28rem;
      margin-top: -72px;
      left: 2px;
    }
    .mob-view-button{
      font-size: 2rem;
      width: 100%;
    }

    .mob-view-button-start{
      font-size: 2rem;
    }

    .home-title-start{
      font-size: 46px;
      text-align: center;
      margin-top: 120px;
    }

    .play-icon{
      width: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 40px solid var(--color-pink);
      margin-right: 2rem;
    }
  }
</style>
