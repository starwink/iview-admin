import Layout from '@/components/main-conversion'

export default [
    // {
    //     path: 'comp',
    //     redirect: '/comp/jsonparser',
    //     name: 'comp',
    //     meta: {
    //         // title: 'eIcon',
    //         // icon: 'ios-aperture-outline',
    //         hideInMenu:true,
    //     },
    //     // component: Layout,
    //     // meta: {
    //     //     title: 'json解构',
    //     //     icon: 'logo-freebsd-devil'
    //     // },
    //     // component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/json-parser'),
    // },
    {
        path: '/comp',
        component: Layout,
        redirect: '/comp/jsonparser',
        name: 'devComp',
        meta: {
            title: '组件开发',
            icon: 'logo-freebsd-devil',
        },
        
        children: [
            {
                path: 'jsonparser',
                name: 'jsonparser',

                meta: {
                    title: 'json解构',
                    icon: 'logo-freebsd-devil'
                },
                component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/json-parser'),
            },
        ]
    }
]