<template>
    <div class="flex flex-row justify-center items-center gap-8">
        <img v-for="i in 3" :key="i" :src="(i <= props.starCount) ? stariconfilled : stariconempty" class="w-24" />
    </div>
</template>

<script setup>
import stariconempty from '/dev/img/StarIconEmpty.png';
import stariconfilled from '/dev/img/StarIconwColor.png';

const props = defineProps({
    starCount: { type: Number, required: true, default: 0 },
});

</script>