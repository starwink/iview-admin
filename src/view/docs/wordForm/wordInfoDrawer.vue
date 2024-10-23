<template>
    <Drawer v-model="show" width="50" @on-visible-change="close" :mask="false" class-name="eDrawer bookFormDrawer"  placement="right">
        <div class="detail">
            <div class="header">
                <span class="title">更多</span>
            </div>
            <div class="drawer-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :disabled="readonly" :label-width="96">
                    <FormItem label="标题：" prop="title">
                        <Input v-model.trim="form.title" maxlength="50"></Input>
                    </FormItem>
                    
                    <FormItem label="备注：" prop="remark">
                        <Input v-model.trim="form.remark" type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">

                <Button @click="show=false" size="small">取 消</Button>
                <Button @click="save()" type="primary" size="small">确 认</Button>

            </div>
        </div>
    </Drawer>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            show: false,
            readonly: false,
            form: {
                title:'',
                article:'',
                release_time:'',
                remark:'',
            },
            ruleCustom: {
                title: [
                    // { required: true, message: "请输入", trigger: "blur" }
                ],
            }
        }
    },
    methods: {
        init(form={}) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$nextTick(() => {
                this.form=JSON.parse(JSON.stringify(form));
            })
        },
       
        resetForm() {
            this.$refs.form.fields.forEach(function (e) {
                e.resetField()
            })
        },
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        save() {
            this.$api.saveNotes(this.form).then(res=>{
                if(res.code==1){
                    this.$emit('success',this.form)
                    this.close();
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/components/eDrawer/eDrawer.scss';
.bookFormDrawer{
    .drawer-body{
        padding: 16px;
    }
}
</style>