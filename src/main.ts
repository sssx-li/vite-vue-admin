import { createApp } from 'vue';
import 'normalize.css';
import 'uno.css';

import './assets/styles/style.css';
import 'uno.css';
import store from './store';
import router from './router';
import { setupMock } from './mock';

import App from './App.vue';

if (import.meta.env.VITE_USE_MOCK === 'true') {
  setupMock();
}

createApp(App).use(router).use(store).mount('#app');
