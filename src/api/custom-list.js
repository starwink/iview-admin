import { request } from "@/api/request/http.js";

const url='/collect'

export default{
    //定制化列表
    getCustomList(data) {
        return request.post(`${url}/newdataease/find`, data);
    },
    //带权限的定制化列表
    getCustomListByDept(data) {
        return request.post(`${url}/newdataease/findForQuality`, data);
    },
    saveCustomItem(data) {
        return request.post(`${url}/newdataease/save`, data);
    },
    delCustomItem(data){
        return request.get(`${url}/newdataease/delete`, data);
    },
    //批量开启/关闭
    batchUpdateCustomOpen(data) {
        return request.post(`${url}/newdataease/batchUpdate`, data);
    },
    getCustomTableData(data) {
        return request.post(`${url}/newdataease/getTableData`, data);
    },
    getCustomFieldsOptions(data) {
        return request.get(`${url}/newdataease/getGroup`, data);
    },

    downLoadNewdataease(data,filename){
        request.downExcel(`/collect/newdataease/downLoad`,data,filename,'xls');
    },
    //获取
    getDeptList(data) {
        return request.get(`${url}/newdataease/getDeptList`, data);
    },
    
     //获取定制列表详情
    getTableDetailById(id) {
        return request.get(`${url}/newdataease/getTableDetailById`, {id});
    },
    getOptionsTableColumnList(data) {
        return request.post(`${url}/newdataease/findColumnList`, data);
    },



   
};
