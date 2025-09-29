import { sleep } from './monace.utils';
//[参考项目 yn-develop](src/renderer/services/editor.ts)
export default class monaceEditorFunc {
    constructor(editor, monaco) {
        this.editor = editor;
        this.monaco = monaco;
        console.log('hi')
    }
    getEditor() {
        return this.editor;
    }
    getMonaco() {
        return this.monaco;
    }
    //在当前光标处插入文本
    insert(text) {
        const selection = this.getEditor().getSelection();
        this.getEditor().executeEdits('', [
            {
                range: new (this.getMonaco().Range)(selection.endLineNumber, selection.endColumn, selection.endLineNumber, selection.endColumn),
                text,
                forceMoveMarkers: true
            }
        ])
        this.editor.pushUndoStop();// 追加回溯点
        this.getEditor().focus()
    }
    insertAt(text, selection) {
        // const selection = this.getEditor().getSelection();
        this.getEditor().executeEdits('', [
            {
                range: new (this.getMonaco().Range)(selection.endLineNumber, selection.endColumn, selection.endLineNumber, selection.endColumn),
                text,
                forceMoveMarkers: true
            }
        ])
        this.editor.pushUndoStop();// 追加回溯点
        this.getEditor().focus()
    }
    //高亮指定行 ; 
    highlightLine(line = 0, reveal = false, duration = 1000) {
        const lines = Array.isArray(line) ? line : [line, line]

        const decorations = this.getEditor().createDecorationsCollection([
            {
                range: new (this.getMonaco().Range)(lines[0], 0, lines[1], 999),
                options: {
                    isWholeLine: true,
                    inlineClassName: 'mtkcontrol'// 指定的样式名/monaco-editor/min/vs/editor/editor.main.css
                }
            }
        ])
        //滚动到定位行
        if (reveal) {
            this.getEditor().revealLineNearTop(lines[0])
        }

        const dispose = () => decorations.clear()

        if (duration) {
            return sleep(duration).then(() => {
                dispose()
            })
        }

        return dispose
    }
    //未测试成功 grammarToken  为null
    getLineLanguageId(line = 0, model) {
        if (!model) {
            model = this.getEditor().getModel()
        }
        if (model?.tokenization?.grammarTokens?.getLineTokens) {
            const lineTokens = model?.tokenization.grammarTokens.getLineTokens(line)
            return lineTokens.getLanguageId()
        } else {
            throw new Error('Require model to be tokenized')
        }
    }
    //替换行内容
    replaceLine(line = 0, text = '') {
        const length = this.getEditor()?.getModel()?.getLineLength(line)
        const editor = this.getEditor()
        const monaco = this.getMonaco()

        editor.executeEdits('', [
            {
                range: new (monaco.Range)(line, 1, line, length + 1),
                text,
                forceMoveMarkers: true
            }
        ])
        editor.pushUndoStop()
        editor.setPosition(new monaco.Position(line, text.length + 1))
        editor.focus()
    }
    //替换内容 多行
    replaceLines(lineStart = 0, lineEnd = 1, text = '') {
        const length = this.getEditor()?.getModel()?.getLineLength(lineEnd)
        const editor = this.getEditor()
        const monaco = this.getMonaco()

        editor.executeEdits('', [
            {
                range: new (monaco.Range)(lineStart, 1, lineEnd, length + 1),
                text,
                forceMoveMarkers: true
            }
        ])
        editor.pushUndoStop()
        editor.setPosition(new monaco.Position(lineEnd, length + 1))
        editor.focus()
    }
    //删除行
    deleteLine(line = 0) {
        const editor = this.getEditor()
        const monaco = this.getMonaco()
        const length = this.getEditor()?.getModel()?.getLineLength(line)
        // const length = this.getEditor()?.getModel()?.getLineMaxColumn(line)

        editor.executeEdits('', [
            {
                //range: new (monaco.Range)(line, 1, line, length + 1),//删除行内容但不删除行
                // range: new (monaco.Range)(line, 1, line, 4),//删除行前3个字符
                range: new (monaco.Range)(line, 1, line + 1, 1), //删除行
                text: null,
            }
        ])
        editor.pushUndoStop()
        editor.setPosition(new monaco.Position(line, 1))
        editor.focus()
    }
    //获取行内容
    getLineContent(line = 0) {
        return this.getEditor().getModel().getLineContent(line)
    }
    //获取多行内容
    getLinesContent(lineStart = 0, lineEnd = 1) {
        const monaco = this.getMonaco()
        const model = this.getEditor().getModel()
        const lineEndLen = model.getLineLength(lineEnd);
        const range = new (monaco.Range)(lineStart, 1, lineEnd, lineEndLen + 1);
        return model.getValueInRange(range);
    }
    getValue() {
        return this.getEditor().getModel().getValue()
        // return this.getEditor().getModel().getValue(this.getMonaco().editor.DefaultEndOfLine.LF) ;//参考是这使用的,但貌似没有什么区别
    }
    setValue(text) {
        const editor = this.getEditor()
        const model = editor.getModel()
        if (!model) {
            return
        }

        const viewState = editor.saveViewState();// 参考过来,但不清楚为什么需要有

        editor.executeEdits('', [
            {
                range: model.getFullModelRange(),
                text,
                forceMoveMarkers: true
            }
        ])
        editor.pushUndoStop()

        editor.restoreViewState(viewState)
        editor.focus()
    }

