<template>
    <div class="markdown-preview">
        <section ref="output" v-html="output"></section>
    </div>
</template>
<script>
// this.$refs.previewPage.init(html)

import config from './scripts/config'

export default {
    data() {
        return {
            output: ``,
        }
    },
    methods: {
        init(html = ``) {
            this.output = html
            this.$nextTick(() => {
                this.codeCreateOptionsIcon();
                // document.getElementById(`output`).innerHTML = this.output
            })
        },
        codeThemeChanged() {
            //   let cssUrl = this.codeTheme
            let cssUrl = ``
            // cssUrl = config.codeThemeOption[2].value
            //cssUrl = 'https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/npm/highlight.js@11.5.1/styles/atom-one-dark.min.css'
            cssUrl = 'https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/npm/highlight.js@11.5.1/styles/github.min.css'
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
        //追加在代码预览块上的额外的功能按钮
        codeCreateOptionsIcon(){
            // console.log( $('.code__pre'))
            $('.code__pre').each((i,element) => {
                console.log(i,element)
                if($(element).hasClass('code-menu-icon')){

                }else{
                    // element.append('<div>New content333</div>');
                    // element.after('<div>New content222</div>');
                    let html=$(element).html();
                    console.log($(element))
                    html+='<div class="code-option-item"><i  class="select-code">a</i><i class="unfold-code">v</i><i  class="copy-code">c</i></div>'
                    $(element).html(html)
                }
            });
        },
    },
    created() {
        this.codeThemeChanged()
        this.init()
    },
}
</script>

<style lang="less" scoped>
// @import url('../assets/less/app.less');

.markdown-preview {
    position: relative;
    user-select: text;
    height: 100%;
    overflow: auto;

    // ::v-deep .hljs {
    //     color: #dbd2df;
    //     background: #282c34;
    // }
    ::v-deep .code__pre{
        position: relative;
        .code-option-item{
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            i{
                padding:0 4px;
                &:hover{
                    color:#fc1;
                }
            }
            
        }
    }
    ::v-deep .hljs{
        code{
            display: block;
            height: 120px;
            overflow: auto;
        }
    }
    ::v-deep .hljs-h100{
        code{
            display: block;
            overflow: auto;
            height: 100%;
        }
    }
}
</style>

