import type { FormItemRule } from 'element-plus';
export type TFormType =
  | 'input'
  | 'password'
  | 'textarea'
  | 'select'
  | 'datepicker'
  | 'checkbox'
  | 'radio';
export type TPosition = 'left' | 'right';
export type TLabelPosition = TPosition | 'top';
export type TSize = 'large' | 'default' | 'small';
export type TTrigger = 'blur' | 'change';

export interface IForm {
  labelPosition?: TLabelPosition; // 表单域标签的位置
  labelWidth?: string | number; // 标签的长度
  inline?: boolean; // 行内表单模式
  labelSuffix?: string; // 表单域标签的后缀
  hideRequiredAsterisk?: boolean; // 是否隐藏必填字段标签旁边的红色星号。
  requireAsteriskPosition?: TPosition; // 星号的位置。
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; //是否以行内形式展示校验信息
  statusIcon?: boolean; // 是否在输入框中显示校验结果反馈图标
  validateOnRuleChange?: boolean; // 是否在 rules 属性改变后立即触发一次验证
  size?: TSize; // 用于控制该表单内组件的尺寸
  disabled?: boolean; // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
  scrollToError?: boolean; // 当校验失败时，滚动到第一个错误表单项
}
export interface IFormItem {
  type: TFormType; // 表单项类型
  prop?: string | string[]; // model 的键名,在定义了validate、resetFields的方法时，该属性是必填的
  label?: string; // 标签文本
  labelWidth?: string | number; // 标签宽度
  rules?: FormItemRule | FormItemRule[]; // 表单验证规则
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; // 是否在行内显示校验信息
  size?: TSize; // 用于控制该表单域下组件的默认尺寸
  placeholder?: string; // 提示信息

  field: string; // 表单唯一标识字段
  options?: ISelectOption[]; // 选择器options
  otherOptions?: any; // 其它配置选项
  style?: object; // 表单项样式
  defaultValue?: string | number; // 默认值
}

export interface IFormConfig {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
  form?: IForm;
}

export interface ISelectOption {
  label: string;
  value: string | number;
}
