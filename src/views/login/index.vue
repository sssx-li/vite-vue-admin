<template>
  <div class="login-container">
    <a-button @click="handleLogin">login</a-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
const store = useUserStore();

const handleLogin = async () => {
  await store.loginAction({ username: 'admin', password: 'admin' });
};
</script>

<style lang="less" scoped></style>
