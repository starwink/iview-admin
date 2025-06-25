// import Main from '@/components/main'
// import Main from '@/components/mainByEwell'
import Main from '@/components/main-conversion'
import parentView from '@/components/parent-view'

import intelligent_data_analysis from "./routers/intelligent-data-analysis.js";
import ui_component from "./routers/ui.js";




// import demo from './routers/demo.js'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  href: 'https://xxx' (default: null) 用于跳转到外部连接
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 * [使用文档](https://lison16.github.io/iview-admin-doc/#/%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE)
 */
// let demoRouter = []
// if (process.env.NODE_ENV === 'development') {
//   demoRouter = [...demo]
// }
export default [
    {
        meta:{
            title:'项目',
        },
        children:[
            ...intelligent_data_analysis,
        ],
    },
    {
        meta:{
            title:'开发调试',
        },
        children:[
            ...ui_component,
        ],
    },

   


]
