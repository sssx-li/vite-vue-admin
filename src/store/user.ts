import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: { name: 'admin', avatar: '' }
    };
  }
});
