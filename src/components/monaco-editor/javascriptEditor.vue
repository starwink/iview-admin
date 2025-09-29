<template>
    <div ref="monaco_js_editor" class="monaco-js-editor" :style="'height: ' + height + 'px'">
    
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
    created(){
        this.init();  
    },
    methods:{
        init() {
            Object.assign(this.$data, this.$options.data());
            setTimeout(() => {
                this.initByEditor()
            }, 500);
        },
        initByEditor() {
            if(window.monaco==void 0){
                console.log('window.monaco',window.monaco);
                this.$message.info('未正常加载编辑器资源')
            }
            
            this.editor=window.monaco.editor.create(this.$refs.monaco_js_editor, {
                language: 'javascript',
                value: '', 
                theme: 'vs-dark',// vs, hc-black, or vs-dark
            })

            this.editor.onDidChangeModelContent((...e) => {
                let code=this.editor.getValue()
                this.$emit('change', code);
            })
            
        },
        setCode(code){
            this.editor.setValue(code)
        }
    }
}
</script>