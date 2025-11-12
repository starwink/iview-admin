<template>
    <div ref="monaco_editor" class="monaco-editor" :style="'height: ' + height + 'px'">
    
    </div>
</template>
<script>

export default {
    props: {
        height: {
            type: Number,
            default: 400,
        },
    },

    data(){
        return {
            editor:null,
            form:{
                code:''
            }
        }
    },
    
    methods:{
        init(code='') {
            Object.assign(this.$data, this.$options.data());
            this.form.code=code;
            this.$nextTick(()=>{
                this.initByEditor()
            })
           
        },
        initByEditor() {
            if(window.monaco==void 0){
                console.log('window.monaco',window.monaco);
                this.$message.info('未正常加载编辑器资源')
            }
            this.editor=window.monaco.editor.create(this.$refs.monaco_editor, {
                language: 'sql',
                value: '', 
                theme: 'vs-dark',// vs, hc-black, or vs-dark
            })

            this.editor.onDidChangeModelContent((...e) => {
                let code=this.editor.getValue()
                this.$emit('change', code);
            })
            
        },
        setCode(code){
            console.log('iii',this.editor,code)
            this.editor.setValue(code)
        }
    }
}
</script>