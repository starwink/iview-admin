import { request } from "@/api/request/http.js";
let url='test'
export default {
   

    getApijsonDetail(data){
        return  request.get(`${url}/apijson/detail`,data);
    },
    saveApijson(data){
        return request.post(`${url}/apijson/save`, data);
    },


}