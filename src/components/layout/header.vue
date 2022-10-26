<template>
  <div class="layout-header-container fl h-50 lh-50 c-#000">
    <div class="left-icon fl fla-center cursor">
      <el-icon size="20px">
        <component @click="changeCollapse" :is="isCollapse ? `Expand` : 'Fold'" />
      </el-icon>
    </div>
    <el-dropdown class="right-action-info fl fla-center" @command="handleCommand">
      <span class="el-dropdown-link fl fla-center cursor">
        <el-avatar icon="UserFilled" :size="34" />
        <span class="ml-10 c-#000">超级管理员</span>
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

const props = defineProps<{ isCollapse: boolean }>();
const emit = defineEmits(['update:isCollapse']);

const router = useRouter();
const handleCommand = (key: string) => {
  if (key === 'logout') {
    localCache.clearCache();
    router.push({ path: '/login', replace: true });
  }
};
const changeCollapse = () => {
  emit('update:isCollapse', !props.isCollapse);
};
</script>

<style lang="scss" scoped>
.layout-header-container {
  justify-content: space-between;
  .left-icon {
    flex: 0 0 20px;
  }
  .right-action-info {
    flex: 0 0 120px;
  }
}
</style>
