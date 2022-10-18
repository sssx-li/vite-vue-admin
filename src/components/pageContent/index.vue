<script setup lang="ts">
import { SyTable, SyCard } from '@/baseUI';
import FieldOrder from '@/components/fieldOrder/index.vue';
import RowDensity from '@/components/rowDensity/index.vue';
import { usePageContent } from '@/hooks/usePageContent';
import { ITableConfig } from '@/baseUI/syTable/types';

interface Props {
  contentTableConfig: ITableConfig;
  idName?: string;
  pageQuery?: object;
  showRightIconsUtil?: boolean;
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {
  pageQuery: () => ({}),
  showRightIconsUtil: true
});
const emit = defineEmits(['onHandleEdit']);
const {
  pageInfo,
  dataSource,
  total,
  tableState,
  getPageData,
  refresh,
  handleSizeChange,
  handleDelete,
  handleEdit,
  handleCreate
} = usePageContent(props.contentTableConfig as ITableConfig, props.pageQuery);

// 获取其他的动态插槽名称
let filterSlotNameList = JSON.parse(
  JSON.stringify(props.contentTableConfig?.filterSlotNameList || [])
);
filterSlotNameList = filterSlotNameList.concat(['handler']);
const otherPropSlots = props.contentTableConfig?.columns.filter((item: any) => {
  if (filterSlotNameList.includes(item.slotName)) return false;
  return item.slotName;
});

getPageData();

defineExpose({
  getPageData,
  refresh,
  handleEdit,
  handleDelete,
  handleCreate
});
</script>

<template>
  <SyCard class="sy-page-content">
    <template #cardHeader>
      <div class="page-content-head">
        <div class="header-left">
          <slot name="cardHeader">{{ title }}</slot>
        </div>
        <div class="header-right" v-if="showRightIconsUtil">
          <RowDensity @change="tableState.changeSize" class="rigth-item" />
          <FieldOrder
            class="rigth-item"
            @changeColumns="tableState.changeColumns"
            :columns="tableState.columns"
          />
        </div>
      </div>
    </template>
    <SyTable
      :dataSource="dataSource"
      v-bind="contentTableConfig"
      :columns="tableState.columns"
      :page="pageInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
      :size="tableState.size"
    >
      <!-- 单元格 -->
      <template #body-createTime="scope">
        {{ $filters.formatTime(scope.row.createTime) }}
      </template>
      <template #body-updateTime="scope">
        {{ $filters.formatTime(scope.row.updateTime) }}
      </template>
      <template #body-handler="scope">
        <slot name="handler" :row="scope.row">
          <a-space>
            <a-button type="link" size="small" @click="emit('onHandleEdit', scope.row)">
              编辑
            </a-button>
            <a-button type="link" danger size="small" @click="handleDelete(scope.row)">
              删除
            </a-button>
          </a-space>
        </slot>
      </template>

      <!-- header 插槽 -->
      <template v-for="item in otherPropSlots" :key="item.key" #[`header-${item.slotName}`]="scope">
        <template v-if="item.slotName">
          <slot :name="`header-${item.slotName}`" :row="scope.row"></slot>
        </template>
      </template>
      <!-- body 插槽 -->
      <template v-for="item in otherPropSlots" :key="item.key" #[`body-${item.slotName}`]="scope">
        <template v-if="item.slotName">
          <slot :name="`body-${item.slotName}`" :row="scope.row"></slot>
        </template>
      </template>
    </SyTable>
  </SyCard>
</template>

<style lang="less" scoped>
.page-content-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  :deep(.header-right) {
    margin-left: 14px;
    display: flex;
    align-items: center;
    .rigth-item {
      display: inline-block;
      margin: 0 10px 0 0;
    }
  }
}
</style>
