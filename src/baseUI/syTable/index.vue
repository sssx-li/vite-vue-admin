<template>
  <div class="sy-table">
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :size="size"
      :scroll="scroll"
      :pagination="false"
      :bordered="bordered"
      :rowClassName="rowClassName"
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
          <slot :name="`body-${column.slotName}`" :row="record">
            {{ record[column.key] }}
          </slot>
        </template>
        <template v-else>
          {{ record[column.key] }}
        </template>
      </template>
    </a-table>

    <!-- 分页导航 -->
    <div class="table-footer" v-if="showFooter">
      <a-pagination
        :page-num="page.pageNo"
        :page-size="page.pageSize"
        :page-size-options="pageSizeOptions"
        show-quick-jumper
        show-size-changer
        :total="total"
        :show-total="(total:number) => `共${total} 条`"
        @change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="syTable">
import { IColumnsConfig } from './types';
interface Props {
  dataSource: any[];
  columns: IColumnsConfig[] | any[];
  showFooter?: boolean;
  page?: { pageNo: number; pageSize: number };
  total?: number;
  pageSizeOptions?: string[];
  bordered?: boolean;
  scroll?: object;
  rowClassName?: any;
  size?: string;
}
withDefaults(defineProps<Props>(), {
  showFooter: false,
  page: () => ({
    pageNo: 1,
    pageSize: 10
  }),
  total: 0,
  pageSizeOptions: () => ['5', '10', '20', '30', '40', '50'],
  bordered: false,
  scroll: () => ({ x: 600 }),
  size: 'middle'
});
const emit = defineEmits(['handleSizeChange']);
const handleSizeChange = (pageNo: number, pageSize: number) => {
  emit('handleSizeChange', { pageNo, pageSize });
};
</script>

<style lang="less" scoped>
.sy-table {
  .table-footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
