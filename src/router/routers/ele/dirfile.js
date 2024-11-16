export default [
    {
        path: "/file/list",
        name: "file/list",
        meta: {
            title: 'file',
        },
        component: () => import("@/view/sqlite/path.vue"),
    },

]

