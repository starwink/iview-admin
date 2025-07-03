/**
 * 存放全局公用状态
 */
import settings from '@/settings'

const state = {
    ...settings,
    //页面标题
    title: '',

    // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
    sidebarCollapseLastStatus: settings.sidebarCollapse,
}

const getters = {}

const actions = {}

const mutations = {

    // 设置网页标题
    setTitle(state, title) {
        state.title = title
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse(state) {
        state.sidebarCollapse = !state.sidebarCollapse
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
