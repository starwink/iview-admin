import Layout from '@/components/main-conversion'
import EmptyLayout from '@/components/main-conversion/empty'
import svgcode from './svg.json'

export default [

    {
        path: '/ui',
        component: Layout,
        redirect: '/ui/index',
        name: 'devExample2',
        meta: {
            // title: '概览1',
            icon: 'logo-freebsd-devil',
            access: [], //鉴权
            badge: 'PRO',// 导航栏标记
            // badge: () => store.state.menuBadge.number
        },
        children: [
            {
                path: 'index',
                name: 'ui/index',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/index'),
                meta: {
                    title: '概览',
                    icon: 'logo-freebsd-devil'
                }
            },
        ]
    },

    {
        path: '/ui',
        component: Layout,
        redirect: '/ui/docs/iviewadminv4',
        name: 'devExample',
        meta: {
            title: '主题相关',
            icon: 'logo-freebsd-devil',
            access: [], //鉴权
            badge: 'PRO',// 导航栏标记
            // badge: () => store.state.menuBadge.number
        },
        children: [
            {
                path: 'test',
                name: 'test',
                redirect: '/ui/test/dev',
                component: { render: h => h('router-view') },
                // component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/test'),
                meta: {
                    title: 'TEST',
                    icon: 'logo-freebsd-devil',
                },
                children: [
                    {
                        path: 'dev',
                        name: 'ui/test/dev',
                        // component: { render: h => h('router-view') },
                        component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/test'),
                        meta: {
                            title: '开发测试',
                            hideInMenu: true,
                        },
                    }
                ]
            },
            {
                path: 'uiframework',
                name: 'uiFramework',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/reviewTheme'),
                meta: {
                    title: 'UI组件示例',
                    icon: 'svg:biji',
                }
            },
            {
                path: 'fonts',
                name: 'uiFonts',
                meta: {
                    title: '字体',
                    icon: 'svg:font',
                },
                component: () => import('@/view/fonts/index.vue')
            },
            {
                path: 'icons',
                name: 'uiIcons',
                meta: {
                    title: '图标预览',
                    icon: 'svg:font',
                },
                component: () => import('@/view/ui-component/icons/index.vue')
            },
            
            


            {
                path: 'modal',
                name: 'modal',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/modal'),
                meta: {
                    title: '弹窗',
                    icon: 'md-move'
                }
            },

            {
                path: 'select',
                name: 'select',
                // component: { render: h => h('router-view') },
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/select-fid'),
                meta: {
                    title: '下拉框(快捷新增未有)',
                    // icon: 'ios-aperture-outline',
                    icon: 'ios-copy'
                    // hideInMenu:true,
                },
            },

            {
                path: 'list',
                name: 'uiList',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/list.manage'),
                meta: {
                    title: '列表CURL管理',
                    icon: 'svg:crud'
                }
            },
            {
                path: 'table',
                name: 'uiVxeTable',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/vxe-table'),
                meta: {
                    title: 'vxe-table使用示例',
                    icon: 'svg:vxe'
                }
            },









        ]


    },




    {

        path: '/reference',
        name: 'reference',
        redirect: '/reference/eicon',
        component: { render: h => h('router-view') },
        // component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/test'),
        meta: {
            title: '参考',
            icon: 'logo-freebsd-devil',

        },
        children: [

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
                redirect: '/ui/docs/iviewadminv4',
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
                        redirect: '/ui/docs/iviewadminv4/table',
                        children: [
                            {
                                path: 'table',
                                name: 'docs/iviewadminv4/table',
                                meta: {
                                    title: 'table',
                                    href: 'https://v4.iviewui.com/components/table',
                                    icon: 'ios-book',
                                }
                            },
                            {
                                path: 'tabs',
                                name: 'docs/iviewadminv4/tabs',
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
                path: 'menu1',
                name: 'menu1',
                meta: {
                    title: 'menu1',
                    icon: 'ios-add-circle-outline',
                },
                // component: EmptyLayout,
                // component: { render: h => h('router-view') },
                component: Layout,
                redirect: '/menu1/menu2',
                children: [
                    {
                        path: 'menu2',
                        name: 'menu1/menu2',
                        meta: {
                            title: 'menu2',
                            icon: 'md-alarm',
                        },
                        component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page2'),
                    },
                    {
                        path: 'menu3',
                        name: 'menu1/menu3',
                        meta: {
                            title: 'menu3',
                            icon: 'md-albums',
                        },
                        component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page3'),
                    },
                    {
                        path: 'menu2',
                        name: 'menu1/menu1',
                        meta: {
                            title: 'menu2',
                            icon: 'md-alert',
                        },
                        component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page1'),
                    },
                    {
                        path: 'menu4',
                        name: 'menu1/menu4',
                        meta: {
                            title: 'menu1',
                            icon: 'ios-add-circle-outline',
                        },
                        // component: EmptyLayout,
                        component: { render: h => h('router-view') },
                        redirect: '/menu1/menu4/menu1',
                        children: [
                            {
                                path: 'menu1',
                                name: 'menu1/menu4/menu1',
                                meta: {
                                    title: 'menu1',
                                    icon: 'md-analytics',
                                },
                                component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page1'),
                            },
                            {
                                path: 'menu2',
                                name: 'menu1/menu4/menu2',
                                meta: {
                                    title: 'svg项目中的文件图标',
                                    icon: 'svg:tyq',
                                },
                                component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page2'),
                            },
                            {
                                path: 'menu3',
                                name: 'menu1/menu4/menu3',
                                meta: {
                                    title: 'svg代码',
                                    icon: 'svgcode:' + svgcode.kdy,
                                },
                                component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page3'),
                            },

                        ]
                    }

                ]
            },




        ]
    },



]