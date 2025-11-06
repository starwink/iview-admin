<template>
    <Upload :action="url" :headers="headers" :disabled="loading.import" :show-upload-list="false"
        :data="data" :name="name"
        :on-format-error="fileFormatError" :on-success="successFile" :on-error="errorFile" :on-progress="showUploadLoading"
        v-bind="$attrs" class="eUploadImg" style="margin-left: 10px;display: inline-block;">
        <!-- <Button  :loading="uploadLoading" type="primary" >导入表格</Button> -->
        <!-- :format="['json']" -->
        <div>
            <slot >
                <!-- <Button :disabled="loading.import" type="primary">导入</Button> -->
                <div class="upload-box">
                    <Spin size="large" fix v-if="loading.import"></Spin>
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽图片到这</p>
                </div>
            </slot>
        </div>
       
    </Upload>
</template>
<script>
export default {
    props: {
        type:{
            type:String,
            default:''
        },
        name:{
             type:String,
            default:'file'
        },
        url:{
            type:String,
            default:''
        },
        formatErrorText:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            loading: {
                import: false
            },
            headers: {},
            data:{},
            form:{
                 list:[]
            }
        }
    },
    methods: {
        init() {
            // let Authorization = JSON.parse(localStorage.getItem("user")).token;
            this.headers = {
                // 'Authorization': Authorization
            }
            if(this.type){
                this.data['type']=this.type
            }
        },
        showUploadLoading() {
            this.loading.import = true;
        },
        hideUploadLoading() {
            this.loading.import = false;
        },
        fileFormatError() {
            this.$Notice.warning({
                title: '文件格式错误',
                desc: this.formatErrorText  || '上传文件格式错误'
            });
        },
        successFile(res) {
            console.log('su', res)
            this.hideUploadLoading();
            if (res.code == 1) {
                this.$Message.success('导入成功')
                this.$emit('success',res.object)
            } else {
                this.$Message.error(res.message || '系统异常')
            }
        },

        errorFile(error, file, fileList) {
            console.log('errr', error)
            this.hideUploadLoading();
            this.$Message.error('服务器异常')
        },
    },
    created() {
        this.init();
    },

}

</script>
<style lang="scss" scoped>
.eUploadImg{
    .upload-box{
        position: relative;
        padding: 20px 0;
    }
}
</style>