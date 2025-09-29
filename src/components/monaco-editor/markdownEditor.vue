<template>
  <div ref="monaco_editor" @paste="handlePaste" class="monaco-editor" :style="'height: ' + height + 'px'">
    <!-- <div class="e-tools" v-show="tools">
      <el-tooltip class="item" effect="dark" content="展开" placement="top-start">
        <i @click.stop="formatJson" class="icon editor-iconfont icon-zhankai3"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="压缩" placement="top-start">
        <i @click.stop="compressJson" class="icon editor-iconfont icon-compress"></i>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="修复" placement="top-start">
        <i @click.stop="fixJson" class="icon editor-iconfont icon-xijiexiufu"></i>
      </el-tooltip>
    </div> -->

  </div>
</template>
<script>
import { jsonrepair } from 'jsonrepair'
import monaceEditorFunc from './monace.class'
// import jsonPathFunc from './jsonEditor/jsonpath.fun'
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
      me: null,
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
  //   beforeDestroy() {
  //     // 移除事件监听，避免内存泄漏
  //     this.$refs.test.removeEventListener('paste', this.handlePaste);
  //   },

  methods: {
    $_resize() {
      this.editor?.layout();
    },
    handlePaste(e) {
      console.log('eee', e)
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
    init(initCode = '') {
      console.log('--12321,init')
      this.form.code = initCode;
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
      this.setMarkDownTheme();
      var that = this;
      //   setTimeout(() => {
      that.htest();
      //   }, 1000);

      console.log('initByEditor,---')


    },
    htest() {
      console.log('htest')
      this.editor = window.monaco.editor.create(this.$refs.monaco_editor, {
        language: 'markdown',
        // language: 'javascript',
        value: this.form.code,
        // theme: 'vs-dark',// vs, hc-black, or vs-dark
        theme: 'markdown-theme',
        // theme: 'vs-dark',
        suggestOnTriggerCharacters:false,

        automaticLayout: true, // 自动调整尺寸
        minimap: { enabled: false }, // 禁用小地图提升性能
        wordWrap: 'on', // 自动换行
        fontSize: 14,
        lineNumbers: 'off' // Markdown 通常不需要行号
      })

      this.me = new monaceEditorFunc(this.editor, window.monaco);

      console.log(window.monaco.editor, 'this.editor s')
      console.log(window.monaco.editor, this.me);
      // window.monaco.editor.setTheme('markdown-theme');

      this.editor.onDidChangeModelContent((...e) => {
        let code = this.editor.getValue()

        this.$emit('change', code);
        this.$emit('input', code);
      })
      // 监听点击事件
      this.editor.onMouseDown((e) => {
        // console.log('mounsedown', e);
        const lineNumber = e?.target?.position?.lineNumber
        // console.log(e,lineNumber)
        this.clickLine(lineNumber)
        /*  if (e.target.type === window.monaco.editor.MouseTargetType.CONTENT_TEXT) {//缩小点击区域小,只有在内容以及前端区域点击才能获取到,
            const lineNumber = e.target.position.lineNumber
            console.log(e,lineNumber)
            this.clickLine(lineNumber)
        } */
      })


      let monaco = window.monaco;


      this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        console.log('save fifle', monaco.KeyMod.CtrlCmd, monaco.KeyMod.KeyA)
      })

      // this.editor.addCommand(k('command') | k('d'), () => {
      this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
        let info = this.me.getSelectionInfo();
        let text = this.me.getLineContent(info.line);

        let params = {
          endLineNumber: info.line + 1,
          endLineNumber: info.column + 1,
        }
        this.me.insertAt(text + '\r\n', params);
      })
      this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {
        let info = this.me.getSelectionInfo();
        this.me.deleteLine(info.line);
      })


      this.editor.addAction({
        contextMenuGroupId: 'markdown',
        contextMenuOrder: 1,
        id: 'bold',
        label: '加粗',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
        run: (editor) => {
          console.log('**', editor, this.me)
          this.me.replaceSelctionText('**')
        }
      });
      this.editor.addAction({
        contextMenuGroupId: 'markdown',
        contextMenuOrder: 2,
        id: 'italic',
        label: '斜体',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI],
        run: (editor) => {
          this.me.replaceSelctionText('*')
        }
      });
      this.editor.addAction({
        contextMenuGroupId: 'markdown',
        contextMenuOrder: 3,
        id: 'link',
        label: '超链接',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL],
        run: (editor) => {
          this.me.replaceSelctionText('[', ']()')
        }
      });
      this.editor.addAction({
        contextMenuGroupId: 'markdown',
        contextMenuOrder: 4,
        id: 'wordkey',
        label: '关键词',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
        run: (editor) => {
          this.me.replaceSelctionText('`', '`')
        }
      });

      console.log('this.editor.addAction', this.editor.addAction)
      this.editor.addAction({
        // contextMenuGroupId:'others', //第三个
        // contextMenuGroupId:'clipboard',
        // contextMenuGroupId:'modification',
        contextMenuGroupId: 'save',
        contextMenuOrder: 1,
        id: 'pageSave',
        label: '保存文件',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: (editor) => {
          this.$emit('save')
          console.log('保存~')
        }
      });

      // 移除默认绑定（可选）
      //editor.removeCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB);



      let list = this.editor.getSupportedActions()
      console.log('this.editor.getSupportedActions()', typeof list, list)
      list.map(res => {
        if (res.label.indexOf('剪') > -1) {

          console.log(res)
        }
      })
      // this.editor.updateOptions({ contextmenu: false });


      // console.log('getmodel',this.monaco.getOptions())
      let model = this.editor.getModel();
      console.log('modeeel', model, model.getOptions())
      console.log('suggestionData', model.suggestionData)
      console.log('suggestionData', this.editor.suggestionData)
      console.log('window.monaco', window.monaco.suggestionData)


      // this.me.addRightMenu();

      // 粘动实现jsonpath想法: editor.getModel().getOutlineModel()





      this.editor.onDidPaste((event) => {
        console.log('粘贴内容:', event); // 获取粘贴的文本
        // 可在此处添加自定义处理逻辑
        navigator.clipboard.read().then(res => {
          console.log('rrr', res)
        })
      });


    },
    setMarkDownTheme() {
      window.monaco.editor.defineTheme('markdown-theme', {
        base: 'vs-dark', // 基础主题（vs/vs-dark/hc-black/hc-light）
        inherit: true,
        rules: [
          { token: 'heading', foreground: '#FF5733', fontStyle: 'bold' }, // 标题
          { token: 'list', foreground: '#4CAF50' }, // 列表
          { token: 'code-block', foreground: '#f783ac' }, // 代码块
          { token: 'link', foreground: '#339af0' }, // 链接
        ],
        colors: { 'editor.background': '#1E1E1E' }
      });

      //   window.monaco.languages.setMonarchTokensProvider('markdown', {
      //     tokenizer: {
      //       root: [
      //         [/^#+\s.*/, 'heading'], // 标题
      //         [/^\*\s.*/, 'list'],    // 无序列表
      //         [/`{3}.*/, 'code-block'], // 代码块
      //         [/\[.*?\]\(.*?\)/, 'link'] // 链接
      //       ]
      //     }
      //   });

        //智能补全
      window.monaco.languages.registerCompletionItemProvider('markdown', {
        
        provideCompletionItems: (model, position) => {

           let lineText= model.getLineContent(position.lineNumber);
           let line=position.lineNumber+2;

          console.log('1.model', model)
          console.log('2.position', position)
          console.log('lineText',lineText)
          console.log('monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet',monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet)

        //   let additText={
        //     // forceMoveMarkers:false,
        //     range:new (window.monaco.Range)(line, 1, line, length + 1),
        //     text:'再追加的m内家'
        //   }
          return {
            suggestions: [
              {
                label: 'h function',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  'function(${0}) {',
                  '\t${3:// code}',
                  '\treturn ${4:value};',
                  '}'
                ].join('\n'),
                detail: 'h detail',
                documentation: '快速生成函数模板',
                sortText: '0_htest',
                // additionalTextEdits:additText //未验证成功
                

              },
              {
                label: 'T function2',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'function ${3}:${0};(${2:params}) {',
                detail: 'T detail',
                documentation: '快速生成函数模板',
                sortText: '99_Ttest',
                

              },
              {
                label: 'I function3',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'function ${3}:${0};(${2:params}) {',
                detail: '快速生成函数模板',
                // documentation: '快速生成<b>函数</b>模板\/\r\/\nfds',
                documentation: [
                  'function ${0: }${1:name}(${2:params}) {',
                  '\t${3:// code}',
                  '\treturn ${4:value};',
                  '}'
                ].join('\n'),
                sortText: '2_Ttest'

              },
               {
                label: {
                    label:'morelable',
                    detail:'desc',
                    description:'hhfsifids'
                },
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'function ${3}:${0};(${2:params}) {',
                detail: '快速生成函数模板',
                documentation: '快速生成<b>函数</b>模板\/\r\/\nfds',
                documentation: [
                  'function ${0: }${1:name}(${2:params}) {',
                  '\t${3:// code}',
                  '\treturn ${4:value};',
                  '}'
                ].join('\n'),
                sortText: '2_Ttest'

              },
              {
                label: 'function',
                kind: monaco.languages.CompletionItemKind.Snippet,

                insertText: 'function ${1}:${0};(${2:params}) {',
                // insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                insertTextRules: {
                    insertTextRules:4, //这个能让代码走为判断为片段
                },
                preselect: true,
                documentation: '快速生成函数模板',
              },
              {
                label: '!插入图片',
                kind: monaco.languages.CompletionItemKind.Function,
                // insertText: '![${1:alt}](${2:url})',
                insertText: '!console.log(${1:"message"})',
                //  insertText: '![${1:"alt"}](url)',
                documentation: '插入图片'
              },
              //    {
              //      label: 'htest',
              //      kind: monaco.languages.CompletionItemKind.Function,
              //      // insertText: '![${1:alt}](${2:url})',
              //      insertText: 'htest(${1:"message"})',
              //     //  insertText: '![${1:"alt"}](url)',
              //      documentation: 'htest'
              //    },
              {
                label: '[a](uri)',
                kind: monaco.languages.CompletionItemKind.Snippet,
                // insertText: '[${1:alt}](${2:url})',
                insertText: '[${1:alt}]()',
                documentation: '插入超链接'
              },
              {
                label: '## Heading',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '## ${1:标题}'
              },
            //   {
            //     label: 'console.log',
            //     kind: monaco.languages.CompletionItemKind.Function,
            //     insertText: 'console.log(${1:message})',
            //     documentation: '输出日志到控制台'
            //   }

            ]
          };
        },
        triggerCharacters: ['[', '!', '#'] // 触发字符
      });

       window.monaco.languages.registerCompletionItemProvider('markdown', {
        
        provideCompletionItems: (model, position) => {

           let lineText= model.getLineContent(position.lineNumber);
           let line=position.lineNumber+2;

          console.log('3.model', model)
        //   console.log('2.position', position)
          console.log('lineText',lineText)

      
          return {
            suggestions: [
            
             
              {
                label: {
                    label:'console.log',
                },
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'console.log(${1:message})',
                documentation: '输出日志到控制台',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
               /*  range:{
                    startLineNumber:position.lineNumber,
                    endLineNumber:position.lineNumber,
                    startColumn:17,
                    endColumn:26
                } */
             /*    range: new (window.monaco.Range)(
                        position.lineNumber,
                        17,
                        position.lineNumber,
                        26
                    ),
 */
                /* range:{
                    insert:new (window.monaco.Range)(
                        position.lineNumber,
                        0,
                        position.lineNumber,
                        20
                    ),
                    replace:new (window.monaco.Range)(
                        position.lineNumber,
                        0,
                        position.lineNumber,
                        4
                    )
                } */
              }

            ]
          };
        },
        triggerCharacters: ['.',' '] // 触发字符
      });

      // window.monaco.editor.setTheme('markdown-theme');

      console.log('getLanguageConfiguration', window.monaco.languages)
      console.log('getLanguageConfiguration surroundingPairs', window.monaco.languages.getLanguages())

      //   const { conf, language } = await 

      //这种方式surroundingPairs,autoClosingPairs 不生效,但onEnterRules生效
      window.monaco.languages.setLanguageConfiguration('markdown', {
        // 缩进规则
        // indentationRules: {
        //     increaseIndentPattern: /^.*\{[^}]*$/, // 遇到 { 时增加缩进
        //     decreaseIndentPattern: /^\s*\}/       // 遇到 } 时减少缩进
        // },
        /* surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '<', close: '>' },
          { open: '`', close: '`' },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
          { open: '*', close: '*' },
          { open: '_', close: '_' },
          { open: '=', close: '=' },
          { open: '~', close: '~' },
          { open: '^', close: '^' },
          { open: '#', close: '#' },
          { open: '$', close: '$' },
          { open: '《', close: '》' },
          { open: '〈', close: '〉' },
          { open: '【', close: '】' },
          { open: '「', close: '」' },
          { open: '（', close: '）' },
          { open: '“', close: '”' },
        ], */
        // 自动补全括号
        /*  autoClosingPairs: [
           { open: '{', close: '}' },
           { open: '[', close: ']' },
           { open: '(', close: ')' },
           { open: '《', close: '》' },
           { open: '〈', close: '〉' },
           { open: '【', close: '】' },
           { open: '「', close: '」' },
           { open: '（', close: '）' },
           { open: '+', close: '_' },
         ], */
        //回车后校验内容 追加内容
        onEnterRules: [
          { beforeText: /^\s*> .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '> ' } },
          { beforeText: /^\s*\+ \[ \] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '+ [ ] ' } },
          { beforeText: /^\s*- \[ \] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '- [ ] ' } },
          { beforeText: /^\s*\* \[ \] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '* [ ] ' } },
          { beforeText: /^\s*\+ \[x\] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '+ [ ] ' } },
          { beforeText: /^\s*- \[x\] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '- [ ] ' } },
          { beforeText: /^\s*\* \[x\] .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '* [ ] ' } },
          { beforeText: /^\s*\+ .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '+ ' } },
          { beforeText: /^\s*- .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '- ' } },
          { beforeText: /^\s*\* .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: '* ' } },
          //  { beforeText: /^\s*\d+\. .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: { toString: () => ctx.setting.getSetting('editor.ordered-list-completion') === 'off' ? '' : '1. ' }  } },
          //  { beforeText: /^\s*\d+\) .*$/, action: { indentAction: monaco.languages.IndentAction.None, appendText: { toString: () => ctx.setting.getSetting('editor.ordered-list-completion') === 'off' ? '' : '1) ' }  } },

          {
            beforeText: /^\s*\d+\. .*$/, action: {
              indentAction: monaco.languages.IndentAction.None, appendText: {
                toString: (...e) => {
                  // // ctx.setting.getSetting('editor.ordered-list-completion') === 'off' ? '' : '1. '
                  // console.log(window.monaco.editor,'setting2',window.monaco.editor.setting)
                  // console.log('eee:',e)
                  //todo 列表内容新增新增
                  return '1.'
                }
              }
            }
          },

        ],
      });
      console.log('getLanguageConfiguration', monaco.languages.getLanguage)
      console.log('getLanguageConfiguration3', this.editor)

      let mk = window.monaco.languages.getLanguages().find(lang => lang.id === 'markdown');
      mk.loader().then(res => {
        console.log('mk lodad', res)
        console.log('onEnterRules:', res.conf.onEnterRules)
        res.conf.autoClosingPairs = [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          //   { open: '《', close: '》' },
          //   { open: '〈', close: '〉' },
          //   { open: '【', close: '】' },
          //   { open: '「', close: '」' },
          //   { open: '（', close: '）' },
          //   { open: '+', close: '_' },
        ]

        res.conf.surroundingPairs = [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '<', close: '>' },
          { open: '`', close: '`' },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
          { open: '*', close: '*' },
          { open: '_', close: '_' },
          { open: '=', close: '=' },
          { open: '~', close: '~' },
          { open: '^', close: '^' },
          { open: '#', close: '#' },
          { open: '$', close: '$' },
          { open: '《', close: '》' },
          { open: '〈', close: '〉' },
          { open: '【', close: '】' },
          { open: '「', close: '」' },
          { open: '（', close: '）' },
          { open: '“', close: '”' },
        ]
      })
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
        // repair was not successful, return original text
      }
    },
    formatJson() {//格式化展开
      this.editor.trigger('func', 'editor.action.formatDocument')
    },
    compressJson() { //压缩
      let str = this.editor.getValue()
      this.editor.setValue(JSON.stringify(JSON.parse(str)))
    },
    clickLine(lineNumber) {
      // 获取点击行的文本内容
      const model = this.editor.getModel()
      const lineContent = model.getLineContent(lineNumber);//
      // let lineContent=this.getLineContent(lineNumber);//按当前点击所在行的来获取内容
      console.log('Clicked line:', lineNumber, 'Content:', lineContent)
      //   let keyName = jsonPathFunc.extractKey(lineContent);
      // console.log('keyname',keyName)
      // 解析 JSON 并查找字段


    },
    //按行获取所在行内容
    getLineContent(lineNumber) {
      // console.log('getLineContent',lineNumber)
      let text = this.editor.getModel().getLineContent(lineNumber);
      // console.log('text',text)
      return text
    }
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