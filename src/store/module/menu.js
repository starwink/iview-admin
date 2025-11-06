import { deepClone,extractionRouters } from '@/libs/util'
import api from '@/api'



const state = {
    isGenerate: false,
    routes: [], //用于导航
    headerActived: 0, //所在大类,[主项目,调试],下拉或icon切换,
    routeMap:{},
}

const getters = {
    //按headerActived,返回对应的路由数据
    sidebarRoutes: state => {
        return state.routes.length > 0 ? state.routes[state.headerActived].children : []
    }
}

const actions = {

    //获取路由数据方法,这里触发鉴权,设定大类:筛选出生成导航数据,resolve注册的可访问的所有路由
    generateRoutesAtFront({ rootState, dispatch, commit }, data) {
        return new Promise(async resolve => {
            let accessedRoutes = data.asyncRoutes;
            commit('setRoutes', accessedRoutes)
            commit('setHeaderActived', data.currentPath)
            commit('setRoutesMap', accessedRoutes)
            let routes = []
            //todo  处理路径数据
            data.asyncRoutes.map(item => {
                routes.push(...item.children)
            })
            resolve(routes)
        })
    }
}

const mutations = {
    //退出登录时使用   commit('menu/invalidRoutes', null, {root: true})
    invalidRoutes(state) {
        state.isGenerate = false
        state.headerActived = 0
    },
    setRoutes(state, routes) {
        state.isGenerate = true
        let newRoutes = deepClone(routes)
        state.routes = newRoutes.filter(item => {
            return item.children.length != 0
        })
    },
    setRoutesMap(state, routes){
        let m=extractionRouters(routes);
        state.routeMap=m
    },
    // 根据路由判断属于哪个头部导航
    setHeaderActived(state, path) {
        state.routes.map((item, index) => {
            if (
                item.children.some(r => {
                    return path.indexOf(r.path + '/') === 0 || path == r.path
                })
            ) {
                state.headerActived = index
            }
        })
    },
    // 切换头部导航
    switchHeaderActived(state, index) {
        state.headerActived = index
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
