/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import { router } from './router';
import store from './store';
import axios from 'axios';
import App from './components/App';

import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueTypedJs from 'vue-typed-js';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueTypedJs);

axios.defaults.baseURL = 'http://127.0.0.1:8001/api';
// axios.defaults.baseURL = 'http://ecommerce.fillycoder.com/api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faSearch, faPlusSquare, faLock, faUser, faUsers, faUserPlus, faUnlockAlt, faUnlock, 
  faDotCircle, faMoneyBill, faUserSecret, faTrash, faCartArrowDown, faLongArrowAltUp, faChevronUp,
  faShoppingCart, faAnchor, faCubes, faBars, faSignOutAlt, faHome, faFireAlt, faFolder, faHistory,
  faPen, 
}
  from '@fortawesome/free-solid-svg-icons';

  import { faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faSearch, faPlusSquare, faLock, faUser, faUsers, faUserPlus, faUnlockAlt, faUnlock, 
  faDotCircle, faMoneyBill, faUserSecret, faTrash, faCartArrowDown, faLongArrowAltUp, faChevronUp,
    faShoppingCart, faAnchor, faCubes, faBars, faYoutube, faSignOutAlt, faHome, faFireAlt, faFolder, faHistory,
    faPen, 
  );

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

window.Vue = require('vue');


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

if (process.env.MIX_ENV_MODE === 'production') {
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
}

const app = new Vue({
  el: '#app',
  router,
  store,
  mode: 'production',
  ...App
});
