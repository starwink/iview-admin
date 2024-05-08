import Main from '@/components/main'
export default [
    {
      path: "/editor",
      name: "editor/markdownlist",
      meta: {
        token: false,
        hideInMenu: true,
        title: 'notes',
        notCache: true,
      },
      component: () => import("@/views/markdownEditor/index.vue"),
    },
  
  ];
  