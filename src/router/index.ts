import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import { tokenKey } from '@/common';
import localCache from '@/utils/localCache';
import { useUserStore } from '@/store/user';

import dashboardRoute from './modules';

interface IMeta extends RouteMeta {
  isHidden: boolean;
}

export interface RouterItem {
  path: string;
  component: any;
  meta: IMeta;
  name?: string;
  redirect?: string;
  children?: RouterItem[];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
    children: [...dashboardRoute]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const token = localCache.getCache(tokenKey);
  const isToLogin = to.path === '/login';
  if (token) {
    isToLogin && router.push('/');
  } else {
    !isToLogin && router.push('/login');
  }

  if (to.path === '/main') {
    const store = useUserStore();
    return store.firstMenuPath;
  }
});

export default router;
