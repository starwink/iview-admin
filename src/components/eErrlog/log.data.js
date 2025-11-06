import Vue from 'vue';
import helper from '@/utils/helper.js'
//当前只是单例场景,后续需要注意要存在多弹窗使用的场景

const initData = {
    list:[],
}
// id,name,api,jsonstr,time,read

function paginate(data, currentPage = 1, pageSize = 5) {
    // 计算总页数
    const totalPages = Math.ceil(data.length / pageSize);

    // 校验当前页码是否在有效范围内
    if (currentPage < 1 || currentPage > totalPages) {
        return { data: [], totalPages, currentPage };
    }

    // 计算起始索引并截取数据
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    // 返回当前页数据和分页信息
    return {
        data: currentPageData,
        totalPages,
        total:data.length,
        currentPage
    };
}

export const globalState = Vue.observable(initData);


export const actions = {
    addItem(params={}) {
       console.log(helper)
        params.id=helper.uuid();
        params.time=new Date().getTime();
        params.read=false;

        globalState.list.unshift(params);

    },
    readItem(ids=[]){
        globalState.list.map(res=>{
             if(ids.includes(res.id)){
                res.read=true
             }
        })
    },
    getList(num=1,size=10){
       let res= paginate(globalState.list,num,size)
       return {data:res.data,totalPage:res.totalPages,total:res.total}
    },
    delAll(){
        globalState.list=[]
    }
   
};