import layout from '@/components/layout'
import dirfile from './ele/dirfile.js'
import books from './ele/books.js'
import apiTest from './ele/apiTest.js'
import say from './ele/say.js'
export default [

    {
        path: '/ele',
        name: 'ele/main',
        component: layout,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            // {
            //     path: "main",
            //     name: "ele/main",
            //     meta: {
            //         token: false,
            //         hideInMenu: true,
            //         title: 'notes',
            //         notCache: true,
            //     },
            //     component: () => import("@/view/ele/main/index.vue"),
            // },
            ...dirfile,
            ...books,
            ...apiTest,
            ...say,

        ]
    }

];
