<script setup lang="ts" name="">
interface Props {
  title?: string;
  styles?: object;
}
withDefaults(defineProps<Props>(), {
  name: '',
  styles: () => ({
    'border-radius': '6px',
    'box-shadow': '0 1px 4px rgba(0, 21, 41, 0.08)'
  })
});
</script>

<template>
  <a-card :bordered="false" :style="styles">
    <div class="card-titile">
      <slot name="cardHeader">
        {{ title }}
      </slot>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.ant-card {
  margin-bottom: 20px;
}
:deep(.ant-card-body) {
  padding: 16px !important;
}
.card-titile {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
