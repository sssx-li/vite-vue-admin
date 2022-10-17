<script setup lang="ts">
import { ref, computed, watch } from 'vue';
interface Props {
  title: string;
  drawerWidth: string;
  loading: boolean;
  visible: boolean;
  showFooter: boolean;
  destroyOnClose: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  drawerWidth: '520px',
  loading: false,
  visible: false,
  showFooter: true,
  destroyOnClose: true
});
const emits = defineEmits(['update:visible', 'onSubmit', 'onClose']);
const defVisible = ref(false);
const defTitle = ref(props.title);
watch(
  () => props.visible,
  (val) => {
    defVisible.value = val;
    defTitle.value = props.title;
  },
  {
    immediate: true
  }
);
const afterVisibleChange = (bool: boolean) => {
  if (!bool) {
    emits('update:visible', false);
    emits('onClose');
  }
};
const loadingText = computed(() => {
  return props.loading ? '提交中...' : '提交';
});
const onClose = () => {
  defVisible.value = false;
};

defineExpose({
  onClose
});
</script>

<template>
  <a-drawer
    v-model:visible="defVisible"
    :title="defTitle"
    :width="drawerWidth"
    :destroyOnClose="destroyOnClose"
    @after-visible-change="afterVisibleChange"
    placement="right"
  >
    <div class="drawer-body">
      <div class="content">
        <slot />
      </div>
      <div class="floor-container" v-if="showFooter">
        <a-button :disabled="loading" block @click="onClose"> 取消 </a-button>
        <a-button :loading="loading" type="primary" block @click="emits('onSubmit')">
          {{ loadingText }}
        </a-button>
      </div>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.drawer-body {
  height: calc(100% - 50px);
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
  }
  .floor-container {
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
    }
  }
}
</style>
