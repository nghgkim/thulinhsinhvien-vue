import { createRouter, createWebHistory } from 'vue-router';
import { publicRoutes } from '../routes';

const routes = [
    ...publicRoutes
  ];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;