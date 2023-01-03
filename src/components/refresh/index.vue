<template>
  <el-tooltip content="刷新" placement="top">
    <i-sy-refresh
      width="20px"
      height="20px"
      :class="['refresh-btn', loading && 'active']"
      @click="handleRefresh"
    />
  </el-tooltip>
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

<style lang="scss" scoped>
@keyframes btnRound {
  to {
    transform: rotate(0);
  }
  from {
    transform: rotate(360deg);
  }
}
.refresh-btn {
  margin-left: 4px;
  cursor: pointer;
  outline: none;
  &.active {
    animation: btnRound 1s infinite reverse linear;
  }
}
</style>
