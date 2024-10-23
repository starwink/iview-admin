import { request } from '@/axios/request/http.js'
let url = "/apitest/apijson";
export default {
   

    getApiTestList(data){
        return request.post(`${url}/list`, data);
    },
    getApiTestDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveApiTest(data){
        return request.post(`${url}/save`, data);
    },
    delApiTest(id){
        return request.post(`${url}/del`, {id});
    },
    getApiTestMaxTypeId(){
        return request.get(`${url}/maxid`);
    },
    getApiTestLatelyTitle(){
        return request.get(`${url}/latelytitle`);
    }

    
   

    
   








};
