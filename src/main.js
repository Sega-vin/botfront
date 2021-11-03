import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import Axios from 'axios'
import { i18n } from './plugins/localization'
import  instance  from '@/api/instanse'

Vue.config.productionTip = false;

const token = localStorage.getItem('token')

if (token) {
  instance.defaults.headers.common['Authorization'] = 'Token ' + token
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");


