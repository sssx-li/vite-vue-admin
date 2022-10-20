import { IForm } from '@/baseUI/syForm/types';

export const formConfig: IForm = {
  labelCol: { style: { width: '80px' } },
  wrapperCol: { style: { width: '300px' } },
  size: 'large',
  formItems: [
    {
      field: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '请输入用户名' },
        {
          min: 2,
          max: 20,
          message: '用户名长度为2至10个字符！'
        }
      ]
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入用户密码',
      rules: [
        { required: true, message: '请输入用户密码' },
        {
          min: 6,
          max: 10,
          message: '用户名称长度为6至10个字符！'
        }
      ]
    }
  ]
};
