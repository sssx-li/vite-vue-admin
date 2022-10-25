<template>
  <div class="layout-header-container">
    <div class="left-icon">
      <el-icon :size="30">
        <icon-sy-logo />
      </el-icon>
      <span class="system-name">后台管理系统</span>
    </div>
    <el-dropdown class="right-action-info" @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar icon="UserFilled" :size="34" />
        <span class="user-name">超级管理员</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Avatar">用户信息</el-dropdown-item>
          <el-dropdown-item divided icon="CircleClose" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import localCache from '@/utils/localCache';
const router = useRouter();
const handleCommand = (key: string) => {
  if (key === 'logout') {
    localCache.clearCache();
    router.push({ path: '/login', replace: true });
  }
};
</script>

<style lang="scss" scoped>
.layout-header-container {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  color: #000;
  .left-icon {
    width: 160px;
    flex: 0 0 160px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .system-name {
      margin: 0 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .right-action-info {
    flex: 0 0 120px;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user-name {
        margin: 0 0 0 10px;
        color: #000;
      }
    }
  }
}
</style>
