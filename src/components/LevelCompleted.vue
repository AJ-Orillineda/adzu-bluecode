<script setup>
import HomeButton from './HomeButton.vue';
import StarScoring from './StarScoring.vue';
</script>

<template>
    <div class="h-screen bg-[var(--color-darkmint)] p-4 py-10 px-10 mx-0 flex flex-col items-center gap-10 relative">
    <!--Home Button-->
        <HomeButton class="relative right-[48%] transform -translate-y-1/2 z-10"/>
    
    <!--Text for level completed-->
        <p class="mt-12 text-[var(--color-yellowTheme)] custom-text-border text-[3.5rem] mb-0 block leading-none" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            FIRST LEVEL
        </p>

        <p class="mt-2 text-[var(--color-yellowTheme)] custom-text-border text-[5rem] mb-0 block leading-none" style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            COMPLETED
        </p>

        <StarScoring/>

        
        <button id="next" class="text-[var(--color-blueTheme)] text-[2.5rem] bg-white rounded-2xl border-[var(--color-pink)] border-3 px-3 cursor-pointer flex items-center gap-2"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
            NEXT
            <img src="@/assets/icons/playicon.png" alt="Button Image" class="custom-play-icon play-icon-size" />
        </button>
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