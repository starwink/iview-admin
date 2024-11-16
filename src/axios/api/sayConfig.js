import { request } from '@/axios/request/http.js'
let url = "/test/sayconfig";
export default {
   

    getSayConfigList(data){
        return request.post(`${url}/list`, data);
    },
    getSayConfigDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveSayConfig(data){
        return request.post(`${url}/save`, data);
    },
    delSayConfig(id){
        return request.post(`${url}/del`, {id});
    },
  

    
   

    
   

    







};
