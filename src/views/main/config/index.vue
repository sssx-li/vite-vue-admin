<template>
  <div class="list" ref="listRef" @scroll.passive="getScroll($event)">
    <div :style="{ height: 40 * options.length + 'px', width: '100%' }">
      <div
        class="item"
        v-for="(item, index) in options.slice(min - 2, min + 10)"
        :key="index"
        :style="{ top: `${40 * item.label}px` }"
      >
        {{ item.value }}:{{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="config">
let min = ref(2);
const getScroll = (event: any) => {
  let scrollTop = event.target.scrollTop;
  // 当滚动距离大于2条数据的高度时开始动态计算
  if (scrollTop > 2 * 40) {
    min.value = Math.ceil(scrollTop / 40);
  } else {
    min.value = 2;
  }
};
const options = ref<Array<{ label: number; value: string }>>(
  Array.from({ length: 100000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: idx
  }))
);
</script>

<style lang="scss" scoped>
.list {
  margin: 10px auto;
  width: 300px;
  height: 200px;
  overflow: auto;
  position: relative;
  .item {
    height: 40px;
    line-height: 40px;
    position: absolute;
    width: 100%;
  }
}
</style>
