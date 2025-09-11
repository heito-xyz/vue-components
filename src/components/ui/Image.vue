<template>
    <Transition name="fade">
        <img class="ui-image" :src="src" :alt="alt" v-show="mode === 'ready'">
    </Transition>

    <Skeleton class="ui-image" :ready="false" v-show="mode !== 'ready'"/>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';

// * Components
import Skeleton from './Skeleton.vue';


const props = defineProps<{
    src: string;
    alt?: string;
}>();


const mode = ref<'ready' | 'error' | 'loading'>('loading');


watch(() => props.src, () => render());


function render() {
    const img = new Image();

    mode.value = 'loading';

    img.onload = () => {
        mode.value = 'ready';
    };

    img.onerror = () => {
        mode.value = 'error';
    };

    img.src = props.src;
}


onMounted(() => render());

</script>

<style lang="scss" scoped>

img.ui-image {
    object-fit: cover;
    object-position: center;
    transition: opacity .2s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>