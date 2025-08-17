import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


export default defineConfig(({ command }) => {
    const config = {
        plugins: [vue()],
    };

    if (command === 'build') {
        config['build'] = {
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
    } else if (command === 'serve') {
        config['root'] = path.resolve(__dirname, 'dev');
        config['server'] = {
            open: true
        }
    }

    return config;
});