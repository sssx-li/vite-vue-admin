<script setup lang="ts">
import { toRaw, reactive, ref } from 'vue';
const props = withDefaults(defineProps<{ columns: any[] }>(), {
  columns: () => []
});
const emit = defineEmits(['changeColumns']);
const allChecked = ref(true);
const visible = ref(false);
const initColumns = JSON.parse(JSON.stringify(props.columns));
const state = reactive({
  dropIndex: -1,
  dropStatus: false, // 拖拽状态
  copyColumns: toRaw(props.columns).map((v) => {
    const temp: any = Object.assign({}, v);
    temp.isChecked = true;
    return temp;
  })
});

// 1. 开始拖元素触发，作用于拖拽元素
const dragStart = (ev: DragEvent, index: number) => {
  state.dropIndex = index;
  state.dropStatus = true;
};
// 2. 元素拖进可drop元素（绑定drop事件的元素）时触发，作用于目标元素
const dragenter = (ev: DragEvent, index: number) => {
  const column = state.copyColumns[state.dropIndex];
  state.copyColumns.splice(state.dropIndex, 1);
  state.copyColumns.splice(index, 0, column);
  state.dropIndex = index;
  const tempArr = state.copyColumns
    .filter((v) => v.isChecked)
    .map((v) => {
      const temp = Object.assign({}, v);
      delete temp.isChecked;
      return temp;
    });
  emit('changeColumns', tempArr);
};
// 3. 当元素拖动到drop元素上时触发，作用于目标元素
const dragover = (ev: DragEvent) => {
  ev.preventDefault();
};
// 4. 放开拖动元素时触发，作用于目标元素
const dragend = (ev: DragEvent, index: number) => {
  state.dropStatus = false;
};
const changeChecked = () => {
  allChecked.value = !state.copyColumns.some((v) => !v.isChecked);
  const tempArr = state.copyColumns
    .filter((v) => v.isChecked)
    .map((v) => {
      const temp = Object.assign({}, v);
      delete temp.isChecked;
      return temp;
    });
  emit('changeColumns', tempArr.length ? tempArr : [{ title: '', dataIndex: 'empty' }]);
};
const clickCheckedAll = () => {
  state.copyColumns.forEach((v) => {
    v.isChecked = allChecked.value;
  });
  changeChecked();
};
const handleReset = () => {
  allChecked.value = true;
  state.copyColumns = initColumns.map((item: object) => ({ ...item, isChecked: true }));
  clickCheckedAll();
};
</script>

<template>
  <a-popover
    class="field-container"
    v-model:visible="visible"
    placement="bottomRight"
    trigger="click"
  >
    <template #title>
      <p class="top">
        <a-checkbox @change="clickCheckedAll" v-model:checked="allChecked">列展示</a-checkbox>
        <a-button class="reset-btn" type="link" @click="handleReset">重置</a-button>
      </p>
    </template>
    <template #content>
      <ul class="field-list">
        <li
          v-for="(item, index) in state.copyColumns"
          draggable="true"
          @dragstart="dragStart($event, index)"
          @dragenter="dragenter($event, index)"
          @dragover.prevent="dragover($event)"
          @dragend="dragend($event, index)"
          :class="{
            status: state.dropStatus && state.dropIndex === index
          }"
          :key="item.dataIndex"
        >
          <a-checkbox @change="changeChecked" v-model:checked="item.isChecked">{{
            item.title
          }}</a-checkbox>
        </li>
      </ul>
    </template>
    <a-tooltip placement="top">
      <template #title>
        <span>列表设置</span>
      </template>
      <SettingOutlined class="icon" />
    </a-tooltip>
  </a-popover>
</template>

<style lang="scss" scoped>
.icon {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.75);
}
.top {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field-list {
  width: 100%;
  list-style: none;
  padding-left: 0;
  li {
    line-height: 28px;
    .item-icon {
      color: #cecece;
      margin-right: 28px;
    }
  }
}
:deep(.ant-popover-inner-content) {
  padding: 5px;
}
</style>
