<template>
    <div class="markdown-comp" ref="comp" >
        <div class="markdown-main" :style="{height:mainHeight}">
            <Row>
                <Col :span="page.editorSpan" v-show="page.editorSpan>0" >
                    <markdownEditor ref="markdownEditor" @change="outHtml"  @save="save" :height="mainHeight" />
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
            let menuH=8;
           
            if(this.height>100){
                this.mainHeight =( this.height - menuH )+'px';
            }else if(this.height>0){
                this.mainHeight=(window.innerHeight * (this.height/100) - menuH - this.overflowHeight) +'px'
            }
        },
        init(){
            this.$_resize()
        },
        runmack(){
            // this.$refs.markdownEditor.run('afdsds`123`没范德萨嗝 \r\n# 123 \r\n ');
        },
        outHtml(html){
            this.$refs?.markReview?.init(html)
            if(this.$refs?.markdownEditor){
                let mdText=this.$refs?.markdownEditor?.getValue() || '';
                this.$emit('input',mdText)
                this.$emit('change',mdText)
            }
        },
        setCompW(w){
            this.page.editorSpan=w;
            this.page.reviewSpan=24-w;
        },
        setValue(text){
            this.$refs?.markdownEditor?.setValue(text);
            this.$nextTick(()=>{
                let muluList=this.$refs?.markdownEditor?.getCatalogue();
                this.$emit('setMuLu',muluList)
            })
        },
        getValue(){
            // console.log('this.$refs.markdownEditor.getValue()',this.$refs.markdownEditor.getValue())
            return this.$refs?.markdownEditor?.getValue()
        },
        save(){
            let text=this.getValue();
            this.$emit('save',text)
        },
        runView(text){
            this.readModle()
            this.setValue(text)
        },
        readModle(){
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
            .ivu-icon{
                font-size: 22px;
            }
        }
        .menu-active{
            color:#666;
            cursor:no-drop
        }
    }
    .markdown-main{
        overflow: auto;
        padding: 16px 8px;
        // position: relative;
        // height: calc(100% - 40px );

    }
}

</style>