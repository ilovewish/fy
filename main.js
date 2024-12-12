import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import './static/css/home.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//在main.js引用drog.js的内容
import './utils/drag.js'
import './utils/dragnorz.js'
import './uni.scss' 
import watermark from './utils/watermark.js'

Vue.prototype.$watermark = watermark

 
Vue.use(ElementUI)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  el: '#app',
  render: h => h(App)
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}

// #endif