<template>
  <el-dialog
    v-bind="options"
    :model-value="modelValue"
    :before-close="onClose"
    modal-class="sy-dialog-container"
  >
    <template #header>
      <span>{{ title }}</span>
    </template>
    <slot></slot>
    <template #footer v-if="showFooter">
      <span class="dialog-footer">
        <el-button :disabled="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="emit('onConfirm')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="syDialog">
import { IOptions } from './types';
interface IProps {
  modelValue: boolean; // 是否显示 Dialog
  title?: string; // Dialog的标题
  showFooter?: boolean; // 是否显示页脚
  loading?: boolean; // 加载状态
  options?: IOptions;
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({
    width: 520
  }),
  showFooter: true
});

const emit = defineEmits(['update:modelValue', 'onConfirm']);
const onClose = () => {
  emit('update:modelValue', !props.modelValue);
};

defineExpose({
  onClose
});
</script>

<style lang="scss" scoped></style>
