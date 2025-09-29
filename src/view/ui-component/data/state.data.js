import Vue from 'vue';
//当前只是单例场景,后续需要注意要存在多弹窗使用的场景
export const backtrack_list = [];
const _version = 0;

const initData = {
    step: 1,
    form: {},
    apiData: {},
    apiQuery: {}

}

export const globalState = Vue.observable(initData);


export const actions = {
    addItem(keyname, val) {
        globalState[keyname] = val;
    },
    setAPIData(obj = {}) {
        globalState.apiData = obj
    }
};