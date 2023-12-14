<template>
    <div>
        <Modal class-name="eModal eModal-notesFormModal" width="50" v-model="show" @on-cancel="close" transfer footer-hide  :mask-closable="false">
            <div class="detail">
                <div class="header" ref="header">
                    <span class="title">{{ form.id?'新增':'编辑' }}</span>
                </div>
                <div class="eModal-body">
                    <Form :model="form" :rules="rules" ref="form"   :label-width="96">
                        <FormItem label="文字：" prop="text" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                            <Input v-model.trim="form.text" maxlength="50" ></Input>
                        </FormItem>
                        <FormItem label="拼音码：" prop="code_binyin">
                            <Input v-model.trim="form.code_binyin" maxlength="50" ></Input>
                        </FormItem>
                        <FormItem label="五笔码：" prop="code_wb">
                            <Input v-model.trim="form.code_wb" maxlength="50" ></Input>
                        </FormItem>
                    </Form>
                </div>
                <div class="footer">
                    <div class="left">
                    </div>
                    <div class="right">
                        <Button @click.stop="close">取消</Button>
                        <Button class="ml-10" @click.stop="save()" type="primary">保存</Button>
                    </div>
                </div>

            </div>
        </Modal>
    </div>
</template>
 
<script>

export default {
    data() {
        return {
            show: false,
            loading: false,
            title: '',
            form: {
                id: '',
                text: '',
                code_binyin: '',
                code_wb: '',
            },
            rules: {
              //  text: [{ required: true, trigger: "change" }],
            },
            option: {}
        };
    },
    methods: {
        add() {
            Object.assign(this.$data, this.$options.data());
            this.show = true;
            this.$nextTick(() => {
                this.resetForm()
            })
        },

        edit(params){
            Object.assign(this.$data, this.$options.data());
            this.show = true;
            console.log('eee',params)
            this.$api.getNotesDetail(params).then(res=>{
                this.resetForm()
                this.form=res?.object || {}
            });
        },

        resetForm() {
            this.$refs.form.fields.forEach(function (e) {
                e.resetField()
            })
        },

        save() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.runapi();
                }
            });
        },

        runapi() {
            let params = this.form;
            this.loading = true;
            this.$api.saveNotesList(params).then((res) => {
                this.loading = false;
                if (res.code == 1) {
                    this.$Message.success('保存成功');
                    this.success();
                }
            }, err => {
                this.loading = false;
            });
        },

        success() {
            this.close();
            this.$emit('success')
        },
        close() {
            this.show = false;
        },
       
    },
    mounted() {
        // this.init();
    },
};
</script>
<style lang="scss" scoped>
@import '@/components/eModal/eModal.scss';

.eModal {
    .eModal-body {
        height: calc(100vh - 48px);
        overflow: hidden;
    }

    .detail {
        .header {
            .sub-title {
                font-weight: 400;
                color: #606266;
                cursor: text;
            }
        }

        .workbench {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
        }
    }
}

.eModal-notesFormModal {
    .eModal-body {
        height: auto !important;
        padding: 16px;
        overflow: hidden;
        margin-bottom: 24px;
        position: relative;

        .tips {
            text-align: center;
        }
    }



}</style>