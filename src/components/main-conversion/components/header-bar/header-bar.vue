<template>
  <div class="header-bar">
    <div class="header-left">
      <span class="login-title">
        <span class="project-img">
            <!-- <img src="/statics/images/test.png" /> -->
            <img src="/statics/images/logo-test2.png" />
        </span>
        <span class="project_name">
          数据智能分析平台
        </span>

      </span>
      <!-- <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger> -->
      <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    </div>
    <div class="header-right">
      <div class="custom-content-con">
        <slot></slot>
      </div>
    </div>

  </div>
</template>
<script>
// import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.scss'
export default {
  name: 'HeaderBar',
  components: {
    // siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
