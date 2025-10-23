import Layout from '@/components/main-conversion'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login'),
        meta: {
            title: '登录',
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/data/business',
        name: 'home',
        // children: [
        //     {
        //         path: 'dashboard',
        //         name: 'dashboard',
        //         component: () => import(/* webpackChunkName: 'pathUrl' */ '@/views/pathUrl'),
        //         meta: {
        //             title: '概览',
        //             access:[], //鉴权
                  
        //         }
        //     }
        // ]
    },
    
    
]