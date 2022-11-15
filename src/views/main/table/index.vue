<template>
  <SyCard title="基础表格">
    <SyTable
      v-bind="contentTableConfig"
      :dataSource="dataSource"
      :page="pageInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
    >
      <template #body-sex="scope">{{ scope.row.sex === 0 ? '女' : '男' }}</template>
      <template #body-dateTime="scope">{{ $filters.formatTime(scope.row.dateTime) }}</template>
      <template #body-handler="scope">
        <a-button type="link" @click="handleEdit(scope.row, false)">编辑</a-button>
        <a-button type="link" danger @click="handleDelete(scope.row)">删除</a-button>
      </template>
    </SyTable>
  </SyCard>
  <SyCard title="查询" class="query-card">
    <SyForm v-bind="searchFormConfig" :showFormFooter="false" v-model="querForm" ref="queryFormRef">
    </SyForm>
    <a-button @click="handleSearch">搜索</a-button>
  </SyCard>
  <PageContent
    :contentTableConfig="contentTableConfig"
    @onHandleEdit="handleEdit"
    :pageQuery="pageQuery"
    ref="pageContentRef"
  >
    <template #cardHeader>
      <div class="title">内容组件的使用</div>
      <a-button @click="handleCreate">新建</a-button>
    </template>
    <template #body-sex="scope">{{ scope.row.sex === 0 ? '女' : '男' }}</template>
    <template #body-dateTime="scope">{{ $filters.formatTime(scope.row.dateTime) }}</template>
  </PageContent>
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
import { SyTable, SyForm, SyCard } from '@/baseUI';
import PageContent from '@/components/pageContent/index.vue';
import { useConfirm, useMessage } from '@/hooks';
import { contentTableConfig } from './config/config.content';
import { formConfig, searchFormConfig } from './config/config.form';

interface IDialogForm {
  show: boolean;
  visible: boolean;
  title: string;
  row: null | object;
  type: string;
}
const { success } = useMessage();
const confirm = useConfirm();
const drawerFormRef = ref();
// 基础表格
const dataSource = reactive<any[]>([
  {
    id: 1,
    name: '小强',
    sex: 1,
    age: 18,
    dateTime: '2022-10-15 11:31:23'
  },
  {
    id: 2,
    name: '小红',
    sex: 0,
    age: 18,
    dateTime: '2022-10-15 11:31:23'
  }
]);
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 20
});
const total = 20;
const drawerFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗drawerForm',
  type: ''
});
const handleSizeChange = (val: any) => {
  const { pageNo, pageSize } = val;
  pageInfo.pageNo = pageNo;
  pageInfo.pageSize = pageSize;
};
const handleEdit = (row: any, canApi: boolean) => {
  if (canApi !== false) {
    drawerFormParams.type = 'edit';
  }
  drawerFormParams.row = row;
  drawerFormParams.show = true;
  drawerFormParams.visible = true;
};
const handleDelete = async (row: any) => {
  await confirm({
    title: '删除',
    content: `确定删除名称为“${row.name}”的这条记录吗?`,
    okType: 'danger'
  });
  // 发送请求...
  success('删除成功');
};
const onCloseDialogForm = () => {
  drawerFormParams.row = null;
};
const onSubmitDialogForm = async (data: any) => {
  if (drawerFormParams.type === 'create') {
    // 新增
    await pageContentRef.value.handleCreate(data);
    success('添加成功');
    drawerFormRef.value.onCloseDialog();
    return;
  } else if (drawerFormParams.type === 'edit') {
    await pageContentRef.value.handleEdit(toRaw(data), data.id);
    await pageContentRef.value.getPageData();
    drawerFormRef.value.onCloseDialog();
  } else {
    // 这里发送请求...
    success('操作成功');
    drawerFormRef.value.onCloseDialog();
  }
};
// 内容组件(增删改查)
const queryFormRef = ref();
const querForm = ref({});
const pageQuery = ref({});
const pageContentRef = ref();
// 新增
const handleCreate = () => {
  drawerFormParams.type = 'create';
  drawerFormParams.row = {};
  drawerFormParams.show = true;
  drawerFormParams.visible = true;
};
// 查
const handleSearch = async () => {
  await queryFormRef.value.validate();
  pageContentRef.value.getPageData(querForm.value);
};
</script>

<style lang="less" scoped>
.query-card {
  :deep(.card-content) {
    display: flex;
  }
}
</style>
