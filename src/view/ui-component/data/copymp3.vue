<template>
  <div class="copymp3">
    <Input v-model="form.json" :rows="4" />
    <!-- <jsonEditor ref="json" /> -->
    <div class="json-box">
      <div class="api-detail-box">
        <json5Editor ref="json5Editor" v-model="form.json" :height="420" @change="changeJson5" />
      </div>
      <div>-></div>
      <div class="review-json-box">
        <jsonEditor ref="jsonEditor" v-model="params" :height="420" />
      </div>
    </div>

    <!-- v-model="form.json"  -->
    <Button @click="run">测试</Button>
    <Button @click="save" :disabled="loading.num!=0">数据保存</Button>
    <div>
      <p>{{page.dictTextList}}</p>
      <p>---</p>
      <p>obj:{{Object.keys(page.dictTextObj)}}</p>
      <p class="data-info-box"> 
        <span class="item">num:{{page.dictTextList.length}}</span>
        <span class="item">obj:{{Object.keys(page.dictTextObj).length}}</span>
        <span class="item">loading:{{loading.i}}/{{loading.num}}</span>
      </p>

      <!-- <span>{{page.dictTextObj}}</span> -->
    </div>
  </div>
</template>
<script>
import json5Editor from '@/components/monaco-editor/json5Editor.vue'
import jsonEditor from '@/components/monaco-editor/jsonEditor.vue'
import JSON5 from 'json5';

export default {
  components: {
    json5Editor,
    jsonEditor
  },
  data() {
    return {
      form: {
        json: ''
      },
      params: {},
      page: {
        json: {},
        dictTextList: [],
        dictTextObj: {}
      },
      loading:{
        i:0,
        num:0,
        rtime:null
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();
    })
  },
  methods: {


    // // 使用示例
    // const testInput = `{name:'John',age:30,traits:["smart",'funny'],}`;
    // console.log(formatJson5LikeSimple(testInput));

    init() {
      Object.assign(this.$data, this.$options.data());
      this.$api.getApijsonDetail({ id: 505 }).then(res => {
        if (res.code == 1) {
          this.form = res.object;
          let json = res.object.json5;
          this.form.json = json;
          this.$refs.json5Editor.setCode(json);
          this.changeJson5();
        }
      })
      //   this.$refs.json5Editor.setCode('');
    },
    run() {
      console.log('run ', this.params);
      console.log('this.form.json', typeof this.form.json)

      let data = this.$helper.getJSONByStr(this.params);
      console.log('-->', typeof this.params, data)

      let json = this.$helper.getJSONByStr(this.form.json);
      let remark = {
        courseId: json.courseId,
        name: json.name,
        language: json.language,
        courseOrder: json.courseOrder,
      }
      Object.keys(data).map(word => {

        let params = {
          word: word,
          code_str: this.$helper.getStrByJson(data[word]),
          remark: this.$helper.getStrByJson(remark),
        }
        console.log(params);
        // this.$api.saveEngsave()
      })
      // this.params?.map(res=>{
      //     console.log('res',res)
      // })
    },
    save() {
      let serve = []
      let data = this.$helper.getJSONByStr(this.params);
      let json = this.$helper.getJSONByStr(this.form.json);
      let remark = {
        courseId: json.courseId,
        name: json.name,
        language: json.language,
        courseOrder: json.courseOrder,
      }
      Object.keys(data).map(word => {

        let params = {
          word: word,
          code_str: this.$helper.getStrByJson(data[word]),
          remark: this.$helper.getStrByJson(remark),
        }
        console.log(params);

        // serve.push(this.$api.saveEnglish(params))
        serve.push(params)
      })

    //   new Promise.all(serve).then(r => {
    //     console.log('rrr', r)
    //   }, err => {
    //     console.log(err)
    //   })

        this.loading.num=serve.length;
        this.loading.i=0;
        let reslist=[]
        clearInterval(this.rtime);
        // setTimeout(() => {
        this.rtime= setInterval(() => {
            if(this.loading.i<this.loading.num){
                // serve[i].then(res=>{
                    this.$api.saveEnglish(serve[this.loading.i]).then(res=>{
                        if(res.code==1){
                            reslist.push(res.object)
                        }
                    })
                // })
                 this.loading.i++;
            }else{
                this.loading.i=0;
                this.loading.num=0;
                clearInterval(this.rtime);
                console.log('reslist',reslist)
            }
           

        }, 1000);


    },
    changeJson5() {
      // this.page.json=
      try {
        let json = this.$helper.parseJSON5(this.form.json);

        let list = [], obj = {}
        json?.courseText?.map(res => {
          list.push(res.text)
          obj[res.text] = res.config
        })
        this.page.dictTextList = list;
        this.page.dictTextObj = obj;
        this.$refs.jsonEditor.setCode(JSON.stringify(obj), true);
      } catch (err) {
        this.page.dictTextList = [];
        this.page.dictTextObj = {};
      }

    }
  },
}
</script>
<style lang="scss" scoped>
.copymp3 {
  .json-box {
    display: flex;
    justify-content: space-between;
    .api-detail-box {
      flex: 1;
    }
    .review-json-box {
      flex: 1;
    }
  }
  .data-info-box{
    display: flex;
    justify-content: flex-start;
    .item{
        padding:2px 12px;
        background-color: #fff;
        margin-right: 10px;
    }
  }
}
</style>