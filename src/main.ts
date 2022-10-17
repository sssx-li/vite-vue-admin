import { createApp } from 'vue';
import 'normalize.css';
import 'ant-design-vue/dist/antd.css';
import './assets/styles/style.css';
import store from './store';
import router from './router';
import { setupMock } from './mock';
import { globalRegister } from './registers';

import App from './App.vue';

if (import.meta.env.MODE === 'mock') {
  setupMock();
}

createApp(App).use(router).use(store).use(globalRegister).mount('#app');
