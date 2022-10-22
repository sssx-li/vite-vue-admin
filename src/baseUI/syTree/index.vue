<template>
  <a-tree
    v-model:expandedKeys="defCheckParams.expandedKeys"
    v-model:selectedKeys="defCheckParams.selectedKeys"
    v-model:checkedKeys="defCheckParams.checkedKeys"
    :field-names="fieldNames"
    :checkable="checkable"
    :tree-data="treeData"
    @check="clickTreeNode"
  >
  </a-tree>
</template>

<script setup lang="ts" name="syTree">
import { IDefCheckParams, ITreeData, ICheckParams, IData, IFieldNames } from './types';
interface Props {
  treeData: ITreeData[];
  checkParams?: ICheckParams;
  data: IData[];
  resourceIds: (string | number)[];
  fieldNames?: IFieldNames;
  checkable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  fieldNames: () => ({ title: 'title', key: 'key' }),
  checkable: true
});
const emit = defineEmits(['update:checkParams', 'update:resourceIds']);
const defCheckParams = ref<IDefCheckParams>({
  expandedKeys: [],
  selectedKeys: [],
  checkedKeys: []
});
watch(
  () => props.checkParams,
  () => {
    const params = toRaw(props.checkParams);
    if (!params || Object.keys(params).length === 0) return;
    defCheckParams.value = toRaw(params);
  },
  { deep: true, immediate: true }
);
watch(
  () => [props.resourceIds, props.data],
  () => {
    const resourceIds: (string | number)[] = toRaw(props.resourceIds);
    const data: any[] = toRaw(props.data);
    if (resourceIds.length === 0 || data.length === 0) return;
    const checkedKeys: (string | number)[] = [];
    for (let i = 0; i < resourceIds.length; i++) {
      const hasChild = data.some((item: any) => item.parentID === resourceIds[i]);
      if (!hasChild) {
        checkedKeys.push(resourceIds[i]);
      }
    }
    defCheckParams.value.checkedKeys = checkedKeys;
  },
  { deep: true, immediate: true }
);
// 勾选 | 取消勾选
const clickTreeNode = (checkedkeys: any, e: any) => {
  const checkeds = [...checkedkeys];
  const cascadeNode: any[] = [];
  for (let i = 0; i < checkeds.length; i++) {
    const findNodes = findTreeCascadeNode(props.data!, checkeds[i]);
    cascadeNode.push(...findNodes);
  }
  emit('update:resourceIds', [...new Set([...cascadeNode, ...checkeds])]);
  emit('update:checkParams', defCheckParams.value);
};
// 勾选节点时找到当前选项级联id(从下往上)
const findTreeCascadeNode = (data: any[], id: string) => {
  const arr: any[] = [];
  const obj = data.find((item: any) => item.id === id);
  arr.push(id);
  if (obj.parentID) {
    arr.push(...findTreeCascadeNode(data, obj.parentID));
  }
  return arr;
};
</script>

<style lang="less" scoped>
:deep(.ant-tabs-nav-list) {
  .ant-tabs-tab {
    margin-top: 0px !important;
    padding: 4px 12px !important;
  }
}
</style>
