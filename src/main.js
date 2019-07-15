import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI); //全局使用ElementUI
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  module.hot.accept(
    () => {
      window.location.reload();
    }
  );
}