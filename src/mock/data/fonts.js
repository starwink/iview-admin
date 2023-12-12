import { doCustomTimes } from '@/libs/util'
import helper from '@/libs/helper'
import qs from "qs";
export default (Mock) => {
    
    Mock.mock(/\/notes\/list/, function(req)  {
        let tableData = []
        let {pageNum=1 ,pageSize=20 }= helper.getRequestParam(req.url)
        let total=pageSize*8;
        doCustomTimes(total, () => {
            tableData.push(Mock.mock({
                text: '@name',
                email: '@email',
                code_wb: '@name',
                code_binyin: '@phone',
                created_at: '@date',
                update_datetime: '@date',
            }))
        })
        return {code:1,object:{list:tableData,total:total}};
    })

}