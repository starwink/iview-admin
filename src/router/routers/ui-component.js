var _import
if(process.env.NODE_ENV=='development'){
    _import=(file)=>{ return require('@/view/'+file).default }
}else{
    _import= file => () => import('@/view/' + file)
}



export default [
    {
        path: '/ui',
        name: 'ui',
        meta: {
            title: '组件示例',
            icon: 'ico-jobslist',
            // access: ['16040801'],
            
        },
        component: _import('ui-component/index.vue')
    },
    {
        path: '/ui/list',
        name: 'ui/list',
        meta: {
            title: '列表布局',
            icon: 'ico-jobslist',
            // access: ['16040801'],
            
        },
        component: _import('ui-component/list.manage.vue')
    },
    {
        path: '/ui/table',
        name: 'ui/table',
        meta: {
            title: 'vex table示例',
            icon: 'ico-jobslist',
            // access: ['16040801'],
            
        },
        component: _import('ui-component/vxe-table.vue')
    },

    {
        path: "/monaco/jsonpath",
        name: "monaco/jsonpath",
        meta: {
            token: false,
            hideInMenu: true,
            title: 'notes',
            notCache: true,
        },
        component: _import("ui-component/editor/jsonpath.vue"),
    },
 
    
]
   