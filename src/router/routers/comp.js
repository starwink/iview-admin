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
            

            {
                path: 'node',
                name: 'comp/node',
                redirect: '/comp/node/newclass',
                component: { render: h => h('router-view') },
                // component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/test'),
                meta: {
                    title: 'node类引用(未能使用)',
                    icon: 'logo-freebsd-devil',
                },
                children:[
                   
                        {
                            path: 'newclass',
                            name: 'newclass',
            
                            meta: {
                                title: '类测试',
                                icon: 'logo-freebsd-devil'
                            },
                            component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/newclass'),
                        },
                        {
                            path: 'newclass2',
                            name: 'newclass2',
            
                            meta: {
                                title: '类测试2',
                                icon: 'logo-freebsd-devil'
                            },
                            component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/newclass2'),
                        },
                    
                ]
            },

            {
                path: 'page',
                name: 'comp/page',
                redirect: '/comp/page/drag',
                component: { render: h => h('router-view') },
                // component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/test'),
                meta: {
                    title: '页面操作',
                    icon: 'logo-freebsd-devil',
                },
                children:[
                   
                    {
                        path: 'drag',
                        name: 'uiDrag',
                        component: () => import(/* webpackChunkName: 'ui' */ '@/view/drag/index'),
                        meta: {
                            title: '拖拽',
                            icon: 'md-move'
                        }
                    },
                    {
                        path: 'pagemark',
                        name: 'pagemark',
                        component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/page-mark'),
                        meta: {
                            title: '页面内容划线高亮',
                            icon: 'logo-freebsd-devil'
                        }
                    },
                    {
                        path: 'pageexport',
                        name: 'pageexport',
                        component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/page-export'),
                        meta: {
                            title: 'word文件导出',
                            icon: 'logo-freebsd-devil'
                        }
                    },
                   
                    {
                        path: 'copyimg',
                        name: 'copyimg',
                        component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/copyimg'),
                        meta: {
                            title: '复制图片到页面',
                            icon: 'ios-copy'
                        }
                    },
                    
                ]
            },
            
        ]
    },
    {
        path: '/comp/data',
        component: Layout,
        redirect: '/comp/fun/store',
        name: 'devfunclass',
        meta: {
            title: '数据操作',
            icon: 'logo-freebsd-devil',
        },
    
        children:[
            {
                path: 'observable',
                name: 'data/observable',

                meta: {
                    title: '轻量化全局数据',
                    icon: 'ios-aperture-outline',
                },
                component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/data/index'),
            },
            {
                path: 'indexeddb',
                name: 'data/indexeddb',
                meta: {
                    title: 'IndexedDB使用',
                    icon: 'ios-aperture-outline',
                },
                component: () => import(/* webpackChunkName: 'devComp' */ '@/view/ui-component/data/indexedDB.vue'),
            },
        ]
            
    },
    {
        path: '/comp/editor',
        component: Layout,
        redirect: '/comp/editor/index',
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
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/editor/index'),
            },
            {
                path: 'jsonpath',
                name: 'uiJsonPath',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/editor/jsonpath'),
                meta: {
                    title: 'jsonpath编辑器',
                    icon:'svg:json-path',
                }
            },
            {
                path: 'markdown',
                name: 'uiMarkdown',
                component: () => import(/* webpackChunkName: 'ui' */ '@/view/ui-component/editor/markdown'),
                meta: {
                    title: 'markdown编辑器',
                    icon:'svg:markdown',
                }
            },
            
        ]
    },
]