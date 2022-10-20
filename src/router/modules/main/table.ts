import { RouteRecordRaw } from 'vue-router';
const tableRoute: RouteRecordRaw[] = [
  {
    path: '/main/table',
    name: 'table',
    meta: {
      title: '表格',
      icon: 'TableOutlined',
      sort: 3
    },
    component: () => import('@/views/main/table/index.vue')
  }
];

export default tableRoute;
