import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Main from '../views/Main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index.vue'),
      },
      {
        path: '/healthdata',
        name: 'HealthData',
        component: () => import('@/views/HealthData.vue')
      },
      {
        path: '/userdata',
        name: 'UserData',
        component: () => import('@/views/UserData.vue')
      },
      {
        path: '/bluetooth',
        name: 'BlueTooth',
        component: () => import('@/views/BlueTooth.vue')
      },
      {
        path: '/datas',
        name: 'Datas',
        component: () => import('@/views/Datas.vue')
      },
      {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('@/views/Feedback.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/webpage',
        name: 'WebPage',
        component: () => import('@/views/WebPage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
