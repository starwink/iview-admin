<template>
  <div>
    <Button @click="addWidget">添加widget</Button>
    <Button @click="removeWidgeet">删除Widgeet</Button>
    <br />
    <Button @click="addSettedIcon(6)">新增行号图标(6)</Button>
    <Button @click="addSettedIcon(9)">新增行号图标(9)</Button>
    <Button @click="addSettedIcon(12)">新增行号图标(12)</Button>
    <Button @click="addSettedIcon(11)">新增行号图标(11)</Button>
    <Button @click="addSettedIcon(4)">新增行号图标(4)</Button>
    <Button @click="addSettedIcon(1)">新增行号图标(1)</Button>
    <br />
    <Button @click="delSettedIcon()">单个删除(input)</Button>
    <Button @click="clearSettedIcon()">批量删除(input)</Button>
    <!-- <p>{{form.setIconList}}</p> -->
    <!-- <Input v-model="form.ids" /> -->
    <div ref="editor" style="height: 500px; border: 1px solid #ccc;"></div>
  </div>
</template>∏
<style lang="scss">
.myGlyphMarginClass {
  background: red;
  border-radius: 12px;
  padding-left: 4px;
}
</style>
<script>
// import * as monaco from 'monaco-editor'
import detailJson from './data/detail.json';
import jsonpath from 'jsonpath';
// import jsonplus from 'jsonpath-plus';
import { JSONPath } from 'jsonpath-plus';

