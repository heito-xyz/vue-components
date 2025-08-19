<template>
    <div :class="['option', !option?.type || option?.type === 'option' ? 'default' : option?.type, { disabled: option?.type === 'option' && option?.disabled }]"
        @click="onClick"
    >
        <template v-if="option?.type === 'option'">
            <div>
                <div>{{ option?.label || option?.value }}</div>

                <div>{{ option?.text }}</div>
            </div>
        </template>

        <template v-else-if="option?.type === 'label'">
            <span>{{ option?.value }}</span>
        </template>

        <template v-else-if="option?.type === 'separator'"/>
    </div>
</template>

<script lang="ts" setup>

export type OptionType = 'option' | 'label' | 'separator';

interface TemplateOption<Type = string> {
    type?: Type;
}

export interface OptionOption extends TemplateOption<'option'> {
    label?: string;
    text?: string;
    value: string | number | number;
    disabled?: boolean;
    useDefaultStyle?: boolean;
}

export interface OptionLabel extends TemplateOption<'label'> {
    value: string;
}

export interface OptionSeparator extends TemplateOption<'separator'> {}

export type Option = OptionOption | OptionLabel | OptionSeparator;


const $emit = defineEmits({
    click(event: MouseEvent, option: OptionOption) {
        return { event, option };
    }
});


const props = defineProps<{
    option: Option;
}>();


function onClick(event: MouseEvent) {
    if (props?.option?.type !== 'option' || props?.option?.disabled === true) return;

    $emit('click', event, props.option);
}

</script>

<style lang="css" scoped>

.option {
    color: var(--text-primary);
    font-size: 14px;
}

.option.label {
    margin: 4px 0;
    font-size: 12px;
    word-break: break-all;
    opacity: 0.7;
}

.option.separator:has(+ .option.label) {
    margin-bottom: 0;
}

.option.label + .option.separator {
    margin-top: 0;
}

.option.separator {
    margin-top: 4px;
    margin-bottom: 4px;
    border-top: 1px solid var(--background-t);
}


.option.default {
    display: flex;
    padding: 4px 8px;
    border-radius: 0.5rem;
    align-items: center;
    background-color: var(--background-secondary);
    transition: .2s;
    overflow: hidden;
}

.option.default:not(.disabled):hover {
    cursor: pointer;
    filter: brightness(0.8);
}

.option.default.disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.option.default > div {
    max-width: 100%;
    min-width: 0;
    flex: 1;
}

.option.default > div div {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.option.default > div > div:nth-child(2) {
    font-size: 12px;
}

</style>