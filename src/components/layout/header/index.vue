<script setup lang="ts">
import { ref, watch } from 'vue';
import Info from './info.vue';
const props = withDefaults(defineProps<{ collapsed: boolean }>(), {
  collapsed: false
});
const emit = defineEmits(['update:collapsed']);
const isCollapsed = ref(props.collapsed);
watch(
  () => props.collapsed,
  (val) => {
    isCollapsed.value = val;
  }
);
const changeCollapsed = () => {
  emit('update:collapsed', !isCollapsed.value);
};
</script>

<template>
  <div class="header-container">
    <component
      :is="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
      @click="changeCollapsed"
    />
    <Info />
  </div>
</template>

<style lang="less" scoped>
.header-container {
  display: flex;
  height: 48px;
  line-height: 48px;
  justify-content: space-between;
  align-items: center;
  .icon-title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    min-width: 210px;
    .title {
      font-weight: bold;
      color: #fff;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
</style>
