<template>
  <div class="loadAudio">
    <Spin size="large" fix v-if="loading.table"></Spin>
    <Button :disabled="page.pageNum<2" @click="backWord" >back</Button>
    <Button  :disabled="page.pageNum>=page.total" @click="nextWord" class="ml-10">next</Button>
    <Button  @click="getList" class="ml-10">getList</Button>
    <Button type="primary" @click="down" class="ml-10">download</Button>
    <!-- <Button type="primary" @click="play" class="ml-10">play</Button> -->
    <Input v-model="page.pageNum"  />
    <Select>
        
    </Select>

     <p><Tag>{{page.pageNum}}/{{page.total}}</Tag></p>
        <audio ref="dictVideo" controls :src="dict.mp3"  />

    <div class="info-box">
        <!-- {{list.data[0]}} -->
        <div class="word-box">{{form?.word}}</div>
        <div class="">
            <Tag :color="form?.config?.us?.phonetic==form?.config?.uk?.phonetic?'default':'error'">
                {{form?.config?.us?.phonetic}}
            </Tag>
            完成30

        </div>
        <div class="config-box">
            <div>
                <div>:{{form?.config?.description}}</div>
                <div>us</div>    
                <div>uk</div>    
            </div>
            <div class="us-info">
                <div>phonetic</div>
                <div>{{form?.config?.us?.phonetic}}</div>
                <div>{{form?.config?.uk?.phonetic}}</div>
                
            </div>
             <div class="uk-info">
                <div :style="{color:form?.config?.audioUrl?.includes(config.uriKey)?'':'red'}">ba:{{form?.config?.audioUrl}}</div>  
                <div :style="{color:form?.config?.us?.audioUrl?.includes(config.uriKey)?'':'red'}">us:{{form?.config?.us?.audioUrl}}</div>
                <div :style="{color:form?.config?.uk?.audioUrl?.includes(config.uriKey)?'':'red'}">uk:{{form?.config?.uk?.audioUrl}}</div>
            </div>
        </div>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {

      },
      list: {
        data: []
      },
      config:{
        uriKey:'https://static01.type.fun/course/vocabulary-audio'
      },
      dict:{
        mp3:''
      },
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 1,
      },
      loading: {
        table: false
      }
    }
  },
  created(){
    this.$nextTick(()=>{
        this.init();
    })
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
     this.getList()
    },
    getList() {
      this.loading.table = true
      let params = { ...this.form, ...{ pageNum: this.page.pageNum, pageSize: this.page.pageSize } }
      this.$api.getEnglishList(params).then(res => {
        this.loading.table = false;
        // this.list.data = res.object.list;
        let list = [];
        res.object.list.map(res => {
          list.push({
            ...res,
            ...{
                config:this.$helper.getJSONByStr(res.code_str),
                uk_mp3: this.getAudioUri(res, 'uk'),
                us_mp3: this.getAudioUri(res, 'us'),
            }
          })
        })
        this.list.data = list;
        this.form=list[0];
       
        console.log('-ff',this.form)
        this.page.total = res.object.total || 0;
      });
    },
    getAudioUri(row,type){
        let info=this.$helper.getJSONByStr(row.code_str)
        let uri=info?.[type]?.audioUrl || ''
        return uri
    },
    nextWord() {
        this.page.pageNum++;
        this.getList()
    },
    backWord(){
        this.page.pageNum--;
        this.getList()

    },
    down(){
        if(! this.form){ return ;}
        console.log('__uk', this.form.uk_mp3);
        console.log('__uss', this.form.us_mp3);
        this.$api.pullEnglistMp3({uri: this.form.uk_mp3})
        this.$api.pullEnglistMp3({uri: this.form.us_mp3})
        

    }

  },
}
</script>
<style lang="scss" scoped>
.loadAudio {
    .info-box{
        font-size: 16px;
        .word-box{
            padding:4px 12px;
            background-color: #fff;
            margin-bottom: 10px;
        }
    }
    .config-box{
        display: flex;
        justify-content: space-between;
    }
}
</style>