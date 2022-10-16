<template>
  <div class="login-container">login</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from 'store/user';

const store = userStore();
const { userInfo } = storeToRefs(store);
console.log(userInfo.value);
</script>

<style lang="scss" scoped></style>
