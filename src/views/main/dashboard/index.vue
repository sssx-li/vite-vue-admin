<template>
  <el-button @click="openMessage">确认弹窗</el-button>
  <SyForm v-bind="formConfig" v-model="formState"></SyForm>
</template>

<script setup lang="ts" name="dashboard">
import { useConfirm, useMessage } from '@/hooks';
import { SyForm } from '@/baseUI';
import { formConfig } from './config/config.form';

const confirm = useConfirm();
const { success } = useMessage();
const openMessage = async () => {
  await confirm({
    title: '提示'
  });
  success('成功的提示');
};

const formState = ref({});

const ruleForm = reactive({
  name: ''
});
</script>

<style lang="scss" scoped></style>
