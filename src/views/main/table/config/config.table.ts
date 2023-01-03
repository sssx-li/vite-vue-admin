import { ITableConfig } from '@/baseUI/syTable/types';
export const contentTableConfig: ITableConfig = {
  columns: [
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      align: 'center',
      width: 80
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'left',
      minWidth: 100
    },
    {
      label: '性别',
      prop: 'sex',
      minWidth: 100
    },
    {
      label: '年龄',
      prop: 'age',
      minWidth: 100
    },
    {
      label: '创建时间',
      prop: 'dateTime',
      minWidth: 160
    },
    {
      label: '操作',
      prop: 'handler',
      fixed: 'right',
      minWidth: 160
    }
  ],
  handlerOption: {
    showSizeIcon: true,
    showCulomnIcon: true,
    showRefreshIcon: true
  }
};
