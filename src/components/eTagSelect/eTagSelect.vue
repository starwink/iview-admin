<template>
  <div class="select-tag" ref="selectTag">
    <Select ref="select" v-model="form.tagArr" filterable multiple allow-create clearable @on-change="changeTag" @on-create="createNewTag">
      <Option v-for="item in option.tagList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.form.tagArr = newVal;
      },
      deep: true,
      immediate: true,
    },
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
      //   Object.assign(this.$data, this.$options.data());
      this.getOption();
      /**
        * 回车选中与是否新增 在交互中存在冲突,新增内容在被包含已有内容时,无法确认是新增还是去选中
      this.$nextTick(()=>{
         this.$refs.selectTag.addEventListener('keydown', this.$_enter)
      }) */
    },
    getOption() {
      this.$api.getTagAll().then(res => {
        if (res.code == 1) {
          this.option.tagList = res?.object?.list || []
        }
      })
    },
    changeTag() {
      console.log('changeTag', this.form)

      //this.$emit('input',this.form.tagArr)
      //this.$emit('change',this.form.tagArr)
    },
    createNewTag(val) {
      let tagArr = this.form.tagArr;
      let obj = this.option.tagList.find(item => {
        return item.name == val
      })
      if (obj) {
        if (!this.form.tagArr.indexOf(obj.id)) {
          this.form.tagArr.push(obj.id)
        }
        return;
      }

      this.$api.saveTag({ name: val }).then(res => {
        if (res.code == 1) {
          let id = res.object.id

          let newOptions = {
            id: id, name: val
          }
          // this.option.tagList.push(newOptions)
          this.option.tagList.unshift(newOptions)
          //   this.form.tagArr = tagArr;
          tagArr.push(id)
          this.$set(this.form, 'tagArr', tagArr)
          this.$emit('input', this.form.tagArr)
          this.$emit('change', this.form.tagArr)
        }
      })
      /*  let id=this.option.tagList.length+1;
       let newOptions={
           id:id,name:val
       } */

      /*  this.option.tagList.push(newOptions)
       this.form.tagArr.push(id); */


    },
    onEnterPressed(e) {
    },
    $_enter(event) {
      //创建时应该是被拦截了不会在再触发回车事件
      if (event.key === 'Enter') {
        console.log(this.$refs.select)
      }
    }


  },
  created() {
    this.init();
  },

  beforeDestroy() {
    // this.$refs.selectTag.removeEventListener('keydown', this.$_enter)
  },
}
</script>
<style lang="scss" scoped>
.select-tag {
  display: inline-block;
}
</style>