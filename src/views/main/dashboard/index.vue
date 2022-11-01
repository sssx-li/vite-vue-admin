<template>
  <el-button @click="openMessage">确认弹窗</el-button>
</template>

<script setup lang="ts" name="dashboard">
import { useConfirm, useMessage } from '@/hooks';
const confirm = useConfirm();
const { success } = useMessage();
const openMessage = async () => {
  await confirm({
    title: '提示'
  });
  success('成功的提示');
};
</script>

<style lang="scss" scoped></style>
