<template>
  <div class="login-container">login</div>
</template>

<script setup lang="ts">
import { login } from '@/service/api/user';
login({ username: 'admin', password: 'admin' }).then((res) => {
  console.log(res);
});
</script>

<style lang="scss" scoped></style>
