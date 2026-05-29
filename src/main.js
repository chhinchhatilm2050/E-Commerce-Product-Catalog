import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import i18n from './i18n/index.js';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(i18n);
app.use(pinia);

app.mount('#app')
