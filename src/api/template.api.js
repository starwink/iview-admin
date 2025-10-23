import { request } from "@/api/request/http.js";
let url='htest'
export default {
    getBaseList(uri,data) {
        return request.get(`${url}${uri}/list`, data);
    },
    getBaseDetail(uri,data) {
        return request.get(`${url}${uri}/detail`, data);
    },
    saveBase(uri,data) {
        return request.post(`${url}${uri}/save`, data);
    },
    delBase(uri,data) {
        return request.post(`${url}${uri}/del`, data);
    },



}