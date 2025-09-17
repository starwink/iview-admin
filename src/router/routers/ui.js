import Layout from '@/components/main-conversion'
import EmptyLayout from '@/components/main-conversion/empty'
import svgcode from './svg.json'

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
                path: 'jsonparser',
                name: 'jsonparser',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/json-parser'),
                meta: {
                    title: 'json解构',
                    icon: 'logo-freebsd-devil'
                }
            },
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
                    icon: 'svg:font',
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
                path: 'drag',
                name: 'uiDrag',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/drag/index'),
                meta: {
                    title: '拖拽',
                    icon: 'md-move'
                }
            },
            {
                path: 'modal',
                name: 'modal',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/modal'),
                meta: {
                    title: '弹窗',
                    icon: 'md-move'
                }
            },
            {
                path: 'pageexport',
                name: 'pageexport',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/page-export'),
                meta: {
                    title: '导出',
                    icon: 'logo-freebsd-devil'
                }
            },
            {
                path: 'pagemark',
                name: 'pagemark',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/page-mark'),
                meta: {
                    title: '页面内容',
                    icon: 'logo-freebsd-devil'
                }
            },
            {
                path: 'copyimg',
                name: 'copyimg',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/copyimg'),
                meta: {
                    title: '复制图片',
                    icon: 'ios-copy'
                }
            },



            {
                path: 'menu1',
                name: 'menu1',
                meta: {
                    title: 'menu1',
                    icon: 'ios-add-circle-outline',
                },
                // component: EmptyLayout,
                component: { render: h => h('router-view') },
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
                                    icon: 'svgcode:'+svgcode.kdy,
                                },
                                component: () => import(/* webpackChunkName: 'menu2' */ '@/view/ui-component/menu/page3'),
                            },

                        ]
                    }
                    
                ]
            },
            
           

        ]


    },
    {
        path: '/editor',
        component: Layout,
        redirect: '/editor/index',
        name: 'editor/index',
        meta: {
            title: '编辑器',
            icon: 'md-bowtie',
        },
        children:[
            {
                path: 'index',
                name: 'index/monaco',
                meta: {
                    title: '备注文档',
                    icon: 'logo-freebsd-devil'
                },
                // component: { render: h => h('router-view') },
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/editor/index'),
            },
            {
                path: 'jsonpath',
                name: 'uiJsonPath',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/editor/jsonpath'),
                meta: {
                    title: 'jsonpath编辑器',
                    icon:'svg:json-path',
                }
            },
            {
                path: 'markdown',
                name: 'uiMarkdown',
                component: () => import(/* webpackChunkName: 'devExample' */ '@/view/ui-component/editor/markdown'),
                meta: {
                    title: 'markdown编辑器',
                    icon:'svg:markdown',
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