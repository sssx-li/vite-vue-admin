<template>
  <div class="bar-echart-container">
    <SyEchart :options="options" />
  </div>
</template>

<script setup lang="ts" name="barEchart">
import type { XAXisComponentOption, YAXisComponentOption, EChartsOption } from 'echarts';
import { SyEchart } from '@/baseUI';

const props = defineProps<{
  xAxis: XAXisComponentOption | XAXisComponentOption[];
  yAxis: YAXisComponentOption | YAXisComponentOption[];
}>();
const options = {
  xAxis: {
    type: 'category',
    data: props.xAxis
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
} as EChartsOption;
</script>

<style lang="less" scoped></style>
