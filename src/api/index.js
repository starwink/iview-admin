

import nodes from "./nodes.js";
import notescode6 from "./notes.code6.js";//https域名访问
import template from './template.api.js'
import customList from "./custom-list.js";
import english from "./english.js";


export const api = {
    ...template,
    ...nodes,
    ...notescode6,
    ...customList,
    ...english,
}