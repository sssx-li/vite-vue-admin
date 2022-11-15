<template>
  <a-dropdown class="info-container" :overlayStyle="{ width: '150px' }">
    <span class="avatar" @click.prevent>
      <a-avatar :src="userInfo.avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <span class="user-name">{{ userInfo.username }}</span>
    </span>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="userInfo"> 用户信息 </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">登出</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import localCache from '@/utils/localCache';
import { useUserStore } from '@/store/user';
import { useConfirm, useMessage } from '@/hooks';

const { info } = useMessage();
const store = useUserStore();
const confirm = useConfirm();
const userInfo = computed(() => store.userInfo);
const onClick = (obj: any) => {
  const { key } = obj;
  if (key === 'logout') {
    confirm({ content: '确定要退出登录吗' })
      .then(() => {
        localCache.clearCache();
        window.location.reload();
      })
      .catch(() => {});
  } else if (key === 'userInfo') {
    info('个人信息');
  }
};
</script>

<style lang="less" scoped>
.avatar {
  cursor: pointer;
  padding: 0px 10px;
  font-size: 18px;
  min-width: 100px;
  .user-name {
    padding-left: 4px;
    font-size: 18px;
  }
}
</style>
