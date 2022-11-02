<template>
  <SyDrawer
    v-model="defVisible"
    :title="title"
    :loading="loading"
    @on-confirm="onSubmit"
    @on-close="onClose"
    ref="syDrawerRef"
  >
    <SyForm
      v-bind="formConfig"
      v-model="formState"
      :footerOptions="{ show: false }"
      ref="syFormRef"
    >
    </SyForm>
  </SyDrawer>
</template>

<script setup lang="ts" name="drawerForm">
import { SyDrawer, SyForm } from '@/baseUI';
import { IFormConfig } from '@/baseUI/syForm/types';

interface Props {
  visible: boolean;
  formConfig: IFormConfig;
  title?: string;
  row?: object;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'onSubmit']);

const loading = ref(false);
const defVisible = ref(props.visible);
const syDrawerRef = ref();
const syFormRef = ref();
const formState = ref({});
watch(defVisible, () => {
  emit('update:modelValue', defVisible.value);
});

const onSubmit = async () => {
  await syFormRef.value.formRef.validate();
  emit('onSubmit', formState.value);
};
const onClose = () => {
  loading.value = false;
  formState.value = {};
};

defineExpose({
  loading
});
</script>

<style lang="scss" scoped></style>
