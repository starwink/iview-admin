<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con" style="height: var(--layout-layout-header-height);line-height: var(--layout-layout-header-height); padding:0 10px;">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
        <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;" /> -->
        <user />
        <SelectSys />
      </header-bar>
    </Header>
    <Layout style="height: calc(100% - var(--layout-layout-header-height));">
      <Sider hide-trigger collapsible :width="200" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}" style="height:100%">
        <side-menu accordion ref="sideMenu" theme="light" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
          <!-- <p>head theme="light" theme="light"</p> -->
          <switchMenuIcon :collapsed="collapsed" slot="footer" @click="test" />
        </side-menu>
      </Sider>
      <Content class="main-content-con">
        <keep-alive :include="cacheList">
          <router-view />
        </keep-alive>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'

import SelectSys from './components/select-sys/index'
import User from './components/user'
import Fullscreen from './components/fullscreen'
import switchMenuIcon from './components/switchMenuIcon'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import {
  getMenuByRouterV2,
} from '@/libs/util'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Fullscreen,
    User,
    SelectSys,
    switchMenuIcon,
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList() {
      return this.$store.state.app.tagNavList
    },


    cacheList() {
      //   return [this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return []
    },
    menuList() {
      let headerActived = this.$store.state?.menu.headerActived || 0;
      let list = getMenuByRouterV2(this.$store.state?.menu?.routes?.[headerActived]?.children || [])
      return list
    },

    hasReadErrorPage() {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
    ]),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route
      else {
        console.info('%c ','color: white; background-color: #f06292;padding:4px 8px 4px 8px',`⬇︎⬇︎⬇︎${JSON.stringify(route)}`);
        return ;
      }
      let routeParams=this.$store.state?.menu?.routeMap?.[name];
      if(routeParams){
        if(routeParams.meta.href){
            window.open(routeParams.meta.href)
            // window.location.href=
        }else{
            this.$router.push({name})
        }
      }else{
        this.$router.push({name})
      }
    
      /* this.$router.push({
        name,
        params,
        query
      }) */
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },

    test(){
        this.collapsed=!this.collapsed;
        console.log('1232',this.collapsed)
    }

  },
  watch: {
    '$route'(newRoute) {
      const { name, query, params, meta } = newRoute
    }
  },
  mounted() {

  }
}
</script>
