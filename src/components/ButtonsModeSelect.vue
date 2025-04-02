<script setup>
const props = defineProps({
    imgSrc: String,
});
</script>

<template>
    <button class="w-full bg-white text-[var(--color-blueTheme)] text-[96px] rounded-4xl px-6 pt-10 
    border-[var(--color-pink)] border-3 cursor-pointer flex flex-col items-center justify-center w-full
    transition-transform duration-300 hover:scale-103" 
    style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <img v-if="imgSrc" :src="imgSrc" alt="Icon" class="mb-2" />
        <slot />
    </button>
</template>