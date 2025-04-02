<template>
    <button id="back" class="bg-white rounded-2xl border-[var(--color-pink)] border-3 cursor-pointer w-1/16">
        <img src="@/assets/icons/backicon.png" alt="Button Image" class="custom-back-icon back-icon-size" />
    </button>
</template>

<script>
</script>

<style scoped>

.custom-back-icon{
    display: inline-block;
    background-repeat: no-repeat;
}

.back-icon-size{
  width: 50px;
  height: 50px;
}


@media (max-width: 360px){
.back-icon{
      width: 0;
      background-repeat: no-repeat;
    }
}

</style>