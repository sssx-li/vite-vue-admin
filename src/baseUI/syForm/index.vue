<template>
  <el-form v-bind="formProps" ref="syFormRef" :model="modelValue">
    <template v-for="item in formItems" :key="item.field">
      <el-form-item
        :label="item.label"
        :label-width="item.labelWidth"
        :inline-message="item.inlineMessage"
        :size="item.size"
        :rules="item.rules"
        :style="item.style"
        :prop="item.field"
      >
        <template v-if="['input', 'password'].includes(item.type)">
          <el-input
            :placeholder="item.placeholder"
            :style="item.style"
            :show-password="item.type === 'password'"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'textarea'">
          <el-input
            :placeholder="item.placeholder"
            :style="item.style"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'select'">
          <el-select
            :placeholder="item.placeholder"
            :style="item.style"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts" name="syForm">
import { IForm, IFormItem } from './types';

interface IPoros {
  formProps?: IForm;
  formItems: IFormItem[]; // 表单项属性
  modelValue: object | any; // 绑定表单
}
const props = withDefaults(defineProps<IPoros>(), {
  formProps: () => ({
    labelPosition: 'right',
    labelWidth: '80px',
    inline: false,
    hideRequiredAsterisk: false,
    requireAsteriskPosition: 'left',
    showMessage: true,
    inlineMessage: false,
    statusIcon: false,
    validateOnRuleChange: true,
    size: 'default'
  })
});
const emit = defineEmits(['update:modelValue']);
onMounted(() => {
  // 给参数附初值
  const originForm: any = {};
  props.formItems.forEach((item) => {
    const { field } = item;
    const hsaValue = originForm[field] || originForm[field] === 0;
    if (item.defaultValue !== undefined && !hsaValue) {
      originForm[field] = item.defaultValue;
    }
  });
  emit('update:modelValue', originForm);
});

const handleValueChange = (value: string, field: string) => {
  console.log(111, value, field, props.modelValue);
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};
</script>

<style lang="scss" scoped></style>
