<template>
  <div>
    <h3>编辑器调试demo</h3>
    <Button @click="addWidget">添加widget</Button>
    <Button @click="removeWidgeet">删除Widgeet</Button>
    <Button @click="runtest">runtest</Button>
    <Button @click="formatCode">格式化</Button>
    <Button @click="runEditorFormat">runEditorFormat</Button>
    <Button @click="compressCode">压缩</Button>
    <Button @click="unfoleCode">展开内容</Button>
    <Button @click="foleCode">折叠内容</Button>
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
    <Button @click="getJsonPath()">getJsonPath</Button>
    <div>
      <span>JSONPATH</span>
      <!-- @on-enter="getJsonVal" -->
      <Input v-model="form.jsonpath" @on-change="getJsonVal" style="width:100%;">
      <span slot="prepend">$.</span>
      </Input>
      <span>结果:</span><span style="display:inline-block;overflow: auto;height:56px;background-color: #fff;padding:4px 12px;">{{page.jsonval}}</span>
    </div>
    <!-- <p>{{form.setIconList}}</p> -->
    <!-- <Input v-model="form.ids" /> -->

    <div class="editor-operate-box">

      <div ref="editor" class="editor-box"></div>
      <div class="right-review-path">
        <ul>
          <li>pag</li>
          <li>ifdisk12321</li>
        </ul>
        <p style="overflow-y: auto;height: 180px;">{{option.jsonpathAll}}</p>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
.myGlyphMarginClass {
  background: red;
  border-radius: 12px;
  padding-left: 4px;
}
.editor-operate-box {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  height: 360px;
  .editor-box {
    flex: 1;
    // height: 300px;
  }
  .right-review-path {
    width: 200px;
    background-color: #999;
  }
}
</style>
<script>
// import * as monaco from 'monaco-editor'
import detailJson from './data/detail.json';
import jsonpathTestList from './data/jsonpath.test.json';
// import jsonpath from 'jsonpath';
// import jsonplus from 'jsonpath-plus';
import { JSONPath } from 'jsonpath-plus';
import jsonTree from './jsonTree.vue';

