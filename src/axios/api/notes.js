import { request } from '@/axios/request/http.js'
let url = "/controller/notes";
export default {
    initDataBase(){
        return request.get(`${url}/initDataBase`);
    },

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
    openPath(data){
        return request.post(`${url}/openPath`, data);
    },

    
   








};
