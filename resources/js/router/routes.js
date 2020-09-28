import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Homepage from '../components/HomePage/HomePage';
import Cart from '../components/Cart/Cart';
import ProductPage from '../components/ProductPage/ProductPage';
import Dashboard from '../components/Dashboard/Dashboard';
import Error404 from '../components/404/404';
import store from '../store/index';

// export default [
export const routes = [
  { path: '/', component: Homepage, name: 'home' },
  {
    path: '/login', component: Login, beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) return next({ name: 'home' });
      else return next();
    }
  },
  {
    path: '/register', component: Register, beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) return next({ name: 'home' });
      else return next();
    }
  },
  { path: '/cart', component: Cart },
  // { path: '/product', name: 'product', props: true, component: ProductPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '*', component: Error404 }
];