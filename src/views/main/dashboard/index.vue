<template>
  <el-button @click="openMessage">确认弹窗</el-button>
  <el-button @click="showDrawer = true">drawer弹窗</el-button>
  <SyDrawer
    title="这是一个标题"
    v-model="showDrawer"
    v-model:loading="loading"
    @on-confirm="onConfirm"
    ref="syDrawer"
  >
    drawer弹窗内容
  </SyDrawer>
</template>

<script setup lang="ts" name="dashboard">
import { SyDrawer } from '@/baseUI';
import { useConfirm, useMessage } from '@/hooks';

const confirm = useConfirm();
const { success } = useMessage();
const openMessage = async () => {
  await confirm({
    title: '提示'
  });
  success('成功的提示');
};
const showDrawer = ref(false);
const loading = ref(false);
const syDrawer = ref();
const onConfirm = () => {
  syDrawer.value.onClose();
  loading.value = false;
  success('成功');
};
</script>

<style lang="scss" scoped></style>
