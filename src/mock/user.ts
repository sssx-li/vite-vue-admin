import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

import { User } from '@/service/api';
import { ILoginResult } from '@/service/types/user';
import { IDataModel } from '@/service/types/axios';

const loginRes: IDataModel<ILoginResult> = {
  code: 0,
  data: Mock.mock({
    'token|64': /[a-zA-Z0-9]/,
    'id|12': /[0-9]/,
    username: 'admin'
  }),
  message: 'success'
};

const userInfo = {
  code: 0,
  data: {
    username: 'admin',
    avatar: ''
  }
};

const useMenuData = [
  {
    id: 1,
    path: '/main/about'
  },
  {
    id: 2,
    path: '/main/about/first'
  },
  {
    id: 3,
    path: '/main/about/secound'
  },
  {
    id: 4,
    path: '/main/config'
  }
];

export default [
  {
    url: `/api${User.LOGIN}`,
    method: 'post',
    response: ({ body }: any) => {
      console.log('params', body);
      return loginRes;
    }
  },
  {
    url: `/api${User.USER}`,
    method: 'get',
    response: () => {
      return userInfo;
    }
  },
  {
    url: `/api${User.USEMENU}`,
    method: 'get',
    response: () => {
      return useMenuData;
    }
  }
] as MockMethod[];
