<template>
  <el-table :data="data" stripe style="width: 100%">
    <!-- <el-table-column type="selection" width="55" v-if="showSelect" />
    <el-table-column type="index" width="50" v-if="showIndex" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" /> -->
    <template v-for="column in columns" :key="column.prop">
      <el-table-column v-bind="column" />
    </template>
  </el-table>
</template>

<script setup lang="ts" name="syTable">
import { IOptions, IColumn } from './types';
interface IProps {
  data: any[]; // 表格数据
  options?: IOptions; // 表格配置
  columns: IColumn[]; // 表格列配置
  showIndex?: boolean; // 是否展示序号
  showSelect?: boolean; // 是否展示多选框
}
const props = withDefaults(defineProps<IProps>(), {});
// select-on-indeterminate  在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行
</script>

<style lang="scss" scoped></style>
