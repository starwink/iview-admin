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
                component: () => import(/* webpackChunkName: 'devComp' */ '@/view/sys/list'),
            },
            
        ]
    }
]