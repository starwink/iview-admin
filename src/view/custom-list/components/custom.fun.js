
export default {
    getOpenUri(str='',params={}){
        console.log('str',str)
        console.log('params',params)
        let regex = /\[(.+?)\]/g; 
        // str='';
        let strKeyArr=str.match(regex);
        let keyArr=[];
        if(strKeyArr && strKeyArr.length>0){
            keyArr=strKeyArr.map(res=>{
                return {
                    strKey:res,
                    key:res.substr(1,res.length-2),
                    value:''
                }
            })
        }
       
        keyArr.map(res=>{
            res.value=params[res.key] || ''
        })
        keyArr.map(res=>{
            if(res.strKey){
                while( str.indexOf(res.strKey)!=-1){
                    str=str.replace( `${res.strKey}`,res.value)
                }
            }
            //  str=str.replaceAll(res.strKey,res.value); //低版本没有replaceAll 函数
        })
        return str;
    },
    getTypeCn(val){
        let name='';
        if(val=='searchBox'){
            name='搜索框'
        }else if (val=='dropDownBox'){
            name='下拉框'
        }else if (val=='timeBox'){
            name='时间框' 
        }
        return name;
    },
    getValueCn(val){
        let name='';
        if(val=='int'){
            name='数值'
        }else if (val=='string'){
            name='字符串'
        }
        return name
    }
}