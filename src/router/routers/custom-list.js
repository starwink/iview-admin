var _import
if(process.env.NODE_ENV=='development'){
    _import=(file)=>{ return require('@/view/'+file).default }
}else{
    _import= file => () => import('@/view/' + file)
}

console.log('process.env.NODE_ENV',process.env.NODE_ENV)
export default [
    {
        path: '/custom-list',
        name: 'custom-list',
        meta: {
            title: '定制化列表',
            icon: 'ico-jobslist',
            // access: ['16040801'],
            
        },
        component: _import('custom-list/index.vue')
    },
    {
        path: '/custom-user-list',
        name: 'custom-user-list',
        meta: {
            title: '院内定制化列表',
        },
        component: _import('custom-list/readOnly.vue')
    },
]
   