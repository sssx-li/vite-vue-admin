<template>
  <el-table :data="data" v-bind="options" @selection-change="handleSelectionChange">
    <template v-for="column in columns" :key="column.prop">
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
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({ style: { width: '100%' } })
});
const emit = defineEmits(['multipleSelection']);
// select-on-indeterminate  在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行
const handleSelectionChange = (val: any[]) => {
  emit('multipleSelection', val);
};
</script>

<style lang="scss" scoped></style>
