<template>
    <Upload :action="url" :headers="headers" :disabled="loading.import" :show-upload-list="false"
        :on-format-error="fileFormatError" :on-success="successFile" :on-error="errorFile" :on-progress="showUploadLoading"
        v-bind="$attrs" style="margin-left: 10px;display: inline-block;">
        <!-- <Button  :loading="uploadLoading" type="primary" >导入表格</Button> -->
        <!-- :format="['json']" -->
        <div>
            <slot :loading="loading.import">
                <Button :disabled="loading.import" type="primary">导入</Button>
            </slot>
        </div>
       
    </Upload>
</template>
<script>
export default {
    props: {
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
        }
    },
    methods: {
        init() {
            let Authorization = JSON.parse(localStorage.getItem("user")).token;
            this.headers = {
                'Authorization': Authorization
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
                this.$emit('success',res)
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