<template>
  <SyCard title="基础表单">
    <SyForm v-bind="formConfig" v-model="formState" @on-submit="onSubmit" ref="syFormRef">
      <template #sex="scope">
        <el-radio-group v-model="(formState as any)[scope.row.field]">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </template>
    </SyForm>
  </SyCard>
</template>

<script setup lang="ts" name="form">
import { SyCard, SyForm } from '@/baseUI';
import { useMessage } from '@/hooks';
import { formConfig } from './config/config.form';
const { success } = useMessage();
formConfig.formItems.find((item) => item.field === formConfig.customProps)!.options = [
  { label: '普通用户', value: 'custom' },
  { label: '管理员', value: 'admin' },
  { label: '超级管理员', value: 'superAdmin' }
];

const syFormRef = ref();
const formState = ref({
  sex: 0
});
const onSubmit = () => {
  console.log(formState.value);
  success('成功~');
  syFormRef.value.loading = false;
};
</script>

<style lang="scss" scoped></style>
