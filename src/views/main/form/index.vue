<template>
  <SyCard title="基础表单">
    <SyForm v-bind="formConfig" v-model="formState" @onSubmit="onSubmit" ref="syFormRef">
      <template #other-otherType="scope"> {{ scope.content.otherType }} </template>
    </SyForm>
  </SyCard>
  <SyCard title="表单弹窗">
    <a-button @click="handleOpenkDialogForm('modal')"> Modal表单弹窗 </a-button>
    <a-button @click="handleOpenkDialogForm('drawer')" style="margin-left: 14px">
      Drawer表单弹窗
    </a-button>
  </SyCard>
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

<script setup lang="ts" name="formExample">
import { SyForm, SyCard } from '@/baseUI';
import ModalForm from '@/components/modalForm/index.vue';
import DrawerForm from '@/components/drawerForm/index.vue';
import { formConfig } from './config/config.form';
import { useMessage } from '@/hooks';

const { success } = useMessage();
// 基础表单
const formState = ref<any>({});
const syFormRef = ref();
const onSubmit = async () => {
  await syFormRef.value?.validate();
  success('提交成功');
  console.log('formState', formState.value);
};

// 弹窗表单
interface IDialogForm {
  show: boolean;
  visible: boolean;
  title: string;
  row: null | object;
  type: string;
}
const modalFormRef = ref();
const drawerFormRef = ref();
const modalFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗modalForm',
  type: ''
});
const drawerFormParams = reactive<IDialogForm>({
  show: false,
  visible: false,
  row: null,
  title: '表单弹窗drawerForm',
  type: ''
});
const dialogType = ref<string>('');
const handleOpenkDialogForm = (type: string) => {
  dialogType.value = type;
  const row = {
    name: '小楊',
    age: 20,
    sex: 0,
    dateTime: '2022-10-15 11:31:23',
    monthTime: '2022-12',
    rangeTime: ['2022-10-15', '2022-10-20'],
    weekTime: '2022-43周',
    readonly: 'readonly',
    disable: 'disabled'
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
  const params = { ...data };
  console.log('params', params);
  // 这里发送请求...
  success('操作成功');
  if (dialogType.value === 'modal') {
    modalFormRef.value.onCloseDialog();
  } else {
    drawerFormRef.value.onCloseDialog();
  }
};
</script>

<style lang="less" scoped></style>
