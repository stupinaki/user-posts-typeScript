import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'bootstrap/dist/js/bootstrap.bundle.min';


Vue.config.productionTip = false
Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
