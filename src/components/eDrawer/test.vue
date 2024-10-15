<template>
    <Drawer class-name="eDrawer"  v-bind="$attrs" v-model="show"  v-on="$listeners" @on-close="close">
        <div class="content">
            <slot>
                <p>1232</p>
            </slot>
        </div>
        <div class="footer">
            <slot name="footer">
                <div class="left">
                    <slot name="left"></slot>
                </div>
                <div class="right">
                    <slot name="right">
                        <el-button size="mini" @click="close()">关闭</el-button>
                        <el-button type="primary" size="mini" @click="save()">保存</el-button>
                    </slot>
                </div>
            </slot>
        </div>
    </Drawer>
</template>

<script>
import { Drawer } from 'view-design';

export default {
    components: {
        Drawer
    },
    data() {
        return {
            show:true,
        }
    },
    methods: {
        init(){
            // this.show=true;
            console.log('vvvv')
        },
        close(){
            this.show=false;
            this.$emit('close')
        },
        save(){
            this.$emit('save')
        }
    },
}
</script>

<style lang="scss">
.eDrawer {
    .ivu-drawer-body {
        padding: 0px;
        overflow: hidden;
    }

    .content {
        height: calc(100vh - 100px);
        overflow: auto;
    }


    .footer {
        position: absolute;
        bottom: 0px;
        left: 0px;
        height: 48px;
        line-height: 48px;
        text-align: right;
        background: #fff;
        padding-right: 24px;
        width: 100%;
        border-top: solid 1px #ddd;
        z-index: 8;

        .left {
            display: inline-block;
            float: left;
            margin-left: 16px;
        }

        .right {
            display: inline-block;

        }
    }
}
</style>