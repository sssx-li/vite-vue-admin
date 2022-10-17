<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  title: String,
  visible: Boolean,
  footer: [String, Object],
  okType: {
    type: String,
    default: 'primary'
  },
  okText: {
    type: String,
    default: '确定'
  },
  width: {
    type: [String, Number],
    default: '520px'
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['update:visible', 'onClose', 'onSubmit']);
const defVisible = ref(false);
watch(
  () => props.visible,
  (val) => {
    defVisible.value = val;
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

<style lang="scss" scoped></style>
