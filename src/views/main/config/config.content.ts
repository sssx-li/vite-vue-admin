import { ContentApis } from '@/service/api';
import { ITableConfig, IColumnsConfig } from '@/baseUI/syTable/types';

export const contentTableConfig: ITableConfig<IColumnsConfig> = {
  url: ContentApis.DASHBOARD,
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      slotName: 'sex',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'dateTime',
      key: 'dateTime',
      slotName: 'dateTime',
      align: 'center',
      width: '170px'
    },
    {
      title: '操作',
      dataIndex: 'handler',
      key: 'handler',
      slotName: 'handler',
      align: 'center'
    }
  ],
  showFooter: true,
  filterSlotNameList: ['createTime', 'updateTime']
};
