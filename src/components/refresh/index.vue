<template>
  <a-tooltip placement="top">
    <template #title>
      <span>刷新</span>
    </template>
    <i-sy-refresh
      width="20px"
      height="20px"
      :class="['refresh-btn', loading && 'active']"
      @click="handleRefresh"
    />
  </a-tooltip>
</template>

<script setup lang="ts" name="refresh">
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['refresh']);
const handleRefresh = () => {
  emit('refresh');
};
</script>

<style lang="less" scoped>
@keyframes btnRound {
  to {
    transform: rotate(0);
  }
  from {
    transform: rotate(360deg);
  }
}
.refresh-btn {
  cursor: pointer;
  outline: none;
  margin-left: 6px;
  &.active {
    animation: btnRound 1s infinite reverse linear;
  }
}
</style>