    //替换内容 search: string | RegExp, val: string
    replaceValue(search, val, replaceAll = true) {
        const editor = this.getEditor()
        const model = editor.getModel()
        const content = model?.getValue() || ''
        const text = replaceAll ? content.replaceAll(search, val) : content.replace(search, val)
        this.setValue(text)
    }

    getSelectionInfo() {
        const editor = this.getEditor()
        const selection = editor.getSelection()
        if (!selection) {
            return
        }

        return {
            line: selection.positionLineNumber,
            column: selection.positionColumn,
            lineCount: editor.getModel()?.getLineCount() || '',
            textLength: this.getValue().length,
            selectedLength: editor.getModel()?.getValueInRange(selection).length || 0,
            selectedLines: selection.endLineNumber - selection.startLineNumber + 1,
            selectionCount: editor.getSelections()?.length || 1
        }
    }
    //加粗
    boldSelctionText(){
        console.log('boldSelctionText')
        const editor = this.getEditor();
        let selection=editor.getSelection();
        let selectedText=editor.getModel().getValueInRange(selection);
        editor.executeEdits('', [
            {
                range: selection,
                text: `**${selectedText}**`,
                forceMoveMarkers: true
            }
        ]);
    }
    //选中内容前后追加字符 
    replaceSelctionText(prefixStr="",suffixStr=""){
        console.log('ppp',prefixStr);
        if(!suffixStr){
            suffixStr=prefixStr;
        }
        const editor = this.getEditor();
        let selection=editor.getSelection();
        let selectedText=editor.getModel().getValueInRange(selection);

        console.log('selff',selectedText)
        console.log('selection',selection)
        editor.executeEdits('', [
            {
                range: selection,
                text: `${prefixStr}${selectedText}${suffixStr}`,
                forceMoveMarkers: true
            }
        ]);
    }

