import * as components from './components';

// * Styles
import './assets/styles/vars.css';


export default {
    install(app) {
        for (const key in components) {
            const component = components[key];

            app.component(key, component);
        }
    },
    ...components
}