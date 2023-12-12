<template>
    <Modal v-model="show" @on-visible-change="close" footer-hide transfer class-name="eModal">
        <div class="detail">
            <div class="header">
                <span class="title">导出</span>
            </div>
            <div class="eModal-body">
                <p class="ps">请选择需要导出的文件</p>
               
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <Button size="small" @click="close()">关闭</Button>
                <Button type="primary" size="small" @click="save()">保存</Button>

            </div>
        </div>
    </Modal>
</template>

<script>
// import { Modal } from 'view-design';

export default {
    components: {
        // Modal
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
@import '@/components/eModal/eModal.scss';
::v-deep .eModal{

}
</style>