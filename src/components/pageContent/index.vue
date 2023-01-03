<template>
  <div class="page-content">
    <div class="sy-table-header">
      <span class="table-header table-header-title">
        <slot name="tableTitle">{{ title }}</slot>
      </span>
      <span class="table-header table-header-right">
        <slot name="tableRight"></slot>
        <RowDensity @change="tableState.changeSize" v-if="handlerOption.showSizeIcon" />
        <Refresh
          v-if="handlerOption.showRefreshIcon"
          :loading="loading"
          @refresh="emit('refresh')"
        ></Refresh>
        <FieldOrder
          @changeColumns="tableState.changeColumns"
          :columns="tableState.columns"
          v-if="handlerOption.showCulomnIcon"
        />
      </span>
    </div>
    <SyTable
      v-bind="options"
      :loading="loading"
      :data-source="dataSource"
      :columns="tableState.columns"
      :size="tableState.size"
      :showFooter="showFooter"
      :pageInfo="pageInfo"
      :total="total"
      :pageSizeOptions="pageSizeOptions"
      @handleSizeChange="handleSizeChange"
    >
      <template #createTime="scope">
        {{ $filters.formatTime(scope.row.createTime) }}
      </template>
      <template #updateTime="scope">
        {{ $filters.formatTime(scope.row.updateTime) }}
      </template>
      <!-- header 插槽 -->
      <template v-for="item in columns" :key="item.key" #[`header-${item.slotName}`]="scope">
        <template v-if="item.slotName">
          <slot :name="`header-${item.slotName}`" :row="scope.row"></slot>
        </template>
      </template>
      <!-- 单元格插槽 -->
      <template v-for="item in otherPropSlots" :key="item.key" #[`${item.slotName}`]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </SyTable>
    <!-- 分页导航 -->
    <div class="table-footer" v-if="showFooter">
      <a-pagination
        :page-num="pageInfo.pageNo"
        :page-size="pageInfo.pageSize"
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

<script setup lang="ts" name="pageContent">
import { SyTable } from '@/baseUI';
import { IColumns, IHandlerOption, ITableState, IOptions } from '@/baseUI/syTable/types';

import FieldOrder from '@/components/fieldOrder/index.vue';
import RowDensity from '@/components/rowDensity/index.vue';
import Refresh from '@/components/refresh/index.vue';

interface Props {
  loading?: boolean;
  dataSource: any[];
  columns: IColumns[];
  title?: string;
  options?: IOptions;
  handlerOption?: IHandlerOption;
  showFooter?: boolean;
  pageInfo?: { pageNo: number; pageSize: number };
  total?: number;
  pageSizeOptions?: string[];
  filterSlotNameList?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  showFooter: true,
  handlerOption: () => ({
    showCulomnIcon: true,
    showRefreshIcon: true,
    showSizeIcon: true
  }),
  filterSlotNameList: () => [],
  pageSizeOptions: () => ['5', '10', '20', '30', '40', '50'],
  pageInfo: () => ({ pageNo: 1, pageSize: 10 }),
  total: 0
});
const emit = defineEmits(['update:pageInfo', 'refresh']);
const handleSizeChange = (pageNo: number, pageSize: number) => {
  emit('update:pageInfo', { pageNo, pageSize });
};

const tableState = reactive<ITableState>({
  columns: deepClone(props.columns), // 表格列
  size: props.size, // 表格间距
  changeSize: (size) => {
    tableState.size = size;
  },
  changeColumns: (columns) => {
    tableState.columns = columns;
  }
});

function deepClone(arr: IColumns[]) {
  const columns: IColumns[] = [];
  for (let i = 0; i < arr.length; i++) {
    columns.push({ ...arr[i] });
  }
  return columns;
}
// 获取其他的动态插槽名称
const filterSlotNameList = props.filterSlotNameList || [];
const otherPropSlots = props.columns.filter((item: any) => {
  if (filterSlotNameList.includes(item.slotName)) return false;
  return item.slotName;
});
</script>

<style lang="less" scoped>
.page-content {
  padding: 16px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .sy-table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .table-header {
      display: flex;
    }
    .table-header-title {
      font-size: 16px;
      color: #000000;
    }
    .table-header-right {
      align-items: center;
      flex-wrap: nowrap;
      height: 32px;
    }
  }
  .table-footer {
    text-align: center;
    margin-top: 14px;
  }
}
</style>
