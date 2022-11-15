<template>
  <div class="login-container h-100% flex items-center justify-center">
    <SyCard class="login-card">
      <h2 class="login-title">后台管理系统</h2>
      <SyForm
        :show-form-footer="false"
        v-bind="formConfig"
        v-model="loginForm"
        ref="loginFormRef"
      />
      <a-button @click="handleLogin" class="w-100%" size="large" type="primary" :loading="loading">
        登录
      </a-button>
    </SyCard>
  </div>
</template>

<script setup lang="ts">
import { SyCard, SyForm } from '@/baseUI';
import { formConfig } from './config/config.form';
import { useUserStore } from '@/store/user';
import { IAccount } from '@/service/types/user';

const store = useUserStore();
const loginForm = ref<IAccount>({
  username: '',
  password: ''
});
const loading = ref(false);
const loginFormRef = ref();
const handleLogin = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  await store.loginAction(loginForm.value);
  loading.value = false;
};
</script>

<style lang="less" scoped>
.login-container {
  background: #f0f2f5;
  .login-card {
    padding: 20px 40px;
    box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.1) !important;
    .login-title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 50px;
    }
  }
}
</style>
