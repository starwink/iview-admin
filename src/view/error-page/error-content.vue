<template>
  <div class="error-page2">
    <div class="content-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
    </div>
  </div>
</template>

<script>

// import backBtnGroup from './back-btn-group.vue'
export default {
  name: 'error_content',
  components: {
    // backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>

<style lang="scss" scoped> 
.error-page2{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    .content-con{
      
    }
}
</style>