    //新增右键菜单
    addRightMenu(){
        console.log('run addRightMenu')
        const editor = this.getEditor()
        editor.addAction({
            id: 'customSave',
            label: '保存文件',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
            run: (editor) => {
              console.log('自定义保存逻辑');
            }
        });
    }

    
    //未测试成功,用于自动换行切换
    toggleWrap() {
        const monaco = this.getMonaco()
        const wrapInfo = this.getEditor().getOption(monaco.editor.EditorOption.wrappingInfo)
        const isWrapping = wrapInfo.isViewportWrapping
        console.log('isWrapping', wrapInfo.isDominatedByLongLines, isWrapping)
        // if (wrapInfo.isDominatedByLongLines) {
        //   useToast().show('warning', 'Word warp dominated by long lines')
        //   return
        // }

        // store.state.wordWrap = isWrapping ? 'off' : 'on'
    }
    //按键盘值返回monaco对应的keyMod
    getKeyCodeMod(key) {
        const monaco =window.monaco;
        const cachedMap = {
            'ctrl': isMacOS ? monaco.KeyMod.WinCtrl : monaco.KeyMod.CtrlCmd,
            'control': isMacOS ? monaco.KeyMod.WinCtrl : monaco.KeyMod.CtrlCmd,
            'shift': monaco.KeyMod.Shift,
            'alt': monaco.KeyMod.Alt,
            'meta': isMacOS ? monaco.KeyMod.CtrlCmd : monaco.KeyMod.WinCtrl,
            'cmd': isMacOS ? monaco.KeyMod.CtrlCmd : monaco.KeyMod.WinCtrl,
            'command': isMacOS ? monaco.KeyMod.CtrlCmd : monaco.KeyMod.WinCtrl,
            'win': isMacOS ? monaco.KeyMod.CtrlCmd : monaco.KeyMod.WinCtrl,
            'backspace': monaco.KeyCode.Backspace,
            'tab': monaco.KeyCode.Tab,
            'enter': monaco.KeyCode.Enter,
            'pause': monaco.KeyCode.PauseBreak,
            'capslock': monaco.KeyCode.CapsLock,
            'esc': monaco.KeyCode.Escape,
            'space': monaco.KeyCode.Space,
            'pageup': monaco.KeyCode.PageUp,
            'pagedown': monaco.KeyCode.PageDown,
            'end': monaco.KeyCode.End,
            'home': monaco.KeyCode.Home,
            'left': monaco.KeyCode.LeftArrow,
            'up': monaco.KeyCode.UpArrow,
            'right': monaco.KeyCode.RightArrow,
            'down': monaco.KeyCode.DownArrow,
            'arrowleft': monaco.KeyCode.LeftArrow,
            'arrowup': monaco.KeyCode.UpArrow,
            'arrowright': monaco.KeyCode.RightArrow,
            'arrowdown': monaco.KeyCode.DownArrow,
            'insert': monaco.KeyCode.Insert,
            'delete': monaco.KeyCode.Delete,
            '0': monaco.KeyCode.Digit0,
            '1': monaco.KeyCode.Digit1,
            '2': monaco.KeyCode.Digit2,
            '3': monaco.KeyCode.Digit3,
            '4': monaco.KeyCode.Digit4,
            '5': monaco.KeyCode.Digit5,
            '6': monaco.KeyCode.Digit6,
            '7': monaco.KeyCode.Digit7,
            '8': monaco.KeyCode.Digit8,
            '9': monaco.KeyCode.Digit9,
            'a': monaco.KeyCode.KeyA,
            'b': monaco.KeyCode.KeyB,
            'c': monaco.KeyCode.KeyC,
            'd': monaco.KeyCode.KeyD,
            'e': monaco.KeyCode.KeyE,
            'f': monaco.KeyCode.KeyF,
            'g': monaco.KeyCode.KeyG,
            'h': monaco.KeyCode.KeyH,
            'i': monaco.KeyCode.KeyI,
            'j': monaco.KeyCode.KeyJ,
            'k': monaco.KeyCode.KeyK,
            'l': monaco.KeyCode.KeyL,
            'm': monaco.KeyCode.KeyM,
            'n': monaco.KeyCode.KeyN,
            'o': monaco.KeyCode.KeyO,
            'p': monaco.KeyCode.KeyP,
            'q': monaco.KeyCode.KeyQ,
            'r': monaco.KeyCode.KeyR,
            's': monaco.KeyCode.KeyS,
            't': monaco.KeyCode.KeyT,
            'u': monaco.KeyCode.KeyU,
            'v': monaco.KeyCode.KeyV,
            'w': monaco.KeyCode.KeyW,
            'x': monaco.KeyCode.KeyX,
            'y': monaco.KeyCode.KeyY,
            'z': monaco.KeyCode.KeyZ,
            'contextmenu': monaco.KeyCode.ContextMenu,
            'f1': monaco.KeyCode.F1,
            'f2': monaco.KeyCode.F2,
            'f3': monaco.KeyCode.F3,
            'f4': monaco.KeyCode.F4,
            'f5': monaco.KeyCode.F5,
            'f6': monaco.KeyCode.F6,
            'f7': monaco.KeyCode.F7,
            'f8': monaco.KeyCode.F8,
            'f9': monaco.KeyCode.F9,
            'f10': monaco.KeyCode.F10,
            'f11': monaco.KeyCode.F11,
            'f12': monaco.KeyCode.F12,
            'f13': monaco.KeyCode.F13,
            'f14': monaco.KeyCode.F14,
            'f15': monaco.KeyCode.F15,
            'f16': monaco.KeyCode.F16,
            'f17': monaco.KeyCode.F17,
            'f18': monaco.KeyCode.F18,
            'f19': monaco.KeyCode.F19,
            'f20': monaco.KeyCode.F20,
            'f21': monaco.KeyCode.F21,
            'f22': monaco.KeyCode.F22,
            'f23': monaco.KeyCode.F23,
            'f24': monaco.KeyCode.F24,
            'numlock': monaco.KeyCode.NumLock,
            'scrolllock': monaco.KeyCode.ScrollLock,
            ';': monaco.KeyCode.Semicolon,
            '=': monaco.KeyCode.Equal,
            ',': monaco.KeyCode.Comma,
            '-': monaco.KeyCode.Minus,
            '.': monaco.KeyCode.Period,
            '/': monaco.KeyCode.Slash,
            '`': monaco.KeyCode.Backquote,
            '[': monaco.KeyCode.BracketLeft,
            '\\': monaco.KeyCode.Backslash,
            ']': monaco.KeyCode.BracketRight,
            '\'': monaco.KeyCode.Quote,
            'oem_8': monaco.KeyCode.OEM_8,
            'intlbackslash': monaco.KeyCode.IntlBackslash,
            'numpad0': monaco.KeyCode.Numpad0,
            'numpad1': monaco.KeyCode.Numpad1,
            'numpad2': monaco.KeyCode.Numpad2,
            'numpad3': monaco.KeyCode.Numpad3,
            'numpad4': monaco.KeyCode.Numpad4,
            'numpad5': monaco.KeyCode.Numpad5,
            'numpad6': monaco.KeyCode.Numpad6,
            'numpad7': monaco.KeyCode.Numpad7,
            'numpad8': monaco.KeyCode.Numpad8,
            'numpad9': monaco.KeyCode.Numpad9,
            'numpadmultiply': monaco.KeyCode.NumpadMultiply,
            'numpadadd': monaco.KeyCode.NumpadAdd,
            'numpadsubtract': monaco.KeyCode.NumpadSubtract,
            'numpaddecimal': monaco.KeyCode.NumpadDecimal,
            'numpaddivide': monaco.KeyCode.NumpadDivide,
        }
    
        console.log('kkk',key,cachedMap[key.trim().toLowerCase()])
        return cachedMap[key.trim().toLowerCase()]
    }

}