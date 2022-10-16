import { createApp } from "vue";
import "normalize.css";

import "./assets/styles/style.css";
import store from "./store";
import router from "./router";

import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app");
