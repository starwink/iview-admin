<template>
    <div @contextmenu.prevent="openMenu($event)" ref="codeMirrorWrapper" class="markdown-editor codeMirror-wrapper" :style="{height:height}">
        <!-- @contextmenu.prevent.native="openMenu" -->
        <textarea :id="pageId"  type="textarea" placeholder="..."></textarea>
    </div>
</template>
<style lang="less" scoped>
@import url(./hMD.less);
 .codeMirror-wrapper{
    /deep/ .CodeMirror{
        // height: calc(~ "100% - 40px") ;
        height: 100%;
        background-color: #f3f5f6;
    }
}

.markdown-editor {
    height: 100%;
    // width: 100%;
    .CodeMirror-scroll{
        height: 100%;
    }
}


</style>
<script>
import { setColor, formatDoc, formatCss } from './scripts/util'
import WxRenderer from './scripts/wx-renderer'
import CodeMirror from 'codemirror/lib/codemirror'
import config from './scripts/config'
import { marked } from 'marked'
const defaultKeyMap = CodeMirror.keyMap[`default`]
const modPrefix = defaultKeyMap === CodeMirror.keyMap[`macDefault`] ? `Cmd` : `Ctrl`
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/xq-light.css'

/* 每个页面公共css */
// import './assets/less/theme.less'
// import './assets/less/style-mirror.less'

import 'codemirror/mode/css/css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/css-hint'

