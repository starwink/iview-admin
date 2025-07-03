import Layout from '@/components/main-conversion'

export default [
    {
        path: '/data',
        component: Layout,
        redirect: '/data/business',
        name: 'dataIndex',
        meta: {
            title: '业务数据管理',
            icon: 'ios-home-outline',
        },
        children: [
            {
                path: 'business',
                name: 'businessList',
                component: () => import(/* webpackChunkName: 'intelligent-data-analysis' */ '@/view/business/index'),
                meta: {
                    title: '业务数据表',
                    access: [],
                    icon: 'ios-list-box-outline',
                   
                }
            },
            {
                path: 'source',
                name: 'businessSource',
                component: () => import(/* webpackChunkName: 'intelligent-data-analysis' */ '@/view/business/source'),
                meta: {
                    title: '数据源',
                    access: [],
                    icon: 'ios-analytics-outline',
                }
            }
        ]
    },
    {
        path: '/jobtask',
        component: Layout,
        redirect: '/jobtask/list',
        name: 'jobtaskIndex',
        meta: {
            title: '任务管理1',
            icon: 'svg:task',
        },
        children: [
            {
                path: 'list',
                name: 'jobtaskList',
                component: () => import(/* webpackChunkName: 'intelligent-data-analysis' */ '@/view/jobtask/index'),
                meta: {
                    title: '任务管理表2',
                    access: [],
                }
            }
        ]
    }
]
