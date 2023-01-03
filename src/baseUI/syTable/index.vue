<template>
  <div class="sy-table">
    <a-table
      v-bind="options"
      :data-source="dataSource"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      :size="size"
    >
      <!-- 表头 -->
      <template #headerCell="{ column }">
        <span>
          <template v-if="column.slotName">
            <slot :name="`header-${column.slotName}`" :row="column">
              {{ column.title }}
            </slot>
          </template>
          <template v-else>
            {{ column.title }}
          </template>
        </span>
      </template>
      <!-- 单元格 -->
      <template #bodyCell="{ column, record, index }">
        <!-- 序号 -->
        <template v-if="column.dataIndex === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.slotName">
          <slot :name="column.slotName" :row="record">
            {{ record[column.key] }}
          </slot>
        </template>
        <template v-else>
          {{ record[column.key] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts" name="syTable">
import { IColumns, IOptions, TTableSize } from './types';

interface Props {
  loading?: boolean;
  dataSource: any[];
  columns: IColumns[];
  options?: IOptions;
  size: TTableSize;
}
withDefaults(defineProps<Props>(), {
  options: () => ({
    bordered: false,
    scroll: { x: 600 }
  }),
  size: 'default'
});
</script>

<style lang="less" scoped>
// 表格滚动条样式
.sy-table {
  height: 100%;
}
</style>
