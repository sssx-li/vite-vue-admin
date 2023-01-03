<template>
  <div class="table-container">
    <PageContent
      v-bind="contentTableConfig"
      v-model:pageInfo="pageInfo"
      :loading="loading"
      :total="total"
      :dataSource="dataSource"
      @refresh="refresh"
    >
      <template #tableRight>
        <a-button type="primary" @click="handleToUpdate">新增</a-button>
      </template>
      <template #sex="scope">{{ scope.row.sex === 0 ? '女' : '男' }}</template>
      <template #dateTime="scope">{{ $filters.formatTime(scope.row.dateTime) }}</template>
      <template #handler="scope">
        <a-button type="link" @click="handleToUpdate(scope.row, 'edit')">编辑</a-button>
        <a-button type="link" danger @click="handleDelete(scope.row)">删除</a-button>
      </template>
    </PageContent>
  </div>
  <DrawerForm
    v-if="drawerFormParams.show"
    v-model:show="drawerFormParams.show"
    v-model:visible="drawerFormParams.visible"
    :title="drawerFormParams.title"
    :row="drawerFormParams.row"
    :formConfig="formConfig"
    @onClose="onCloseDialogForm"
    @onSubmit="onSubmitDialogForm"
    ref="drawerFormRef"
  ></DrawerForm>
</template>

<script setup lang="ts" name="tableExample">
import { PageContent, DrawerForm } from '@/components';

import { ContentApis } from '@/service/api';
import { usePageing } from '@/hooks';
import { contentTableConfig } from './config/config.content';
import { formConfig } from './config/config.form';

type TType = 'create' | 'edit';
interface IDialogForm {
  show: boolean;
  visible: boolean;
  title: string;
  row: null | object;
  type: TType;
}
const drawerFormRef = ref();
const formState = reactive({
  name: ''
});
const {
  pageInfo,
  dataSource,
  total,
  loading,
  getPageData,
  refresh,
  handleCreate,
  handleEdit,
  handleDelete
} = usePageing(ContentApis.TABLE, formState);
getPageData();
const drawerFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗drawerForm',
  type: 'create'
});
// 编辑 | 新增
const handleToUpdate = (row: Record<string, any>, type: TType = 'create') => {
  drawerFormParams.type = type;
  drawerFormParams.row = type === 'edit' ? row : {};
  drawerFormParams.show = true;
  drawerFormParams.visible = true;
};
const onSubmitDialogForm = async (data: any) => {
  if (drawerFormParams.type === 'create') {
    await handleCreate(data);
  } else {
    await handleEdit(`${ContentApis.TABLE}/${data.id}`, data);
  }
  drawerFormRef.value.onCloseDialog();
};
const onCloseDialogForm = () => {
  drawerFormParams.row = null;
  drawerFormParams.type = 'create';
};
</script>

<style lang="less" scoped>
.table-container {
  height: 100%;
}
</style>
