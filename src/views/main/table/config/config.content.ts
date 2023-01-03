import { ITableConfig } from '@/baseUI/syTable/types';

export const contentTableConfig: ITableConfig = {
  title: '这是一个表格标题',
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 120
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      slotName: 'sex',
      align: 'center',
      width: 100
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      width: 100
    },
    {
      title: '开始时间',
      dataIndex: 'dateTime',
      key: 'dateTime',
      slotName: 'dateTime',
      align: 'center',
      width: 160
    },
    {
      title: '操作',
      dataIndex: 'handler',
      key: 'handler',
      slotName: 'handler',
      align: 'center',
      fixed: 'right',
      width: 160
    }
  ]
};
