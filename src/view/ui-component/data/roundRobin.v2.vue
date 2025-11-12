<template>
  <div class="roundRobin">
    <h3>{{$store.state.settings.title}}</h3>
    <p>list:{{option.list}}</p>
    
    
  </div>
</template>
<script>

import roundRobinClass from './dataComp/roundRobin.class'
export default {
  data() {
    return {
      form: {

      },
      option: {
        list: []
      },
      dtime: {
        num: 0,
        max: 0,
        main: null
      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
     
      this.option.list = [
        'a1', 'b2', 'c3', 'd4', 'e9'
      ]
      this.$api.getEnglishList({ pageNum: 2, pageSize: 30}).then(res=>{
        if(res.code==1){
            this.option.list=res.object.list;
            this.runmain();
        }
      })
    },
    runmain(){
        let rrc=new roundRobinClass(this.option.list.length);

        rrc.runmain((i)=>{
            if(this.option.list.length-1==i){
                console.log('END:')
            }
            let item=this.option.list[i];
            this.formatAudio(item);
           
            rrc.setNum(rrc.getRandomNum(1,3))
        })
    },
   
    formatAudio(item){
            let json= this.$helper.getJSONByStr(item.code_str);
            let obj={
                uk:json['uk'] ,
                us:json['us'] 
            }
            if(obj?.us?.audioUrl){
                obj.us.audioUrl=obj.us.audioUrl.replace('https://static01.type.fun/','/english/')
            }
            if(obj?.uk?.audioUrl){
                obj.uk.audioUrl=obj.uk.audioUrl.replace('https://static01.type.fun/','/english/')
            }
            item.audio_json=this.$helper.getStrByJson(obj);
            console.log('update:',item.word,item);
            this.$api.saveEnglish(item);
               
    }

  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
<style lang="scss" scoped>
.roundRobin {
  
}
</style>