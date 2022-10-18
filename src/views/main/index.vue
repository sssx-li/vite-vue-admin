<script setup lang="ts">
import { message } from 'ant-design-vue';
import { SyForm, SyTable, SyModal, SyDrawer, SyCard } from '@/baseUI';
import DrawerForm from '@/components/drawerForm/index.vue';
import ModalForm from '@/components/modalForm/index.vue';
import PageContent from '@/components/pageContent/index.vue';
import { useConfirm } from '@/hooks/useConfirm';
import { formConfig, searchFormConfig } from './config/config.form';
import { contentTableConfig } from './config/config.content';
interface IDialogForm {
  show: boolean;
  visible: boolean;
  title: string;
  row: null | object;
}
const handleMessage = () => {
  message.success('这是一条成功的消息');
};
const confirm = useConfirm();
const handleConfirm = async () => {
  await confirm();
  message.success('成功');
};
// 1. 弹窗
const syModalRef = ref();
const syDrawerRef = ref();
const modalParams = reactive({
  visible: false,
  title: '这是一个modal弹窗'
});
const drawerParams = reactive({
  visible: false,
  title: '这是一个drawer弹窗'
});
const handleOpenkDialog = (type: string) => {
  if (type === 'modal') {
    modalParams.visible = true;
  } else {
    drawerParams.visible = true;
  }
};
const onSubmitFromModal = () => {
  syModalRef.value.onClose();
};
const onSubmitFromDrawer = () => {
  syDrawerRef.value.onClose();
};
// 2. 表单弹窗
const modalFormRef = ref();
const drawerFormRef = ref();
const dialogType = ref<null | string>(null);
const modalFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗modalForm'
});
const drawerFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗drawerForm'
});
const handleOpenkDialogForm = (type: string) => {
  dialogType.value = type;
  const row = {
    name: '小王',
    age: 20,
    sex: 1,
    dateTime: '2022-02-15 11:31:23'
  };
  if (type === 'modal') {
    modalFormParams.row = row;
    modalFormParams.show = true;
    modalFormParams.visible = true;
  } else {
    drawerFormParams.row = row;
    drawerFormParams.show = true;
    drawerFormParams.visible = true;
  }
};
const onCloseDialogForm = () => {
  drawerFormParams.row = null;
  modalFormParams.row = null;
};
const onSubmitDialogForm = async (data: any) => {
  console.log('data', data);
  if (isPageContent.value) {
    // 新增
    await pageContentRef.value.handleCreate(data);
    message.success('添加成功');
    drawerFormRef.value.onCloseDialog();
    return;
  }
  // 这里发送请求...
  message.success('操作成功');
  if (dialogType.value === 'modal') {
    modalFormRef.value.onCloseDialog();
  } else {
    drawerFormRef.value.onCloseDialog();
  }
};
// 3. 基础表单
const syFormRef = ref<InstanceType<typeof SyForm>>();
const formState = ref<any>({});
const onSubmit = async () => {
  await syFormRef.value?.validate();
  console.log('formState', formState.value);
  message.success('成功');
};
// 4. 基础表格
const dataSource = reactive<any[]>([
  {
    id: 1,
    name: '小强',
    sex: 1,
    age: 18,
    dateTime: '2022-02-15 11:31:23'
  },
  {
    id: 2,
    name: '小红',
    sex: 0,
    age: 18,
    dateTime: '2022-02-15 11:31:23'
  }
]);
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 20
});
const total = 20;
const handleSizeChange = (val: any) => {
  const { pageNo, pageSize } = val;
  pageInfo.pageNo = pageNo;
  pageInfo.pageSize = pageSize;
};
const handleEdit = (row: any) => {
  dialogType.value = 'drawer';
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
};
// 5. 内容组件(增删改查)
const queryFormRef = ref();
const querForm = ref({});
const pageQuery = ref({});
const pageContentRef = ref();
const isPageContent = ref(false);
// 新增
const handleCreate = () => {
  isPageContent.value = true;
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

<template>
  <section class="message-content">
    <a-button @click="handleMessage">点我提示消息</a-button>
    <a-button @click="handleConfirm">点我触发Confirm弹窗</a-button>
    <a-button @click="handleOpenkDialog('modal')"> Modal弹窗 </a-button>
    <a-button @click="handleOpenkDialog('drawer')">Drawer弹窗</a-button>
    <a-button @click="handleOpenkDialogForm('modal')"> Modal表单弹窗 </a-button>
    <a-button @click="handleOpenkDialogForm('drawer')">Drawer表单弹窗</a-button>
  </section>
  <section class="base-content">
    <h3>基础表单：</h3>
    <SyForm v-bind="formConfig" v-model="formState" @onSubmit="onSubmit" ref="syFormRef">
      <template #other-otherType="scope"> {{ scope.content.otherType }}-哈哈哈 </template>
    </SyForm>
    <h3>基础表格：</h3>
    <SyTable
      v-bind="contentTableConfig"
      :dataSource="dataSource"
      :page="pageInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
    >
      <template #body-sex="scope">{{ scope.row.sex === 0 ? '女' : '男' }}</template>
      <template #body-dateTime="scope">{{ $filters.formatTime(scope.row.dateTime) }}</template>
      <template #body-updateTime="scope">{{ $filters.formatTime(scope.row.updateTime) }}</template>
      <template #body-handler="scope">
        <a-button type="link" @click="handleEdit(scope.row)">编辑</a-button>
        <a-button type="link" danger @click="handleDelete(scope.row)">删除</a-button>
      </template>
    </SyTable>
  </section>
  <section class="advanced-content">
    <h3>内容组件-增删改查</h3>
    <SyCard title="查询" class="query-card">
      <SyForm
        v-bind="searchFormConfig"
        :showFormFooter="false"
        v-model="querForm"
        ref="queryFormRef"
      >
      </SyForm>
      <a-button @click="handleSearch">搜索</a-button>
    </SyCard>
    <PageContent
      title="这是一个标题"
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
      <template #body-updateTime="scope">{{ $filters.formatTime(scope.row.updateTime) }}</template>
    </PageContent>
  </section>
  <!-- 基础弹窗 -->
  <SyModal
    v-model:visible="modalParams.visible"
    :title="modalParams.title"
    @onSubmit="onSubmitFromModal"
    ref="syModalRef"
  >
    这是一个Modal弹窗
  </SyModal>
  <SyDrawer
    v-model:visible="drawerParams.visible"
    :title="drawerParams.title"
    @onSubmit="onSubmitFromDrawer"
    ref="syDrawerRef"
  >
    这是一个Drawer弹窗
  </SyDrawer>
  <!-- 表单弹窗 -->
  <ModalForm
    v-if="modalFormParams.show"
    v-model:show="modalFormParams.show"
    v-model:visible="modalFormParams.visible"
    :title="modalFormParams.title"
    :row="modalFormParams.row"
    :formConfig="formConfig"
    @onClose="onCloseDialogForm"
    @onSubmit="onSubmitDialogForm"
    ref="modalFormRef"
  ></ModalForm>
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

<style lang="less" scoped>
.message-content {
  .ant-btn {
    margin-right: 10px;
  }
}
.form-content {
  margin: 14px;
}
:deep(.query-card) {
  .card-content {
    display: flex;
  }
}
</style>
