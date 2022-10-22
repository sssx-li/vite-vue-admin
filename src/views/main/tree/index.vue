<template>
  <SyCard title="基础树组件">
    <h3>普通树组件：</h3>
    <SyTree
      :data="data"
      v-model:resourceIds="resourceIds"
      v-model:checkParams="checkParams"
      :treeData="treeData!"
      :checkable="false"
      :fieldNames="{ title: 'name', key: 'id' }"
    />
    <h3>可选择树组件：</h3>
    <SyTree
      :data="data"
      v-model:resourceIds="resourceIds"
      v-model:checkParams="checkParams"
      :treeData="treeData!"
      :fieldNames="{ title: 'name', key: 'id' }"
    />
  </SyCard>
  <SyCard title="标签页-树组件">
    <TabPaneTree
      :data="originData"
      :tabList="tabList"
      :treeData="tapTreeData"
      v-model:activeKey="activeKey"
      v-model:resourceIds="tabResourceIds[activeKey]"
    />
  </SyCard>
</template>

<script setup lang="ts" name="tableExample">
import { SyTree, SyCard } from '@/baseUI';
import { IData, ITreeData, ICheckParams } from '@/baseUI/syTree/types';
import TabPaneTree from '@/components/tabPaneTree/index.vue';
import { dataToTree } from '@/utils';

// 基础树组件
const data = ref<IData[]>([
  { id: 1, parentID: '', name: '1-1' },
  { id: 2, parentID: 1, name: '1-1-1' },
  { id: 3, parentID: 1, name: '1-1-2' },
  { id: 4, parentID: 2, name: '1-1-1-1' },
  { id: 5, parentID: '', name: '2-1' },
  { id: 6, parentID: 5, name: '2-1-1' },
  { id: 7, parentID: '', name: '3-1' },
  { id: 8, parentID: '', name: '4-1' },
  { id: 9, parentID: 8, name: '4-1-1' },
  { id: 10, parentID: 8, name: '4-1-2' }
]);
const treeData = ref<ITreeData[]>();
treeData.value = dataToTree(data.value, '');
const resourceIds = ref([8, 9, 10]);
const checkParams = ref<ICheckParams>({
  checkedKeys: [],
  expandedKeys: [],
  selectedKeys: []
});
// 标签页-树组件
const activeKey = ref(1);
const tabList = ref<any[]>([
  {
    id: 1,
    name: 'Tab-1',
    treeData: [
      { id: 1, parentID: '', name: '1-1' },
      { id: 2, parentID: 1, name: '1-1-1' },
      { id: 3, parentID: 1, name: '1-1-2' },
      { id: 5, parentID: '', name: '2-1' }
    ]
  },
  {
    id: 2,
    name: 'Tab-2',
    treeData: [
      { id: 6, parentID: 5, name: '2-1-1' },
      { id: 7, parentID: '', name: '3-1' },
      { id: 8, parentID: '', name: '4-1' },
      { id: 9, parentID: 8, name: '4-1-1' },
      { id: 10, parentID: 8, name: '4-1-2' }
    ]
  }
]);
const tapTreeData = ref<any[]>([]);
const originData = ref<any[]>([]);
watch(
  () => activeKey.value,
  () => {
    const tabData = tabList.value.find((item: any) => item.id === activeKey.value);
    if (!tabData) return;
    originData.value = tabData.treeData;
    tapTreeData.value = dataToTree(tabData.treeData, '');
  },
  { immediate: true }
);
const tabResourceIds = ref<any>({});
tabList.value.forEach((item: any) => {
  tabResourceIds.value[item.id] = [];
});
</script>

<style lang="less" scoped></style>
