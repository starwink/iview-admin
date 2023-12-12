// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import helper from '@/libs/helper.js'
import { api } from '@/api/index.js'

import '@/assets/styles';

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

import versionsJson from "@/config/versions.js";
console.info('%c Versions','color: white; background-color: #13939e;padding:4px 6px 4px 0px',`${versionsJson.branch}-${versionsJson.versions}`);


Vue.use(ViewUI);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

Vue.prototype.$helper = helper
Vue.prototype.$api = api


/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
