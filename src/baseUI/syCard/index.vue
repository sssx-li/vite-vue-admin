<template>
  <el-card class="box-card" :shadow="shadow" :bodyStyle="bodyStyle">
    <template #header v-if="title">
      <div class="card-header flex justify-between items-center">
        <slot name="left">
          <span>{{ title }}</span>
        </slot>
        <slot name="right"></slot>
      </div>
    </template>
    <div class="card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="syCard">
defineProps<{ title?: string; shadow?: 'always' | 'hover' | 'never'; bodyStyle?: object }>();
</script>

<style lang="scss" scoped></style>
