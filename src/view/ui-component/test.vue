<template>
  <div class="dashboard">
    <h3>dashboard</h3>
    <svg class="svg-icon" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="`#svgicon-404`" />
    </svg>
    <br />2:
    <br />3:
    <!-- <Icon type="ios-checkmark"  size="44"  />
    <Icon type="logo-freebsd-devil" size="44" />
    <Icon type="woman" size="44" /> -->
    <div class="p">

        <eIcon name="ios-checkmark" size="14" color="#e02bb9" />
        #ffe0cd
    </div>

    <div class="p">
        <eIcon name="md-add" size="14" color="#0fe0cd" />
        #0fe0cd
    </div>
    
    <div class="p">
        <eIcon name="svg:fw" size="14" color="#ffe0cd" />
        #0fe0cd
    </div>

  </div>
</template>
<script>
// import commonIcon from '@/components/common-icon'
import eIcon from '_c/eIcon'
// import eIcon from '@/components/eIcon/eIcon.vue';
export default {
    
  components: {
    eIcon
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    init() {
      Object.assign(this.data, this.options.data());

    }
  },
}
</script>
<style lang="scss" scoped>
.dashboard {
    .p{
        line-height: 24px;
        font-size: 14px;
    }
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>