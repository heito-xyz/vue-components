import type { App, Plugin } from 'vue';

// * Components
import * as components from './components/index';

// * Styles
import './assets/vars.scss';

export default {
    install(app: App) {
        for (const key in components) {
            // @ts-ignore
            app.component(key, components[key]);
        }
    }
} as Plugin;

export * from './components/index';