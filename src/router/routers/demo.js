import Main from '@/components/main'
export default [
    {
      path: "/editor/echart",
      name: "editor/echart",
      meta: {
        token: false,
        hideInMenu: true,
        title: '图表调试',
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
          title: '图表调试',
          notCache: true,
          // icon: 'md-home'
        },
        component: () => import("@/view/editor/echart.rc.vue"),
      },
    
  ];
  