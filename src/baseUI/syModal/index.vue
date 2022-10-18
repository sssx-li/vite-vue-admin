<script setup lang="ts">
import { ref, watch } from 'vue';
interface Props {
  title?: string;
  visible?: boolean;
  footer?: string | object;
  okType?: string;
  okText: string;
  width: string | number;
  destroyOnClose: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  okType: 'primary',
  okText: '确定',
  width: '520px',
  destroyOnClose: true
});
const emit = defineEmits(['update:visible', 'onClose', 'onSubmit']);
const defVisible = ref(false);
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
  defVisible.value = false;
};

const handleOk = () => {
  emit('onSubmit');
};

defineExpose({
  onClose
});
</script>

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
    @ok="handleOk"
  >
    <div class="modal-content">
      <slot />
    </div>
  </a-modal>
</template>

<style lang="less" scoped></style>
