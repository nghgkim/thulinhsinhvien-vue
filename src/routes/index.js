import Home from '../pages/Home/Home.vue';
import Login from '../pages/Login/Login.vue';

export const publicRoutes = [
  {
    path: '/',
    component: Home,
    props: true,
  },
  {
    path: '/login',
    component: Login,
    props: true,
  },
];