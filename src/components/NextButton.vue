<template>
    <button id="next" class="text-[var(--color-blueTheme)] text-[1.8rem] bg-white rounded-2xl border-[var(--color-pink)] border-3 px-4 cursor-pointer flex items-center"
    style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <img src="@/assets/icons/playicon.png" alt="Button Image" class="custom-play-icon play-icon-size" />
    NEXT
    </button>
</template>

<script>
</script>

<style scoped>

.custom-play-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.play-icon-size{
  width: 42px;
  height: 42px;
}


@media (max-width: 360px){
.back-icon{
      width: 0;
      background-repeat: no-repeat;
    }
}

</style>