import Layout from '@/components/main-conversion'

export default [
    {
        path: '/dev/ui/',
        component: Layout,
        redirect: '/ui/index',
        name: 'devExample',
        meta: {
            title: '开发调试',
            icon: 'logo-freebsd-devil',
            access: [], //鉴权
            badge: 'PRO',// 导航栏标记
            // badge: () => store.state.menuBadge.number
        },
        children: [
            {
                path: 'docs',
                name: 'uiDocs',
                meta: {
                    title: 'iview-admin文档',
                    href: 'https://lison16.github.io/iview-admin-doc/#/',
                    icon: 'ios-book',
                }
            },
            {
                path: 'fonts',
                name: 'uiFonts',
                meta: {
                    title: '字体验证',
                    icon: 'ios-book',
                },
                component: () => import('@/view/fonts/index.vue')
            },
            {
                path: 'index',
                name: 'uiIndex',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/index'),
                meta: {
                    title: 'UI组件示例',
                }
            },
            {
                path: 'list',
                name: 'uiList',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/list.manage'),
                meta: {
                    title: '列表CURL管理',
                }
            },
            {
                path: 'table',
                name: 'uiVxeTable',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/vxe-table'),
                meta: {
                    title: 'vxe-table使用示例',
                }
            },
            {
                path: 'jsonpath',
                name: 'uiJsonPath',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/editor/jsonpath'),
                meta: {
                    title: 'jsonpath编辑器',
                }
            },
            {
                path: 'drag',
                name: 'uiDrag',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/drag/index'),
                meta: {
                    title: '拖拽',
                    icon: 'ico-jobslist'
                }
            },

        ]


    }
]