<template>
  <SyCard title="基础表格">
    <SyTable :data="data" v-bind="tableConfig">
      <!-- 自定义表头 -->
      <template #header-age="scope">
        <el-tag>{{ scope.row.label }}</el-tag>
      </template>
      <!-- 自定义列 -->
      <template #name="scope">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <!-- 操作 -->
      <template #handler="scope">
        <el-button type="primary" link @click="handlerEdit(scope.row)">编辑</el-button>
        <el-button type="danger" link @click="handlerDelete(scope.row)">删除</el-button>
      </template>
    </SyTable>
  </SyCard>
</template>

<script setup lang="ts" name="table">
import { SyCard, SyTable } from '@/baseUI';
import { useConfirm, useMessage } from '@/hooks';
import { tableConfig } from './config/config.table';

interface IUser {
  name: string;
  age: number;
}
const { success } = useMessage();
const confirm = useConfirm();
const data = reactive<IUser[]>([
  {
    name: '张三',
    age: 18
  },
  {
    name: '李四',
    age: 20
  }
]);
const handlerEdit = (row: IUser) => {
  success('编辑成功');
};
const handlerDelete = async (row: IUser) => {
  await confirm({
    title: '删除',
    content: `确定要删除${row.name}吗?`,
    type: 'warning'
  });
  success('删除成功!');
};
</script>

<style lang="scss" scoped></style>
