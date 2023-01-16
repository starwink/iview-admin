<template>
    <div class="editor-echart">
        <Split v-model="split.lr">
            <div slot="left" class="demo-split-pane no-padding">
                <editor v-model="form.json" @init="editorInit" lang="jsoniq" theme="vibrant_ink"  :height="editor.height"></editor>
            </div>
            <div slot="right" class="demo-split-pane">
                <div class="header">
                    <div class="left">
                        <Input v-model="config.height" style="width:120px" placeholder="高度" />
                        <Input v-model="config.width" style="width:120px" placeholder="宽度" />
                    </div>
                    <div class="right">
                        <Button @click="run">run</Button>
                    </div>
                    
                </div>
                <p class="hide-text code-text">
                    {{ form.json }}
                </p>
                <p class="hide-text run-code">
                    {{ formatRunCode(form.json) }}
                </p>
                <div class="review-chart" >
                    <echartView ref="echartView" :options="echart.options" :style="{width:config.width,height:config.height}" />
                </div>
                
            </div>
        </Split>
    </div>
</template>
<script>
import echartView from '@/view/editor/components/echartView';
export default {
    components: {
        editor: require('vue2-ace-editor'),
        echartView
    },
    data() {
        return {
            split: {
                lr: 0.5,
                ltb: 0.5
            },
            form: {
                json: '',
                params:{}
            },
            config:{
                width:'100%',
                height:'300px'
            },
            echart:{
                options:{}
            },
            editor: {
                height: '300'
            },
            cacheName:'editorEchartJosn'
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.editor.height = document.documentElement.clientHeight - 20;
            var editorEchartJosn=sessionStorage.getItem(this.cacheName)
            if(editorEchartJosn){
                this.form.json=editorEchartJosn || ''
                
            }
            this.getData()
            this.$nextTick(()=>{
                this.run();
            })
        },
        getData(){
            var that=this;
            var url='/json/1.json'
            var xhr = new XMLHttpRequest()
                xhr.open('GET', url, true)
                //设置响应类型为 blob
                xhr.send()
                // xhr.responseType = 'json'
                // xhr.responseType = 'application/json'
                //关键部分
                xhr.onload = function(...e) {
                //如果请求执行成功
                if (this.status == 200) {
                    var str=this.response
                    if(that.$helper.isJSON(str)){
                        that.form.params=JSON.parse(str);
                    }else{
                        that.form.params=str;
                    }
                }
            }
        },
        formatRunCode(str) {
            /*   var re=/\/\*(.|\n)*\*\//g;  // '//'没去掉
              var re=/(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g; // '//'没去掉 */
            var re = /((\/\*[\s\S]*?\*\/)|(\/\/.*$))/mg;
            return str.replace(re, "")
        },


        editorInit: function (editor) {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/jsoniq')
            require('brace/mode/javascript')
            // require('brace/mode/javascript')    //language
            require('brace/theme/vibrant_ink')
            require('brace/snippets/javascript') //snippet
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            })
        },
        run(){
            try{
                let code=this.formatRunCode(this.form.json);
                // let obj=eval(`(var fun=function(){${code};return num};fun())()`);
                var mychar=this.$refs.echartView.chart;
                var params=this.form.params;
                // let obj=eval(`(() => {var option;${code};return option})()`);
                let obj;
                (function () {
                    // var mychar=mychar2;
                    // var params=params2;
                    // console.log('mycha222r',mychar)
                    (function inner() {
                      obj=eval(`(() => {var option;${code};return option})()`);
                    }());
                }());

                if(obj){
                    this.echart.options=obj
                    // this.echart.options={...obj.baseOption,...obj.options[0]}
                    sessionStorage.setItem(this.cacheName,this.form.json)
                }
                console.log(obj,'over');
            }catch(err){
                console.log(err);
             }
        }
    }
}
</script>
<style lang="scss" scoped>
.editor-echart {
    height: 100vh;
    border: 1px solid #dcdee2;
}


.demo-split-pane {
    padding: 10px;
}

.demo-split-pane.no-padding {
    height: 200px;
    padding: 0;
}

.hide-text{
    display:none;
}
.header{
    display: flex;
    justify-content: space-between;;
    position: sticky;
    top: 0px;
    z-index: 1;
    background: #fff;
    padding: 10px;
}
.review-chart{
    overflow: auto;
    height: calc(100vh - 36px);
    position: relative;
}
</style>