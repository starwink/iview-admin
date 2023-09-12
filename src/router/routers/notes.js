import Main from '@/components/main'
export default [
    {
      path: "/sqlite",
      name: "sqlite/list",
      meta: {
        token: false,
        hideInMenu: true,
        title: 'notes',
        notCache: true,
      },
      component: () => import("@/view/sqlite/list.vue"),
    },
  
  ];
  