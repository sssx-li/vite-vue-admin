<template>
  <div class="main-container">
    <el-container class="main-container">
      <el-header height="50px">
        <LayoutHeader />
      </el-header>
      <el-container class="main-content">
        <el-aside :width="isCollapse ? '60px' : '200px'">
          <NavMenu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LayoutHeader, NavMenu } from '@/components/layout';
export default defineComponent({
  name: 'mainView',
  components: {
    LayoutHeader,
    NavMenu
  },
  setup() {
    const isCollapse = ref(false);
    return {
      isCollapse
    };
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .el-header {
    background: #fff;
  }
  .el-aside {
    background: #001529;
  }
  .main-content {
    height: calc(100% - 50px);
  }
  .el-main {
    background: #f0f2f5;
  }
}
</style>
