import { request } from '@/axios/request/http.js'
let url = "/test/dirfile";
export default {
   

    getFilesList(data){
        return request.post(`${url}/list`, data);
    },
    getFilesDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveFiles(data){
        return request.post(`${url}/save`, data);
    },
    delFiles(id){
        return request.post(`${url}/del`, {id});
    },
   

    
   








};
