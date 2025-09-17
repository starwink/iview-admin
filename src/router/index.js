import Vue from 'vue'
import Router from 'vue-router'
// import routes from './routers'
import store from '@/store'
import ViewUI from 'view-design'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
import Main from '@/components/main-conversion'
import parentView from '@/components/parent-view'
const { homeName } = config

import asyncRoutes from '@/router/routers'

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login/login'),
        meta: {
            title: '登录',
            i18n: 'route.login'
        }
    },
    {
        path: '/mark',
        name: 'mark',
        component: () => import('@/view/ui-component/page-mark.vue'),
        meta: {
            title: 'mark',
            i18n: 'route.login'
        }
    },
    {
        path: '/',
        component: Main,
        redirect: 'dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/view/home/dashboard'),
                meta: {
                    title: '概览',
                }
            },
        ]
    },


    {
        path: '/401',
        name: 'error_401',
        meta: {
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
        },
        component: () => import('@/view/error-page/500.vue')
    },

]
// 需要后面追加404配置,不然动态加载路由后还是在404页
const lastRoute = [{
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue'),
    meta: {
        title: '404',
    }
}]

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router)
const router = new Router({
    routes: constantRoutes,
    mode: 'hash', //hash ,history
    base: process.env.BASE_URL,
})


const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
    if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
    else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach(async (to, from, next) => {
    ViewUI.LoadingBar.start()
    // 已经登录，但还没根据权限动态生成并挂载路由
    if (store.getters['user/isLogin'] && !store.state.menu.isGenerate) {
        router.matcher = new Router({
            routes: constantRoutes,
        }).matcher;

        let accessRoutes = [];
        accessRoutes = await store.dispatch('menu/generateRoutesAtFront', {
            asyncRoutes,
            currentPath: to.path //用于判断是在哪个大类下
        })
        accessRoutes.push(...lastRoute)
        accessRoutes.forEach(route => {
            router.addRoute(route)
        })

        next({ ...to, replace: true });
    }
    if (store.state.menu.isGenerate) {
        store.commit('menu/setHeaderActived', to.path)
    }

    console.log('login',to)
    if (store.getters['user/isLogin']) {
        if (to.name) {
            if (to.matched.length !== 0) {
                // 如果已登录状态下，进入登录页会强制跳转到控制台页面
                if (to.name == 'login') {
                    next({
                        name: 'dashboard',
                        replace: true
                    })
                }
            } else {
                // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                next({
                    path: '/404'
                })
            }
        }
    } else {
        if (to.name != 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }

    next()
})

router.afterEach(to => {
    ViewUI.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
