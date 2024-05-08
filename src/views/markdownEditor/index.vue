<template>
    <div class="markdownEditor">
        <p>markdownEditor</p>
        <Button @click="run">run</Button>
        <Button @click="resetTheme">resetTheme</Button>
        <div class="out-box">
            <div v-html="outHtml"></div>
        </div>
    </div>
</template>
<style lang="less">
.markdownEditor {
    background-color: #e1e1e1;
    overflow-y: auto;
    height: 100vh;

    .out-box {
        background-color: #fff;
        padding: 16px;

    }
}
</style>
<script>
import WxRenderer from './markEditorClass/index'
import outStypeConfig from './markEditorClass/config'
import { marked } from 'marked'
// import markMD from './markEditorClass/ex.mark.json.mjs'
import { setColor, formatDoc, formatCss,css2json,setFontSize,customCssWithTemplate } from './markEditorClass/util'
import userStyleJson from './style.json'

export default {
    data() {
        return {
            wxRenderer: null,
            config: {},
            outHtml: '',
        }
    },
    methods: {
        init() {

            // ...outStypeConfig
            this.config = { 
                currentColor:outStypeConfig.colorOption[0].value,//rgba(15, 76, 129, 1)
                currentFont:outStypeConfig.builtinFonts[0].value,//-apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif`
                currentSize:outStypeConfig.sizeOption[2].value, //14px
             };
             this.config.currentColor='#13939E'

            // console.log(markMD,'markMD')
            this.initMarkdownFormat();
        },
        initMarkdownFormat() {
            console.log(this.config,'confifff')

          

            this.wxRenderer = new WxRenderer({
                theme: setColor(this.config.currentColor),
                fonts: this.config.currentFont,
                size: this.config.currentSize,
            })

           

            const renderer = this.wxRenderer.getRenderer(this.config.citeStatus)
            marked.setOptions({ renderer });//加入markdown样式

            
        },
        resetTheme(){
            let json=userStyleJson
            let theme = setFontSize(this.config.currentSize.replace(`px`, ``))
            theme = customCssWithTemplate(json, this.config.currentColor, theme)
            this.wxRenderer.setOptions({theme:theme})
            const renderer = this.wxRenderer.getRenderer(this.config.citeStatus)
            marked.setOptions({ renderer });
        },
        setTheme(themeJson){
            console.log('themeJson',themeJson)
            this.wxRenderer.setOptions(themeJson)
        },
        run() {
        


            this.$api.markdownDemo().then(res => {
                console.log('marked:',marked)
                let outHtml = marked.parse(res.object)
                console.log('outHtml', outHtml)
                //追加code mac样式
                outHtml += `
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
                this.outHtml = outHtml
            })


        },
        //代码风格样式
        codeThemeChanged() {
            //   let cssUrl = this.codeTheme
            let cssUrl = ``
            cssUrl = outStypeConfig.codeThemeOption[2].value
            //cssUrl = 'https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/npm/highlight.js@11.5.1/styles/atom-one-dark.min.css'
            // cssUrl = 'https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/npm/highlight.js@11.5.1/styles/github.min.css'
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
    },
    created() {
        this.$nextTick(() => {
            this.init();
            this.codeThemeChanged();
        })
    }
}
</script>