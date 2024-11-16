<template>
    <div class="say-main" >
        <div class="look-box " :class="getLookClass">
            <div class="text-box">
                <div class="word">
                    <p class="" v-if="dict.word">{{ dict.word }}</p>
                </div>
                <div v-if="!dict.word" class="stop-msg">
                    回车开始
                </div>
            </div>
            <div class="audio-box">
                <audio ref="dictVideo" controls :src="dict.mp3" @play="playdict" @loadedmetadata="loadOver" @ended="onEnded" />
            
            </div>
        </div>
        <div class="buttons">
            <div class="left">
                <Button @click="copyDictList()"> 复制本次列表</Button>
                <Button @click="copyHisList()" class="ml-10">复制历史</Button>
                <Button class="ml-10" @click="openSetDictModal()">配置本次练习内容</Button>
                <!-- <Button class="ml-10">配置项调整</Button>
                <Button class="ml-10">自定义配置项管理</Button> -->
            </div>
            <div class="right">
                <div class="circle-button ml-10" >
                    <addByBatchPoptip @save="">
                        <Icon type="md-add" size="16"   />
                    </addByBatchPoptip>
                </div>
                <Tooltip max-width="200" :content="dictList.toString()">
                    <!-- <Button>本次</Button> -->
                    <Button shape="circle" icon="md-eye" class=" ml-10"></Button>
                </Tooltip>
                <div class="circle-button ml-10" >
                    <Icon custom="bookeditor-font icon-reload1" size="18"  @click="resetDicList()" />
                </div>
                <div class="circle-button ml-10" >
                    <randomdPoptip @save="resetApiDicList">
                        <Icon custom="bookeditor-font icon-API" size="24"    />
                    </randomdPoptip>
                </div>
               
                <!-- <Button shape="circle" custom="bookeditor-font icon-api" icon="bookeditor-font icon-api" @click="resetDicList()"></Button> -->
                <!-- <Button class="ml-10" @click="resetDicList()">重新生成</Button> -->
            </div>
            
            
            <!-- <Button class="ml-10">新增自定义听定内容</Button> -->
        </div>
        
        <div class="input-box">
            <div class="look-input">
                <p>{{ form.userinput }}</p>
            </div>
            <ul class="hisList" :class="config.his.show?'':'hide-box'">
                <li v-for="(item,index) of form.hisList" :key="item+'-'+index">{{ item }}</li>
            </ul>
        </div>
        <!-- <video ref="dictVideo" controls :src="dict.mp3" @play="playdict" @loadedmetadata="loadOver" @ended="onEnded" /> -->
        <!-- <video controls width="250" ref="dictVideo"   >
            <source :src="dict.mp3" type="video/mp3">
            Sorry, your browser doesn't support embedded videos.
        </video> -->
        <!-- <audio ref="dictVideo" autoplay controls>
            <source :src="dict.mp3">
        </audio> -->

        <setDictListModal ref="setDictListModal" @save="setDictList" @close="$_addEvent()" />
    </div>
</template>
<style lang="scss" scoped>

