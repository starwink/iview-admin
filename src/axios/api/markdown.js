import { request } from '@/axios/request/http.js'
let url = "/markdown";
export default {
    markdownDemo(){
        return request.get(`${url}/json`);
    },

    

    
   








};
