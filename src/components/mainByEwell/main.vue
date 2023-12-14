<template>
  <Layout style="height: 100%" class="main">
          
    <Content class="content-wrapper">
        <keep-alive >
            <!-- :include="cacheList" -->
            <router-view/> 
        </keep-alive>
    </Content>
  </Layout>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import './main.less'
export default {
  name: 'MainByEwell',
  components: {
    // Language,
  },
  data () {
    return {
  
    }
  },
  computed: {
   
  },
  methods: {
   
    
   
  },
  watch: {
    // '$route' (newRoute) {
    //   const { name, query, params, meta } = newRoute
    
    // }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
   
  
  }
}
</script>
