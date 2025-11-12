import { request } from "@/api/request/http.js";
let url = "/test/english";
export default {
   

    getEnglishList(data){
        return request.post(`${url}/list`, data);
    },
    getEnglishDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveEnglish(data){
        return request.post(`${url}/save`, data);
    },
    delEnglish(id){
        return request.post(`${url}/del`, {id});
    },
    pullEnglistMp3(data){
        return request.post(`${url}/pullmp3`, data);
    }
   

    
   








};
