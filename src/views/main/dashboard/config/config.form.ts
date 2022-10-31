import { IFormConfig } from '@/baseUI/syForm/types';

export const formConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'name',
      placeholder: '请输入用户名',
      defaultValue: '12',
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 2, max: 12, message: '用户名长度为2-12位字符' }
      ]
    },
    {
      label: '权限等级',
      type: 'select',
      field: 'role',
      placeholder: '请选择',
      options: [
        { label: '普通用户', value: 'custom' },
        { label: '管理员', value: 'admin' },
        { label: '超级管理员', value: 'superAdmin' }
      ]
    },
    {
      label: '备注',
      type: 'textarea',
      field: 'remark',
      placeholder: '请输入备注信息',
      otherOptions: {
        autosize: { minRows: 2, maxRows: 4 },
        showWordLimit: true
      }
    }
  ]
};
