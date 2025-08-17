import * as components from './components';


export default {
    install(app) {
        for (const key in components) {
            const component = components[key];

            app.component(key, component);
        }
    },
    ...components
}