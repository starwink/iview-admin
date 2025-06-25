import Layout from '@/components/main-conversion'

export default[ {
    path: '/data',
    component: Layout,
    redirect: '/data/business',
    name: 'dataIndex',
    meta: {
        title: '业务数据管理',
        icon: 'ri-printer-line',
    },
    children: [
        {
            path: 'business',
            name: 'businessList',
            component: () => import(/* webpackChunkName: 'intelligent-data-analysis' */ '@/view/business/index'),
            meta: {
                title: '业务数据表',
                access:[], 
            }
        },
        {
            path: 'source',
            name: 'businessSource',
            component: () => import(/* webpackChunkName: 'intelligent-data-analysis' */ '@/view/business/source'),
            meta: {
                title: '业务数据表',
                access:[], 
            }
        }
    ]
}
]
