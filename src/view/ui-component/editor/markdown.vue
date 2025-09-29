<template>
    <div class="markdown">
        <h2>markdown编辑器</h2>
        <div>
            <Button @click="getLineLength()">getLineLength</Button>
            <Button @click="runTest()">runTest</Button>
            <Button @click="insertAt()">insertAt</Button>
            <Button @click="sayKey()">sayKey</Button>
            <Button @click="copyNext()">copyNext</Button>
            <Button @click="reSelection()">选中内容替换</Button>
            <Button @click="htest()">htest</Button>
            
            
        </div>
        <markdownEditor ref="markdownEditor" @change="changeMarkdown" />
    </div>
</template>
<script>
import markdownEditor from '@/components/monaco-editor/markdownEditor';
import mk from '@/components/monaco-editor/monace.class.js';
import {getKeyLabel} from '@/components/monaco-editor/monace.utils.js';

export default {
    components: {
        markdownEditor
    },
    data(){
        return {
            form:{
                markdown:'',
            },
            me:null,
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            this.$refs.markdownEditor.init('')
            
        },
        changeMarkdown(text){
            console.log('markdown',this.form.markdown,text)
        },
        getLineLength(){
            let editor=this.$refs.markdownEditor.editor
            console.log('whenEditorReady',this.editor.whenEditorReady)
            console.log('getLineLength',this.$refs.markdownEditor.editor)
            console.log('get',editor.getModel())
            console.log('get',editor.getModel().getLineLength(2));
        },
        runTest(){
            let editor=this.$refs.markdownEditor.editor;
            console.log(editor,window.monaco)
            if(editor){
                this.me= new mk(editor,window.monaco)
                console.log(this.me);
                // this.me.insert('ifdk')
                // this.me.highlightLine(3,true,40000)
                // this.me.replaceLine(3,'这里是替换的内容')
                // this.me.replaceLines(6,9,'这里是\r\n替换\rn的内容')
                // this.me.deleteLine(3);
                // console.log('get', this.me.getLineContent(3))
                // console.log('get lines', this.me.getLinesContent(3,6))
                // console.log('get getValue', this.me.getValue())
                // this.me.setValue('这里是\r\n替换\r\n的内容')
                // this.me.replaceValue('111','aaa')

                // console.log('get getSelectionInfo', this.me.getSelectionInfo())
                // console.log('get toggleWrap', this.me.toggleWrap())

                let parmas={

                }
                this.me.insertAt()
                
                // this.me.highlightLine(3,false,4000)
            }
        },
        sayKey(){
            console.log(
                getKeyLabel('cmd')
            )
        },
        copyNext(){
            navigator.clipboard.read().then(res => {
                console.log('rrr',res)
            })
        },
        reSelection(){
            console.log('me',this.me)
            this.me.replaceSelctionText('**')

            return ;
            console.log('this.$refs.markdownEditor.editor',this.$refs.markdownEditor.editor);
           let rang= this.$refs.markdownEditor.editor.getSelection()
           let v=this.$refs.markdownEditor.editor.getModel().getValueInRange(rang);
           console.log('v,',v)
           let nextV=`**${v}**`;

            //     const selection = editor.getSelection(); // 获取选中范围
            // const selectedText = editor.getModel().getValueInRange(selection);
            
            if (nextV) {
                // 在选中文本前后追加'**'
                this.$refs.markdownEditor.editor.executeEdits('', [
                    {
                        range: rang,
                        text: nextV,
                        forceMoveMarkers: true
                    }
                ]);
            }
        },
        htest(){
            
        }

    },
    created(){
        this.$nextTick(()=>{
            this.init();
        })
    }
}
</script>
<style lang="scss" >


    //   [data-vxe-ui-theme="dark"] {
    //     --theme-color: #bac8ff;
    //     --theme-bg-color: #495057;
    //   }
    

// [data-vxe-ui-theme="light"] {
//   --vxe-ui-font-primary-color: #409eff; /* 主色 */
//   --vxe-ui-background-color: #ffffff;    /* 背景色 */
// }

// /* 暗黑主题 */
// [data-vxe-ui-theme="dark"] {
//   --vxe-ui-font-primary-color: #1abc9c; /* 主色 */
//   --vxe-ui-background-color: #121212;   /* 背景色 */
// }

.markdown{
    // color:#00b074;
    // color:var(--vxe-ui-font-primary-color);
    color:var(--theme-color);
}
</style>