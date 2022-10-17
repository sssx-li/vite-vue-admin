<script setup lang="ts">
import { ref, onMounted, watchEffect, PropType } from 'vue';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '350px'
  }
});
const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  const { setOptions } = useEcharts(echartDivRef.value!);
  watchEffect(() => {
    setOptions(props.options!);
  });
});
</script>

<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<style lang="scss" scoped></style>
