<template>
    <Modal v-model="show" @on-visible-change="close" :mask-closable="false" footer-hide transfer class-name="eModal logDetailModal">
        <div class="detail">
            <div class="header">
                <span class="title">日志详情</span>
            </div>
            <div class="eModal-body">
                <jsonInput ref="jsonInput" />
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <Button @click="show=false">取 消</Button>

            </div>
        </div>
    </Modal>
</template>

<script>
import jsonInput from '@/components/jsoninput';
export default {
    components: {
        jsonInput
    },
    data() {
        return {
            show: false,
            json:{}
        }
    },
    methods: {
        init(json) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.json = json
            this.$refs.jsonInput.init(json);
        },
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        // save() {
        //     this.$emit('save')
        // }
    },
}
</script>


<style lang="scss" scoped>
@import '@/components/eModal/eModal.scss';
.logDetailModal{
    .eModal-body{
        height: 100%;
        padding: 0;
    }
}
</style>