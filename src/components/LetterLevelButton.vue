<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    text: { type: String, required: true, default: '' },
    iconPath: { type: String, required: true, default: '' },
    route: { type: String, default: '' }
});

const router = useRouter();

const handleClick = () => {
    if (props.route) {
        router.push(props.route);
    }
};

</script>

<template>
    <div @click="handleClick" class="flex flex-row items-center justify-center
    w-72 h-16 rounded-full
    text-[var(--color-blueTheme)] text-[2rem] bg-white
    border-[var(--color-pink)] border-3 cursor-pointer"
    style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
        <img :src="props.iconPath" class="h-full" />
        <h1>{{ props.text }}</h1>
    </div>
</template>

    <!-- <div class="relative right-[12rem] top-[3rem] transform -translate-y-1/2 z-10">
        <button class="text-[var(--color-blueTheme)] text-[2rem] bg-white rounded-full px-6
        border-[var(--color-pink)] border-3 cursor-pointer" 
          style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">
          <img src="@/assets/icons/restarticon.png" alt="Button Image" class="custom-restart-icon restart-icon-size" />
          RESET
        </button>
      </div> -->
