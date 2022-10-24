<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts" name="syEchart">
import { EChartsOption } from 'echarts';
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

<style lang="less" scoped></style>
