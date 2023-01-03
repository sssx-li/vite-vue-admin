<template>
  <a-form
    :layout="layout"
    :autocomplete="autocomplete"
    :model="formData"
    :wrapperCol="wrapperCol"
    :labelCol="labelCol"
    ref="formRef"
  >
    <template v-for="item in formItems" :key="item.label">
      <a-form-item
        :label="item.label"
        v-bind="item.rules && item.rules.length > 0 && validateInfos[item.field]"
      >
        <template v-if="item.type === 'input'">
          <a-input
            :maxlength="item.maxlength"
            :readonly="item.readonly"
            :disabled="item.disabled"
            v-model:value="formData[item.field]"
            :size="size"
            :placeholder="item.placeholder"
            @change="handleValueChange($event, item)"
          >
            <template v-if="item.beforeContent" #addonBefore>
              <slot :name="`beforeContent-${item.field}`" :content="item.beforeContent">
                {{ item.beforeContent }}
              </slot>
            </template>
            <template v-if="item.afterContent" #addonAfter>
              <slot :name="`afterContent-${item.field}`" :content="item.afterContent">
                {{ item.afterContent }}
              </slot>
            </template>
          </a-input>
        </template>
        <template v-else-if="item.type === 'password'">
          <a-input-password
            :readonly="item.readonly"
            :disabled="item.disabled"
            :size="size"
            v-model:value="formData[item.field]"
            :placeholder="item.placeholder"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'datepicker'">
          <a-date-picker
            :show-time="item.showTime"
            :size="size"
            :disabled="item.disabled"
            v-model:value="dateValues[item.field]"
            :readonly="item.readonly"
            :placeholder="item.placeholder"
            :format="item.dateFormat"
            @change="(val: any, str:string) => handleValueChange(val, item, str)"
          />
        </template>
        <template v-else-if="item.type === 'monthpicker'">
          <a-month-picker
            :show-time="item.showTime"
            :size="size"
            :disabled="item.disabled"
            v-model:value="dateValues[item.field]"
            :readonly="item.readonly"
            :placeholder="item.placeholder"
            :format="item.dateFormat"
            @change="(val: any, str:string) => handleValueChange(val, item, str)"
          />
        </template>
        <template v-else-if="item.type === 'rangepicker'">
          <a-range-picker
            :show-time="item.showTime"
            :size="size"
            :disabled="item.disabled"
            v-model:value="dateValues[item.field]"
            :readonly="item.readonly"
            :placeholder="item.placeholder"
            :format="item.dateFormat"
            @change="(val: any, str:string) => handleValueChange(val, item, str)"
          />
        </template>
        <template v-else-if="item.type === 'weekpicker'">
          <a-week-picker
            :show-time="item.showTime"
            :size="size"
            :disabled="item.disabled"
            v-model:value="dateValues[item.field]"
            :readonly="item.readonly"
            :placeholder="item.placeholder"
            :format="item.dateFormat"
            @change="(val: any, str:string) => handleValueChange(val, item, str)"
          />
        </template>
        <template v-else-if="item.type === 'textarea'">
          <a-textarea
            :readonly="item.readonly"
            :disabled="item.disabled"
            v-model:value="formData[item.field]"
            :size="size"
            :show-count="item.showCount"
            :maxlength="item.maxlength"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select
            :readonly="item.readonly"
            :disabled="item.disabled"
            v-model:value="formData[item.field]"
            :size="size"
            :placeholder="item.placeholder"
            :options="item.options"
            @change="handleValueChange($event, item)"
          >
          </a-select>
        </template>
        <template v-else-if="item.type === 'cascader'">
          <a-cascader
            :readonly="item.readonly"
            :disabled="item.disabled"
            v-model:value="formData[item.field]"
            :size="size"
            :placeholder="item.placeholder"
            :options="item.options"
            @change="handleValueChange($event, item)"
          >
          </a-cascader>
        </template>
        <template v-else-if="item.type === 'switch'">
          <a-switch
            :disabled="item.disabled"
            v-model:checked="formData[item.field]"
            :size="size"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'other'">
          <slot :name="`other-${item.field}`" :content="formData">
            {{ formData[item.field] }}
          </slot>
        </template>
      </a-form-item>
    </template>
    <a-form-item :wrapperCol="footerWrapperCol" v-if="showFormFooter">
      <slot name="form-footer">
        <div class="form-btn">
          <a-button @click="onCancel">取消</a-button>
          <a-button type="primary" @click="onSubmit">确定</a-button>
        </div>
      </slot>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts" name="syForm">
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { IFormItem } from './types';
import { useFormValidate } from '@/hooks';

