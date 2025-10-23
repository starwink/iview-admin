<template>
  <div class="json-parser">
    <h3>导出测试</h3>
    <p>检验jquery是否早期版本导出的.fn.wordexport</p>
    <span>1234567890 ,</span>
    <p class="code">A、B、C、D、E、F、G、H、I、J、K、L、M、N、O、P、Q、R、S、T、U、V、W、X、Y、Z,</p>
    <p class="code">a、b、c、d、e、f、g、h、i、j、k、l、m、n、o、p、q、r、s、t、u、v、w、x、y、z</p>
    <p >一二三四五六七八九十千万</p>

    <div class="review-item" v-for="(item,index) of page.data">
         <div class="name">
            {{index+1}}:{{item.name}}
        </div>
        <div class="json" @dblclick="copy(item.json)">
            {{item.json}}
        </div>
        <div class="path"  @dblclick="copy(item.path)">
            <!-- {{getJsonPath(item.json)}} -->
           {{ item.path}}
        </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import testJsonList from './json-parser/json.test'
import jsonTestData from './json-parser/json.test';
import { webCopy } from "@/libs/util";

export default {
  data() {
    return {
      form: {

      },
      page:{
        data:[]
      }
    }
  },
  created(){
    this.init();
  },
  methods: {
    init() {
        let json={name:"张三",age:2,sex:0,staus:false}
      Object.assign(this.$data, this.$options.data());
      console.log('jqeuy;',$,$.fn)
      console.log(',$.fn.',$.fn.wordExport)
      console.log('jsoncParser',json)
      console.log('path',this.$helper.getJsonPaths(json))
      let list=jsonTestData.map(res=>{
        return {...res,...{path:this.getJsonPath(res.json)}}
      })
      this.page.data=list;



    },
    getJsonPath(json={}){
        
        return this.$helper.getJsonPaths(json)
    },
    copy(json){
        console.log(json,'copy')
        webCopy(JSON.stringify(json))
    }
  },
}
</script>
<style lang="scss" scoped>
.json-parser {
    height: 100%;
    overflow-y: auto;
    .review-item{
        background-color: #fff;
        margin: 16px;
        padding:10px;
        .name{
            font-weight: 600;;
            font-size: 16px;
        }
        .json{
            background-color: #eee;
            padding:4px;
            max-height: 56px;
            overflow-y: auto;
            margin: 6px 0;
        }
        .path{
            padding:4px;
            max-height: 56px;
            overflow-y: auto;
        }
    }
}
</style>