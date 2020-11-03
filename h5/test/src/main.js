import Vue from 'vue'
import App from './App.vue'
import vant from "vant"
import 'vant/lib/index.css';
import "./assets/js/axios"

Vue.use(vant);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
