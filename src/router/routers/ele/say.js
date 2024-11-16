export default [
    {
        path: "/say",
        name: "say/main",
        meta: {
            token: false,
            hideInMenu: true,
            title: '练习',
            notCache: true,
        },
        component: () => import("@/view/say/index.vue"),
    },
    {
        path: "/dict",
        name: "dict/list",
        meta: {
            token: false,
            hideInMenu: true,
            title: '词管理',
            notCache: true,
        },
        component: () => import("@/view/say/list.vue"),
    },
   
   

];
