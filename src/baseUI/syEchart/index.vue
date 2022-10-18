<script setup lang="ts">
import { ref, onMounted, watchEffect, PropType } from 'vue';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';
interface Props {
  options: EChartsOption;
  width?: string;
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '350px'
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

<style lang="less" scoped></style>
