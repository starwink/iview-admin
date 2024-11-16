export default [
    {
        path: "/apitest",
        name: "apitest/list",
        meta: {
            token: false,
            hideInMenu: true,
            title: 'notes',
            notCache: true,
        },
        component: () => import("@/view/apiTest/list.vue"),
    },

   

];
