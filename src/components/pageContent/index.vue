<template>
  <div class="page-content" ref="pageContent">
    <div class="sy-table-header">
      <span class="table-header table-header-title">
        <slot name="tableTitle">{{ title }}</slot>
      </span>
      <span class="table-header table-header-right">
        <slot name="tableRight"></slot>
        <RowDensity @change-size="tableState.changeSize" v-if="handlerOption?.showSizeIcon" />
        <Refresh
          @refresh="emit('refresh')"
          :loading="loading"
          v-if="handlerOption?.showRefreshIcon"
        />
        <FieldOrder
          @changeColumns="tableState.changeColumns"
          v-if="handlerOption?.showCulomnIcon"
          :columns="tableState.columns"
        />
      </span>
    </div>
    <SyTable
      v-bind="options"
      :data="data"
      :columns="tableState.columns"
      :loading="loading"
      :size="tableState.size"
      @selectionChange="emit('selectionChange')"
    >
      <template #createTime="scope">
        {{ $filters.formatTime(scope.row.createTime) }}
      </template>
      <template #updateTime="scope">
        {{ $filters.formatTime(scope.row.updateTime) }}
      </template>
      <!-- header 插槽 -->
      <template
        v-for="item in columns"
        :key="`header-${item.prop}`"
        #[`header-${item.prop}`]="scope"
      >
        <slot :name="`header-${item.prop}`" :row="scope.row"></slot>
      </template>
      <!-- body 插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.prop]="scope">
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </SyTable>
    <div v-if="showFooter" class="footer-box">
      <el-pagination
        v-bind="pageOption"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo?.currentPage"
        :page-size="pageInfo?.pageSize"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="pageContent">
import { SyTable } from '@/baseUI';
import {
  IColumn,
  ITableState,
  IHandlerOption,
  IOptions,
  IPage,
  TSize
} from '@/baseUI/syTable/types';
import { Refresh, RowDensity, FieldOrder } from '@/components';
interface Props {
  data: any[]; // 接口数据
  columns: IColumn[]; // 表格内容
  title?: string; // 标题
  options?: IOptions; // 表格配置项
  filterSlotNames?: string[]; // 需要过滤的插槽名
  loading?: boolean; // 加载状态
  handlerOption?: IHandlerOption;
  showFooter?: boolean; // 是否展示分页
  pageInfo?: { currentPage: number; pageSize: number };
  pageOption?: IPage;
  total?: number;
  size?: TSize;
}
const props = withDefaults(defineProps<Props>(), {
  handlerOption: () => ({
    showCulomnIcon: true,
    showRefreshIcon: true,
    showSizeIcon: true
  }),
  total: 0,
  pageOption: () => ({
    pageSizes: [5, 10, 20, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper'
  }),
  showFooter: true
});
const emit = defineEmits(['refresh', 'sizeChange', 'currentChange', 'selectionChange']);

const tableState = reactive<ITableState>({
  columns: deepClone(props.columns), // 表格列
  size: props.size || 'default', // 表格间距
  changeSize: (size) => {
    tableState.size = size;
  },
  changeColumns: (columns) => {
    tableState.columns = columns;
  }
});
function deepClone(arr: IColumn[]) {
  const columns: IColumn[] = [];
  for (let i = 0; i < arr.length; i++) {
    columns.push({ ...arr[i] });
  }
  return columns;
}
// 获取其他的动态插槽名称
const otherPropSlots = ref<IColumn[]>([]);
const filterSlotNames = props.filterSlotNames || [];
otherPropSlots.value = props.columns.filter((item) => {
  if (filterSlotNames.includes(item.prop)) return false;
  return item.prop;
});
const handleSizeChange = (val: number) => {
  emit('sizeChange', val);
};
const handleCurrentChange = (val: number) => {
  emit('currentChange', val);
};
</script>

<style lang="scss" scoped>
.page-content {
  padding: 16px;
  border-radius: 6px;
  background-color: #fff;
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
}
.footer-box {
  margin-top: 14px;
  display: flex;
  justify-content: center;
}
</style>
