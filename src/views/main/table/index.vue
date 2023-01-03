<template>
  <PageContent
    v-bind="contentTableConfig"
    :title="'这是一个列表'"
    :data="dataSource"
    :loading="loading"
    :total="total"
    :pageInfo="pageInfo"
    @refresh="refresh"
    @current-change="currentChange"
    @size-change="sizeChange"
  >
    <template #tableRight>
      <el-button type="primary">新增</el-button>
      <el-button type="danger">删除</el-button>
    </template>
    <template #sex="scope">
      {{ scope.row.sex === 1 ? '男' : '女' }}
    </template>
    <template #handler="scope">
      <el-button type="primary" link @click="handleToEdit(scope.row)">编辑</el-button>
      <el-button type="danger" link @click="handleDelete({ id: scope.row.id })">删除</el-button>
    </template>
  </PageContent>
  <DrawerForm
    v-model="drawerParams.visible"
    :row="editForm"
    :formConfig="formConfig"
    :title="drawerParams.type === 'create' ? '新增' : '编辑'"
    @on-submit="onSubmit"
    ref="drawerFormRef"
  >
  </DrawerForm>
</template>

<script setup lang="ts" name="table">
import { PageContent } from '@/components';
import DrawerForm from '@/components/drawerForm/index.vue';
import { contentTableConfig } from './config/config.table';
import { formConfig } from './config/config.form';
import { usePageing } from '@/hooks';
import { ContentApis } from '@/service/api';

interface IEditForm {
  id?: string | number;
  name: string;
  age: number | null;
  sex: 0 | 1;
  createTime: string;
}
// ------- 1.基础表格 --------
const searchForm = ref({
  name: '',
  age: '',
  sex: ''
});
const {
  dataSource,
  total,
  loading,
  pageInfo,
  refresh,
  getPageData,
  handleEdit,
  handleDelete,
  currentChange,
  sizeChange
} = usePageing(ContentApis.TABLE, searchForm);
// 编辑
const drawerFormRef = ref();
const drawerParams = reactive<{ visible: boolean; type: 'create' | 'edit' }>({
  visible: false,
  type: 'create'
});
const editForm = ref<IEditForm>({
  name: '',
  age: null,
  sex: 1,
  createTime: ''
});
const handleToEdit = (row: IEditForm) => {
  editForm.value = row;
  drawerParams.visible = true;
  drawerParams.type = 'edit';
};

const onSubmit = async (data: IEditForm) => {
  drawerFormRef.value.loading = true;
  await handleEdit({ id: data.id!, data });
  drawerFormRef.value.closeModal();
};
getPageData();
</script>

<style lang="scss" scoped></style>
