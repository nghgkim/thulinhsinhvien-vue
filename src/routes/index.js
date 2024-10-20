import Home from '../pages/Home/Home.vue';
import Login from '../pages/Login/Login.vue';

export const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
];