export default {
  name: 'MonacoJsonEditor',
  components: {
    jsonTree
  },
  props: {
    value: {
      type: String,
      default: '{}'
    },
    recommendPathConfig: { //点击json内容时获取推荐jsonPaht
        type:Boolean,
        default:true,
    },
  },
  data() {
    return {
      editor: null,
      form: {
        ids: '',
        setIconList: [],
        json: {},
    
      
        jsonpath: ''
      },
      page: {
        jsonval: '',
      },
      option: {
        jsonpath: [],
        jsonpathAll: [], //editor中json的所有jsonpath
          recommendJsonPath: [],
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
    getJsonPath(json = {}) {
      if (typeof json == 'string') {
        json = JSON.parse(json);
      }
      console.log('gjp', json)
      // return []
      return this.$helper.getJsonPaths(json)
    },
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
    getJsonVal() {
      console.log('___VVVV___change', this.form.jsonpath);

      let jsonpath = `$.${this.form.jsonpath}`;
      //  this.page.jsonval= jsonpath.query(this.form.json, `$..extentFixedField`)
      try {

        console.log('jsonpath:', jsonpath, this.form.json)
        // let res= jsonpath.query(this.form.json, jsonpath)
        let res = JSONPath({ path: jsonpath, json: this.form.json, eval: 'native' })
        console.log('query', res);
        this.page.jsonval = res
      } catch (err) {
        this.page.jsonval = '';
        console.log(err)
      }
    },
    initMonaco() {
      this.form.json = detailJson;

      let jsont = JSON.stringify(detailJson);
      if (this.recommendPathConfig) {
        console.log('initmo',this.recommendPathConfig)
        this.option.jsonpathAll = this.getJsonPath(detailJson)
      }
      //   console.log('window.monaco.editor', window.monaco.editor)
      //   console.log('--winss', this.$helper.getJsonPaths(detailJson))

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
        if (e.target.type === window.monaco.editor.MouseTargetType.CONTENT_TEXT) {
          //   const lineNumber = e.target.position.lineNumber
          const lineNumber = e?.target?.position?.lineNumber;
          this.handleLineClick(lineNumber)
        }
      })

      this.editor.onDidChangeModelContent((...e) => {
        let code = this.editor.getValue();
        this.form.json = JSON.parse(code);
        console.log('chage',this.recommendPathConfig)
        if (this.recommendPathConfig) {
          this.option.jsonpathAll = this.getJsonPath(code);
        }
        // this.$emit('change', code);
        // this.$emit('input', code);
      })
      setTimeout(() => {
        this.runEditorFormat()
      }, 200);
    },
    runEditorFormat() {
      // this.editor.setValue(newValue);
      this.editor.trigger(this.editor.getValue(), 'editor.action.formatDocument')
    },
    extractKey: function (str) {
      // 匹配：双引号包围的字段名，后面紧跟冒号（前面可能有空格）
      const match = str.match(/"([^"]+)"\s*:/);
      if (match && match[1]) {
        return match[1]; // 返回双引号中的内容，也就是字段名
      }
      return null; // 如果没匹配到，返回 null
    },
    countDots(str) {
      return str.split('.').length - 1;
    },
    handleLineClick(lineNumber) {
      // 获取点击行的文本内容
      const model = this.editor.getModel()
      const lineContent = model.getLineContent(lineNumber)

      console.log('Clicked line:', lineNumber, 'Content:', lineContent)


      //   return;
      // 解析 JSON 并查找字段
      if (this.recommendPathConfig) {
        try {
          let pathKey = this.extractKey(lineContent);
          console.log(pathKey);
          if (pathKey) {
            let keyY = lineContent.indexOf(pathKey);//通过前边距来大概判断是几层的
            let num = parseInt(keyY / 4);
            let topList = [], bottomList = [], max = 20;
            this.option.jsonpathAll.map(res => {
              if (res.indexOf(pathKey) > -1) {
                if (topList.length + bottomList.length > 20) {
                  return;
                }
                if (this.countDots(res) == num) {
                  topList.push(res)
                } else {
                  bottomList.push(res)
                }
                console.log('1', res)
              }
            })
            // console.log('t',topList)
            // console.log('b',bottomList)
            this.option.recommendJsonPath = [...topList, ...bottomList];
            console.log('pushRecommendPath:', this.option.recommendJsonPath)
            this.$emit('pushRecommendPath', this.form.recommendJsonPat)

            // console.log(lineContent.indexOf(pathKey));
          }

        } catch (err) {
          console.error('Invalid JSON:', err)
        }
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
          range: new monaco.Range(startLineNumber + 5, 1, endLineNumber + 5, 1),
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
    delSettedIcon() {
      let setIcon = this.form.setIconList[0];
      if (!setIcon) {
        return;
      }
      console.log('setIcon--->', setIcon)
      try {
        let t = setIcon?.clear();
        // console.log('run t',t);
        this.form.setIconList.splice(0, 1);

        // 不可行this.editor.removeDecorations()
      } catch (err) {
        console.error(err);
        console.log(this.form.setIconList)
      }

    },
    clearSettedIcon() {
      let setIcon = this.form.setIconList[0];
      if (!setIcon) {
        return;
      }
      console.log('this.editor.removeDecorations', this.editor)
      console.log('dispose', setIcon)
      setIcon.clear()
    },
    formatCode() {
      this.editor.trigger('mybutton', 'editor.action.formatDocument')
    },
    compressCode() {
      try {
        let json = JSON.stringify(JSON.parse(this.editor.getValue()), null, 0)
        this.editor.setValue(json)
      } catch (err) {
        console.log(err)
      }

    },
    foleCode() {
      this.editor.getAction('editor.foldAll').run()
    },
    unfoleCode() {
      this.editor.getAction('editor.unfoldAll').run()
    },
    runtest() {

    },





  }
}
</script>
