<template>
  <div ref="monaco_editor" class="monaco-editor" :style="'height: ' + height + 'px'">
    <div class="e-tools" v-show="tools">
      <!-- <Tooltip class="item" effect="dark" content="展开" placement="top-start">
        <i @click.stop="formatJson" class="icon editor-iconfont icon-zhankai3"></i>
      </Tooltip> -->
      <Tooltip class="item" effect="dark" content="压缩" placement="top-start">
        <i @click.stop="compressJson" class="icon editor-iconfont icon-compress"></i>
      </Tooltip>

     <!--  <Tooltip class="item" effect="dark" content="修复" placement="top-start">
        <i @click.stop="fixJson" class="icon editor-iconfont icon-xijiexiufu"></i>
      </Tooltip> -->
    </div>
  </div>
</template>
<script>
import { jsonrepair } from 'jsonrepair'
import jsonPathFunc from './jsonEditor/jsonpath.fun'
import { registerJson5Language } from "monaco-json5-highlighter";
// import { JSONPath } from 'jsonpath-plus'

export default {
  props: {
    height: {
      type: Number,
      default: 260,
    },
    // value: { //v-model存在加载问题,还只能在首次页面加载并没有隐藏才能正常渲染
    //   type: [String, Object, Array],
    //   default() { return {} },
    // },
    tools: { //是否显示操作按钮
      type: Boolean,
      default: true,
    },
    
  },

  data() {
    return {
      editor: null,
      form: {
        code: ''
      },
      awitLoad: {
        maximum_number_of_times: 5,
        interval_time: 500,
        num: 0,
      },
      option: {
        jsonpathAll: [], //editor中json的所有jsonpath
        recommendJsonPath: [],
      }
    }
  },
  created() {
    this.reset();
  },
  mounted() {
  },

  methods: {
    $_resize() {
      this.editor?.layout();
    },
    waitLoadMonaco() {
      if (this.awitLoad.num <= this.awitLoad.maximum_number_of_times) {
        this.awitLoad.num++;
        console.log('run wait loading num:', this.awitLoad.num)
        setTimeout(() => {
          this.initByEditor();
        }, this.awitLoad.interval_time);
      } else {
        this.$message.info('未正常加载编辑器资源,请重新刷新页面或确认chrome浏览器版本高于104');
      }

    },
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
    init(initCode = null) {
      let code = '{}';
      if (initCode) {
        if (typeof initCode == 'object') {
          code = JSON.stringify(initCode)
        } else {
          code = initCode;
        }
      } else if (typeof this.value == 'string') {
        code = this.value
      } else if (typeof this.value == 'object') {
        code = JSON.stringify(this.value);
      }
      this.form.code = code || '';
      this.initByEditor()
    },
    initByEditor() {
      if (window.monaco == void 0) {
        this.waitLoadMonaco();
      }
      if (this.editor != null) {
        // 防止重复生成编辑器
        return;
      }
      if (window.monaco == void 0) {
        return;
      }
      registerJson5Language(window.monaco);

      
      this.editor = window.monaco.editor.create(this.$refs.monaco_editor, {
        language: 'json5',
        value: this.form.code,
        theme: 'vs-dark',// vs, hc-black, or vs-dark
      })

      this.editor.onDidChangeModelContent((...e) => {
        let code = this.editor.getValue()
      
        this.$emit('change', code);
        this.$emit('input', code);
      })

        this.editor.onDidPaste((text) => {
            let code = this.editor.getValue()
            this.$emit('change', code);
            this.$emit('input', code);
            console.log('Pasted text:', text);
        });

     
      // 粘动实现jsonpath想法: editor.getModel().getOutlineModel()
    },
    setCode(code, runFormat = false) {
      let val = '';
      if (typeof code == 'object') {
        val = JSON.stringify(code);
      } else {
        val = code;
      }
      if (this.editor == void 0) {
        this.init(val)
      } else {
        this.editor.setValue(val)
      }
      if (runFormat) {
        setTimeout(() => {
          this.formatJson()
          this.$_resize()
        }, 200);
      }
    },
    fixJson() {
      try {
        let jsonStr = this.editor.getValue()
        this.editor.setValue(jsonrepair(jsonStr))
      } catch (err) {
        console.log('fixjson:',err)
        // repair was not successful, return original text
      }
    },
    formatJson() {//格式化展开
    //   this.editor.trigger('func', 'editor.action.formatDocument')
    //    this.editor.trigger('', 'editor.expandAll');
    //    let str = this.editor.getValue()
      //todo json5等未标准json无法压缩
    //   this.editor.setValue(JSON.stringify(str))
      
    },
    compressJson() { //压缩
    //   let str = this.editor.getValue()
    //   //todo json5等未标准json无法压缩
    //   this.editor.setValue(JSON.stringify(JSON.parse(str)))

       this.editor.trigger('', 'editor.foldAll');
    },
   
   
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resize)
  },
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "editor-iconfont";
  src: url("./jsonEditor/editor-iconfont.woff2?t=1755591573849") format("woff2"),
    url("./jsonEditor/editor-iconfont.woff?t=1755591573849") format("woff"),
    url("./jsonEditor/editor-iconfont.ttf?t=1755591573849") format("truetype");
}
.icon {
  //   width: 1em;
  //   height: 1em;
  //   vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
  margin-left: 10px;
}
.editor-iconfont {
  font-family: "editor-iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-gongnengxiufu:before {
  content: "\e60c";
}

.icon-zhankai3:before {
  content: "\e618";
}

.icon-compress:before {
  content: "\e75e";
}

.icon-xijiexiufu:before {
  content: "\e604";
}

.e-tools {
  position: absolute;
  width: 100%;
  background: #333;
  z-index: 8;
  bottom: 0;
  height: 32px;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 16px;
  text-align: right;
  justify-content: flex-end;
  font-size: 18px;
  i {
    margin-left: 10px;
  }
}
.monaco-editor {
  background-color: #1e1e1e;
}
</style>
