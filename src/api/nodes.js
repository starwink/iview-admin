import { request } from "@/api/request/http.js";
let url='htest'
export default {
    getNotesList(data) {
        return request.get(`${url}/notes/list`, data);
    },
    getNotesDetail(data) {
        return request.get(`${url}/notes/detail`, data);
    },
    saveNotesList(data) {
        return request.post(`${url}/notes/save`, data);
    },
    delNotes(data) {
        return request.post(`${url}/notes/del`, data);
    },
    pushBedImg(data){
        return request.post(`${url}/test/wxmpimg/img/bed`, data);
    },
    delFileImg(data){
        return request.post(`${url}/test/wxmpimg/delfile`, data);
    },

    getTagAll(){
        return  request.get(`${url}/test/tag_notes/all`);
    },
    saveTag(data){
        return request.post(`${url}/test/tag_notes/save`, data);
    }



}