//浏览器开发时使用虚拟eletron api
var browserTroyFun=function(...e){
    console.log('browser troy run',e)
    return new Promise((resolve,jeject)=>{
        resolve('res success');
    })
}
const troyIpc={
    invoke:browserTroyFun,
    sendSync:browserTroyFun,
    once:browserTroyFun,
}

export {
    troyIpc
}