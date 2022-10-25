<template>
  <div class="login-container fl-center">
    <div class="login-content w-500 p-40 fl-column">
      <h2 class="mb-30 tac">后台管理系统</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        size="large"
        class="login-account"
        ref="loginRuleFormRef"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" size="large" @click="handleLogin">
            立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/store/user';
import { IAccount } from '@/service/types/user';

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    { min: 3, max: 5, message: '3-5', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
});
const store = useUserStore();
const loginForm = ref<IAccount>({
  username: '',
  password: ''
});
const loginRuleFormRef = ref<FormInstance>();
const handleLogin = async () => {
  await loginRuleFormRef.value?.validate((valid) => {
    if (!valid) return;
    store.loginAction(loginForm.value);
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
}
.login-content {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 14px;
  .login-btn {
    width: 100%;
  }
}
</style>
