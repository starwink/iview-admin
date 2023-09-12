import { request } from '@/axios/request/http.js'
let url = "/controller/notes";
export default {
    getNotesList(data){
        return request.post(`${url}/list`, data);
    },
    getNotesDetail(id){
        return request.get(`${url}/detail`, {id});
    },
    saveNotes(data){
        return request.post(`${url}/save`, data);
    },
    delNotes(id){
        return request.post(`${url}/del`, {id});
    },
   








};
