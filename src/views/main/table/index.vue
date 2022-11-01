<template>
  <SyCard title="基础表格">
    <SyTable :data="data" v-bind="tableConfig"></SyTable>
  </SyCard>
</template>

<script setup lang="ts" name="table">
import { SyCard, SyTable } from '@/baseUI';
import { tableConfig } from './config/config.table';
const data = reactive([
  {
    name: '张三',
    age: '18'
  },
  {
    name: '李四',
    age: '20'
  }
]);
</script>

<style lang="scss" scoped></style>
