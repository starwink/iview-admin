import Layout from '@/components/main-conversion'

export default [
    {
        path: 'jsonparser',
        name: 'jsonparser',

        meta: {
            title: 'json解构',
            icon: 'logo-freebsd-devil'
        },
        component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/json-parser'),
    },
    {
        path: '/comp',
        component: Layout,
        // redirect: '/dev/docs/iviewadminv4',
        name: 'devComp',
        meta: {
            title: '全局调试',
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