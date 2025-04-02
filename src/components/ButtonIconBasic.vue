<script setup>
const props = defineProps({
    imgSrc: String,
});
</script>

<template>
    <button class="w-auto h-auto bg-white text-[var(--color-blueTheme)] text-[36px] rounded-4xl px-6 py-4
    border-[var(--color-pink)] border-3 cursor-pointer flex flex-row items-center justify-center 
    transition-transform duration-300 hover:scale-105 gap-x-2" 
    style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <img v-if="imgSrc" :src="imgSrc" alt="Icon" class="w-10 h-10" />
        <slot />
    </button>
</template>