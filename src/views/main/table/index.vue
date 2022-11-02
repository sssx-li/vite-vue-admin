<template>
  <SyCard title="基础表格">
    <SyTable
      :data="data"
      v-bind="tableConfig"
      :page-options="pageInfo"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
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
  <PageContent
    :table-config="contentTableConfig"
    title="组合组件-增删改查"
    class="mt-14px"
    @handleEdit="handleEdit"
  >
    <template #column-sex="scope">
      {{ scope.row.sex === 1 ? '男' : '女' }}
    </template>
  </PageContent>
</template>

<script setup lang="ts" name="table">
import { SyCard, SyTable } from '@/baseUI';
import PageContent from '@/components/pageContent/index.vue';
import { IPage } from '@/baseUI/syTable/types';
import { useConfirm, useMessage } from '@/hooks';
import { tableConfig, contentTableConfig } from './config/config.table';

interface IUser {
  name: string;
  age: number;
}
const { success } = useMessage();
const confirm = useConfirm();
// ------- 1.基础表格 --------
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
const pageInfo = reactive<IPage>({
  currentPage: 1,
  pageSize: 10,
  total: 100
});
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
const currentChange = (val: number) => {
  pageInfo.currentPage = val;
};
const sizeChange = (val: number) => {
  pageInfo.pageSize = val;
};
// ------- 2.基础表格 --------
const handleEdit = (row: IUser) => {
  console.log('row', row);
};
</script>

<style lang="scss" scoped></style>