export default {
    props:{
        height:{
            type:String,
            default:null
        }
    },
    data() {
        return {
            pageId: `123`,
            wxRenderer: null,
            form: {
                source: ``,
            },
            editor: null,
            config: {
                currentFont: ``,
                currentColor: ``,
                currentSize: ``,
                //codeTheme: `https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/npm/highlight.js@11.5.1/styles/atom-one-dark.min.css`,
                // citeStatus: false,
                citeStatus: true,
                nightMode: false,
                isMacCodeBlock: true,
                isEditOnLeft: true,
            },
        }
    },
    methods: {
        init() {
            this.initEditorEntity()
            this.initPageConfig()

            this.editor.on(`change`, (cm, e) => {
                if (this.changeTimer) clearTimeout(this.changeTimer)
                this.changeTimer = setTimeout(() => {
                    this.onEditorRefresh()
                    // saveEditorContent(this.editor, `__editor_content`)
                }, 300)
            })
        },

        toSave(){
            console.log('toSave')
            this.$emit('save')
        },
        createInit() {
            this.config.currentFont = config.builtinFonts[0].value
            this.config.currentColor = config.colorOption[2].value
            this.config.currentSize = config.sizeOption[2].value
            this.config.codeTheme = config.codeThemeOption[2].value
            this.$nextTick(() => {
                this.init()
            })
        },
        initPageConfig() {
            // this.currentFont=config.builtinFonts[0].value;
            // this.currentColor=config.colorOption[0].value;
            // this.currentSize=config.sizeOption[0].value;
            // this.codeTheme=config.codeThemeOption[2].value
            this.wxRenderer = new WxRenderer({
                theme: setColor(this.config.currentColor),
                fonts: this.config.currentFont,
                size: this.config.currentSize,
            })
        },
        initEditorEntity() {
            const editorDom = document.getElementById(this.pageId)

            if (!editorDom?.value) {
                // editorDom.value = localStorage.getItem(`__editor_content`) || formatDoc(DEFAULT_CONTENT)
            }
            const that=this;
            this.editor = CodeMirror.fromTextArea(editorDom, {
                mode: `text/x-markdown`,
                theme: `xq-light`,
                lineNumbers: false,
                lineWrapping: true,
                styleActiveLine: true,
                autoCloseBrackets: true,
                extraKeys: {
                    [`${modPrefix}-\``]: function autoFormat(editor) {
                        const selected = editor.getSelection()
                        editor.replaceSelection(`\r\n\`\`\`${selected}\r\n \r\n\`\`\`\r\n`)
                    },
                    [`${modPrefix}-shift-1`]: function autoFormat(editor) {
                        const doc = formatDoc(editor.getValue(0))
                        this.$emit('save')
                        // editor.replaceSelection(`\r\n\`\`\`${selected}\r\n \r\n\`\`\`\r\n`)
                    },
                    [`${modPrefix}-S`]: function autoFormat(editor) {
                        const doc = formatDoc(editor.getValue(0))
                        // localStorage.setItem(`__editor_content`, doc)
                        // editor.setValue(doc)
                        that.toSave();
                    },
                   /*  [`${modPrefix}-B`]: function bold(editor) {
                        const selected = editor.getSelection()
                        console.log('',selected)
                        editor.replaceSelection(`**${selected}**`)
                    }, */
                    [`${modPrefix}-D`]: function del(editor) {
                        const selected = editor.getSelection()
                        editor.replaceSelection(`~~${selected}~~`)
                    },
                    [`${modPrefix}-I`]: function italic(editor) {
                        const selected = editor.getSelection()
                        editor.replaceSelection(`*${selected}*`)
                    },
                    [`${modPrefix}-K`]: function italic(editor) {
                        const selected = editor.getSelection()
                        editor.replaceSelection(`\`${selected}\``)
                    },
                    [`${modPrefix}-L`]: function code(editor) {
                        const selected = editor.getSelection()
                        editor.replaceSelection(`[${selected}]()`)
                    },
                },
            })
            //调用用
            // let doc = localStorage.getItem(`__editor_content`)
            // this.form.source = doc
            // doc = 'a \r\n1232 \r\n1321 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2 \r\n2b'
            // console.log('csd', doc)
            // let doc=this.defaultValue;
            // console.log('mark',doc)
            // this.editor.setValue(doc)
            /* this.$nextTick(() => {
               this.editorRefresh()
            }) */
            //************ */
        },

        setValue(doc){
            // this.form.source = doc
            this.editor.setValue(doc)
            this.$nextTick(() => {
                this.editorRefresh()
            })
        },
        getValue(){
            // return this.form.source;
            return this.editor.getValue(0);
        },

        // 更新编辑器
        onEditorRefresh() {
            this.codeThemeChanged(this.config.codeTheme)
            this.editorRefresh()
            //   setTimeout(() => window.PR.prettyPrint(), 0)
        },
        codeThemeChanged() {
            let cssUrl = this.config.codeTheme
            let el = document.getElementById(`hljs`)
            if (el != undefined) {
                el.setAttribute(`href`, cssUrl)
            } else {
                const link = document.createElement(`link`)
                link.setAttribute(`type`, `text/css`)
                link.setAttribute(`rel`, `stylesheet`)
                link.setAttribute(`href`, cssUrl)
                link.setAttribute(`id`, `hljs`)
                document.head.appendChild(link)
            }
        },
        // 右键菜单
        openMenu(e) {
            console.log(`e`, e)
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left
            const offsetWidth = this.$el.offsetWidth
            const maxLeft = offsetWidth - menuMinWidth
            const left = e.clientX - offsetLeft
            let mouseLeft = Math.min(maxLeft, left)
            let mouseTop = e.clientY + 10
            console.log(`mouseLeft`, mouseLeft, mouseTop)
            //todo openRigthClickMenu({x:mouseLeft,y:mouseTop})
        },
        getCatalogue(){
            let ml=this.wxRenderer.getCatalogue();//创建目录
            console.log('pageml',ml);
            return ml;
            //todo  1.纸页目录模式,2.悬浮目录模式
        },
        editorRefresh() {
            const renderer = this.wxRenderer.getRenderer(this.config.citeStatus)
            marked.setOptions({ renderer })
            let output = marked.parse(this.editor.getValue(0))
            // 去除第一行的 margin-top
            output = output.replace(/(style=".*?)"/, `$1;margin-top: 0"`)
        
            

            if (true) {
                // 引用脚注
                output += this.wxRenderer.buildFootnotes()
                // 附加的一些 style
                output += this.wxRenderer.buildAddition()
            }

            if (this.isMacCodeBlock) {
                output += `
            <style>
              .hljs.code__pre::before {
                position: initial;
                padding: initial;
                content: '';
                display: block;
                height: 25px;
                background-color: transparent;
                background-image: url("https://doocs.oss-cn-shenzhen.aliyuncs.com/img/123.svg");
                background-position: 14px 10px!important;
                background-repeat: no-repeat;
                background-size: 40px!important;
              }
  
              .hljs.code__pre {
                padding: 0!important;
              }
  
              .hljs.code__pre code {
                display: -webkit-box;
                padding: 0.5em 1em 1em;
                overflow-x: auto;
                text-indent: 0;
              }
            </style>
          `
            }
            // this.output = output
            // return output
            this.$emit(`change`, output)
        },
    },
    created() {
       this.createInit()
    },
}
</script>
