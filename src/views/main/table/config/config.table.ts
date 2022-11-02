import { ITableConfig } from '@/baseUI/syTable/types';
export const tableConfig: ITableConfig = {
  options: {
    border: true,
    stripe: true,
    defaultSort: { prop: 'age', order: 'descending' }
  },
  columns: [
    {
      type: 'selection',
      prop: 'selection',
      width: '55px',
      align: 'center'
    },
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      width: '80px',
      align: 'center'
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'left'
    },
    {
      label: '年龄',
      prop: 'age',
      sortable: true,
      align: 'center'
    },
    {
      label: '操作',
      prop: 'handler',
      align: 'center'
    }
  ]
};
