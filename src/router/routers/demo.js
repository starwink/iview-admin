import Main from '@/components/main'
export default [
    {
      path: "/editor/echart",
      name: "editor/echart",
      meta: {
        token: false,
        hideInMenu: true,
        title: '图表调试-基础版本',
        notCache: true,
        // icon: 'md-home'
      },
      component: () => import("@/view/editor/echart.vue"),
    },
    {
        path: "/editor/echartrc",
        name: "editor/echartrc",
        meta: {
          token: false,
          hideInMenu: true,
          title: '图表调试-引用外部参数以及本身对象',
          notCache: true,
          // icon: 'md-home'
        },
        component: () => import("@/view/editor/echart.rc.vue"),
      },
      {
        path: "/report/table",
        name: "report/table",
        meta: {
          token: false,
          hideInMenu: true,
          title: '表格-外部参数调用表格',
          notCache: true,
          // icon: 'md-home'
        },
        component: () => import("@/view/report/table.vue"),
      },

      
  ];
  