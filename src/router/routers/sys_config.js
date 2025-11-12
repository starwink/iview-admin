import Layout from '@/components/main-conversion'

export default [
    
    {
        path: '/sys',
        component: Layout,
        redirect: '/sys/tag',
        name: 'devSys',
        meta: {
            title: '系统配置',
            icon: 'logo-freebsd-devil',
        },
        
        children: [
            {
                path: 'tag',
                name: 'sys/tag',

                meta: {
                    title: '标签',
                    icon: 'md-pricetag'
                },
                component: () => import(/* webpackChunkName: 'sys' */ '@/view/sys/list'),
            },
            {
                path: 'english',
                name: 'sys/english',

                meta: {
                    title: '管理',
                    icon: 'svg:english-fill'
                },
                component: () => import(/* webpackChunkName: 'sys' */ '@/view/sys/english/list.manage'),
            },
            
            
        ]
    }
]