import { ITableConfig, IColumn } from '@/baseUI/syTable/types';
export const tableConfig: ITableConfig<IColumn> = {
  columns: [
    {
      type: 'index',
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
      align: 'center'
    }
  ]
};
