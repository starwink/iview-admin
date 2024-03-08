var _import
if(process.env.NODE_ENV=='development'){
    _import=(file)=>{ return require('@/view/'+file).default }
}else{
    _import= file => () => import('@/view/' + file)
}



export default [
    {
        path: '/drag',
        name: 'drag',
        meta: {
            title: '拖拽',
            icon: 'ico-jobslist',
            // access: ['16040801'],
            
        },
        component: _import('drag/index.vue')
    },
 
    
]
   