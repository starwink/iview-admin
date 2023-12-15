<template>
    <Modal v-model="show" title="查询条件" :mask-closable="false">
        <Form :model="form" ref="form" :rules="ruleCustom"  :label-width="156">
            <p class="title">查询内容</p>
            <Row :gutter="16" class="mt-16">
                <Col span="24">
                    <FormItem label="查询类型：" prop="type">
                        <Select v-model="form.type"  placeholder="列表查询的类型" @on-change="changeType" >
                            <Option value="searchBox" >搜索框 </Option>
                            <Option value="dropDownBox" >下拉框 </Option>
                            <Option value="timeBox" >时间框 </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="24">
                <FormItem label="提示说明：" prop="desc">
                    <Input v-model.trim="form.desc" maxlength="100" placeholder="查询条件默认展示的提示文案内容"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="24">
                <FormItem label="查询的表字段：" prop="searchParam">
                    <!-- <Input v-model.trim="form.searchParam" maxlength="100"></Input> -->
                    <Select v-model="form.searchParam" filterable >
                        <Option v-for="(item,index) in options.column" :key="index" :value="item.key" :label="item.key+':'+item.title">
                            <span>{{item.key}}</span>
                            <span style="float:right;color:#ccc;text-align: right;">{{item.title}}</span>
                        </Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row :gutter="16" class="mt-16">
                <Col span="24">
                    <FormItem label="查询方式：" prop="searchType">
                        <Select v-model="form.searchType"  >
                            <!-- <Option value="==">精确查询</Option>
                            <Option value="like">模糊查询</Option> -->
                            <Option v-for="item of options.searchType" :key="item.name" :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16" class="mt-16">
                <Col span="24">
                    <FormItem label="数值类型：" prop="valueType">
                        <Select v-model="form.valueType" :disabled="form.type=='timeBox'" >
                            <Option value="int">数值</Option>
                            <Option value="string">字符串</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
           
        </Form>
        <div slot="footer">
            <Button @click.stop="close">取消</Button>
            <Button type="primary" @click.stop="save('form')">保存</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            form: {
                type: '',
                desc: '',
                searchParam: '',
                searchType: '',
                valueType: 'string',
            },
            index:null,//编辑数据位置
            ruleCustom: {
                type: [
                     { required: true, message: '请选择', trigger: 'change' }
                ], 
                searchParam: [
                     { required: true, message: '请选择', trigger: 'change' }
                ], 
                searchType: [
                     { required: true, message: '请选择', trigger: 'change' }
                ], 
                valueType: [
                     { required: true, message: '请选择', trigger: 'change' }
                ], 
                /*  */
                /* username: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                schema: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ], */
            },
           
            options: {
                searchTypeALlOptions:{
                    searchBox:[
                        {name:'精确查询'},
                        {name:'模糊查询'},
                    ],
                    dropDownBox:[
                        {name:'单选'},
                        {name:'多选'},
                    ],
                    timeBox:[
                        {name:'按小时查询'},
                        {name:'按天查询'},
                        {name:'按月查询'},
                        {name:'按年查询'},
                    ]
                },
                searchType:[],
                column:[]
                
            }
        }
    },
    methods: {
        init(params) {
            Object.assign(this.$data, this.$options.data());
            this.show = true
            this.getOptions(params)
            this.$nextTick(() => {
                this.resetForm();
            })
        },
        edit(data,index,params) {
            Object.assign(this.$data, this.$options.data())
            this.show = true
            this.getOptions(params)
           
            this.$nextTick(() => {
                this.form = {...data};
                this.index=index;
                this.changeType(this.form.type)
                this.resetForm();
            })
        },
        getOptions(params){
            this.$api.getOptionsTableColumnList(params).then(res=>{
                this.options.column=res?.object?.columns || []
            })
        },
        resetForm() {
            this.$refs.form.fields.forEach(function (e) {
                e.resetField()
            })
        },
        close() {
            this.show = false
        },
        save(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.form)
                  this.$emit('success',this.form,this.index)

                  this.close();
                }
            })
        },
        changeType(val){
            this.options.searchType=this.options.searchTypeALlOptions[val] || []

            if(this.form.searchType!=''){
                let obj=this.options.searchType.find(res=>{return res.name==val })
                if(!obj){
                    this.form.searchType='';
                }
            }
            if(val=='searchBox' && this.form.searchType==''){
                this.form.searchType='模糊查询'
            }else if (val=='dropDownBox' && this.form.searchType==''){
                this.form.searchType='单选'
            }else if (val=='timeBox' && this.form.searchType==''){
                this.form.searchType='按天查询'
                this.form.valueType='string'
            }
        }

    }
}
</script>
<style lang="scss" scoped>
.title {
    background: #EBF6F7;
    color: #0E2626;
    padding: 9px 24px 8px;
    font-weight: 500;
    position: relative;

    &:before {
        //在元素内容前
        content: ' ';
        width: 3px;
        height: 14px;
        position: absolute;
        background-color: #13939E;
        left: 12px;
        margin-top: 4px;
    }
}</style>