import { request } from '@/axios/request/http.js'
let url = "/test/saydict";
export default {
   

    getSayDictList(data){
        return request.post(`${url}/list`, data);
    },
    getSayDictDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveSayDict(data){
        return request.post(`${url}/save`, data);
    },
    addSayDictByBatch(data){
        return request.post(`${url}/addbybatch`, data);
    },
    delSayDict(id){
        return request.post(`${url}/del`, {id});
    },
    pullYouDaoWord(word){
        return request.get(`${url}/pull/${word}`);
    },
    getSayDictTagList(data){
        data.getall=1
        return request.post(`${url}/list`, data);
    }
   

    
   

    
   








};
