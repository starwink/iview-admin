

import nodes from "./nodes.js";
import template from './template.api.js'
import customList from "./custom-list.js";


export const api = {
    ...template,
    ...nodes,
    ...customList,
}