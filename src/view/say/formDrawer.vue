<template>
    <Drawer v-model="show" width="86" @on-visible-change="close" class-name="eDrawer bookFormDrawer" placement="left">
        <div class="detail">
            <div class="header">
                <span class="title">编辑</span>
            </div>
            <div class="drawer-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :disabled="readonly" :label-width="96">
                   
                    <FormItem label="单词：" prop="word">
                        <Input v-model.trim="form.word" maxlength="50" style="width: 100%;"></Input>
                    </FormItem>
                    <FormItem label="释义：" prop="paraphrase">
                        <Input v-model.trim="form.paraphrase" maxlength="50" style="width: 100%;"></Input>
                    </FormItem>
                    <FormItem label="标签：" prop="tags">
                        <Input v-model.trim="form.tags" type="textarea" :autosize="{minRows:2}"></Input>
                    </FormItem>
                    <FormItem label="排序：" prop="sort_num">
                        <Input v-model.trim="form.sort_num" ></Input>
                    </FormItem>
                    <FormItem label="有道释义：" prop="json">
                        <Button @click="updateParaphrase">同步有道释义</Button>
                        <!-- <Input v-model="form.json" type="textarea" :rows="4" /> -->
                        <eJsonInput ref="eJsonInput" @change="setFormJson" />
                        <!-- <mdComp ref="mdComp"  :height="100" :overflowHeight="90" /> -->
                    </FormItem>
                   
                    <FormItem label="备注：" prop="remark">
                        <Input v-model.trim="form.remark" type="textarea" :autosize="{minRows:2}"></Input>
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
                word:'',
                paraphrase:'',
                json:'',
                tags:'',
                sort_num:'',
                remark:'',
            },
            
            ruleCustom: {
                word: [
                    { required: true, message: "请输入", trigger: "blur" }
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
                this.$refs.eJsonInput.init(this.form.json);
            })
        },
        edit(id){
            Object.assign(this.$data, this.$options.data());
            this.show=true;
            this.getOptions();
            this.$api.getSayDictDetail(id).then(res=>{
                let form=res.object;
                form.json=this.$helper.getJSONByStr(form.json)
                this.form=form;
                this.$refs.eJsonInput.init(this.form.json);
                this.resetForm();
            })
        },
        getOptions(){
           
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
            this.$api.saveSayDict(params).then(res=>{
                if(res.code==1){
                    this.$emit('success')
                    this.close();
                }
            })
        },
        setFormJson(json){
            this.form.json=json;
        },
        updateParaphrase(){
            this.$api.pullYouDaoWord(this.form.word).then(res=>{
                let json=this.$helper.getJSONByStr(res.object?.data?.json || {})
                this.form.json=json;
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