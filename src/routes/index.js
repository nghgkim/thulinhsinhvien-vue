import Home from '../pages/Home/Home.vue';
import Login from '../pages/Login/Login.vue';

export const publicRoutes = [
  {
    path: '/binh-chon',
    component: Home,
    props: true,
  },
  {
    path: '/',
    component: Login,
    props: true,
  },
];