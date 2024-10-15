<template>
    <div class="markdown-comp" ref="comp" >
        <div class="markdown-menu" ref="menu" v-show="showMenu">
            <div class="menu-item"><Icon type="ios-fastforward-outline" @click="setEdValue()" title="编辑器赋值"  /></div>
            <div class="menu-item"><Icon type="md-ionic" @click="runView()" title="直接显示视图"  /></div>
            <div class="menu-item"><Icon type="md-cloud-done" @click="getValue()" title="保存"  /></div>
            <div class="menu-item"><Icon type="ios-create" @click="setCompW(24)" :class="page.editorSpan==24?'menu-active':''" /></div>
            <div class="menu-item"><Icon type="ios-eye" @click="setCompW(0)" :class="page.editorSpan==0?'menu-active':''" /></div>
            <div class="menu-item"><Icon type="ios-expand"  :class="page.editorSpan==12?'menu-active':''" @click="setCompW(12)" /></div>
            <!-- {{ page }} -->
        </div>
        <div class="markdown-main" :style="{height:mainHeight}">
            <Row>
                <Col :span="page.editorSpan" v-show="page.editorSpan>0" >
                    <markdownEditor ref="markdownEditor" @change="outHtml"  :height="mainHeight" />
                </Col>
                
                <Col :span="page.reviewSpan" v-show="page.reviewSpan>0" >
                    <markReview ref="markReview" />
                    <!-- <div class="out-box">
                        <div v-html="html"></div>
                    </div> -->
                </Col>
            </Row>
        </div>
        
    </div>
</template>
<script>
import markdownEditor from '@/components/markdownEditor'
import markReview from '@/components/markdownEditor/markReview.vue'
export default {
    components: {
        markdownEditor,
        markReview,
    },
    props:{
        
        height:{
            type:Number,
            default:null
        },
        overflowHeight:{
            type:Number,
            default:0
        }

    },
    watch: {},
    data(){
        return {
            // html:'',
            mainHeight: '300px',
            page:{
                editorSpan:12,
                reviewSpan:12,
            },
            showMenu:true,
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resize);
    },
    methods:{
        $_resize() {
            let menuH=40;
            if(!this.showMenu){
                menuH=0;;
                this.mainHeight='100%'
                return ;
            }
            if(this.height>100){
                this.mainHeight =( this.height - menuH )+'px';
            }else if(this.height>0){
                this.mainHeight=(window.innerHeight * (this.height/100) - menuH - this.overflowHeight) +'px'
            }
            // this.mainHeight =this.$refs.comp.clientHeight - this.$refs.menu.clientHeight ;
            console.log('mainHeight',this.mainHeight)
        },
        init(){
            // this.mainHeight =this.height - this.$refs.menu.clientHeight ;
            this.$_resize()
            console.log(123,this.mainHeight);
            // console.log(this.$refs.markdownEditor)
            // this.$refs.markdownEditor.init();
        },
        runmack(){
            // console.log(this.$refs)
            this.$refs.markdownEditor.run('afdsds`123`没范德萨嗝 \r\n# 123 \r\n ');
        },
        outHtml(html){
            console.log('run outHtml',html)
            // this.html=html
            this.$refs.markReview.init(html)

            if(this.$refs?.markdownEditor){
                let mdText=this.$refs?.markdownEditor?.getValue() || '';
                console.log('mdText',mdText)
                this.$emit('input',mdText)
                this.$emit('change',mdText)
            }
          
        },
        setCompW(w){
            this.page.editorSpan=w;
            this.page.reviewSpan=24-w;
            console.log('page',this.page)
        },
        setValue(text){
            console.log('setv',text)
            // console.log('setttv',this.$refs?.markdownEditor.setValue)
            // if(this.$refs.mainHeight){
            this.$nextTick(()=>{
                this.$refs?.markdownEditor?.setValue(text);
            })
            // }
        },
        getValue(){
            console.log('this.$refs.markdownEditor.getValue()',this.$refs.markdownEditor.getValue())
            return this.$refs.markdownEditor.getValue()
        },
        runView(text){
            this.readModle()
            this.setValue(text)
        },
        readModle(){
            this.showMenu=false;
            this.setCompW(0)
        }
    },
    created(){
        this.$nextTick(()=>{
            this.init()
        })
    }
}
</script>
<style lang="scss" scoped>
.markdown-comp{
    position: relative;
    height: 100%;
    
    .markdown-menu{
        display: flex;
        justify-content: end;
        align-items: center;    
        font-size: 24px;
        padding: 2px 24px;
        background-color: #13939e;
        // position: absolute;
        // width: 100%;
        // z-index: 9;
        .menu-item{
            padding-right: 16px;
            color:#fff;
            cursor: pointer;
        }
        .menu-active{
            color:#666;
            cursor:no-drop
        }
    }
    .markdown-main{
        overflow: auto;
        // position: relative;
        // height: calc(100% - 40px );

    }
}

</style>