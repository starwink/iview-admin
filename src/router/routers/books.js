import Main from '@/components/main'
export default [
    {
        path: "/docs",
        name: "docs/list",
        meta: {
            token: false,
            hideInMenu: true,
            title: 'notes',
            notCache: true,
        },
        component: () => import("@/view/docs/list.vue"),
    },
    {
        path: "/docs/:id",
        name: "docs/detail",
        meta: {
            token: false,
            hideInMenu: true,
            title: 'notes',
            notCache: true,
        },
        component: () => import("@/view/docs/detail.vue"),
    },
   

];
