<template>
  <div class="dashboard">
    <h3>dashboard</h3>
    <svg class="svg-icon" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="`#svgicon-404`" />
    </svg>
    <br />2:
    <!-- <common-icon type="ios-checkmark" size="56" color="#ba68c8" /> -->
    <!-- <common-icon type="qq" size="56" color="#ba68c8" /> -->
    <br />3:
    <!-- <Icon type="ios-checkmark"  size="44"  />
    <Icon type="logo-freebsd-devil" size="44" />
    <Icon type="woman" size="44" /> -->
    <eIcon name="ios-checkmark" size="44" />
    <eIcon name="ri-printer-line" size="44" />
  </div>
</template>
<script>
// import commonIcon from '@/components/common-icon'
import eIcon from '_c/eIcon'

// import eIcon from '@/components/eIcon/eIcon.vue';
export default {
    
  components: {
    eIcon,
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    init() {
    //   Object.assign(this.data, this.options.data());
    }
  },
  created(){
    this.$nextTick(()=>{
        this.init();
    })
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>