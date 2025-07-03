<template>
    <!-- <span v-if="icon.name" > -->
        <i v-if="icon.type=='iview' && !!icon.name" :class="`ivu-icon ivu-icon-${icon.name}`"  :style="styles"></i>
        <i v-else-if="icon.type=='icon'  && !!icon.name" :class="`iconfont icon-${icon.name}`"  :style="styles"></i>
        <i v-else-if="icon.type=='svg'  && !!icon.name"  style="vertical-align: text-top;">
            <svg class="svg-icon" aria-hidden="true" :style="styles" >
                <use :xlink:href="`#svgicon-${icon.name}`" />
            </svg>
        </i>
        <!-- <span v-else >1</span> -->
    <!-- </template> -->
    <!-- <template v-else><span></span></template> -->

</template>

<script>
export default {
  name: 'EIcon',
  props: {
    name: {
      type: String,
    //   required: true
    },
    type:{
        type:String, 
        default:'iview' //iview,icon,svg
    },
    color: {
      type: String,
      default: ''//#5c6b77
    },
    size: {
      type:  Number | String,
      default: 16
    }
  },
 
  watch: {
    name:{
        immediate:true,//首次绑定时触发
        handler(newValue, oldValue) { 
            this.fxname(newValue)
        },
    },
  },
  computed: {
    styles () {
        let css={}
        if(this.icon.type=='svg'){
            css={
                width: `${this.size}px`,
                height: `${this.size}px`,
                color: this.color,
            }
        }else{
            css={
                fontSize: `${this.size}px`,
                color: this.color,
            }
        }
        return css
    }
  },
  data(){
    return {
        icon:{
            name:'',
            type:''
        }
    }
  },
  methods:{
    fxname(name=''){
        if(name.indexOf(':')>-1){
            let data=name.split(':');
            this.icon.type=data[0]
            this.icon.name=data[1]
        }else{
            this.icon.name=name;
            this.icon.type='iview'
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.eicon{
    display: inline-block;
    vertical-align: middle;
    svg{
        display: inline-block;
        width:100%;height: 100%;
    }
}

</style>
