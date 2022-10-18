import 'ant-design-vue/dist/antd.css';
import 'normalize.css';
import './assets/styles/style.css';
import store from './store';
import router from './router';
import { setupMock } from './mock';
import { globalRegister } from './registers';
import { isMock } from './utils/env';
// import { useUserStore } from './store/user';
// const userStore = useUserStore();

import App from './App.vue';

if (isMock()) {
  setupMock();
}
// userStore.loadLocalLogin();
createApp(App).use(router).use(store).use(globalRegister).mount('#app');
