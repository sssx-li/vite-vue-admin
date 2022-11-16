import { createApp } from 'vue';
import 'normalize.css';
import 'uno.css';
import 'default-passive-events';

import './assets/styles/style.css';
import store from './store';
import router from './router';
import { setupMock } from './mock';
import { globalRegister } from '@/registers/index';

import App from './App.vue';
import { useUserStore } from './store/user';

const app = createApp(App);
if (import.meta.env.VITE_USE_MOCK === 'true') {
  setupMock();
}
app.use(store);
const userStore = useUserStore();
await userStore.loadLocalLogin();

app.use(router).use(globalRegister).mount('#app');
