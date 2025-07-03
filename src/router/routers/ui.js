import Layout from '@/components/main-conversion'
import EmptyLayout from '@/components/main-conversion/empty'

export default [
   
    {
        path: '/dev',
        component: Layout,
        redirect: '/dev/docs/iviewadminv4',
        name: 'devExample',
        meta: {
            title: '全局调试',
            icon: 'logo-freebsd-devil',
            access: [], //鉴权
            badge: 'PRO',// 导航栏标记
            // badge: () => store.state.menuBadge.number
        },
        children: [
            {
                path: 'test',
                name: 'test',
                redirect: '/dev/test/eicon',
                component: { render: h => h('router-view') },
                // component: () => import(/* webpackChunkName: 'pathUrl' */ '@/view/ui-component/test'),
                meta: {
                    title: 'TEST',
                    icon: 'logo-freebsd-devil',
                },
                children:[
                    {
                        path: 'eicon',
                        name: 'dev/test/eicon',
                        // component: { render: h => h('router-view') },
                        component: () => import(/* webpackChunkName: 'pathUrl' */ '@/view/ui-component/test'),
                        meta: {
                            title: 'eIcon',
                            hideInMenu:true,
                        },
                    }
                ]
            },
            {
                path: 'docs',
                name: 'devExample',
                meta: {
                    title: '文档',
                    icon: 'ios-document-outline',
                    access: [], //鉴权
                    badge: 'PRO',// 导航栏标记
                },
                // component: EmptyLayout,
                component: { render: h => h('router-view') },
                redirect: '/dev/docs/iviewadminv4',
                children: [
                    {
                        path: 'iviewadminv4',
                        name: 'uiDocs',
                        meta: {
                            title: 'iview-admin文档',
                            href: 'https://lison16.github.io/iview-admin-doc/#/',
                            icon: 'icon:woman',
                        }
                    },
                    {
                        path: 'iviewadminv4',
                        name: 'docs/iviewadminv4',
                        meta: {
                            title: 'iviewui',
                            icon: 'ios-book',
                        },
                        component: { render: h => h('router-view') },
                        redirect: '/dev/docs/iviewadminv4/table',
                        children:[
                            {
                                path:'table',
                                name:'docs/iviewadminv4/table',
                                meta: {
                                    title: 'table',
                                    href: 'https://v4.iviewui.com/components/table',
                                    icon: 'ios-book',
                                }
                            },
                            {
                                path:'tabs',
                                name:'docs/iviewadminv4/tabs',
                                meta: {
                                    title: 'tabs',
                                    href: 'https://v4.iviewui.com/components/tabs',
                                    icon: 'ios-book',
                                }
                            }
                        ]
                    }
                    
                ]
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
                    icon: 'svg:biji',
                }
            },
            {
                path: 'list',
                name: 'uiList',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/list.manage'),
                meta: {
                    title: '列表CURL管理',
                    icon:'svg:crud'
                }
            },
            {
                path: 'table',
                name: 'uiVxeTable',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/vxe-table'),
                meta: {
                    title: 'vxe-table使用示例',
                    icon:'svg:vxe'
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


    },
    

    {
       
        path: '/test',
        name: 'test',
        redirect: '/test/eicon',
        component: { render: h => h('router-view') },
        // component: () => import(/* webpackChunkName: 'pathUrl' */ '@/view/ui-component/test'),
        meta: {
            title: 'TEST',
            icon: 'logo-freebsd-devil',
            
        },
        children:[
            {
                path: 'eicon',
                name: 'test/eicon',
                // component: { render: h => h('router-view') },
                component: () => import(/* webpackChunkName: 'pathUrl' */ '@/view/ui-component/test'),
                meta: {
                    title: 'eIcon',
                    icon: 'ios-aperture-outline',
                    hideInMenu:true,
                },
            }
        ]
    },


    
]