<template>
  <a-tabs
    v-model:activeKey="defActiveKey"
    tab-position="left"
    :style="{ height: '150px' }"
    @tabClick="tabClick"
  >
    <a-tab-pane v-for="item in tabList" :key="item.id" :tab="item.name">
      <SyTree
        :data="data"
        v-model:resourceIds="defResourceIds"
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id' }"
      >
      </SyTree>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts" name="tabPaneTree">
import { SyTree } from '@/baseUI';
import { IData, ITreeData } from '@/baseUI/syTree/types';

interface ITabList {
  id: string | number;
  name: string | number;
  [propType: string]: any;
}
interface Props {
  data: IData[];
  tabList: ITabList[];
  activeKey: string | number;
  treeData: ITreeData[];
  resourceIds: (string | number)[];
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:activeKey', 'update:resourceIds']);
const defActiveKey = ref<string | number>('');
const defResourceIds = ref<any[]>([]);
watch(
  () => props.activeKey,
  () => {
    defActiveKey.value = props.activeKey!;
  },
  { immediate: true }
);
watch(
  () => props.resourceIds,
  () => {
    const ids = toRaw(props.resourceIds);
    defResourceIds.value = ids || [];
  },
  { immediate: true, deep: true }
);
watch(
  () => defResourceIds,
  () => {
    emit('update:resourceIds', defResourceIds.value);
  },
  { deep: true }
);
// 切换tab
const tabClick = (targetKey: string) => {
  emit('update:activeKey', targetKey);
};
</script>

<style lang="less" scoped>
:deep(.ant-tabs-nav-list) {
  .ant-tabs-tab {
    margin-top: 0px !important;
    padding: 4px 12px !important;
  }
}
:deep(.ant-tabs-content-holder) {
  height: 150px;
  overflow-y: auto !important;
}
</style>
