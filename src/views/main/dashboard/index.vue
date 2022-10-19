<template>
  <a-button @click="handleOpenkDialog('modal')"> Modal弹窗 </a-button>
  <a-button @click="handleOpenkDialog('drawer')">Drawer弹窗</a-button>
  <SyCard title="这是一个弹窗">痰喘内容</SyCard>
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
import { SyCard, SyModal, SyDrawer } from '@/baseUI';
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

<style lang="less" scoped></style>
