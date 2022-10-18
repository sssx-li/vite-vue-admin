<template>
  <a-dropdown trigger="click">
    <a-tooltip placement="top">
      <template #title>
        <span>密度</span>
      </template>
      <i-sy-line class="icon" />
    </a-tooltip>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <a-menu-item v-for="item in sizes" @click="clickItem(item.size)" :key="item.size">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts" name="rowDensity">
const emit = defineEmits(['change']);
const selectedKeys = ref(['middle']);
const sizes = ref([
  {
    name: '默认',
    size: 'default'
  },
  {
    name: '中等',
    size: 'middle'
  },
  {
    name: '紧凑',
    size: 'small'
  }
]);
const clickItem = (size: string) => {
  selectedKeys.value[0] = size;
  emit('change', size);
};
</script>

<style lang="less" scoped>
.icon {
  font-size: 1.21rem;
  outline: medium;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.75);
}
:deep(.ant-dropdown-menu-item) {
  width: 100px;
}
</style>
