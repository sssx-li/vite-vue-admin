import { IForm } from '@/baseUI/syForm/types';

export const formConfig: IForm = {
  name: 'device',
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
  formItems: [
    {
      field: 'otherType',
      type: 'other',
      label: '标题',
      defaultValue: '这是一个标题'
    },
    {
      field: 'name',
      type: 'input',
      label: '名称',
      placeholder: '请输入用户名称',
      rules: [
        { required: true, message: '请输入用户名称' },
        {
          min: 1,
          max: 20,
          message: '用户名称长度为1至20字！'
        }
      ]
    },
    {
      field: 'age',
      type: 'input',
      label: '年龄',
      placeholder: '请输入年龄',
      rules: [
        { required: true, message: '请输入年龄' },
        {
          pattern: /^[1-9][0-9]{0,2}$/,
          message: '年龄不合法，例: 8、18、108'
        }
      ]
    },
    {
      field: 'sex',
      type: 'select',
      label: '性别',
      placeholder: '请选择性别',
      options: [
        { value: 0, label: '女' },
        { value: 1, label: '男' }
      ],
      defaultValue: 1,
      rules: [{ required: true, message: '请选择性别' }]
    },
    {
      field: 'dateTime',
      type: 'datepicker',
      label: '开始时间',
      showTime: true,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择开始时间'
    },
    {
      field: 'monthTime',
      type: 'monthpicker',
      label: '月份',
      placeholder: '请选择月份'
    },
    {
      field: 'rangeTime',
      type: 'rangepicker',
      defaultValue: [],
      label: '日期范围'
    },
    {
      field: 'weekTime',
      type: 'weekpicker',
      label: '周'
    },
    {
      field: 'realonly',
      type: 'input',
      label: '只读属性',
      readonly: true,
      defaultValue: '只读属性'
    },
    {
      field: 'disable',
      type: 'input',
      label: '禁用属性',
      disabled: true,
      defaultValue: '禁用属性'
    },
    {
      field: 'url',
      type: 'input',
      label: '前置/后置',
      beforeContent: 'https://',
      afterContent: '.com',
      defaultValue: 'syhelth'
    },
    {
      field: 'remark',
      type: 'textarea',
      label: '备注信息',
      placeholder: '请输入内容'
    }
  ]
};

export const searchFormConfig: IForm = {
  layout: 'inline',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    }
  ]
};
