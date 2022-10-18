import { createApp } from 'vue';
import 'normalize.css';
import './assets/styles/style.css';
import store from './store';
import router from './router';
import { setupMock } from './mock';
import { globalRegister } from './registers';

import App from './App.vue';
import { isProd } from './utils/env';

if (!isProd) {
  console.log('-------mock------');
  import('ant-design-vue/dist/antd.css');
  setupMock();
}

createApp(App).use(router).use(store).use(globalRegister).mount('#app');
