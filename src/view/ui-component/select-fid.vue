<template>
  <div class="select-demo">
    <eTagSelect v-model="form.tagArr" />
    <p>{{form.tagArr}}</p>
  </div>
</template>
<script>
import eTagSelect from '_c/eTagSelect'
export default {
  components: {
    eTagSelect
  },


  data() {
    return {
      form: {
        tagArr: []
      },
      option: {
        tagList: [
          // {id:1,name:'a'},
          // {id:2,name:'b'},
          // {id:3,name:'c'},
          // {id:4,name:'d'},

        ]
      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());

    },


  },

}
</script>
<style lang="scss" scoped>

</style>