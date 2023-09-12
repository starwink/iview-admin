import { request } from '@/axios/request/http.js'
let url = "";
export default {
    // 
    test(data) {
        return request.postForm(`${url}/mp/test`, data);
    },
    
    getUrl(url,data){
        return request.get(url, data);
    },
    postUrl(url,data){
        return request.post(url, data);
    }








};
