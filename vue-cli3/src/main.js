import Vue from 'vue'
import App from './App.vue'
import VueAMap from 'vue-amap';
import router from "./router/routes/index"
import filters from "./assets/filters/index"
import store from "./store/index"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/style/index.sass"

import './mock/mock'; 

Vue.config.productionTip = false

for (var key in filters){
  Vue.filter(key,filters[key])
}

Vue.use(VueAMap);
Vue.use(ElementUI);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 申请的高德key
  key: '7066820febd694db069d2e1c79d2742f',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.Marker', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

new Vue({
  VueAMap,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
