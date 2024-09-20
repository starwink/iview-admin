<template>
    <div class="jsonEditor">
        <p>修复不规范的JSON</p>
        <div ref="editor" class="editorBox"></div>
        <button @click="run()">run</button>
        <Row :gutter="16">
            <Col span="12"><Input v-model="form.text" /></Col>
            <Col span="12"><Input v-model="form.json" /></Col>
        </Row>
        <mEditor ref="mEditor" v-model="content" />
        <h4>{{ content }}</h4>
        <p>--------------===--------------</p>
        <mEditor ref="mEditor" v-model="content2" />
        <h5>{{ content2 }}</h5>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor';
import pageData from './data'
import mEditor from './mEditor.vue'
export default {
    components:{
        mEditor
    },
    data() {
        return {
            monacoEditor:null,
            form: {
                text: '',
                json: null,
            },
            content:'12321321f城的测试',
            content2:'12321321f城的测试'
        }
    },
    methods: {
        init() {
            console.log('12321')
            this.$nextTick(()=>{
                this.form.text=JSON.stringify(pageData.json);
                this.initMonaco();
                console.log('inii',pageData)

            })
        },
        initMonaco() {
            this.monacoEditor = monaco.editor.create(this.$refs.editor, {
                theme: "vs-dark", // 主题
                // theme: "vibrant-ink", // 主题
                value: this.value, // 默认显示的值
                language: this.language,
                folding: true, // 是否折叠
                foldingHighlight: true, // 折叠等高线
                foldingStrategy: "auto", // 折叠方式
                showFoldingControls: "always", // 是否一直显示折叠
                disableLayerHinting: true, // 等宽优化
                emptySelectionClipboard: false, // 空选择剪切板
                selectionClipboard: false, // 选择剪切板
                automaticLayout: true, // 自动布局
                codeLens: true, // 代码镜头
                scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
                colorDecorators: true, // 颜色装饰器
                accessibilitySupport: "on", // 辅助功能支持"auto" | "off" | "on"
                lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
                lineNumbersMinChars: 4, // 行号最小字符   number
                enableSplitViewResizing: false,
                readOnly: false, //是否只读  取值 true | false
                fontSize: 12
            });
            this.monacoEditor.onDidChangeModelContent(() => {
                console.log('this.monacoEditor.getValue()',this.monacoEditor.getValue())
                this.$emit('change', this.monacoEditor.getValue());
            });
            this.monacoEditor.setValue(this.form.text)
        },
        run(){
            // this.form.text
            console.log('--,',typeof this.form.text ,this.form.text)
           // let json = this.repairAndParseJSON(this.form.text)
            console.log('ssfd',this.form.text,JSON.parse(this.form.text))
          
        },

        repairAndParseJSON(jsonString) {
            console.log('jss',jsonString,typeof jsonString)
            // JSON.parse()
            try {
                // 尝试直接解析JSON
                return JSON.parse(jsonString);
            } catch (e) {
                // 如果解析失败，尝试修复后解析
                let fixedString = jsonString
                    .replace(/'/g, '"')           // 将单引号替换为双引号
                    .replace(/([^"])\s*,\s*([^"])/g, '$1,$2') // 修复可能的逗号问题
                    .replace(/(?<!\\)'(?!')/g, '\\"');      // 转义单引号
                try {
                    return JSON.parse(fixedString);
                } catch (e) {
                    // 如果无法修复，则抛出错误或者返回错误信息
                    throw new Error('Unable to repair or parse the JSON string');
                }
            }
        }
    },
    created() {
        this.init()
    }
}
</script>
<style lang="scss" scoped>

.editorBox{
    background-color: #eee;
    width:100%;
    height: 320px;
}
</style>