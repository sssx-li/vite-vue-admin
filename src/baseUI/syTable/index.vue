<template>
  <el-table
    :style="style"
    :data="data"
    v-bind="options"
    v-loading="loading"
    @selection-change="handleSelectionChange"
    ref="tableRef"
  >
    <template v-for="(column, index) in columns" :key="column.prop + index">
      <el-table-column v-bind="column">
        <template #header>
          <slot :name="`header-${column.prop}`" :row="column">
            {{ column.label }}
          </slot>
        </template>
        <template #default="scope" v-if="!['index', 'selection'].includes(column.prop)">
          <slot :name="column.prop" :row="scope.row">
            <span>{{ scope.row[column.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts" name="syTable">
import { IOptions, IColumn } from './types';
interface IProps {
  data: any[]; // 表格数据
  options?: IOptions; // 表格配置项
  columns: IColumn[]; // 表格列配置项
  style?: object; // 表格样式
  loading?: boolean; // 表格数据加载状态
}
withDefaults(defineProps<IProps>(), {
  style: () => ({ style: { width: '100%' } }),
  showFooter: true,
  loading: false
});
const emit = defineEmits(['selectionChange']);
const handleSelectionChange = (val: any[]) => {
  emit('selectionChange', val);
};
</script>

<style lang="scss" scoped></style>
