<template>
    <Modal v-model="show" @on-visible-change="close" :mask-closable="false" footer-hide transfer
        class-name="eModal setDictListModal">
        <div class="detail">
            <div class="header">
                <span class="title">配置练习内容</span>
            </div>
            <div class="eModal-body">
                <Input v-model="form.text" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" />
                <p class="remark">使用 , 分隔多个词</p>
            </div>

        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <Button @click="show = false" >取 消</Button>
                <Button type="primary" class="ml-10" @click="save()">使 用</Button>

            </div>
        </div>
    </Modal>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            show: false,
            form: {
                text: '',
            }
        }
    },
    methods: {
        init(form = {}) {
            Object.assign(this.$data, this.$options.data());
            this.show = true;
            console.log('vvvv')
        },
        close(type) {
            if (type) { return; }
            this.show = false;
            this.$emit('close')
        },
        save() {
            this.$emit('save', this.form.text)
            this.close();
        }
    },
}
</script>


<style lang="scss" scoped>
@import '@/components/eModal/eModal.scss';
::v-deep .setDictListModal {
    .eModal-body {
        height: 100%;
        padding: 16px;
    }

    .ivu-modal-body {
        padding: 0px;
    }
}
</style>