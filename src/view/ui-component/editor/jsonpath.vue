<template>
  <div>
    <div ref="editor" style="height: 500px; border: 1px solid #ccc;"></div>
  </div>
</template>

<script>
// import * as monaco from 'monaco-editor'
import detailJson from './data/detail.json';

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
      editor: null
    }
  },
  mounted() {
    var that=this;
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
    initMonaco() {
      let jsont=JSON.stringify(detailJson);
      console.log('window.monaco.editor',window.monaco.editor)
      this.editor = window.monaco.editor.create(this.$refs.editor, {
        // value: this.value,
        value: jsont,
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
//          formatOnPaste: true, // 粘贴时是否自动格式化
//   formatOnType: true, // 输入时是否自动格式化
      })
// console.log('cc',this.editor,this.editor.setModelLanguage)
    //   this.editor.setLanguages(['zh-cn']);

      // 监听点击事件
      this.editor.onMouseDown((e) => {
        if (e.target.type === window.monaco.editor.MouseTargetType.CONTENT_TEXT) {
          const lineNumber = e.target.position.lineNumber
          this.handleLineClick(lineNumber)
        }
      })
      this.runEditorFormat()
    },
    handleLineClick(lineNumber) {
      // 获取点击行的文本内容
      const model = this.editor.getModel()
      const lineContent = model.getLineContent(lineNumber)

      console.log('Clicked line:', lineNumber, 'Content:', lineContent)

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
    runEditorFormat(){
        // this.editor.setValue(newValue);
        this.editor.trigger(this.editor.getValue(), 'editor.action.formatDocument')
    }
  }
}
</script>
