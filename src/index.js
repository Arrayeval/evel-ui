import Dialog from '../packages/dialog/index.js';

const components = [
    Dialog
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.vue)
}

export default {
    version: '2.9.1',
    Dialog
}