import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './modules/auth';
import products from './modules/products';
import categories from './modules/categories';
import cart from './modules/cart';
import viewedproducts from './modules/viewedproducts';

// Load Vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    auth,
    products,
    categories,
    cart,
    viewedproducts
  }
})