.say-main{
    position: relative;
    color:#131354;
    padding:8px;
    .look-box{
        position: relative;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 300px;
        overflow: hidden;
        padding: 16px;
        border: solid 1px #eee;
        border-radius: 4px;

        .word{
            p{
                display: none;
            }
        }
        .stop-msg{
            text-align: center;
            align-content: center;
            justify-content: center;
            position: absolute;
            width: 100%;
            height: 100%;
            color: #999;
            font-size: 30px;
        }
        &:hover{
            background-color: #ccc;
            .word{
                p{

                    display: block;
                }
            }
        }

    }
    .show-type-hover{
        .word{
            p{
                display: block;
            }
        }
    }
    .buttons{
        margin: 16px 0;
        display: flex;
        justify-content: space-between;
        .right{
            // width:90px;
            display: flex;
            justify-self: flex-start;
        }
        .circle-button{
            border: solid 1px #ccc;
            border-radius: 50%;
            display: block;
            width: 32px;
            height: 32px;
            min-width: 32px;
            text-align: center;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
                background-color: #f1f1f1;
                color:#13939E;
            }
            // font-size: 18px;
        }
    }
    .input-box{
        font-size: 28px;
        width: 100%;
        height: calc(100vh - 300px);
        padding: 0 0;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: space-between;
        .look-input{
            width:calc(100% - 202px);
            height: 100%;
            background-color: #eee;
            p{
                margin:  24px auto;
            }
        }
        .hisList{

            width: 200px;
            height: 100%;
            border: solid 1px #999;
            list-style-type: none;

            li{
                padding:4px 16px;
                border-bottom: solid 1px #eee;
                font-size: 14px;
                color:#a1a1a1;
                &:hover{
                    background-color: #ccc;
                }
            }
        }
    }
    .hide-box{
        display: none;
    }
}
</style>
<script>
import func from './func.js'
import dictDataList from './dict.data.js'
import setDictListModal from './config/setDictListModal.vue'
import randomdPoptip from './config/randomdPoptip.vue'
import addByBatchPoptip from './config/addByBatchPoptip.vue'
export default {
    components:{
        setDictListModal,randomdPoptip,addByBatchPoptip,
    },
    data(){
        return {
            re:null,
            form:{
                text:'imys',
                userinput:'',
                hisList:[],
            },
            config:{
                show:'null',
                // show:'null',
                play:{
                    load:true,
                    click_over:true,
                },
                dic:{
                    random:true,//字典中随机取
                },
                loop:false,//循环,
                his:{
                    show:true,
                    max_len:50,
                }
            },
            dict:{
                word:'',
                len:'',
                mp3:'',
            },
            dictIndex:-1,
            dictList:['click', 'script', 'function', 'add', 'event']
               
        }
    },
   
    methods: {
        $_removeEvent(){
            window.removeEventListener('keydown',this.hotKeyFunction)
            clearInterval(this.re)
        },
        checkRunEve(){
            //非当前路径去掉事件监听
            var that=this;
            return setInterval(function(){
                if(that.$route.path!='/say'){
                    that.$_removeEvent();
                }
            },1000);
        }, 
        $_addEvent(){
            window.addEventListener('keydown', this.hotKeyFunction);
            this.re=this.checkRunEve();
        },
        init(){
            // console.log('$route.path',this.$route.path)
            // console.log(func.shuffleAndSplit(this.dictList,4))
            // console.log(func.shuffleAndSplit(dictDataList,4,true))
            // console.log(func.shuffleAndSplit(dictDataList,4,false))
            let list=[]
            if(this.config.dic.random){
                list=func.shuffleAndSplit(dictDataList,4,true)
                this.dictList=list[0]
            }else{
                list=func.shuffleAndSplit(dictDataList,4,false)
                this.dictList=list[0]
            }
           this.$_addEvent();
        },
        resetDicList(){
            let list=func.shuffleAndSplit(dictDataList,4,true)
            this.dictList=list[0]
        },
        hotKeyFunction(event){
                var that=this;
                // outputDiv.textContent = '按下的键: ' + event.key;  // 显示按下的键
                console.log(event.key,event)
                console.log('event',event.ctrlKey,event.key,event)
                that.main(event.key)
                //event.ctrlKey = control
                //event.metaKey = command
                if (event.ctrlKey && event.key === 's') {
                    event.preventDefault();//拦截穿透事件
                    alert('保存内容');
                }
        },
        main(key){
            if(!this.dictList?.length>0){
                return ;
            }
            
            if(key=='Enter'){
                this.nextWord();
            }else if(key=='Escape'){
            }else if(key=='1'){
                this.config.
                this.playMp3();
            }else if(key=='Shift'){
                this.breadWord();
            }else if(key=='Backspace'){
                this.moveWord()
            }else if(key=='Tab'){
            }else if( ['CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(key)){
                console.log('d key',key)
            }else{
                this.addWord(key)
            }
        },
        nextWord(){
            // console.log('=++',this.dictIndex)
            let index=this.dictIndex+1;
            let word=''
            if(this.dictList.length>index){
                word=this.dictList[index]
                this.dictIndex=index;
            }else{
                word=this.dictList[0]
                this.dictIndex=0
            }
            // console.log('dictI',this.dictIndex,word,index)
            this.dict=this.createDictObj(word)
            this.form.userinput='';
        },
        breadWord(){
            console.log(this.dictIndex)
            let index=this.dictIndex-1;
            let word=''
            if(this.dictList.length>index && index>=0){
                word=this.dictList[index]
                this.dictIndex=index;
            }else{
                this.dictIndex=this.dictList.length-1
                word=this.dictList[this.dictIndex];
            }
            this.form.userinput='';
            this.dict=this.createDictObj(word)
        },
        createDictObj(word,index){
            let uri=`http://127.0.0.1:3331/test/dictfile/mp3/us/${word}.mp3`
            let obj={
                word:word,
                len:word.length,
                mp3:uri,
            }
            return obj;
        },
        addWord(key){
            var that=this;
            this.form.userinput+=key;
            if(this.dict.word==this.form.userinput){
                this.form.hisList.unshift(this.dict.word);
                if(this.config.play.click_over){
                    this.playMp3();
                }
                setTimeout(() => {
                    // this.form.userinput='';
                    that.nextWord()
                }, 1000);
            }
        },
        moveWord(){
            let str=this.form.userinput;
            if(str!=''){
                str=str.substr(0, str.length - 1)
            }
            this.form.userinput=str;
        },
        onEnded(){
            console.log("onednd")
        },
        playMp3(){
            this.$refs.dictVideo.play();
        },
        playdict(){
            console.log('playdict')
        },
        loadOver(){
            if(this.config.play.load){
                this.playMp3();
            }
        },
       
        getLookClass(){
            let list=[]
            if(this.config.show=='hover'){
                list.push('show-type-hover')
            }
            return list.join(' ')
        },
        copyDictList(){
            this.h5Copy(this.dictList.toString())
        },
        copyHisList(){
            this.h5Copy(this.form.hisList.toString())
        },
        h5Copy(content) {
            if(content.length==0){
                return ;
            }
            if (!document.queryCommandSupported("copy")) {
                // 不支持
                return false;
            }

            let textarea = document.createElement("textarea");
            textarea.value = content;
            textarea.readOnly = "readOnly";
            document.body.appendChild(textarea);
            textarea.select(); // 选择对象
            textarea.setSelectionRange(0, content.length); //核心
            let result = document.execCommand("copy"); // 执行浏览器复制命令
            textarea.remove();
            if(result){
                this.$Message.success(`复制成功`)
            }
            return result;
        },
        openSetDictModal(){
            this.$_removeEvent()
            this.$refs.setDictListModal.init();
        },
        setDictList(text=''){
            let list=text.split(',')
            this.dictList=list;
        },
        resetApiDicList(tag='js',len=20){
            let params={
                tag
            }
            this.$api.getSayDictTagList(params).then(res=>{
                let list=res.object.list.map(item=>{
                    return item.word
                });

                this.dictList=func.getRandomdList(list,len,true)
                console.log('this.dictList',this.dictList)
            })
        },
        

    },
    created(){
        this.$nextTick(()=>{
            this.init()
        })
    }
}
</script>


