<template>
  <el-drawer
    v-bind="options"
    :model-value="modelValue"
    :before-close="onClose"
    modal-class="sy-drawer-container"
  >
    <template #header>
      <span>{{ title }}</span>
    </template>
    <template #footer v-if="showFooter">
      <div class="flex justify-between">
        <el-button :disabled="loading" @click="onClose" class="flex-1">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onConfirm" class="flex-1">
          确定
        </el-button>
      </div>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts" name="syDrawer">
import { IOptions } from './types';
interface IProps {
  modelValue: boolean; // 是否显示 Drawer
  title?: string; // Drawer 的标题
  showFooter?: boolean; // 是否显示页脚
  loading?: boolean; // 加载状态
  options?: IOptions;
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({
    direction: 'rtl',
    lockScroll: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    openDelay: 0,
    closeDelay: 0,
    size: 520,
    modal: true
  }),
  showFooter: true
});
const emit = defineEmits(['update:modelValue', 'update:loading', 'onConfirm']);
const onClose = () => {
  emit('update:modelValue', !props.modelValue);
};
const onConfirm = () => {
  emit('update:loading', true);
  emit('onConfirm');
};

defineExpose({
  onClose
});
</script>

<style lang="scss">
.sy-drawer-container {
  .el-drawer__header {
    margin-bottom: 0px !important;
  }
}
</style>
