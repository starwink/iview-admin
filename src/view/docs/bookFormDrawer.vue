<template>
    <Drawer v-model="show" width="50" @on-visible-change="close" class-name="eDrawer bookFormDrawer" placement="left">
        <div class="detail">
            <div class="header">
                <span class="title">编辑</span>
            </div>
            <div class="drawer-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :disabled="readonly" :label-width="96">
                    <FormItem label="标题：" prop="title">
                        <Input v-model.trim="form.title" maxlength="50"></Input>
                    </FormItem>
                    <FormItem label="正文：" prop="article">
                        <Input v-model="form.article" type="textarea" :rows="4" />
                        <!-- <mdComp ref="mdComp"  :height="100" :overflowHeight="90" /> -->
                    </FormItem>
                    <FormItem label="发布时间：" prop="release_time">
                        <Input v-model.trim="form.release_time" maxlength="50"></Input>
                    </FormItem>
                    <FormItem label="备注：" prop="remark">
                        <Input v-model.trim="form.remark" ></Input>
                    </FormItem>
                </Form>
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
// import mdComp from './mdComp'
export default {
    components: {
        // mdComp,
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
                    { required: true, message: "请输入", trigger: "blur" }
                ],
            }
        }
    },
    methods: {
        init(form={}) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$nextTick(() => {
                this.resetForm();
            })
            console.log('vvvv')
        },
        edit(id){
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$api.getNotesDetail(id).then(res=>{
                this.form=res.object;
                console.log(this.data)
                this.resetForm();
                // this.$refs.mdComp.runView(this.data.article);
                // this.$refs.mdComp.setValue(this.data.article);
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
            // this.form.article=this.$refs.mdComp.setValue();
            console.log(this.form);
            this.$api.saveNotes(this.form).then(res=>{
                if(res.code==1){
                    this.$emit('success')
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