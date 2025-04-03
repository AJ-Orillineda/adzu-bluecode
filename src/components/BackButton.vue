<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    route: { type: String, default: '' }
});

const router = useRouter();

const handleClick = () => {
    if (props.route) {
        router.push(props.route);
    } else {
        router.back();
    }
};

</script>

<template>
    <button
        @click="handleClick()"
        id="back" 
        class="bg-white rounded-2xl border-[var(--color-pink)] border-3 cursor-pointer w-1/16 flex items-center justify-center 
        transition-transform duration-300 hover:scale-110"
    >
        <img src="@/assets/icons/backicon.png" alt="Button Image" class="custom-back-icon back-icon-size" />
    </button>
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