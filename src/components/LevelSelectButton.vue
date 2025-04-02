<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import StarScoring from '@/components/StarScoring.vue';
import lockicon from '/dev/img/lockicon.png';

const props = defineProps({
    locked: { type: Boolean, required: true, default: true },
    title: { type: String, required: true, default: 'Level' },
    stars: { type: Number, required: true, default: 0 },
    width: { type: String, default: 'w-full' },
    height: { type: String, default: 'h-72' },
    route: { type: String, default: '' }
});

const router = useRouter()

const changeRoute = () => {
    if (!props.locked) {
        router.push(props.route);
    }
}

</script>

<template>
    <button class="h-72 bg-white text-[var(--color-blueTheme)] text-[4rem] text-center rounded-4xl px-6 border-[var(--color-pink)] border-3 cursor-pointer flex items-center justify-center" 
    :class="[props.width, props.height]"
    @click="changeRoute"
        style="font-family: 'Sigmar One', sans-serif; font-weight: 400;">

        <div class="flex flex-col items-center justify-center relative w-full h-full gap-4">
            <p class="mb-0 block leading-none w-full text-center">{{ props.title }}</p>
            <img v-if="props.locked" :src="lockicon" class="absolute w-16 right-0 top-2" />
            <StarScoring :starCount="props.stars" />
        </div>
    </button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
</style>