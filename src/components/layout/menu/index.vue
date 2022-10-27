<template>
  <el-menu
    active-text-color="#0a60bd"
    background-color="#001529"
    class="menu-container"
    :collapse="isCollapse"
    :default-active="defaultActive"
    text-color="#b7bdc3"
  >
    <div class="fl fl-center fl-column tac p-10">
      <el-icon :size="isCollapse ? 30 : 40">
        <i-sy-vue />
      </el-icon>
    </div>
    <template v-for="menu in menuList" :key="menu.path">
      <el-menu-item
        :index="menu.path"
        v-if="!menu.meta.isHidden && (!menu.children || menu.children.length === 0)"
        @click="handleClickMenu(menu)"
      >
        <el-icon v-if="menu.meta.icon">
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </el-menu-item>
      <SubMenu :menuInfo="menu" @handleClickMenu="handleClickMenu" v-else />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import SubMenu from './subMenu.vue';
import { useUserStore } from '@/store/user';
import type { RouteRecord } from 'vue-router';

defineProps<{ isCollapse: boolean }>();

const store = useUserStore();
const route = useRoute();
const router = useRouter();
const defaultActive = computed(() => route.path);
const menuList: any = computed(() => store.userMenus);
const handleClickMenu = (menu: RouteRecord) => {
  router.push({ path: menu.path });
};
</script>

<style lang="scss" scoped>
.menu-container {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  :deep(.el-menu-item.is-active) {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu {
  border-right: none;
}
</style>
