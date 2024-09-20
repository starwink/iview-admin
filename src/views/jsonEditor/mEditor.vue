<template>
    <div ref="CodeEditor" class="codeEditor"></div>
</template>
<style lang="scss" >
.codeEditor{
    width:100%;
    height: 300px;
}
</style>
<script>
import * as monaco from 'monaco-editor'

export default {
    props: {
        editable: { type: Boolean, default: true },
        language: { type: String, default: 'plaintext' },
        value: { type: String, required: true, default: '' },
    },

    data() {
        return {
            codeEditor: null,
        }
    },

    mounted() {
        this.updateEditor(this.value)
    },

    methods: {
        updateEditor(content) {
            if (!this.codeEditor) {
                monaco.editor.defineTheme('jsonTheme', {
                    base: 'vs',
                    inherit: true,
                    rules: [{ background: 'EDF9FA' }],
                    colors: {
                        // 'editor.foreground': '#000000',
                        // 'editor.background': '#EDF9FA',
                        // 'editorCursor.foreground': '#8B0000',
                        // 'editor.lineHighlightBackground': '#0000FF20',
                        // 'editorLineNumber.foreground': '#008800',
                        // 'editor.selectionBackground': '#88000030',
                        // 'editor.inactiveSelectionBackground': '#88000015',


                        "editor.foreground": "#4D4D4C",
                        "editor.foreground": "#ffffff",
        "editor.background": "#FFFFFF",
        "editor.selectionBackground": "#D6D6D6",
        "editor.lineHighlightBackground": "#EFEFEF",
        "editorCursor.foreground": "#AEAFAD",
        "editorWhitespace.foreground": "#D1D1D1"

        // "editor.foreground": "#E6E1DC",
        // "editor.background": "#161616",
        // "editor.selectionBackground": "#454545",
        // "editor.lineHighlightBackground": "#333435",
        // "editorCursor.foreground": "#FFFFFF",
        // "editorWhitespace.foreground": "#404040"
                    },
                })
                // if(this.language=='json'){
                    monaco.editor.setTheme('jsonTheme')
                // }
                this.codeEditor = monaco.editor.create(this.$refs.CodeEditor, {
                    value: '',
                    // language: this.language,
                    language: 'json',
                    lineNumbers: 'off',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: !this.editable,
                    // theme: 'vs-dark',
                    theme: 'myTheme',
                    automaticLayout: true,

                    wordWrap: 'wordWrapColumn',
                    wordWrapColumn: 40,

                    // Set this to false to not auto word wrap minified files
                    wordWrapMinified: true,
                    // try "same", "indent" or "none"
                    wrappingIndent: 'indent',

                    scrollbar: {
                        // Subtle shadows to the left & top. Defaults to true.
                        useShadows: false,

                        // Render vertical arrows. Defaults to false.
                        verticalHasArrows: false,
                        // Render horizontal arrows. Defaults to false.
                        horizontalHasArrows: false,

                        // Render vertical scrollbar.
                        // Accepted values: 'auto', 'visible', 'hidden'.
                        // Defaults to 'auto'
                        vertical: 'auto',
                        // Render horizontal scrollbar.
                        // Accepted values: 'auto', 'visible', 'hidden'.
                        // Defaults to 'auto'
                        horizontal: 'auto',

                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                        arrowSize: 10,
                    },

                    //小地图
                    minimap: {
                        enabled: false,
                    },
                })
                this.codeEditor.onDidChangeModelContent(() => {
                    this.$emit('input', this.codeEditor.getValue())
                })
            }
            if (content != this.codeEditor.getValue())
                this.codeEditor.setValue(content)

            this.codeEditor.updateOptions({
                readOnly: !this.editable,
            })
        },
    },

    watch: {
        value: function (val) {
            this.updateEditor(val)
        },
    },

    beforeDestroy() {
        this.codeEditor.dispose()
    },
}
</script>
