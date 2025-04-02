<script setup>
const props = defineProps({
    route: { type: String, required: true, default: '/' },
});
</script>

<template>
    <router-link :to="props.route" id="back" class="bg-white rounded-2xl border-[var(--color-pink)] border-3 cursor-pointer w-1/16 flex items-center justify-center">
        <img src="@/assets/icons/backicon.png" alt="Button Image" class="custom-back-icon back-icon-size" />
    </router-link>
</template>


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