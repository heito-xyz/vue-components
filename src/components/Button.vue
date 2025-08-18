<template>
    <button :class="['ui-button', variant, { disabled }]"
        :disabled="disabled"

        @click="$emit('click', $event)"
    >
        <button class="before" v-if="$slots?.before"
            :disabled="before?.disabled || disabled === 'all'"

            @click.prevent.stop="$emit('clickBefore', $event)"
        >
            <slot name="before"/>
        </button>

        <div class="content">
            <slot/>
        </div>

        <button class="after" v-if="$slots?.after"
            :disabled="after?.disabled || disabled === 'all'"

            @click.prevent.stop="$emit('clickAfter', $event)"
        >
            <slot name="after"/>
        </button>
    </button>
</template>

<script lang="ts" setup>

type Variant = 'default' | 'destructive' | 'outline' | 'ghost';

interface PlusProps {
    disabled?: boolean;
}


const $slots = defineSlots<{
    default(): any;
    before(): any;
    after(): any;
}>();

const $emit = defineEmits({
    clickBefore(event: MouseEvent) {
        return event;
    },
    click(event: MouseEvent) {
        return event;
    },
    clickAfter(event: MouseEvent) {
        return event;
    }
});


const props = withDefaults(defineProps<{
    variant?: Variant;
    disabled?: boolean | 'all';
    before?: PlusProps;
    after?: PlusProps;
}>(), {
    variant: 'default'
});

</script>

<style lang="css" scoped>

button {
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
}

.ui-button .content,
.ui-button .before,
.ui-button .after {
    display: flex;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 7px;
    padding-right: 7px;
    color: var(--background-primary);
    align-items: center;
    background-color: var(--text-primary);
    transition: filter .2s, box-shadow .2s, background-color .2s;
}

.ui-button:not(:has(.before)) .content {
    padding-left: 14px;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}

.ui-button .content:not(:has(+ .after)) {
    padding-right: 14px;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

.ui-button .before {
    padding: 8px 7px 8px 10px;
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: 1px solid var(--background-primary);
}

.ui-button .content {
    width: 100%;
    position: relative;
    transform-origin: center;
}

.ui-button .after {
    padding: 8px 10px 8px 7px;
    border-radius: 0 0.5rem 0.5rem 0;
    border-left: 1px solid var(--background-primary);
}



.ui-button:not(:disabled) .content:hover,
.ui-button .before:not(:disabled):hover,
.ui-button .after:not(:disabled):hover {
    filter: brightness(0.8);
}

.ui-button:not(:disabled) .content:active,
.ui-button .before:not(:disabled):active,
.ui-button .after:not(:disabled):active {
    filter: brightness(0.5);
}

.ui-button.outline:not(:disabled) .content:active,
.ui-button.outline .before:not(:disabled):active,
.ui-button.outline .after:not(:disabled):active {
    box-shadow: 0 0 0 3px var(--background-secondary);
}

.ui-button:hover .content,
.ui-button:hover .after,
.ui-button:hover .before {
    z-index: 2;
}
.ui-button .content:hover,
.ui-button .after:hover,
.ui-button .before:hover {
    z-index: 1;
}



.ui-button:disabled .content,
.ui-button .before:disabled,
.ui-button .after:disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
}



/* ? Destructive style */
.ui-button.destructive .content,
.ui-button.destructive .after,
.ui-button.destructive .before {
    background-color: var(--color-red);
}


/* ? Outline style */
.ui-button.outline .content,
.ui-button.outline .after,
.ui-button.outline .before {
    color: var(--text-primary);
    border: 1px solid var(--background-t);
    background-color: var(--background-secondary);
}

.ui-button.outline:has(.before) .content {
    border-left: none;

    &::before {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 70%;
        top: 50%;
        left: 0;
        background-color: var(--background-t);
        transform: translateY(-50%);
    }
}

.ui-button.outline .content:has(+ .after) {
    border-right: none;

    &::after {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 70%;
        top: 50%;
        right: 0;
        background-color: var(--background-t);
        transform: translateY(-50%);
    }
}

.ui-button.outline .after {
    border-left: none;
}
.ui-button.outline .before {
    border-right: none;
}


/* ? Ghost style */
.ui-button.ghost .content,
.ui-button.ghost .after,
.ui-button.ghost .before {
    color: var(--text-primary);
    background-color: transparent;
}

.ui-button.ghost .content:hover,
.ui-button.ghost .after:hover,
.ui-button.ghost .before:hover {
    background-color: var(--background-secondary);
}

</style>