export default {
  name: 'MonacoJsonEditor',
  props: {
    value: {
      type: String,
      default: '{}'
    }
  },
  data() {
    return {
      editor: null,
      form:{
        ids:'',
        setIconList:[],
      }
    }
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      that.initMonaco()
    }, 1000);
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose()
    }
  },
  methods: {
    runjspath() {
      // console.log('jsonpath',jsonpath)

      var cities = detailJson;
      var cdata = {
        "CM-1-9.aa": "value1",
        "otherKey": "value2"
      }

      console.log(jsonpath.query(cities, `$..extentFixedField`))
      console.log(jsonpath.paths(cities, `$..extentFixedField`))
      console.log(jsonpath.paths(cities, `$..diseaseId`))
      // console.log(jsonpath.paths(cities,`$..UM-1-3-1`))

      //     jsonplus({
      //   path: '$..*[?(@.key === "CM-1-9.aa")]', // 可能需要调整语法
      //   json: cdata
      // })
      console.info('%c特殊示例测试 jsonpath-plus', 'color: white; background-color: #f06292;padding:4px 8px 4px 8px', `⬇︎⬇︎⬇︎`);
      console.log('包含所有子集中查找..', JSON.stringify(JSONPath({ path: '$..extentFixedField', json: cities })))
      console.log('键名中有-', JSON.stringify(JSONPath({ path: '$..[UM-1-3-1]', json: cities })))
      console.log('键名中有.', JSON.stringify(JSONPath({ path: '$..[inner.no]', json: cities })))


    },
    initMonaco() {
      this.runjspath();


      let jsont = JSON.stringify(detailJson);
      console.log('window.monaco.editor', window.monaco.editor)
      this.editor = window.monaco.editor.create(this.$refs.editor, {
        // value: this.value,
        value: jsont,
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
        glyphMargin: true, //lineNubmer左侧区域的,自定义样式显示
        minimap: {
          enabled: false // 是否启用预览图
        }, // 预览图设置
        //          formatOnPaste: true, // 粘贴时是否自动格式化
        //   formatOnType: true, // 输入时是否自动格式化
      })
      // console.log('cc',this.editor,this.editor.setModelLanguage)
      //   this.editor.setLanguages(['zh-cn']);

      // 监听点击事件
      this.editor.onMouseDown((e) => {
        console.log('mounsedown', e);
        /* if (e.target.type === window.monaco.editor.MouseTargetType.CONTENT_TEXT) {
          const lineNumber = e.target.position.lineNumber
          this.handleLineClick(lineNumber)
        } */
      })
      setTimeout(() => {
        this.runEditorFormat()
      }, 200);
    },
    handleLineClick(lineNumber) {
      // 获取点击行的文本内容
      const model = this.editor.getModel()
      const lineContent = model.getLineContent(lineNumber)

      console.log('Clicked line:', lineNumber, 'Content:', lineContent)

return ;
      // 解析 JSON 并查找字段
      try {
        const jsonData = JSON.parse(model.getValue())
        const fieldInfo = this.findFieldByLineContent(jsonData, lineContent)
        if (fieldInfo) {
          const jsonPath = this.getJsonPath(jsonData, fieldInfo.path)
          console.log('Field Info:', fieldInfo, 'JSONPath:', jsonPath)
          alert(`JSONPath: ${jsonPath}`)
        } else {
          console.warn('No matching field found for line content:', lineContent)
        }
      } catch (err) {
        console.error('Invalid JSON:', err)
      }
    },
    findFieldByLineContent(jsonData, lineContent) {
      /**
       * 递归遍历 JSON，查找与 lineContent 匹配的字段（键或值）
       * 返回 { key, value, path } 结构
       */
      const result = []

      const traverse = (obj, currentPath = []) => {
        if (typeof obj !== 'object' || obj === null) return

        Object.entries(obj).forEach(([key, value]) => {
          const newPath = [...currentPath, key]

          // 检查 key 是否匹配
          if (String(key).includes(lineContent)) {
            result.push({ key, value, path: newPath })
          }

          // 检查 value 是否匹配（如果是字符串）
          if (typeof value === 'string' && value.includes(lineContent)) {
            result.push({ key, value, path: newPath })
          }

          // 如果是对象或数组，继续递归
          if (typeof value === 'object' && value !== null) {
            traverse(value, newPath)
          }
        })
      }

      traverse(jsonData)
      return result.length > 0 ? result[0] : null // 返回第一个匹配项
    },
    getJsonPath(obj, pathArray) {
      /**
       * 根据路径数组生成 JSONPath 字符串
       * 例如: ['a', 'b', 'c'] => '$.a.b.c'
       */
      return '$.' + pathArray.join('.')
    },
    runEditorFormat() {
      // this.editor.setValue(newValue);
      this.editor.trigger(this.editor.getValue(), 'editor.action.formatDocument')
    },
    addWidget() {
      var overlayWidget = {
        domNode: (function () {
          var domNode = document.createElement("div");
          domNode.innerHTML = "My overlay widget";
          domNode.style.background = "grey";
          // domNode.style.right = "30px";
          // domNode.style.top = "50px";
          return domNode;
        })(),
        getId: function () {
          return "my.overlay.widget";
        },
        getDomNode: function () {
          return this.domNode;
        },

        getPosition: function () {
          // return null;
          return {
            position: {
              lineNumber: 4,
              column: 8,
            },
            preference: [
              //[定位首选项](https://wf0.github.io/api/editor/ContentWidgetPositionPreference.html#contentwidgetpositionpreference)
              monaco.editor.ContentWidgetPositionPreference.ABOVE,//上面
              monaco.editor.ContentWidgetPositionPreference.BELOW,//下面
            ],
          };
        },

        // getPosition: () => ({
        //     preference: editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
        // }),
      };

      this.editor.addOverlayWidget(overlayWidget);
    },
    removeWidgeet() {
      console.log('removeOverlayWidget', this.editor.removeOverlayWidget)
      this.editor.removeOverlayWidget({
        getId: function () {
          return "my.overlay.widget";
        },

      });
    },
    addSettedIcon(startLineNumber = 1, endLineNumber) {
      if (!endLineNumber) {
        endLineNumber = startLineNumber;
      }
      var decorations = this.editor.createDecorationsCollection([
        {
          range: new monaco.Range(startLineNumber, 1, endLineNumber, 1),
          options: {
            isWholeLine: true,
            //className: "myContentClass",
            glyphMarginClassName: "myGlyphMarginClass",
          },
        },
        {
          range: new monaco.Range(startLineNumber+5, 1, endLineNumber+5, 1),
          options: {
            // isWholeLine: true,
            //className: "myContentClass",
            glyphMarginClassName: "myGlyphMarginClass",
          },
        },
      ]);
      this.form.setIconList.push(decorations);

      /* console.log('decorations',decorations,decorations.has )
      setTimeout(() => {
          console.log('decorations',decorations.clear())
      }, 3000);
       */
    },
    delSettedIcon(){
        let setIcon =this.form.setIconList[0];
        if(!setIcon){
            return ;
        }
        console.log('setIcon--->',setIcon)
        try{
             let t=setIcon?.clear();
            // console.log('run t',t);
            this.form.setIconList.splice(0,1);
            
            // 不可行this.editor.removeDecorations()
        }catch(err){
            console.error(err);
            console.log(this.form.setIconList)
        }
       
    },
    clearSettedIcon(){
        let setIcon =this.form.setIconList[0];
        if(!setIcon){
            return ;
        }
        console.log('this.editor.removeDecorations',this.editor)
        console.log('dispose',setIcon)
        setIcon.clear()
    }
  }
}
</script>
