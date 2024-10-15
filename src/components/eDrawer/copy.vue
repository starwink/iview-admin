<template>
    <Drawer v-model="show" width="86" @on-visible-change="close" class-name="eDrawer xxxxxxxxDrawer" direction="rtl">
        <div class="detail">
            <div class="header">
                <span class="title">导出</span>
            </div>
            <div class="drawer-body">
                <p class="ps">请选择需要导出的文件</p>
               
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <el-button @click="show=false" size="small">取 消</el-button>
                <el-button @click="save()" type="primary" size="small">保 存</el-button>

            </div>
        </div>
    </Drawer>
</template>

<script>
import { Drawer } from 'view-design';

export default {
    components: {
        Drawer,
    },
    data() {
        return {
            show: true,
        }
    },
    methods: {
        init(form={}) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            console.log('vvvv')
        },
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        save() {
            this.$emit('save')
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/components/eDrawer/eDrawer.scss';
/* .xxxxxxxxDrawer{
    .drawer-body{
        padding: 16px;
    }
} */
</style>