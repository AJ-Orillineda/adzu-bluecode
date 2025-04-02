<script setup>
const props = defineProps({
    imgSrc: String,
    disabled: Boolean,
});
</script>

<template>
    <button 
        :class="[
            'w-full h-auto bg-white text-[var(--color-blueTheme)] text-[36px] rounded-4xl px-6 py-4 border-3 cursor-pointer flex flex-row items-center justify-center transition-transform duration-300 gap-x-2',
            disabled ? 'cursor-not-allowed' : 'hover:scale-105'
        ]"
        :disabled="disabled"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400; position: relative;"
    >
        <img v-if="imgSrc" :src="imgSrc" alt="Icon" class="w-15 h-15 z-10" />
        <slot />
        
        <!-- Gray Overlay -->
        <div v-if="disabled" class="absolute inset-0 bg-gray-900 opacity-50 rounded-4xl"></div>
    </button>
</template>