const dateType = ['datepicker', 'monthpicker', 'rangepicker', 'weekpicker'];
interface Props {
  layout?: string;
  autocomplete?: string;
  formItems: IFormItem[];
  modelValue: object;
  wrapperCol?: object;
  labelCol?: object;
  footerWrapperCol?: object;
  size?: string;
  showFormFooter?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  autocomplete: 'off',
  wrapperCol: () => ({ width: '180px', margin: '0 0 15px' }),
  labelCol: () => ({ style: { width: '100px' } }),
  footerWrapperCol: () => ({ span: 14, offset: 4 }),
  size: 'default',
  showFormFooter: true
});
const emit = defineEmits(['update:modelValue', 'onSubmit', 'onCancel']);
const formData = ref();
const formRef = ref();
const dateValues = reactive<any>({});
watch(
  () => props.modelValue,
  (val: any) => {
    formData.value = toRaw(val);
    // 对日期格式做处理
    for (let index = 0; index < props.formItems.length; index++) {
      const { type, field, dateFormat = 'YYYY-MM-DD', showTime } = props.formItems[index];
      if (!dateType.includes(type)) continue;
      const dateValue: any = val[field];
      if (dateValue) {
        let startTime = '';
        let endTime = '';
        let week = null;
        let formatValue: any = null;
        switch (type) {
          case 'datepicker':
            formatValue = dayjs(dateValue, dateFormat);
            break;
          case 'monthpicker':
            formatValue = dayjs(dateValue);
            break;
          case 'rangepicker':
            if (dateValue.length !== 2) break;
            startTime = `${dateValue[0]}${!showTime && '00:00:00'}`;
            endTime = `${dateValue[1]}${!showTime && '59:59:59'}`;
            formatValue = [dayjs(startTime, dateFormat), dayjs(endTime, dateFormat)];
            break;
          case 'weekpicker':
            dayjs.extend(weekOfYear);
            week = parseInt(dateValue.split('-')[1]);
            formatValue = dayjs(dateValue.split('-')[0]).week(week);
            break;
        }
        dateValues[field] = formatValue;
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
);
// 获取校验规则及参数默认值
const rulesList = {};
props.formItems.forEach((item) => {
  const { rules, field } = item;
  const hsaValue = (formData.value as any)[field] || (formData.value as any)[field] === 0;
  if (item.defaultValue !== undefined && !hsaValue) {
    (formData.value as any)[field] = item.defaultValue;
  } else {
    (formData.value as any)[field] = hsaValue ? (formData.value as any)[field] : '';
  }
  if (rules && rules.length > 0) {
    (rulesList as any)[field] = rules;
  }
});
// 赋默认值时 更新 modelValue
emit('update:modelValue', formData.value);
const { validate, validateInfos } = useFormValidate(
  formData,
  reactive({
    ...rulesList
  })
);
const onSubmit = () => {
  validate()
    .then(() => {
      emit('onSubmit');
    })
    .catch(() => {});
};
const onCancel = () => {
  emit('update:modelValue', {});
  emit('onCancel');
};
const handleValueChange = (event: any, item: any, other?: any) => {
  const { field, type } = item;
  let value: any = '';
  switch (type) {
    case 'input':
    case 'password':
    case 'textarea':
      value = event.target.value;
      break;
    case 'datepicker':
    case 'monthpicker':
    case 'rangepicker':
    case 'weekpicker':
      value = other;
      break;
    case 'select':
    case 'cascader':
    case 'switch':
      value = event;
      break;
    default:
      value = event.target.value;
  }
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  });
};

defineExpose({
  validate
});
</script>

<style lang="less" scoped>
.ant-form-horizontal {
  max-width: 600px;
}
.form-btn {
  .ant-btn {
    margin-right: 14px;
  }
}
</style>
