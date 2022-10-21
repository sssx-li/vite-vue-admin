<template>
  <a-modal
    v-model:visible="defVisible"
    :title="title"
    :okType="okType"
    :okText="okText"
    :width="width"
    :footer="footer"
    :destroyOnClose="destroyOnClose"
    :afterClose="afterClose"
  >
    <div class="modal-content">
      <slot />
    </div>
    <template #footer>
      <a-button key="back" @click="onClose" :disabled="loading">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts" name="syModal">
interface Props {
  title?: string;
  visible?: boolean;
  footer?: string | object;
  okType?: string;
  okText?: string;
  width?: string | number;
  destroyOnClose?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  okType: 'primary',
  okText: '确定',
  width: '520px',
  destroyOnClose: true
});
const emit = defineEmits(['update:visible', 'onClose', 'onSubmit']);
const defVisible = ref(false);
const loading = ref(false);
watch(
  () => props.visible,
  (val) => {
    defVisible.value = val as boolean;
  },
  {
    immediate: true
  }
);

const afterClose = () => {
  emit('update:visible', false);
  emit('onClose');
};

const onClose = () => {
  loading.value = false;
  defVisible.value = false;
};

const handleOk = () => {
  loading.value = true;
  emit('onSubmit');
};

defineExpose({
  onClose
});
</script>

<style lang="less" scoped></style>
