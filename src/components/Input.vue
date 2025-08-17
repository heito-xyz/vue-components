<template>
    <label :class="['ui-input', type]">
        <div class="before" v-if="$slots?.before">
            <slot name="before"/>
        </div>

        <div class="number-btn l" v-if="type === 'number'"
            @click="value = Number(value) - 1"
        >-</div>

        <input :type="type" v-model="value"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :maxlength="max"

            @input="$emit('input', $event)"
            @change="$emit('change', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >

        <div class="number-btn r" v-if="type === 'number'"
            @click="value = Number(value) + 1"
        >+</div>

        <div class="after" v-if="$slots?.after">
            <slot name="after"/>
        </div>
    </label>
</template>

<script lang="ts" setup>

type Type = 'text' | 'number';

type InputEvent = Event & { target: HTMLInputElement };


interface Props {
    type?: Type;
    disabled?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
}


const $slots = defineSlots<{
    before(): any;
    after(): any;
}>();


const value = defineModel('value', {
    set(v) {
        const { type, min, max } = props;

        if (type !== 'number') return v;

        if (v < min) return min;
        if (v > max) return max;

        return v;
    },
});


const $emit = defineEmits({
    input(event: InputEvent) {
        return event;
    },
    change(event: InputEvent) {
        return event;
    },
    focus(event: FocusEvent) {
        return event;
    },
    blur(event: FocusEvent) {
        return event;
    }
});


const props = withDefaults(defineProps<Props>(), {
    type: 'text'
});

</script>

<style lang="css" scoped>

input {
    padding: 0;
    width: 100%;
    color: var(--text-primary);
    font-size: 14px;
    border: none;
    background-color: transparent;
    outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'] {
    -moz-appearance: textfield;
}


.ui-input {
    display: flex;
    padding: 6px 10px;
    color: var(--text-primary);
    font-size: 14px;
    border-radius: 0.5rem;
    border: 1px solid var(--background-t);
    align-items: center;
    justify-self: start;
    background-color: var(--background-secondary);
    transition: box-shadow .2s;
    user-select: none;
    overflow: hidden;
}

.ui-input:has(> input:focus) {
    box-shadow: 0 0 0 3px var(--background-secondary);
}

.before {
    margin-right: 4px;
}
.after {
    margin-left: 4px;
}


/* ? Type - number */
.ui-input.number {
    padding: 0;
}

.ui-input.number input {
    margin: 0 6px;
    text-align: center;
}

.number-btn {
    cursor: pointer;
    padding: 6px 10px;
    transition: filter .2s;
    background-color: var(--background-secondary);
}
.number-btn.l {
    border-right: 1px solid var(--background-t);
}
.number-btn.r {
    border-left: 1px solid var(--background-t);
}

.number-btn:hover {
    filter: brightness(0.9);
}

</style>