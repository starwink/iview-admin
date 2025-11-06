<template>
  <div class="ui-icons">
    <h3>{{title}}</h3>
    <div class="title mt-10">
        icon:<code v-copy>
            &lt;eIcon :name="'icon:'+name" /&gt;
            </code>
      </div>
    <div class="icon-box">
      
      <div class="item" v-for="(name,i) of option.iconfont">
        <span class="id">{{i}}</span>
        <span class="name" @click.stop="copyName(name)">{{'icon:'+name}}</span>
        <eIcon class="icon" :name="'icon:'+name" @click.native="copyCode(name)" />
      </div>

    </div>

     <div class="title mt-10">
        icon:<code v-copy>
            &lt;eIcon :name="'svg:'+name" /&gt;
            </code>
      </div>
    <div class="icon-box">
      
      <div class="item" v-for="(name,i) of option.svgJsonList">
        <span class="id">{{i}}</span>
        <span class="name" @click.stop="copyName(name)">{{'svg:'+name}}</span>
        <eIcon class="icon" :name="'svg:'+name" @click.native="copyCode(name,'svg')" />
      </div>

    </div>

    <div class="title mt-10">
        icon:<code v-copy>
            &lt;eIcon :name="'iview:'+name" /&gt;
            </code>
      </div>
    <div class="icon-box">
      
      <div class="item" v-for="(name,i) of option.iviewList">
        <span class="id">{{i}}</span>
        <span class="name" @click.stop="copyName(name)">{{'iview:'+name}}</span>
        <eIcon class="icon" :name="'iview:'+name" @click.native="copyCode(name,'iview')" />
      </div>

    </div>



  </div>
</template>
<script>
import iconfontJsonList from '@/assets/icons/iconfont.json'
import svgJsonList from '@/assets/icons-svg/svg-files.json'
import eIcon from '_c/eIcon'
import iviewList from './iview-icon'
import { webCopy } from "@/libs/util";
export default {
  components: {
    eIcon
  },
  data() {
    return {
      title: '',
      form: {

      },
      option: {
        iconfont: [],
        svgJsonList:[],
        iviewList:[]
      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
      this.title = this.$route?.meta?.title || '';
      this.option.iconfont = iconfontJsonList?.list.map(name => {
          return name.replace('icon-', '');
      }) || []
      this.option.svgJsonList = svgJsonList.map(name => {
          return name.replace('.svg', '');
      }) || []
      this.option.iviewList=iviewList;
    
    },
    copyName(name){
        webCopy(name);
    },
    copyCode(name,type="icon"){
        webCopy(`<eIcon name="${type}:${name}"  />`)
        console.log('copyCode',name)
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.ui-icons {
    padding: 16px;
    code{
        background-color:#ccc;
        padding: 4px;
    }
  .icon-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 16px;
  }
  .item {
    margin-right: 12px;
    cursor: pointer;
    // border: 1px solid #ccc;
    padding: 0px 8px;
    border-radius: 4px;
    background-color: #fff;
    .id{
        padding:0 4px;
    }
    .name {
      padding: 4px 8px;
      background-color: #dbe4ff;
      border-radius: 4px;
      margin:0 8px;
    }
    .icon{
        padding: 0 4px;
    }
  }
}
</style>