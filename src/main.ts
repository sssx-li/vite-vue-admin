import 'normalize.css';
import 'uno.css';

import './assets/styles/style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupMock } from './mock';
import { globalRegister } from './registers';
import { isMock } from './utils/env';
import { useUserStore } from './store/user';

const app = createApp(App);

if (isMock()) {
  setupMock();
}

app.use(store);
const userStore = useUserStore();
await userStore.loadLocalLogin();
app.use(globalRegister);
app.use(router);

app.mount('#app');
