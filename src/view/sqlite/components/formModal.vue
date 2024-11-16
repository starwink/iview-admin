<template>
    <Modal class-name="eModal"  v-model="show"  footer-hide @on-visible-change="close">
        <div class="detail">
            <div class="header">
                <span class="title" >
                    {{ form.id==''?'新增':'编辑' }}
                </span>
            </div>
            <div class="emodal-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :label-width="142">
                    <Row :gutter="16" class="mt-12">
                        <Col span="24">
                            <FormItem label="路径：" prop="path">
                                <Input v-model.trim="form.path" placeholder="请输入" ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" class="mt-12">
                        <Col span="24">
                            <FormItem label="名称：" prop="title">
                                <Input v-model.trim="form.title" placeholder="请输入" maxlength="200"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="类型：" prop="path_type">
                                <RadioGroup v-model="form.path_type">
                                    <Radio v-for="(item,index) in options.type" :key="index" :label="item.name">{{item.label}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" class="mt-12">
                        <Col span="24">
                            <FormItem label="备注：" prop="remark">
                                <Input v-model.trim="form.remark" placeholder="请输入" ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" class="mt-12">
                        <Col span="24">
                            <FormItem label="more：" prop="more：">
                                {{form.moreJson}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
               
            </div>
            
        </div>
        <div class="footer">
            <div class="left">

            </div>
            <div class="right">
                <Button @click.stop="close()">取消</Button>
                <Button type="primary" @click.stop="save()">保存</Button>
            </div>
        </div>
    </Modal>
</template>

<script>

export default {
    components: {
        // Modal
    },
    data() {
        return {
            show: false,
            form:{
                id:'',
                path:'',
                title:'',
                path_type:'catalog',
                moreJson:'',
                remark:'',
            },
            options:{
                type:[
                    {label:'目录',name:'catalog'},
                    {label:'文件',name:'file'},
                    {label:'网址',name:'url'},
                ]
            },
            ruleCustom: {
                
                path: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                path_type: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
               
               
            },
        }
    },
    methods: {
        init(form={}) {
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$nextTick(()=>{
                this.resetForm();
            })
            console.log('vvvv')
        },
        edit(id){
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.$api.getFilesDetail(id).then(res=>{
                this.form=res.object;
                this.resetForm();
            })
            
        },
        resetForm() {
            this.$refs.form.fields.forEach(function (e) {
                e.resetField()
            })
        },
        close(type=false) {
            console.log('close',type)
            if(type){return;}
            this.show = false;
            this.$emit('close')
        },
        save() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params={...this.form};
                    this.$api.saveFiles(params).then(res=>{
                        this.$emit('success')
                        this.close();
                    },e=>{
                        console.log(e,'e')
                    })
                   
                }
            })
           
        }
    },
}
</script>


<style lang="scss" scoped>
@import '@/components/hModal/hModal.scss';
</style>
<style lang="scss" scoped>
.ps{

}
</style>