import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

import { ContentApis } from '@/service/api';
import { ITableList } from '@/service/types/table';

const dashboardData: ITableList = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
      name: /([赵钱孙李周吴郑王冯陈褚卫辰宿列张][一二三四五六七八九十]){1}/,
      age: /[1-9][0-9]/,
      'sex|0-1': 0,
      dateTime: '2022-10-15 11:31:23'
    }
  ]
});

let listLength = dashboardData.list.length;

export default [
  {
    url: `/api${ContentApis.DASHBOARD}`,
    method: 'get',
    response: ({ query }: any) => {
      console.log(`GET::${ContentApis.DASHBOARD}`, query);
      return {
        code: 0,
        data: {
          ...dashboardData,
          page: {
            count: dashboardData.list.length,
            pageNo: 1,
            pageSize: query.pageSize
          }
        },
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.DASHBOARD}`,
    method: 'post',
    response: ({ body }: any) => {
      console.log(`POST::${ContentApis.DASHBOARD}`, body);
      dashboardData.list.push({ id: listLength + 1, ...body });
      return {
        code: 0,
        data: '添加成功',
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.DASHBOARD}`,
    method: 'put',
    response: ({ body, query }: any) => {
      console.log(`PUT::${ContentApis.DASHBOARD}`, body);
      const index = dashboardData.list.findIndex((item: any) => item.id === parseInt(query.id));
      dashboardData.list[index] = body;
      return {
        code: 0,
        data: '修改成功',
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.DASHBOARD}`,
    method: 'delete',
    response: ({ query }: any) => {
      console.log(`DELETE::${ContentApis.DASHBOARD}`, query);
      const index = dashboardData.list.findIndex((item: any) => item.id === parseInt(query.id));
      dashboardData.list.splice(index, 1);
      return {
        code: 0,
        data: '删除成功',
        message: 'success'
      };
    }
  }
] as MockMethod[];
