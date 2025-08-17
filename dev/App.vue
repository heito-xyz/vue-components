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
        
        <Select/>
    </main>
</template>

<script setup>

import { ref } from 'vue';

import { Button, Input, Select } from '../src/components';


const text = ref('');

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
    height: 100vh;
    background-color: black;
    box-sizing: border-box;
}

.br {
    margin: 24px;
}

</style>