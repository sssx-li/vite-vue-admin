import { RouteRecordRaw } from 'vue-router';
const tableRoute: RouteRecordRaw[] = [
  {
    path: '/main/tree',
    name: 'tree',
    meta: {
      title: '树组件',
      icon: 'UnorderedListOutlined',
      sort: 4
    },
    component: () => import('@/views/main/tree/index.vue')
  }
];

export default tableRoute;
