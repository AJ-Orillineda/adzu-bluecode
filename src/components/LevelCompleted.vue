<script setup>
import BackButton from './BackButton.vue';
import HomeButton from './HomeButton.vue';
import LetterLevelButton from './LetterLevelButton.vue';
import StarScoring from './StarScoring.vue';

const props = defineProps({
    stars: { type: Number, required: true, default: 0 },
    nextLevelRoute: { type: String, required: true, default: '/' },
});

</script>

<template>
    <div class="h-screen w-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center gap-10 relative">
    <!--Home Button-->
        <BackButton class="absolute top-8 left-8 h-16" route="/numbers/matching"/>
    
    <!--Text for level completed-->
        <p class="mt-12 text-[var(--color-yellowTheme)] custom-text-border text-[3.5rem] mb-0 block leading-none" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            LEVEL
        </p>

        <p class="mt-2 text-[var(--color-yellowTheme)] custom-text-border text-[5rem] mb-0 block leading-none" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            COMPLETED
        </p>

        <StarScoring :starCount="props.stars" />

        
        <router-link :to="props.nextLevelRoute" id="next" class="text-[var(--color-blueTheme)] text-[2.5rem] bg-white rounded-2xl border-[var(--color-pink)] border-3 px-3 cursor-pointer flex justify-center items-center gap-2"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            NEXT
            <img src="@/assets/icons/playicon.png" alt="Button Image" class="custom-play-icon play-icon-size" />
        </router-link>
    </div>
</template>

<style scoped>

.custom-text-border {
  -webkit-text-stroke: 3px black;
}

.custom-play-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.play-icon-size{
  width: 48px;
  height: 48px;
}


@media (max-width: 360px){
.back-icon{
      width: 0;
      background-repeat: no-repeat;
    }
}


</style>