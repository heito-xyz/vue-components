<template>
    <div :class="['ui-select', { selected: Boolean(selectedOption) }]">
        <Button variant="outline" :disabled="disabled"
            @click="onShowSelectMenu"
        >
            <span>{{ selectedOption ? (selectedOption?.label || selectedOption?.value) : placeholder }}</span>

            <div>{{ isOpened ? '-' : '+' }}</div>
        </Button>

        <Transition name="show-select-options">
            <div class="options" v-show="isOpened">
                <template v-for="(option, index) in options" :key="index">
                    <template v-if="option?.type === 'label' || option?.type === 'separator' || option?.useDefaultStyle === true">
                        <SelectOption :option="option"
                            @click="onSelectOption(option)"
                        />
                    </template>

                    <template v-else>
                        <slot name="option"
                            v-bind="{ option, index, select: () => onSelectOption(option) }"
                        >
                            <SelectOption :option="option"
                                @click="onSelectOption(option)"
                            />
                        </slot>
                    </template>
                </template>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue';

// * Components
import Button from './Button.vue';
import SelectOption, { type Option } from './modules/ui/SelectOption.vue';


const $emit = defineEmits({
    select(option: Option) {
        return option;
    }
});


const props = defineProps<{
    placeholder?: string;
    disabled?: boolean;
    options?: Array<Option>;
}>();


const isOpened = ref(false);
const selectedValue = ref<string | number | boolean>();


const selectedOption = computed(() => {
    return props.options?.find(o => (o?.type === 'option' || !o?.type) && o?.value === selectedValue.value) || null;
});


function onSelectOption(option: Option) {
    if (option?.type === 'label' || option?.type === 'separator') return;

    selectedValue.value = option?.value;

    isOpened.value = false;

    $emit('select', option);
}



function setMenuPosition(elHeader: HTMLButtonElement, elOptions: HTMLDivElement) {
    const { width, top, bottom, y, x } = elHeader?.getBoundingClientRect();
    const { width: w, height } = elOptions?.getBoundingClientRect();

    const isTop = height + bottom > window.innerHeight;

    console.log(width, w, (width - w) / 2)

    elOptions.style.width = `${width}px`;
    elOptions.style.top = `${isTop ? top - height - 8 : bottom}px`
    elOptions.style.setProperty('--width', `${width}px`);
}


function onShowSelectMenu(event: MouseEvent) {
    isOpened.value = true;

    const elHeader = (event.target as HTMLButtonElement)?.parentElement;
    const elParent = elHeader?.parentElement;
    const elOptions = elParent?.querySelector('.options');

    const setPosition = () => {
        if (!isOpened.value) {
            return document.removeEventListener('scroll', setPosition);
        }

        setMenuPosition(elHeader, elOptions);
    };

    setTimeout(setPosition, 10);

    const closeSelectMenu = () => {
        window.addEventListener('click', e => {
            const path = (e as any)?.path || (e.composedPath ? e.composedPath() : undefined);

            if (path && path.includes(elParent)) return closeSelectMenu();

            isOpened.value = false;

            document.removeEventListener('scroll', setPosition);
        }, { once: true });

        document.removeEventListener('scroll', setPosition);
        document.addEventListener('scroll', setPosition);
    }

    setTimeout(() => closeSelectMenu(), 10);
}

</script>

<style lang="css" scoped>

.show-select-options-enter-active,
.show-select-options-leave-active {
    opacity: 0;
}


.ui-select {
    width: 169px;
    position: relative;
    user-select: none;
}

.ui-button {
    width: 100%;
}

::v-deep(.ui-button) .content {
    justify-content: space-between;
}

::v-deep(.ui-button) .content span {
    opacity: 0.7;
}

.ui-select.selected ::v-deep(.ui-button) .content span {
    opacity: 1;
}


.ui-select .options {
    display: flex;
    margin: 4px 0;
    padding: 8px;
    max-width: 512px;
    width: clamp(169px, var(--width), 512px);
    min-width: 169px;
    position: fixed;
    border-radius: 0.5rem;
    border: 1px solid var(--background-t);
    flex-direction: column;
    background-color: var(--background-secondary);
    transform: translateX(calc(var(--width) / 2 - 50%));
    transition: opacity .2s;
    box-sizing: border-box;
    z-index: 101;
}

</style>