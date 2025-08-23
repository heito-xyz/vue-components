<template>
    <TriggerSlot/>

    <Teleport to="body">
        <Transition name="show"
            @before-enter="onEnter($event as any)"
        >
            <div :class="['tooltip', ...tooltipSide]" v-if="open">
                <slot name="default"/>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>

import { computed, h, onUnmounted, ref, type VNode } from 'vue';

// * Types
export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';


const $slots = defineSlots<{
    trigger(): Array<VNode>;
    default(): Array<VNode>;
}>();


const open = defineModel<boolean>('open');


const tooltip = ref<HTMLElement | null>();


const props = withDefaults(defineProps<{
    side?: Side | [Side, Align];
    collisionPadding?: number | [number, number];
    delay?: number;
}>(), {
    side: () => 'top',
    collisionPadding: () => 8,
    delay: 100
});


const reSide = ref<Side | null>(null);


const tooltipSide = computed(() => {
    const side = typeof props.side === 'string' ? [props.side, 'center'] : props.side;

    if (reSide.value !== null) side[0] = reSide.value;

    return side as [Side, Align];
});


let timeout: ReturnType<typeof setTimeout> | null = null;
let targetEvent: MouseEvent | FocusEvent | null = null;


function onEnter(element: HTMLElement) {
    if (!element || !targetEvent) return;

    const target = targetEvent.target as HTMLElement;

    const { width, height, x, y, top, left, right, bottom } = target?.getBoundingClientRect();
    const { width: menuWidth, height: menuHeight } = element?.getBoundingClientRect();

    const [side] = tooltipSide.value;
    const [horizontal, vertical] = typeof props.collisionPadding === 'number' ?
        [props.collisionPadding, props.collisionPadding] : props.collisionPadding;

    if (side === 'top' && (top - menuHeight - vertical) < 0) {
        reSide.value = 'bottom';
    } else if (side === 'left' && (left - menuWidth - horizontal) < 0) {
        reSide.value = 'right';
    } else if (side === 'bottom' && (menuHeight + bottom) > window.innerHeight) {
        reSide.value = 'top';
    } else if (side === 'right' && (menuWidth + right) > window.innerWidth) {
        reSide.value = 'left';
    }

    element.style.setProperty('--gap-h', `${horizontal}px`);
    element.style.setProperty('--gap-v', `${vertical}px`);
    element.style.setProperty('--target-width', `${width}px`);
    element.style.setProperty('--target-height', `${height}px`);
    element.style.setProperty('--target-x', `${x}px`);
    element.style.setProperty('--target-y', `${y}px`);
}

function handleMouseEnter(event: MouseEvent | FocusEvent) {
    if (timeout) clearTimeout(timeout);

    targetEvent = event;

    timeout = setTimeout(() => {
        open.value = true;
    }, props.delay);
}

const handleMouseLeave = () => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    
    targetEvent = null;
    open.value = false
}


function TriggerSlot() {
    const triggerNodes = $slots.trigger?.() || [];

    return triggerNodes.map(vnode => {
        return h(vnode.type as any, {
            ...vnode.props,
            onMouseenter(e) {
                handleMouseEnter(e);
                vnode.props?.onMouseenter?.(e);
            },
            onMouseleave(e) {
                handleMouseLeave();
                vnode.props?.onMouseleave?.(e);
            },
            onFocus(e) {
                handleMouseEnter(e);
                vnode.props?.onFocus?.(e);
            },
            onBlur(e) {
                handleMouseLeave();
                vnode.props?.onBlur?.(e);
            }
        }, vnode.children as any);
    });
}


onUnmounted(() => {
    if (timeout) clearTimeout(timeout);
});

</script>

<style lang="scss" scoped>

.tooltip {
    padding: 4px 8px;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    border-radius: 0.5rem;
    border: 1px solid var(--background-t);
    background-color: bar(--background-secondary);
    z-index: 1000;

    &.top { --v: calc(var(--target-y) - 100% - var(--gap-v)); }
    &.bottom { --v: calc(var(--target-y) + var(--target-height) + var(--gap-v)); }

    &.top,
    &.bottom {
        &.start { transform: translate(var(--target-x), var(--v)); }

        &.center { transform: translate(calc(var(--target-x) + (var(--target-width) / 2) - 50%), var(--v)); }

        &.end { transform: translate(calc(var(--target-x) + var(--target-width) - 100%), var(--v)); }
    }

    &.left { --h: calc(var(--target-x) - 100% - var(--gap-h)); }
    &.right { --h: calc(var(--target-x) + var(--target-width) + var(--gap-h)); }

    &.left,
    &.right {
        &.start { transform: translate(var(--h), var(--target-y)); }

        &.center { transform: translate(var(--h), calc(var(--target-y) + (var(--target-height) / 2) - 50%)); }

        &.end { transform: translate(var(--h), calc(var(--target-y) + var(--target-height) - 100%)); }
    }
}

</style>