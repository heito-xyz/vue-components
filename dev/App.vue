<template>
    <main>
        <Button variant="ghost">
            <!-- <template #before>-</template> -->

            Test Button
            
            <!-- <template #after>+</template> -->
        </Button>

        <div class="br"></div>

        {{ text }}

        <Input type="text" placeholder="A?" v-model:value="text"
            :min="5"
            :max="10000"
        >
            <!-- <template #before>123</template> -->
            <!-- <template #after>+</template> -->
        </Input>

        <div class="br"></div>

        {{ s }}
        <div class="g">
            <Select placeholder="a?" :options="[{ value: '123' }, { value: '312', disabled: true }, { type: 'label', value: 'asd' }]"
                @select="s[0] = $event"
            />

            <Select style="width: 70vw" placeholder="a2?" :options="[
                { value: '123', text: 'asdas dasd asdas dasdasdas dasd as dasd asda', useDefaultStyle: true },
                { type: 'label', value: 'Custom options' },
                {value: '1'},
                { type: 'separator' },
                { value: '3' },
            ]" @select="s[1] = $event">
                <template #option="{ option, index, select }">
                    <Button variant="outline" @click="select">
                        <span>{{ option?.value || option?.label }}</span>

                        <template #after>
                            <span>{{ index }}</span>
                        </template>
                    </Button>
                </template>
            </Select>
        </div>
    </main>
</template>

<script setup>

import { ref } from 'vue';

import { Button, Input, Select } from '../src/components';


const text = ref('');
const s = ref([]);

</script>

<style lang="css">

body {
    margin: 0;
    padding: 0;
}

* {
    color: var(--text-primary);
}

main {
    padding: 24px;
    height: 200vh;
    background-color: black;
    box-sizing: border-box;
}

.br {
    margin: 24px;
}

.g {
    background-color: var(--background-secondary);
    padding: 12px;
    overflow: hidden;
}

</style>