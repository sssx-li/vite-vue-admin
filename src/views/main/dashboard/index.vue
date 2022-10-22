<template>
  <SyCard title="弹窗" class="message-content">
    <a-button @click="handleMessage">点我提示消息</a-button>
    <a-button @click="handleConfirm">点我触发Confirm弹窗</a-button>
    <a-button @click="handleOpenkDialog('modal')"> Modal弹窗 </a-button>
    <a-button @click="handleOpenkDialog('drawer')">Drawer弹窗</a-button>
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
import { message } from 'ant-design-vue';
import { SyModal, SyDrawer, SyCard } from '@/baseUI';
import { useConfirm } from '@/hooks/useConfirm';
const handleMessage = () => {
  message.success('这是一条成功的消息');
};
const confirm = useConfirm();
const handleConfirm = async () => {
  await confirm();
  message.success('成功');
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
</script>

<style lang="less" scoped>
.message-content {
  .ant-btn {
    margin-right: 10px;
  }
}
</style>
