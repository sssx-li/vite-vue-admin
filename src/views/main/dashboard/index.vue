<template>
  <SyCard title="弹窗" class="message-content">
    <a-button @click="handleMessage">点我提示消息</a-button>
    <a-button @click="handleConfirm">点我触发Confirm弹窗</a-button>
    <a-button @click="handleOpenkDialog('modal')"> Modal弹窗 </a-button>
    <a-button @click="handleOpenkDialog('drawer')">Drawer弹窗</a-button>
  </SyCard>
  <SyCard>
    <SyEcharts :options="barOptions" ref="barRef" />
  </SyCard>
  <!-- 基础弹窗 -->
  <SyModal
    v-model:visible="modalParams.visible"
    :title="modalParams.title"
    @onSubmit="onSubmitFromModal"
    ref="syModalRef"
  >
    这是一个Modal弹窗
  </SyModal>
  <SyDrawer
    v-model:visible="drawerParams.visible"
    :title="drawerParams.title"
    @onSubmit="onSubmitFromDrawer"
    ref="syDrawerRef"
  >
    这是一个Drawer弹窗
  </SyDrawer>
</template>

<script setup lang="ts">
import { EChartsOption, SeriesOption } from 'echarts';
import { SyModal, SyDrawer, SyCard, SyEcharts } from '@/baseUI';
import { useConfirm, useMessage } from '@/hooks';

const { success } = useMessage();
const handleMessage = () => {
  success('这是一条成功的消息');
};
const confirm = useConfirm();
const handleConfirm = async () => {
  await confirm();
  success('成功');
};
const syModalRef = ref();
const syDrawerRef = ref();
const modalParams = reactive({
  visible: false,
  title: '这是一个modal弹窗'
});
const drawerParams = reactive({
  visible: false,
  title: '这是一个drawer弹窗'
});
const handleOpenkDialog = (type: string) => {
  if (type === 'modal') {
    modalParams.visible = true;
  } else {
    drawerParams.visible = true;
  }
};
const onSubmitFromModal = () => {
  syModalRef.value.onClose();
};
const onSubmitFromDrawer = () => {
  syDrawerRef.value.onClose();
};

// ------------- echarts --------------
const barRef = ref<InstanceType<typeof SyEcharts>>();
const barOptions = {
  title: {
    text: '这是一个标题'
  },
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6]
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    show: true
  },
  series: [
    {
      type: 'bar',
      data: [10, 15, 30, 45, 80, 150, 200]
    }
  ]
} as EChartsOption;
setTimeout(() => {
  barRef.value?.update!([
    {
      type: 'bar',
      data: [1, 5, 10, 20, 50, 30, 25]
    }
  ] as SeriesOption);
}, 3000);
</script>

<style lang="less" scoped>
.message-content {
  .ant-btn {
    margin-right: 10px;
  }
}
</style>
