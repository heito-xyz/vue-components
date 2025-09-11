<template>
    <slot v-if="ready"/>

    <div class="ui-skeleton" :style="{ '--w': w, '--h': h }" v-else>
        <div></div>
        <slot name="content"/>
    </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
    ready: boolean;
    w?: string;
    h?: string;
}>(), {
    ready: false,
    w: '16px',
    h: '16px'
});

</script>

<style lang="scss" scoped>

:where(div.ui-skeleton) {
    width: var(--w);
    height: var(--h);
}

div.ui-skeleton {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: var(--background-secondary);
    overflow: hidden;

    div {
        width: 100%;
        height: 100%;
        
        &:before {
            content: '';
            display: block;
            width: 0;
            height: 100%;
            position: absolute;
            top: 5%;
            box-shadow: 0 2px 15px 9px rgba(255,255,255,0.4);
            animation: shades 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
            transform: skewX(-20deg);
            z-index: 5;
        }
    }
}


@keyframes shades {
    0% { left: 0%; opacity: 0; }
    50% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
}

</style>