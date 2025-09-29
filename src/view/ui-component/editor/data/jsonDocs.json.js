export default [
    {
        path:'$',
        desc:'根节点',
    },

    {
        path:'@',
        desc:'现行节点',
    },
    {
        path:'. 或 []',
        desc:'子节点',
    },
    {
        path:'..',
        desc:'匹配并递归所有元素节点',
    },
    {
        path:'*',
        desc:'匹配所有元素节点,只一层不递归',
    },
    {
        path:'[,]',
        desc:'支持迭代器中做多选',
    },
    {
        path:'()',
        desc:'脚本表达式',
    },
    {
        path:'?()',
        desc:'过滤器 (==,!=,>,<,>=,<=,&&,||)',
    },
    {
        path:'[start: end: step]',
        desc:'数组分割操作',
    },
]