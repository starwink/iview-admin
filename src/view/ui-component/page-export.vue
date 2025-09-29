<template>
  <div class="page-export">
    <h3>导出测试</h3>
    <p>检验jquery是否早期版本导出的.fn.wordexport</p>
    <span>1234567890 ,</span>
    <p class="code">A、B、C、D、E、F、G、H、I、J、K、L、M、N、O、P、Q、R、S、T、U、V、W、X、Y、Z,</p>
    <p class="code">a、b、c、d、e、f、g、h、i、j、k、l、m、n、o、p、q、r、s、t、u、v、w、x、y、z</p>
    <p >一二三四五六七八九十千万</p>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      form: {

      }
    }
  },
  created(){
    this.init();
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
      console.log('jqeuy;',$,$.fn)
      console.log(',$.fn.',$.fn.wordExport)
      console.log('jsoncParser',json)

    }
  },
}
</script>
<style lang="scss" scoped>
.page-export {
}
</style>