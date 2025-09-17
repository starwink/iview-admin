<template>
    <Drawer v-model="show" width="86" @on-visible-change="close" class-name="eDrawer editorModal" direction="rtl">
        <div class="detail">
            <div class="header">
                <span class="title">sqleditor</span>
            </div>
            <div class="drawer-body">
                <!-- <p class="ps">请选择需要导出的文件</p> -->
               <codeEditor ref="codeEditor" />
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <Button @click="show=false" size="small">取 消</Button>
                <Button @click="save()" type="primary" size="small">保 存</Button>

            </div>
        </div>
    </Drawer>
</template>

<script>
import codeEditor from '@/components/code-editor/sqlEditor'
export default {
    components: {
        codeEditor
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        init(form={}) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$refs.codeEditor.init();
            console.log('vvvv')
        },
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        save() {
            console.log('sasvvo')
             this.$refs.codeEditor.initByEditor()
            // this.$emit('save')
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/components/eDrawer/eDrawer.scss';
/* .editorModal{
    .drawer-body{
        padding: 16px;
    }
} */
</style>