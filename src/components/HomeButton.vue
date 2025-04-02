<template>
    <button id="home-button" class="bg-white rounded-2xl border-[var(--color-pink)] border-3 cursor-pointer w-1/16 flex items-center justify-center">
        <img src="@/assets/icons/homeicon.png" alt="Button Image" class="custom-home-icon home-icon-size" />
    </button>
</template>

<script>
</script>

<style scoped>

.custom-home-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.home-icon-size{
  width: 56px;
  height: 56px;
}


@media (max-width: 360px){
.back-icon{
      width: 0;
      background-repeat: no-repeat;
    }
}

</style>