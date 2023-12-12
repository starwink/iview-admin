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

}