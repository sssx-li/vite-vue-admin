<script setup lang="ts">
import { ref } from 'vue';
import { SyDrawer, SyForm } from '@/baseUI';
import { IForm } from '@/baseUI/syForm/types';
interface Props {
  title?: string;
  visible?: boolean;
  show?: boolean;
  formConfig: IForm;
  row?: object | any;
}
const props = withDefaults(defineProps<Props>(), { row: () => ({}) });
const emit = defineEmits(['update:visible', 'update:show', 'onSubmit', 'onClose']);
const syDrawerRef = ref();
const loading = ref(false);
const defVisible = ref(props.visible);
// 表单数据处理
const formState = ref<any>({});
const syFormRef = ref<InstanceType<typeof SyForm>>();
// 初始化表单数据
Object.assign(formState.value, { ...props.row });
// other 类型插槽
let otherSloteNameList = JSON.parse(JSON.stringify(props.formConfig.formItems || []));
otherSloteNameList = props.formConfig.formItems.filter((item: any) => {
  return item.type === 'other';
});

const onClose = () => {
  formState.value = {};
  emit('update:visible', false);
  emit('update:show', false);
  emit('onClose');
};
const onSubmit = () => {
  syFormRef.value
    ?.validate()
    .then(() => {
      loading.value = true;
      emit('onSubmit', formState.value);
    })
    .catch(() => {});
};
const onCloseDialog = () => {
  loading.value = false;
  syDrawerRef.value.onClose();
};

defineExpose({
  onCloseDialog,
  loading
});
</script>

<template>
  <SyDrawer
    v-model:visible="defVisible"
    :title="title"
    :loading="loading"
    @onClose="onClose"
    @onSubmit="onSubmit"
    ref="syDrawerRef"
  >
    <SyForm ref="syFormRef" v-bind="formConfig" v-model="formState" :showFormFooter="false">
      <template #footer>
        <slot />
      </template>
      <!-- other 类型插槽 -->
      <template
        v-for="item in otherSloteNameList"
        :key="item.field"
        #[`other-${item.field}`]="scope"
      >
        <slot :name="`other-${item.field}`" :content="scope.content"></slot>
      </template>
    </SyForm>
  </SyDrawer>
</template>

<style lang="scss" scoped></style>
