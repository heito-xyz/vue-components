import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/index.js',
            name: 'HeitoVueComponents',
            fileName: 'vue-components'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});