<template>
    <Drawer v-model="show" width="86" @on-visible-change="close" class-name="eDrawer bookFormDrawer" placement="left">
        <div class="detail">
            <div class="header">
                <span class="title">编辑</span>
            </div>
            <div class="drawer-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :disabled="readonly" :label-width="96">
                    <FormItem label="type_id：" prop="type_id">
                        <Row>
                            <Col span="12">
                                <Input v-model.trim="form.type_id" maxlength="50" style="width: 100%;"></Input>
                            </Col>
                            <Col span="12">
                                <span class="ml-10 setTypeId">
                                    <Icon type="ios-refresh" @click="getMaxId()" title="刷新" />
                                    <span class="ml-12" @click="setFormTypeId()" title="使用" >max:{{ options.maxid }}</span>
                                </span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="标题：" prop="title">
                        <Row>
                            <Col span="12">
                                <Input v-model.trim="form.title" maxlength="50" style="width: 100%;"></Input>
                            </Col>
                            <Col span="12">
                                <span class="ml-10 setTypeId">
                                    <Icon type="ios-refresh" @click="getLatelyTitle()" title="刷新" />
                                    <span class="ml-12" @click="setFormTitle()" title="使用" >最近:{{ options.latelyTitle }}</span>
                                </span>
                            </Col>
                        </Row>
                        
                    </FormItem>
                    <FormItem label="JSON：" prop="json">
                        <!-- <Input v-model="form.json" type="textarea" :rows="4" /> -->
                        <eJsonInput ref="eJsonInput" @change="setFormJson" />
                        <!-- <mdComp ref="mdComp"  :height="100" :overflowHeight="90" /> -->
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

                <Button @click="show=false" >取 消</Button>
                <Button @click="save()" type="primary" class="ml-10">保 存</Button>

            </div>
        </div>
    </Drawer>
</template>

<script>
import eJsonInput from "@/components/eJsonInput";
import { param } from "jquery";
export default {
    components: {
        eJsonInput,
    },
    data() {
        return {
            show: false,
            readonly: false,
            form: {
                type_id:'',
                title:'',
                json:'',
                remark:'',
            },
            options:{
                maxid:0,
                latelyTitle:'',
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
            this.getOptions();
            this.$nextTick(() => {
                this.resetForm();
            })
        },
        edit(id){
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.getOptions();
            this.$api.getApiTestDetail(id).then(res=>{
                let form=res.object;
                form.json=this.$helper.getJSONByStr(form.json)
                this.form=form;
                this.$refs.eJsonInput.init(this.form.json);
                this.resetForm();
            })
        },
        getOptions(){
            this.getMaxId();
            this.getLatelyTitle();
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
            let params=JSON.parse(JSON.stringify(this.form));
            params.json=JSON.stringify(params.json);
            this.$api.saveApiTest(params).then(res=>{
                if(res.code==1){
                    this.$emit('success')
                    this.close();
                }
            })
        },
        setFormJson(json){
            this.form.json=json;
        },
        getMaxId(){
            this.$api.getApiTestMaxTypeId().then(res=>{
                this.options.maxid=parseInt(res?.object?.maxid || 0)
            })
        },
        setFormTypeId(){
            this.form.type_id=this.options.maxid;
        },
        getLatelyTitle(){
            this.$api.getApiTestLatelyTitle().then(res=>{
                this.options.latelyTitle=res?.object?.title || ''
            })
        },
        setFormTitle(){
            this.setFormTypeId();
            this.form.title=this.options.latelyTitle;
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
    .setTypeId{
        cursor: pointer;
        color:#13939E;
    }
}
</style>