<template>
  <div class="dashboard-container">
    <el-button @click="openMessage">确认弹窗</el-button>
  </div>
</template>

<script setup lang="ts" name="dashboard">
const confirm = useConfirm();
const openMessage = () => {
  confirm({
    title: '提示'
  });
};
</script>

<style lang="scss" scoped></style>
